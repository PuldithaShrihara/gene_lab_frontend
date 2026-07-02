const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src', 'pages', 'admin'),
  path.join(__dirname, 'src', 'pages', 'user')
];

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));
    files.forEach(file => {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update relative imports going up one level from pages/
      // e.g. import { x } from '../config' -> import { x } from '../../config'
      // import Header from '../components/Header' -> import Header from '../../components/Header'
      // import logo from '../assets/logo' -> import logo from '../../assets/logo'
      
      const updatedContent = content.replace(/from\s+['"]\.\.\/([^'"]+)['"]/g, "from '../../$1'");
      
      if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated imports in ${file}`);
      }
    });
  }
});
