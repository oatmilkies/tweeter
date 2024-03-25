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


  //Load tweets
  const loadTweets = function() {
    $.ajax("/tweets", "initial-tweets.json", { method: "GET" })
      .then(initialTweets => renderTweets(initialTweets))
      .catch(err => console.log(err));
  };

  loadTweets();


  //Check that the tweet is not empty or too long
  const validateData = function(data) {
    if (data.length > 140) {
      alert("Tweet too long. Cannot submit");
      return false
    } else if (data.length === 0) {
      alert("Tweet is empty. Cannot submit");
      return false;
    } else
      return true;
  };


  //Post a new tweet
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();

    const formData = $(this).find("#tweet-text");
    const serializedData = formData.serialize();

    if (validateData(formData.val())) {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: serializedData
      }).then((response) => {
        console.log("Tweet submitted!");
        formData.val("");
        loadTweets();        
      }).catch((error) => { console.error("Couldn't submit tweet"); });
    }
  });

});