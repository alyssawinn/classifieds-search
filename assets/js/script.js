let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];
let streamingSelection = document.querySelector("#streamingService");
var restaurantContainerEl = document.createElement("div");
let ebayEl = document.querySelector("#ebayResults");
let restaurantEl = document.querySelector("#restaurantResults");

$("#btn").click(function () {
  var zipCode = $("#zipcode").val();
  recentSearches.unshift(zipCode);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  getRestaurantList(zipCode);
  console.log(genre);
});

$("#btn2").click(function () {
  let zipCode = $("#search2").val();
  recentSearches.unshift(zipCode);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search2").val("");
  console.log(zipCode);
});

let getStreamingInfo = function (streamingService, mediaType, genreNumber) {
  fetch(
    "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=" +
      streamingService +
      "&type=" +
      mediaType +
      "&genre=" +
      genreNumber +
      "&page=1&language=en",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "27322ff4d2msheb5e58d7fc4eb03p11cb15jsnd5d27333e7d8",
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      },
    }
  )
    .then(function (responseStreaming) {
      if (responseStreaming.ok) {
        responseStreaming.json().then(function (dataStreaming) {
          createCard(dataStreaming);
        });
      } else {
        alert("Error: " + responseStreaming.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to streaming availability services.");
    });
};

var getRestaurantList = function(zipCode) {
  restaurantContainerEl.textContent = "";
  fetch("https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/" + zipCode + "?page=1",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "API_KEY",
        "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
      },
    }
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        createRestaurantList(data.result);
      });
    }
  }).catch(function (error) {
    alert("Unable to connect to list of local restaurants.");
  });
};

var createRestaurantList = function (restaurants) {
  for (var i = 0; i < restaurants.data.length; i++) {
    var restaurantItem = document.createElement("div");
    restaurantItem.classList = "restaurant-row";
    restaurantItem.textContent = restaurants.data[i].restaurant_name + " - " + restaurants.data[i].restaurant_phone + " - " + restaurants.data[i].address.street;
    restaurantEl.appendChild(restaurantContainerEl);
    restaurantContainerEl.appendChild(restaurantItem);
  }
};

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
    .click(() => {});
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

let createCard = function (streamingService) {
  console.log(streamingService);
  for (let i = 0; i < streamingService.results.length; i++) {
    // create card container element
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card");
    cardContainer.setAttribute("style", "width: 200px");
    // create card divider element
    let cardDivider = document.createElement("div");
    cardDivider.classList.add("card-divider");
    cardDivider.textContent = streamingService.results[i].title;
    // create img element
    let cardImage = document.createElement("img");
    cardImage.classList.add("item-img");
    cardImage.setAttribute(
      "src",
      streamingService.results[i].backdropURLs.original
    );
    // create card section element
    let cardSection = document.createElement("div");
    cardSection.classList.add("card-section");
    // create item service element
    let service = document.createElement("h4");
    service.classList.add("service");
    service.textContent = $("#streamingService option:selected")
      .val()
      .toUpperCase();
    // create item rating element
    let itemRating = document.createElement("p");
    itemRating.classList.add("item-info");
    itemRating.textContent =
      "Rating: Ages " + streamingService.results[i].age + " or older";
    // create item runtime element
    let itemRuntime = document.createElement("p");
    itemRuntime.classList.add("item-info");
    itemRuntime.textContent =
      "Runtime: " + streamingService.results[i].runtime + " mins.";
    // create item cast element
    let itemCast = document.createElement("p");
    itemCast.classList.add("item-info");
    itemCast.textContent =
      "Starring: " +
      streamingService.results[i].cast[0] +
      ", " +
      streamingService.results[i].cast[1];
    // create item year element
    let itemYear = document.createElement("p");
    itemYear.classList.add("item-info");
    itemYear.textContent = "Year: " + streamingService.results[i].year;
    // appending it all
    ebayEl.appendChild(cardContainer);
    cardContainer.appendChild(cardDivider);
    cardContainer.appendChild(cardImage);
    cardContainer.appendChild(cardSection);
    cardSection.appendChild(service);
    cardSection.appendChild(itemRating);
    cardSection.appendChild(itemRuntime);
    cardSection.appendChild(itemCast);
    cardSection.appendChild(itemYear);
  }
};

$(window).resize(function () {
  if ($(window).width() < 810) {
    ebayEl.classList.add("small-6");
    restaurantEl.classList.add("small-6");
  } else {
    ebayEl.classList.remove("small-6");
    restaurantEl.classList.remove("small-6");
  }
});
