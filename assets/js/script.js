<<<<<<< HEAD
let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];

$("#btn").click(function () {
  let inputValue = $("#search").val();
  recentSearches.push(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  console.log(inputValue);
});

$("#btn2").click(function () {
  let inputValue = $("#search2").val();
  recentSearches.push(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search2").val("");
  console.log(inputValue);
});

let ebayEl = document.querySelector("#ebayResults");
let amznEl = document.querySelector("#amznResults");

$(window).resize(function () {
  if ($(window).width() < 810) {
    ebayEl.classList.add("small-6");
    amznEl.classList.add("small-6");
  } else {
    ebayEl.classList.remove("small-6");
    amznEl.classList.remove("small-6");
}
  });

  let createCard = function() {
      // create card container element
      let cardContainer = document.createElement("div");
      cardContainer.classList.add("card");
      cardContainer.setAttribute("style", "width: 200px")
      // create card divider element
      let cardDivider = document.createElement("div");
      cardDivider.classList.add("card-divider");
      cardDivider.textContent = "Item Name";
      // create img element
      let cardImage = document.createElement("img");
      cardImage.classList.add("item-img");
      cardImage.setAttribute("src", "assets/images/demo-img.webp");
      // create card section element
      let cardSection = document.createElement("div");
      cardSection.classList.add("card-section");
      // create item price element
      let itemPrice = document.createElement("h4");
      itemPrice.classList.add("item-price");
      itemPrice.textContent = "$1000.00";
      // create item description element
      let itemDescription = document.createElement("p");
      itemDescription.classList.add("item-description");
      itemDescription.textContent = "This is where we will add the description text. I wonder how it will look if the description is super long."
      // appending it all
      ebayEl.appendChild(cardContainer);
      cardContainer.appendChild(cardDivider);
      cardContainer.appendChild(cardImage);
      cardContainer.appendChild(cardSection);
      cardSection.appendChild(itemPrice);
      cardSection.appendChild(itemDescription);
    
};

    createCard();
=======
var pullCraigslistApi = function() {
    var apiUrl = 'http://www.ksl.com/classifieds/api.php?cmd=ad&id=23027643';
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data.type);
            })
        }
        
    })
}

pullCraigslistApi();
>>>>>>> craiglist-api
