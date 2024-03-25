/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    //Create the tweet using the same format as in index.html
    const tweetTime = timeago.format(tweetData["created_at"]);

    const $post = $(`<article class="tweet">`);
    const $postHeader = $("<header>");
    const $postUser = $("<span>");
    const $postHandle = $(`<span class="user-handle">`);
    const $postData = $(`<p class="tweet-content">`);
    const $postFooter = $("<footer>");
    const $postTime = $("<span>");
    const $postIcons = $(`<span class="icons>`);
    const $postFlag = $(`<i class="fa-solid fa-flag">`);
    const $postRetweet = $(`<i class="fa-solid fa-retweet">`);
    const $postLike = $(`<i class="fa-solid fa-heart"></i>`);

    $postUser.text(`${tweetData.user.name}`);
    $postHandle.text(`${tweetData.user.handle}`);
    $postData.text(`${tweetData.content.text}`);
    $postTime.text(`${tweetTime}`);

    $post.append($postHeader);
    $postHeader.append($postUser);
    $postHeader.append($postHandle);
    $post.append($postData);
    $post.append($postFooter);
    $postFooter.append($postTime);
    $postFooter.append($postIcons);
    $postIcons.append($postFlag);
    $postIcons.append($postRetweet);
    $postIcons.append($postLike);

    return $post;
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
      .then(initialTweets => {
        $('.tweet-container').empty();
        renderTweets(initialTweets);
      })
      .catch(err => console.log(err));
  };

  loadTweets();


  //Check that the tweet is not empty or too long
  const validateData = function(data) {
    if (data.length > 140) {
      alert("Tweet too long. Cannot submit");
      return false;
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