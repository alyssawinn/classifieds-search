let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];

$("#btn").click(function () {
  let inputValue = $("#search").val();
  recentSearches.push(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  console.log(inputValue);
});

let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) ?? [];

$("#btn").click(function () {
  let inputValue = $("#search").val();
  recentSearches.push(inputValue);
  localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  $("#search").val("");
  console.log(inputValue);
});
