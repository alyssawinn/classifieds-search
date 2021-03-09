var pullCraigslistApi = function () {
  var apiUrl = "http://www.ksl.com/classifieds/api.php?cmd=ad&id=23027643";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.type);
      });
    }
  });
};

let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];


let getStreamingInfo = function(streamingService, mediaType, genreNumber) {
fetch("https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=" + streamingService + "&type=" + mediaType + "&genre=" + genreNumber + "&page=1&language=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "27322ff4d2msheb5e58d7fc4eb03p11cb15jsnd5d27333e7d8",
		"x-rapidapi-host": "streaming-availability.p.rapidapi.com"
	}
})
.then(function(responseGenre){
	if (responseGenre.ok) {
		responseGenre.json().then(function(dataGenre){
			console.log(dataGenre)
		})
	}
});
}

$("#btn").click(function () {
  let inputValue = $("#search").val();
  recentSearches.unshift(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  console.log(genre);
});

$("#btn2").click(function () {
  let inputValue = $("#search2").val();
  recentSearches.unshift(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search2").val("");
  console.log(inputValue);
});

let searchAgain = recentSearches.map((r, i) => {
  let isFiveSearches = i >= 5;
  if (isFiveSearches) {
    return "";
  } else {
    return `
      <option id="option-${i}" >${r}</option> 
    `;
    //change option id to something else.
  }
});
$("#searchedItems").html(searchAgain);

recentSearches.map((_, i) => {
  $(`#option-${i}`)
    .off()
    .click(() => {
      // make api call
    });
});

//let myFavorites = [
// {
// favorited: true,
// name: "",
//},
//{
// favorited: false,
//  name: "",
//  },
//];

//myFavorites.map((favorite, i) => {
// if (favorite.favorited) {
//  return `
//  <option></option>
//  `;
//  }
//});

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

let createCard = function () {
  // create card container element
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card");
  cardContainer.setAttribute("style", "width: 200px");
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
  itemDescription.textContent =
    "This is where we will add the description text. I wonder how it will look if the description is super long.";
  // appending it all
  ebayEl.appendChild(cardContainer);
  cardContainer.appendChild(cardDivider);
  cardContainer.appendChild(cardImage);
  cardContainer.appendChild(cardSection);
  cardSection.appendChild(itemPrice);
  cardSection.appendChild(itemDescription);
};

getStreamingInfo("netflix", "movie", 35);

