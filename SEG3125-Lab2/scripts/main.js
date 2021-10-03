// source: https://stackoverflow.com/questions/3842614/how-do-i-call-a-javascript-function-on-page-load
window.onload = function () {
  document.getElementById("defaultOpen").click();

  uncheckAll();

  let display = document.getElementById("displayProduct");

  products.sort(function (p1, p2) {
    return p1.price > p2.price;
  });

  for (i = 0; i < products.length; i++) {
    let productName = products[i].name;
    let productPrice = products[i].price;

    let checkboxDiv = document.createElement("div");
    checkboxDiv.className = "productCheckboxDiv";
    checkboxDiv.id = products[i].name;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "selectableProduct";
    checkbox.className = "selectableProduct";
    checkbox.value = productName;
    checkboxDiv.appendChild(checkbox);

    let label = document.createElement("label");
    label.htmlFor = productName;
    label.appendChild(
      document.createTextNode(productName + " - $" + productPrice)
    );
    checkboxDiv.appendChild(label);

    display.appendChild(checkboxDiv);
  }

  let cart = document.getElementById("displayCart");
  if (cart.childNodes.length === 0) {
    cart.appendChild(
      document.createTextNode(
        "You currently have no items in your shopping cart."
      )
    );
  }
};

function uncheckAll() {
  var checkbox = document.getElementsByTagName("input");
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].type == "checkbox") {
      checkbox[i].checked = false;
    }
  }
}

// source: https://www.w3schools.com/howto/howto_js_tabs.asp
function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function restrictProductChoices() {
  products.sort(function (p1, p2) {
    return p1.price > p2.price;
  });

  let lactoseRestriction = document.getElementById("lactoseIntolerant");
  let nutAllergiesRestriction = document.getElementById("nutAllergies");
  let organicRestriction = document.getElementById("organic");

  document.getElementById("displayProduct").innerHTML = "";

  let display = document.getElementById("displayProduct");

  let optionArray = [];

  if (
    lactoseRestriction.checked &&
    !nutAllergiesRestriction.checked &&
    !organicRestriction.checked
  ) {
    optionArray = products.filter((product) => !product.lactose);
  } else if (
    lactoseRestriction.checked &&
    nutAllergiesRestriction.checked &&
    organicRestriction.checked
  ) {
    optionArray = products.filter(
      (product) => !product.lactose && !product.containsNuts && product.organic
    );
  } else if (
    lactoseRestriction.checked &&
    nutAllergiesRestriction.checked &&
    !organicRestriction.checked
  ) {
    optionArray = products.filter(
      (product) => !product.lactose && !product.containsNuts
    );
  } else if (
    lactoseRestriction.checked &&
    !nutAllergiesRestriction.checked &&
    organicRestriction.checked
  ) {
    optionArray = products.filter(
      (product) => !product.lactose && product.organic
    );
  } else if (
    !lactoseRestriction.checked &&
    nutAllergiesRestriction.checked &&
    organicRestriction.checked
  ) {
    optionArray = products.filter(
      (product) => !product.containsNuts && product.organic
    );
  } else if (
    !lactoseRestriction.checked &&
    nutAllergiesRestriction.checked &&
    !organicRestriction.checked
  ) {
    optionArray = products.filter((product) => !product.containsNuts);
  } else if (
    !lactoseRestriction.checked &&
    !nutAllergiesRestriction.checked &&
    organicRestriction.checked
  ) {
    optionArray = products.filter((product) => product.organic);
  } else if (
    !lactoseRestriction.checked &&
    !nutAllergiesRestriction.checked &&
    !organicRestriction.checked
  ) {
    optionArray = products;
  }

  for (i = 0; i < optionArray.length; i++) {
    let productName = optionArray[i].name;
    let productPrice = optionArray[i].price;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "selectableProduct";
    checkbox.name = "selectableProduct";
    checkbox.value = productName;
    display.appendChild(checkbox);

    let label = document.createElement("label");
    label.htmlFor = productName;
    label.appendChild(
      document.createTextNode(productName + " - $" + productPrice)
    );
    display.appendChild(label);

    display.appendChild(document.createElement("br"));
  }
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph)
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {
  var selectableProducts = document.getElementsByName("selectableProduct");
  var chosenProducts = [];

  var cart = document.getElementById("displayCart");
  cart.innerHTML = "";

  var para = document.createElement("p");

  let yourShoppingCartContains = document.createElement("p");
  yourShoppingCartContains.appendChild(
    document.createTextNode("Your shopping cart contains the following items:")
  );

  cart.appendChild(yourShoppingCartContains);

  checked = false;
  for (i = 0; i < selectableProducts.length; i++) {
    if (selectableProducts[i].checked) {
      checked = true;

      let product = products.find(
        (product) =>
          product.name.localeCompare(selectableProducts[i].value) === 0
      );
      para.appendChild(document.createTextNode(selectableProducts[i].value + " - $" + product.price));

      para.appendChild(document.createElement("br"));
      para.appendChild(document.createElement("br"));
      chosenProducts.push(selectableProducts[i].value);
    }
  }

  // add paragraph and total price
  cart.appendChild(para);

  let yourTotalPrice = document.createElement("p");
  yourTotalPrice.appendChild(
    document.createTextNode(
      "Your total price is: $" + getTotalPrice(chosenProducts).toFixed(2)
    )
  );

  cart.appendChild(yourTotalPrice);

  if (!checked) {
    cart.innerHTML = "";
    cart.appendChild(
      document.createTextNode(
        "You currently have no items in your shopping cart."
      )
    );
  }
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
  totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    if (chosenProducts.indexOf(products[i].name) > -1) {
      totalPrice += products[i].price;
    }
  }
  return totalPrice;
}
