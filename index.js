/**
 * injects file to puppeteer page context
 * @param  {Object} page     context where to execute the script
 * @param  {String} filePath path of specific script
 * @return {Promise}         Injects content to page context
 */
 
const fs = require('fs');

async function injectFile(page, filePath) {
  let contents = await new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
  contents += `//# sourceURL=` + filePath.replace(/\n/g, '');
  return page.mainFrame().evaluate(contents);
}

module.exports = injectFile;
