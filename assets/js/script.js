//80c1f1d7ee8675f3c19bec36ce542e41d1de0f9af08a453ccd5399bc3a1069bc

let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];


const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/90210?page=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8206f3a213msh8ed8c8207eb19f8p1aede3jsn056a50d4f77f",
		"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response.result.data[1]);
});

$("#btn").click(function () {
  let inputValue = $("#search").val();
  recentSearches.push(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  console.log(inputValue);
  getSearchResults(inputValue);
});

$("#btn2").click(function () {
  let inputValue = $("#search2").val();
  recentSearches.push(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search2").val("");
  console.log(inputValue);
  getSearchResults(inputValue);

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
