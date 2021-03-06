let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];
let streamingSelection = document.querySelector("#streamingService");
let btn = document.querySelectorAll("#btn, #btn2");
var restaurantContainerEl = document.createElement("div");
let mediaContainer = document.querySelector("#mediaResults");
let restaurantEl = document.querySelector("#restaurantResults");
let mediaResultsContainer = document.createElement("div");
mediaResultsContainer.classList = "media-results-container cell grid-x large-expand";

//MODALS
var modal = document.getElementById("myModal");
var errorModal = document.getElementById("errorModal");
var errorText = document.getElementById("errorText");
var errorCloseBtn = document.createElement("button");
errorCloseBtn.classList = "error-modal-btn";
var errorCloseBtnText = document.createTextNode("Close");
errorCloseBtn.appendChild(errorCloseBtnText);
errorModal.appendChild(errorCloseBtn);
var modalBtn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

//STREAMING API
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
        "x-rapidapi-key": "api_key",
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      },
    }
  )
    .then(function (responseStreaming) {
      if (responseStreaming.ok) {
        responseStreaming.json().then(function (dataStreaming) {
          if (dataStreaming.results.length === 0) {
            errorText.textContent = "Your streaming search yielded no results!";
            modal.style.display = "block";
            errorModal.style.display ="block";
          }
          else {
            createCard(dataStreaming);
          }
          
        });
      } else {
        errorText.textContent = "Error: Please make a selection in all search options and try again.";
        modal.style.display = "block";
        errorModal.style.display ="block";
      }
    })
    .catch(function (error) {
      errorText.textContent = "Unable to connect to streaming availability services";
      modal.style.display = "block";
      errorModal.style.display ="block";
    });
};

let streamingSubmitHandler = function () {
  let serviceSelected = $("#streamingService").val();
  let genreSelected = $("#genre").val();
  let mediaTypeSelected = $("#mediaType").val();

  getStreamingInfo(serviceSelected, mediaTypeSelected, genreSelected);
};

let createCard = function (streamingService) {
  console.log(streamingService);
  for (let i = 0; i < streamingService.results.length; i++) {
    // create link for card
    let serviceSelected = $("#streamingService").val();
    let cardLink = document.createElement("a");
  
    if(serviceSelected == "netflix") {
      cardLink.href = streamingService.results[i].streamingInfo.netflix.us.link;
    }
    else if(serviceSelected == "disney") {
      cardLink.href = streamingService.results[i].streamingInfo.disney.us.link;
    }
    else if(serviceSelected == "hulu") {
      cardLink.href = streamingService.results[i].streamingInfo.hulu.us.link;
    }
    else if(serviceSelected == "hbo") {
      cardLink.href = streamingService.results[i].streamingInfo.hbo.us.link;
    }
    else if(serviceSelected == "peacock") {
      cardLink.href = streamingService.results[i].streamingInfo.peacock.us.link;
    }
    else if(serviceSelected == "prime") {
      cardLink.href = streamingService.results[i].streamingInfo.prime.us.link;
    };
    cardLink.target = "_blank";
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
    // check if search result has a card image
    if (cardImage.getAttribute("src") == "undefined") {
      cardImage.setAttribute("src", "./assets/images/clapboard.png");
    }
    // create card section element
    let cardSection = document.createElement("div");
    cardSection.classList.add("card-section");
    // create item rating element
    let itemRating = document.createElement("p");
    itemRating.classList.add("item-info");
    itemRating.textContent =
      "Rating: Ages " + streamingService.results[i].age + " or older";
      // check if rating exists
      if(itemRating.textContent == "Rating: Ages undefined or older") {
        itemRating.textContent = "Rating: N/A"
      };
    // create item runtime element
    let itemRuntime = document.createElement("p");
    itemRuntime.classList.add("item-info");
    itemRuntime.textContent =
      "Runtime: " + streamingService.results[i].runtime + " mins.";
      // check if runtime exists
      if (itemRuntime.textContent == "Runtime: undefined mins.") {
        itemRuntime.textContent = "Runtime: N/A"
      };
    // create item cast element
    let itemCast = document.createElement("p");
    itemCast.classList.add("item-info");
    itemCast.textContent =
      "Starring: " +
      streamingService.results[i].cast[0] +
      ", " +
      streamingService.results[i].cast[1];
      // check if cast exists
      if (itemCast.textContent == "Starring: undefined, undefined") {
        itemCast.textContent = "Starring: N/A"
      }
      else if (itemCast.textContent ==
        "Starring: " +
        streamingService.results[i].cast[0] +
        ", undefined") {
          itemCast.textContent= "Starring: " + streamingService.results[i].cast[0];
        }
    // create item year element
    let itemYear = document.createElement("p");
    itemYear.classList.add("item-info");
    itemYear.textContent = "Year: " + streamingService.results[i].year;
    // check if year exists
    if(itemYear.textContent == "Year: undefined") {
      itemYear.textContent = "Year: N/A"
    }
    // appending it all
    mediaContainer.appendChild(mediaResultsContainer);
    mediaResultsContainer.appendChild(cardLink);
    cardLink.appendChild(cardContainer);
    cardContainer.appendChild(cardDivider);
    cardContainer.appendChild(cardImage);
    cardContainer.appendChild(cardSection);
    cardSection.appendChild(itemRating);
    cardSection.appendChild(itemRuntime);
    cardSection.appendChild(itemCast);
    cardSection.appendChild(itemYear);
  }
};

//RESTAURANT API
var getRestaurantList = function (zipCode) {
  restaurantContainerEl.textContent = "";
  fetch(
    "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/" +
      zipCode +
      "?page=1",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "api_key",
        "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
      },
    }
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.result.numResults === 0) {
            errorText.textContent = "Please enter a valid zip code";
            modal.style.display = "block";
            errorModal.style.display ="block";
          } else {
            createRestaurantList(data.result);
          }
        });
      }
    })
    .catch(function (error) {
      errorText.textContent = "Unable to connect to list of local restaurants";
      modal.style.display = "block";
      errorModal.style.display ="block";
    });
};

var createRestaurantList = function (restaurants) {
  for (var i = 0; i < restaurants.data.length; i++) {
    var restaurantItemLink = document.createElement("a");
    restaurantItemLink.style.display = "block";
    restaurantItemLink.className = "restaurant-row";
    restaurantItemLink.href = "https://maps.google.com/?q=" + restaurants.data[i].address.formatted;
    restaurantItemLink.target = "_blank";
    var restaurantItem = document.createElement("div");
    restaurantItem.textContent =
      restaurants.data[i].restaurant_name +
      " - " +
      restaurants.data[i].restaurant_phone +
      " - " +
      restaurants.data[i].address.street;
    restaurantItemLink.appendChild(restaurantItem);
    restaurantEl.appendChild(restaurantContainerEl);
    restaurantContainerEl.appendChild(restaurantItemLink);
  }
};

//RECENT SEARCHES
let recentSearchToSearchAgain = function () {
  let searchAgain = recentSearches.map((r, i) => {
    let isFiveSearches = i >= 5;
    if (isFiveSearches) {
      return "";
    } else {
      return `
        <option id="option-${i}" value="${r}" >${r}</option> 
      `;
    }
  });
  $("#searchedItems").html(searchAgain);

  $("#searchedItems")
    .off()
    .change((e) => {
      let value = $(e.currentTarget).val();
      $("#zipcode").val(value);
    });
};

$("#btn").click(function () {
  var zipCode = $("#zipcode").val();
  recentSearches.unshift(zipCode);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#zipcode").val("");
  getRestaurantList(zipCode);
  mediaResultsContainer.innerHTML = "";
  streamingSubmitHandler();

  modal.style.display = "none";
  recentSearchToSearchAgain();
});

modalBtn.onclick = function () {
  modal.style.display = "block";
};

errorCloseBtn.onclick = function() {
  errorModal.style.display = "none";
  errorText.textContent = "";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    errorModal.style.display = "none";
  }
};

recentSearchToSearchAgain();
