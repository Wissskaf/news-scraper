import snscrape.modules.twitter as sntwitter
import json

query = "from:elonmusk"
latest_tweet = None

for tweet in sntwitter.TwitterSearchScraper(query).get_items():
    if latest_tweet is None or tweet.date > latest_tweet.date:
        latest_tweet = tweet

if latest_tweet:
    latest_tweet_data = {
        'Date': latest_tweet.date.isoformat(),
        'User': latest_tweet.username,
        'Tweet': latest_tweet.content,
    }
    with open('latest_tweet.json', 'w') as json_file:
        json.dump(latest_tweet_data, json_file, indent=4)
else:
    print("No tweet found for Elon Musk")

