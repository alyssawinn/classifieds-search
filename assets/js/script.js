let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];
let streamingSelection = document.querySelector("#streamingService");
let btn = document.querySelectorAll("#btn, #btn2");
var restaurantContainerEl = document.createElement("div");
let mediaContainer = document.querySelector("#mediaResults");
let restaurantEl = document.querySelector("#restaurantResults");
let mediaResultsContainer = document.createElement("div");

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
        "x-rapidapi-key": "8206f3a213msh8ed8c8207eb19f8p1aede3jsn056a50d4f77f",
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
  console.log(streamingService);
  console.log(mediaType);
  console.log(genreNumber);
};

let streamingSubmitHandler = function() {
  let serviceSelected = $("#streamingService").val();
  let genreSelected = $("#genre").val();
  let mediaTypeSelected = $("#mediaType").val();
  getStreamingInfo(serviceSelected, mediaTypeSelected, genreSelected);
};

$("#btn").click(function () {
  var zipCode = $("#zipcode").val();
  recentSearches.unshift(zipCode);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  getRestaurantList(zipCode);
  console.log(genre);
  mediaResultsContainer.innerHTML = "";
  streamingSubmitHandler();
  modal.style.display = "none";
});


var getRestaurantList = function (zipCode) {
  restaurantContainerEl.textContent = "";
  fetch(
    "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/" +
      zipCode +
      "?page=1",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "API_KEY",
        "x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
      },
    }
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          createRestaurantList(data.result);
        });
      }
    })
    .catch(function (error) {
      alert("Unable to connect to list of local restaurants.");
    });
};

var createRestaurantList = function (restaurants) {
  for (var i = 0; i < restaurants.data.length; i++) {
    var restaurantItem = document.createElement("div");
    restaurantItem.classList = "restaurant-row";
    restaurantItem.textContent =
      restaurants.data[i].restaurant_name +
      " - " +
      restaurants.data[i].restaurant_phone +
      " - " +
      restaurants.data[i].address.street;
    restaurantEl.appendChild(restaurantContainerEl);
    restaurantContainerEl.appendChild(restaurantItem);
  }
};

// $("#btn").click(function () {
//   let inputValue = $("#zipcode").val();
//   recentSearches.unshift(inputValue);
//   localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
//   $("#zipcode").val("");
//   console.log(inputValue);
//   // getRestaurantList();
//   console.log($('#streamingService').val());
//   modal.style.display = "none";

//   console.log(genre);
// });

// recent items list for big screen

let searchAgain = recentSearches.map((r, i) => {
  let isFiveSearches = i >= 5;
  if (isFiveSearches) {
    return "";
  } else {
    return `
      <option id="option-${i}" >${r}</option> 
    `;
  }
});
$("#searchedItems").html(searchAgain);

recentSearches.map((_, i) => {
  $(`#option-${i}`)
    .off()
    .click(() => {
      $("searchedItems").value;
      console.log(recentSearches);
    });
});

// recent items list for mobile
let searchAgain2 = recentSearches.map((r, i) => {
  let isFiveSearches = i >= 5;
  if (isFiveSearches) {
    return "";
  } else {
    return `
      <option id="option-${i}" >${r}</option> 
    `;
  }
});
$("#searchedItems2").html(searchAgain2);

recentSearches.map((_, i) => {
  $(`#option-${i}`)
    .off()
    .click(() => {
      $("searchedItems2").value;
      console.log(recentSearches);
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

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var modalBtn = document.getElementById("myBtn");
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  // When the user clicks on the button, open the modal
  modalBtn.onclick = function() {
    modal.style.display = "block";
  }
  
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  