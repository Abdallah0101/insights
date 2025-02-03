const fs = require('fs');
const { execSync } = require('child_process');

// Get all .md files excluding README.md
const files = execSync('find . -name "*.md" -type f')
  .toString()
  .trim()
  .split('\n')
  .filter(file => !file.endsWith('README.md') && file !== './index.json');

const articles = files.map(filePath => {
  const filename = filePath.replace(/^\.\//, ''); // Remove leading ./
  
  // Get the creation date (first commit)
  const created = execSync(
    `git log --diff-filter=A --follow --format=%aI -- "${filename}" | tail -1`
  ).toString().trim();

  return { filename, created };
});

// Sort by creation date (newest first)
articles.sort((a, b) => new Date(b.created) - new Date(a.created));

// Write to index.json
fs.writeFileSync('index.json', JSON.stringify(articles, null, 2));
