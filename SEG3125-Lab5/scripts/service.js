$(document).ready(function () {
  // Look at the different events on which an action can be performed
  // https://www.w3schools.com/jquery/jquery_events.asp
  // Here, we put
  $("#debit").on("mouseenter", function () {
    $("#debit").addClass("showInput");
  });

  $("#debit").on("mouseleave", function () {
    $("#debit").removeClass("showInput");
  });

  // https://jqueryui.com/tooltip/
  // The class "highlight" used here is predefined in JQuery UI
  // the message of the tooltip is encoded in the input (in the HTML file)
  $("#debit").tooltip({
    classes: {
      "ui-tooltip": "highlight",
    },
  });
});
