const fs = require('fs');
const { execSync } = require('child_process');

// Get all .md files excluding README.md and index.json
const files = execSync('find . -name "*.md" -type f')
  .toString()
  .trim()
  .split('\n')
  .filter(file => 
    !file.endsWith('README.md') && 
    !file.endsWith('index.json') &&
    !file.includes('node_modules/')
  );

const articles = files.map(filePath => {
  const filename = filePath.replace(/^\.\//, '');
  
  // Get first commit date (creation time)
  const created = execSync(
    `git log --diff-filter=A --follow --format=%aI -- "${filename}" | tail -1`
  ).toString().trim();

  return { filename, created };
});

// Sort by creation date (newest first)
articles.sort((a, b) => 
  new Date(b.created).getTime() - new Date(a.created).getTime()
);

fs.writeFileSync('index.json', JSON.stringify(articles, null, 2));
