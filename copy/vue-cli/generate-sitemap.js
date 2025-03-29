const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

// Base URL of your website (change this to your production URL)
const baseUrl = 'https://www.sitename.com'; // Change this to your actual domain

// Array to store unique URLs
const urlSet = new Set();

// Extract routes from router files
async function extractRoutesFromFiles() {
  try {
    // Manually extract routes from router files based on the actual router configuration
    const routePatterns = [
      // Home routes
      '/',
      
      // Info routes
      '/tos',
      '/privacy',
   
      
      // Error pages
      '/error',
      '/404'
    ];
    
    // Add all routes to the URL set
    routePatterns.forEach(route => {
      const url = new URL(route, baseUrl).href;
      urlSet.add(url);
    });
    
    // Add routes from lessons.json
    try {
      const lessonsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'data', 'lessons.json'), 'utf8'));
      
      // Process each lesson category
      lessonsData.forEach(lessonCategory => {
        if (lessonCategory.isActive && lessonCategory.units) {
          // Process each unit in the category
          lessonCategory.units.forEach(unit => {
            if (unit.isActive) {
              // Create URL pattern: /teach/{grade}/{category-case}/{unit-case}
              const route = `/teach/${unit.grade}/${lessonCategory.case}/${unit.case}`;
              const url = new URL(route, baseUrl).href;
              urlSet.add(url);
              
              // Also add mobile, edit, options, pdf versions of the URL
              urlSet.add(new URL(`${route}`, baseUrl).href);
              urlSet.add(new URL(`${route}/mobile`, baseUrl).href);
              urlSet.add(new URL(`${route}/print`, baseUrl).href);
              urlSet.add(new URL(`${route}/exercise`, baseUrl).href);}
          });
        }
      });
      
      console.log(`Added URLs from lessons.json data`);
    } catch (error) {
      console.error('Error processing lessons.json:', error);
    }
    
    console.log(`Extracted ${urlSet.size} routes from router configuration`);
  } catch (error) {
    console.error('Error extracting routes:', error);
  }
}

// Function to generate the sitemap XML
function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urlSet.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xml);
  console.log(`Sitemap generated with ${urlSet.size} URLs and saved to public/sitemap.xml`);
}

// Main execution
async function main() {
  await extractRoutesFromFiles();
  generateSitemap();
}

main().catch(error => {
  console.error('Error generating sitemap:', error);
}); 