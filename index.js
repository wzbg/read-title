/* 
* @Author: zyc
* @Date:   2015-12-10 18:36:06
* @Last Modified by:   zyc
* @Last Modified time: 2015-12-10 18:46:18
*/
'use strict';

const fetchUrl = require('fetch-promise');
const cheerio = require('cheerio');

module.exports = url => {
  return new Promise((resolve, reject) => {
    fetchUrl(url).then(
      result => {
        let betterTitle;
        const { res, buf } = result;
        const $ = cheerio.load(buf);
        const title = $('title').text().trim();
        const commonSeparatingCharacters = [' | ', ' _ ', ' - ', '«', '»', '—'];
        for (let char of commonSeparatingCharacters) {
          const tmpArray = title.split(char);
          if (tmpArray.length > 1) {
            if (betterTitle) return resolve(title);
            betterTitle = tmpArray[0].trim();
          }
        }
        if (betterTitle && betterTitle.length > 10) {
          resolve(betterTitle);
        } else {
          resolve(title);
        }
      },
      err => reject(err)
    );
  });
};