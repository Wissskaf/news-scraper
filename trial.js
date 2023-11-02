const fs = require('fs');
const schedule = require('node-schedule');
const TelegramBot = require('node-telegram-bot-api');
const token = '6476301699:AAFpSWOc2hkJT5gRSYDNBlRCFJNp6F7J460';
const chatId = '979754657';
const bot = new TelegramBot(token, { polling: false });

function arraysAreEqual(arr1, arr2) {
  if (!arr1 || !arr2) return false; // Handle undefined cases
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
async function jadeed() {
    try {
      
      const response = await fetch('https://www.aljadeed.tv/news-highlights');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const htmlContent = await response.text();
  
      
      const htmlData = {
        content: htmlContent,
      };
      const jsonData = JSON.stringify(htmlData, null, 2);
      fs.writeFileSync('jadeed-html-data.json', jsonData);
  
     
      const jsdom = require('jsdom');
      const { JSDOM } = jsdom;
      const dom = new JSDOM(htmlContent);
  
     
      const articles = dom.window.document.querySelectorAll('a');
      const articleTexts = Array.from(articles).map((article) => article.text);
      const trimmedArticleTexts = articleTexts.map((text) => text.trim());
  
      const articleData = {
        recentNews: trimmedArticleTexts,
      };
  
      // Compare the new data with existing data
      let existingData = [];
      if (fs.existsSync('jadeed-news.json')) {
        const jsonData = fs.readFileSync('jadeed-news.json', 'utf-8');
        existingData = JSON.parse(jsonData);
      }
  
      if (!arraysAreEqual(existingData.recentNews, articleData.recentNews)) {
        console.log('jadeed updated has changed. Updating JSON file...');
        const jsonData = JSON.stringify(articleData, null, 2);
        
  
        fs.writeFileSync('jadeed-news.json', jsonData);
        console.log('jadeed news saved to jadeed-news.json');
        // If data has changed, send a message to the Telegram bot
        bot.sendMessage(chatId, 'LB-NEWS\n\n' + articleData.recentNews[93] + '\n\n(Jadeed TV)');
      } else {
        console.log('jadeed has not changed.');
        // console.log(articleData.recentNews[93]);
        // console.log(articleData.recentNews[25]);
        // Doesn't send anything
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  jadeed();
