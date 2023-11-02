const express = require('express')
const app = express()
const PORT = process.env.PORT | 5000;
app.get('/', function (req, res) {
  res.json({message:"hello from backend"})
})

app.listen(PORT,()=>(
  console.log(`server is listening on ${PORT}...`)
))

const fs = require('fs');
const schedule = require('node-schedule');
const TelegramBot = require('node-telegram-bot-api');
const token = '6476301699:AAFpSWOc2hkJT5gRSYDNBlRCFJNp6F7J460';
const chatId = '979754657';
const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

function arraysAreEqual(arr1, arr2) {
  if (!arr1 || !arr2) return false; // Handle undefined cases
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

async function lebanonfiles() {
  try {
    // Fetch data from the website
    const response = await fetch('https://www.lebanonfiles.com/');
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    const htmlContent = await response.text();

    // Load the HTML content into JSDOM
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;
    const dom = new JSDOM(htmlContent);

    // Use DOM selectors to extract text content inside elements with class "article-list"
    const articles = dom.window.document.querySelectorAll('h3');
    const articleTexts = Array.from(articles).map((article) => article.textContent);
    const trimmedArticleTexts = articleTexts.map((text) => text.trim());

    const articleData = {
      recentNews: trimmedArticleTexts,
    };

    // Compare the new data with existing data
    let existingData = [];
    if (fs.existsSync('recent-news.json')) {
      const jsonData = fs.readFileSync('recent-news.json', 'utf-8');
      existingData = JSON.parse(jsonData);
    }

    if (!arraysAreEqual(existingData.recentNews[0], articleData.recentNews[0])) {
      console.log('files has changed. Updating JSON file...');
      const jsonData = JSON.stringify(articleData, null, 2);
      fs.writeFileSync('recent-news.json', jsonData);
      console.log('Data saved to recent-news.json');
      // If data has changed, send a message to the Telegram bot
      bot.sendMessage(chatId, 'LB-NEWS\n\n' + articleData.recentNews[0] + '\n\n(Lebanon Files)');
    } else {
      console.log('files has not changed.');
      // Doesn't send anything
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

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

    if (!arraysAreEqual(existingData.recentNews[35], articleData.recentNews[35])) {
      console.log('mayadeen updated has changed. Updating JSON file...');
      const jsonData = JSON.stringify(articleData, null, 2);
      fs.writeFileSync('mayadeen-news.json', jsonData);
      console.log('mayadeen news saved to mayadeen-news.json');
      // If data has changed, send a message to the Telegram bot
      bot.sendMessage(chatId, 'LB-NEWS\n\n' + articleData.recentNews[35] + '\n\n(AL Mayadeen)');
    } else {
      console.log('mayadeen has not changed.');
      // Doesn't send anything
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function imleb() {
  try {
    // Fetch data from the website
    const response = await fetch('https://www.imlebanon.org/#timeline');
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    const htmlContent = await response.text();

    // Save the HTML content to a JSON file
    const htmlData = {
      content: htmlContent,
    };
    const jsonData = JSON.stringify(htmlData, null, 2);
    fs.writeFileSync('imleb-html-data.json', jsonData);

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
    if (fs.existsSync('imleb-news.json')) {
      const jsonData = fs.readFileSync('imleb-news.json', 'utf-8');
      existingData = JSON.parse(jsonData);
    }

    if (!arraysAreEqual(existingData.recentNews[29], articleData.recentNews[29])) {
      console.log('imleb updated has changed. Updating JSON file...');
      const jsonData = JSON.stringify(articleData, null, 2);
      fs.writeFileSync('imleb-news.json', jsonData);
      console.log('imleb news saved to mayadeen-news.json');
      // If data has changed, send a message to the Telegram bot
      bot.sendMessage(chatId, 'LB-NEWS\n\n' + articleData.recentNews[29] + '\n\n(IM LEBANON)');
    } else {
      console.log('imleb has not changed.');
      // Doesn't send anything
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function lebon() {
  try {
    
    const response = await fetch('https://www.lebanonon.com/');
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    const htmlContent = await response.text();

    
    const htmlData = {
      content: htmlContent,
    };
    const jsonData = JSON.stringify(htmlData, null, 2);
    fs.writeFileSync('lebon-html-data.json', jsonData);

   
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
    if (fs.existsSync('lebon-news.json')) {
      const jsonData = fs.readFileSync('lebon-news.json', 'utf-8');
      existingData = JSON.parse(jsonData);
    }

    if (!arraysAreEqual(existingData.recentNews[25], articleData.recentNews[25])) {
      console.log('lebon updated has changed. Updating JSON file...');
      const jsonData = JSON.stringify(articleData, null, 2);
      

      fs.writeFileSync('lebon-news.json', jsonData);
      console.log('lebon news saved to lebon-news.json');
      // If data has changed, send a message to the Telegram bot
      bot.sendMessage(chatId, 'LB-NEWS\n\n' + articleData.recentNews[25] + '\n\n(LebanonOn)');
    } else {
      console.log('lebon has not changed.');
      // console.log(articleData.recentNews[25]);
      // Doesn't send anything
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
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

    if (!arraysAreEqual(existingData.recentNews[93], articleData.recentNews[93])) {
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


// Call the functions to fetch and compare data
mayadeen();
lebanonfiles();
imleb();
lebon();
jadeed();


const job = schedule.scheduleJob('*/1 * * * *', () => {
  console.log('Refreshing data...');
  lebanonfiles().catch(error => console.error(error));
});

const job1 = schedule.scheduleJob('*/1 * * * *', () => {
  console.log('Refreshing data...');
  mayadeen().catch(error => console.error(error));
});

const job2 = schedule.scheduleJob('*/1 * * * *', () => {
  console.log('Refreshing data...');
  imleb().catch(error => console.error(error));
});
const job3 = schedule.scheduleJob('*/1 * * * *', () => {
  console.log('Refreshing data...');
  lebon().catch(error => console.error(error));
});

const job4 = schedule.scheduleJob('*/1 * * * *', () => {
  console.log('Refreshing data...');
  jadeed().catch(error => console.error(error));
});
// bot.on('new_chat_members', (msg) => {
//   // Check if the new chat member is your bot
//   if (msg.new_chat_members && msg.new_chat_members.some(member => member.id === bot.options.polling.id)) {
//     const chatId = msg.chat.id; // Get the chat ID of the group
//     const welcomeMessage = 'Hello, I am your bot! Welcome to the group.';

//     // Send a welcome message
//     bot.sendMessage(chatId, welcomeMessage);
//   }
// });

// // Start polling for updates
// bot.startPolling();