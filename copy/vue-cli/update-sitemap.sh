#!/bin/bash

# Path to your project directory
PROJECT_DIR="/Applications/XAMPP/xamppfiles/htdocs/sanal-dershane"

# Go to the project directory
cd "$PROJECT_DIR"

# Run the sitemap generator script
node generate-sitemap.js

# Output message
echo "Sitemap updated successfully at $(date)"

# You can use this script with a cron job to update the sitemap periodically
# Example cron entry (updates sitemap weekly on Sunday at 1:00 AM):
# 0 1 * * 0 /path/to/update-sitemap.sh >> /path/to/sitemap-log.txt 2>&1 