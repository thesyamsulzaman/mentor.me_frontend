(function () {
  // Add an event listener for document click
  document.addEventListener("click", tabClick);

  function tabClick(event) {
    let element = event.target,
      elementHref = element.getAttribute("href"),
      tabs = document.querySelectorAll(".card-tabs li .card-tab"),
      tabContents = document.querySelectorAll(".card-contents .card-content");

    if (elementHref != null && elementHref.indexOf("tab-") != -1) {
      event.preventDefault();

      if (element.className.indexOf("block")) {
        for (var i = 0; i < tabs.length; i++) {
          tabs[i].classList.remove("active");
          tabContents[i].classList.remove("block");
        }

        element.classList.add("active");
        document.getElementById(elementHref).classList.add("block");
      }
    }
  }
})();
