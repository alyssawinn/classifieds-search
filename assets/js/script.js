let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];

$("#btn").click(function () {
  let inputValue = $("#search").val();
  recentSearches.unshift(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  //console.log(inputValue);
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
