/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const createTweetElement = function(tweetData) {
    //Create the tweet using the same format as in index.html
    const markup = `
    <article class="tweet">
      <header>
        <span>${tweetData.user.name}</span>
        <span class="user-handle">${tweetData.user.handle}</span>
      </header>
      <p class="tweet-content">${tweetData.content.text}</p>
      <footer>
        <span>${tweetData["created_at"]}</span>
        <span class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </article>
  `;

    return markup;
  };


  const renderTweets = function(tweets) {
    //Append each tweet
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }

  };

  renderTweets(data);

});