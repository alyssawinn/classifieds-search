let ebayEl = document.querySelector("#ebayResults");
let amznEl = document.querySelector("#amznResults");
$(window).resize(function() {
    if ($(window).width() < 810) {
        ebayEl.classList.add("small-6")
        amznEl.classList.add("small-6")
    }
   else {
    ebayEl.classList.remove("small-6");
    amznEl.classList.remove("small-6");
}
  });