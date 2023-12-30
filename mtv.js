
const fs = require('fs');
const schedule = require('node-schedule');
const TelegramBot = require('node-telegram-bot-api');
const token = '6476301699:AAFpSWOc2hkJT5gRSYDNBlRCFJNp6F7J460';
const chatId = '979754657';
const bot = new TelegramBot(token, { polling: false });

async function mayadeen() {
    try {
      // Fetch data from the website
      const response = await fetch('https://www.almayadeen.net/');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
      const htmlContent = await response.text();
  
      // Save the HTML content to a JSON file
      const htmlData = {
        content: htmlContent,
      };
      const jsonData = JSON.stringify(htmlData, null, 2);
      fs.writeFileSync('mayadeen-html-data.json', jsonData);
  
      // Load the HTML content into JSDOM
      const jsdom = require('jsdom');
      const { JSDOM } = jsdom;
      const dom = new JSDOM(htmlContent);
  
      // Use DOM selectors to extract text content inside elements with class "article-list"
      const articles = dom.window.document.querySelectorAll('a');
      const articleTexts = Array.from(articles).map((article) => article.text);
      const trimmedArticleTexts = articleTexts.map((text) => text.trim());
  
      const articleData = {
        recentNews: trimmedArticleTexts,
      };
  
      // Compare the new data with existing data
      let existingData = [];
      if (fs.existsSync('mayadeen-news.json')) {
        const jsonData = fs.readFileSync('mayadeen-news.json', 'utf-8');
        existingData = JSON.parse(jsonData);
      }
  
      if (!arraysAreEqual(existingData.recentNews, articleData.recentNews)) {
        console.log('Data has changed. Updating JSON file...');
        const jsonData = JSON.stringify(articleData, null, 2);
        fs.writeFileSync('mayadeen-news.json', jsonData);
        console.log('Data saved to mayadeen-news.json');
        // If data has changed, send a message to the Telegram bot
        bot.sendMessage(chatId, 'LB-NEWS\n\n' + articleData.recentNews[35] + '\n\n(AL Mayadeen)');
      } else {
        console.log('Data has not changed.');
        // Doesn't send anything
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  
  mayadeen();