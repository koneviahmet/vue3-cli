import mermaid from 'mermaid';

/**
 * Initialize mermaid with default configuration
 * @param {string} theme - Theme to use (default, dark, forest, neutral)
 */
export const initializeMermaid = (theme = 'default') => {
  mermaid.initialize({
    startOnLoad: false,
    theme: theme,
    securityLevel: 'loose',
    logLevel: 'fatal',
    fontFamily: 'sans-serif',
  });
};

/**
 * Render a mermaid diagram
 * @param {string} containerId - ID of the container element
 * @param {string} code - Mermaid diagram code
 * @param {Element} containerEl - Container element reference
 * @returns {Promise<SVGElement>} - Promise with the rendered SVG
 */
export const renderMermaidDiagram = async (containerId, code, containerEl) => {
  try {
    // Generate a unique ID to avoid conflicts
    const uniqueId = `${containerId}-${Date.now()}`;
    
    // Render the diagram
    const { svg } = await mermaid.render(uniqueId, code);
    
    // Insert the SVG into the container
    if (containerEl) {
      containerEl.innerHTML = svg;
      
      // Adjust SVG for better display
      const svgElement = containerEl.querySelector('svg');
      if (svgElement) {
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        svgElement.style.maxWidth = '100%';
        svgElement.style.maxHeight = '100%';
      }
      
      return svgElement;
    }
    
    return null;
  } catch (error) {
    console.error('Mermaid rendering error:', error);
    if (containerEl) {
      containerEl.innerHTML = '<div class="text-error p-4">Diyagram yüklenemedi. Kodda bir hata olabilir.</div>';
    }
    throw error;
  }
};

export default {
  initializeMermaid,
  renderMermaidDiagram
}; 