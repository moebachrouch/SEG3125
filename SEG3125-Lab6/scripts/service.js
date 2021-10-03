function validatePhone(txtPhone) {
  var a = document.getElementById(txtPhone).value;
  var filter = /^(\([-+]?[0-9]+)\)$/;
  if (filter.test(a)) {
    return true;
  } else {
    return false;
  }
}

function validatePhone(txtPhone) {
  var a = document.getElementById(txtPhone).value;
  var filter = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  if (filter.test(a)) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(txtEmail) {
  var email = document.getElementById(txtEmail).value;
  var filter =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return filter.test(email);
}

function validateCredit(txtCredit) {
  var credit = document.getElementById(txtCredit).value;
  var filter = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/;
  return filter.test(credit);
}

function getExpertSelectionValue() {
  return $("#expertSelect").find(":selected").val();
}

function getUnavailableDates() {
  if (getExpertSelectionValue() === "0") {
    return [0, 1, 2, 3, 4, 5, 6];
  }
  if (getExpertSelectionValue() === "1") {
    return [2, 4]; // Tuesday and Thursday for Dr. Davis
  }
  if (getExpertSelectionValue() === "2") {
    return [3]; // Wednesday for Dr. Perez
  }
  if (getExpertSelectionValue() === "3") {
    return [1, 5]; // Monday and Friday for Dr. Baker
  }
}

const setDateFormat = "dd-mm-yy";

function disableDates(date) {
  day = date.getDay();
  if (day === 0 || date.getDay() === 6) return [false];

  return [getUnavailableDates().indexOf(day) === -1];
}

$(document).ready(function () {
  $("#dateInput").datepicker({
    dateFormat: setDateFormat,
    minDate: new Date(),
    beforeShowDay: $.datepicker.noWeekends,
    beforeShowDay: disableDates,
  });

  $("#expertSelect").on("change", function () {
    $("#dateInput").val("");
  });

  $("#timeInput").timepicker({
    interval: 30,
    minTime: "9:00am",
    maxTime: "5:00pm",
    defaultTime: "9:00am",
    startTime: "9:00am",
  });

  $("#phone").on("change", function () {
    if (!validatePhone("phone")) {
      alert(
        "You have not properly formatted your phone number. Please enter a phone number with one of the following formats:\n\n(123)-456-7899\n(123).456.7899\n(123)-456-7899\n123-456-7899\n123 456 7899\n1234567899"
      );
      $("#phone").val("");
      $("#phone").addClass("error");
    } else {
      $("#phone").removeClass("error");
    }
  });

  $("#email").on("change", function () {
    if (!validateEmail("email")) {
      alert(
        "You have not properly formatted your email address. Please enter an email address with the following format:\n\nemail@address.com"
      );
      $("#email").val("");
      $("#email").addClass("error");
    } else {
      $("#email").removeClass("error");
    }
  });

  $("#debit").on("change", function () {
    if (!validateCredit("debit")) {
      alert(
        "You have not properly formatted your credit card number. Please enter a 16-digit credit card number with one of the following formats:\n\nxxxx-xxxx-xxxx-xxxx\nxxxxxxxxxxxxxxxx\nxxxx xxxx xxxx xxxx"
      );
      $("#debit").val("");
      $("#debit").addClass("error");
    } else {
      $("#debit").removeClass("error");
    }
  });

  $("#debit").tooltip({
    track: true,
    classes: {
      "ui-tooltip": "highlight",
    },
  });

  $("#firstName").tooltip({
    track: true,
    classes: {
      "ui-tooltip": "highlight",
    },
  });

  $("#lastName").tooltip({
    track: true,
    classes: {
      "ui-tooltip": "highlight",
    },
  });

  $("#email").tooltip({
    track: true,
    classes: {
      "ui-tooltip": "highlight",
    },
  });

  $("#phone").tooltip({
    track: true,
    classes: {
      "ui-tooltip": "highlight",
    },
  });

  $("#dateInput").tooltip({
    track: true,
    classes: {
      "ui-tooltip": "highlight",
    },
  });

  $("#timeInput").tooltip({
    track: true,
    classes: {
      "ui-tooltip": "highlight",
    },
  });

  $("#bookAppointment").click(function () {
    if (emptyFields()) {
      alert(
        "You have left one or more input fields blank. Please make sure to fill in every input field."
      );
    } else {
      alert(
        "Your appointment for " +
          getServiceSelection().toLowerCase() +
          " with " +
          getExpertSelection() +
          " has been booked successfully!\n\nPlease make sure to arrive to your appointment on " +
          getDateSelection() +
          ", at " +
          getTimeSelection() +
          "."
      );
    }
  });
});

function getTimeSelection() {
  return $("#timeInput").val();
}

function getDateSelection() {
  var date = $("#dateInput").datepicker("getDate");
  return $.datepicker.formatDate("dd-mm-yy", date);
}

function getServiceSelection() {
  return $("#serviceSelect").find(":selected").text();
}

function getExpertSelection() {
  return $("#expertSelect").find(":selected").text();
}

function emptyFields() {
  return (
    $("#phone").val() == "" ||
    $("#debit").val() == "" ||
    $("#firstName").val() == "" ||
    $("#lastName").val() == "" ||
    $("#email").val() == "" ||
    $("#dateInput").val() == "" ||
    $("#timeInput").val() == "" ||
    emptyDropdowns()
  );
}

function emptyDropdowns() {
  return $("#serviceSelect").val() === "0" || $("#expertSelect").val() === "0";
}
