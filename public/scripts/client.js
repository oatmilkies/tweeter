/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    //Create the tweet using the same format as in index.html
    const tweetTime = timeago.format(tweetData["created_at"]);

    const markup = `
    <article class="tweet">
      <header>
        <span>${tweetData.user.name}</span>
        <span class="user-handle">${tweetData.user.handle}</span>
      </header>
      <p class="tweet-content">${tweetData.content.text}</p>
      <footer>
        <span>${tweetTime}</span>
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
      $('.tweet-container').prepend($tweet);
    }
  };


  //Load past tweets
  const loadTweets = function() {
    $.ajax("/tweets", "initial-tweets.json", { method: "GET" })
      .then(initialTweets => renderTweets(initialTweets))
      .catch(err => console.log(err));
  };

  loadTweets();


  //Post a new
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();

    const formData = $(this).find("#tweet-text");
    const serializedData = formData.serialize();
    console.log(serializedData);

    if (serializedData.length > 140) {
      $(this).append("Tweet too long! Cannot submit");
    } else if (serializedData === "text=") {
      $(this).append("Cannot submit empty tweet");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: serializedData
      }).then((response) => {
        console.log("Tweet submitted!");
        formData.val("");
      }).catch((error) => { console.error("Couldn't submit tweet"); });
    }

  });

});