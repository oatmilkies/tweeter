$(document).ready(function() {
const textBox = $("textarea.tweet-box");

  
  textBox.on('input', function() {
    //Get the input length in the textarea
    const length = $(this).val().length;
    //Find the counter
    const form = $(this).closest("form");
    const output = form.find("output.counter");

    output.text(140 - length);

  })


});
