$(document).ready(function() {

  const textBox = $("textarea.tweet-box");

  textBox.on('input', function() {
    //Get the input length in the textarea
    const length = $(this).val().length;
    //Find the counter
    const form = $(this).closest("form");
    const output = form.find("output.counter");

    //Show the remaining available characters in the counter
    output.text(140 - length);
    

    //Change the counter to red if it goes below the max allowed
    let remainingChars = 140 - length;

    if (remainingChars < 0) {
      $("output.counter").addClass("red-counter");
    }

    if (remainingChars > 0) {
      $("output.counter").removeClass("red-counter");
    }

  });

});
