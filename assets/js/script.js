let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];

$("#btn").click(function () {
  let inputValue = $("#search").val();
  recentSearches.push(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  //console.log(inputValue);
});

$("#btn2").click(function () {
  let inputValue = $("#search2").val();
  recentSearches.push(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search2").val("");
  console.log(inputValue);
});

let searchAgain = recentSearches.map((r, i) => {
  console.log(r, i);
  return `
  <div class="cell small-6" >
    <div class="search" >
      <a href="" class="" >
         
      </a>
    </div>
  </div>
  `;
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
