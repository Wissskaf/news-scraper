
const fs = require('fs');
// The URL of the website you want to download
const url = 'https://www.lebanonfiles.com/';

// Use the Fetch API to make a GET request to the URL
fetch(url)
  .then((response) => {
    if (response.ok) {
      // Read the response stream as text
      return response.text();
    } else {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
  })
  .then((htmlContent) => {
    // Save the HTML content to a JSON file
    const replacer = (key, value) => (typeof value === 'string' ? value.replace(/\n/g, ' ') : value);
    const dataToSave = JSON.stringify({ htmlContent }, replacer, 2);

    fs.writeFileSync('lebanonfiles.json', dataToSave);
    console.log('HTML content saved to lebanonfiles.json');
  })
  .catch((error) => {
    console.error('Error:', error);
  });


