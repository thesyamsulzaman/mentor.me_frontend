// Date UI
(function () {
  let content = getDatesBetween("2020/01/01", "2021/01/01");
  document.getElementById("calendar").innerHTML = content;

  function getDatesBetween(dateOne, dateTwo) {
    let rangeOne = new Date(dateOne);
    let rangeTwo = new Date(dateTwo);

    dateOne = settingDate(dateOne, 31);
    dateTwo = settingDate(dateTwo, 31);
    let temp;
    let dates = [];

    while (dateOne <= dateTwo) {
      if (dateOne.getDate() !== 31) {
        temp = settingDate(dateOne, 0);
        if (temp >= rangeOne && temp <= rangeTwo) dates.push(temp);
        dateOne = settingDate(dateOne, 31);
      } else {
        temp = new Date(dateOne);
        if (temp >= rangeOne && temp <= rangeTwo) dates.push(temp);
        dateOne.setMonth(dateOne.getMonth() + 1);
      }
    }

    let content;

    let weekDays = [
      { shortDay: "Mon", fullDay: "Monday" },
      { shortDay: "Tue", fullDay: "Tuesday" },
      { shortDay: "Wed", fullDay: "Wednesday" },
      { shortDay: "Thu", fullDay: "Thursday" },
      { shortDay: "Fri", fullDay: "Friday" },
      { shortDay: "Sat", fullDay: "Saturday" },
      { shortDay: "Sun", fullDay: "Sunday" }
    ];

    let firstDate, lastDate;
    for (let i = 0; i < dates.length; i++) {
      lastDate = dates[i];
      firstDate = new Date(dates[i].getFullYear(), dates[i].getMonth(), 1);
      content += `<div id="calendarTable_${i + 1}" class="">`;
      content += `<h2>${
        firstDate.toString().split(" ")[1]
      } - ${firstDate.getFullYear()}</h2>`;
      content += `<table class="mr-8 text-center">`;
      content += `<thead>`;
      weekDays.map(item => {
        content += `<th class="px-3 py-2 bg-space-black text-white"> ${item.fullDay} </th>`;
      });
      content += `</thead>`;

      content += `<tbody>`;
      let j = 1;
      let displayNum, idMonth;
      while (j <= lastDate.getDate()) {
        content += `<tr>`;
        for (let k = 0; k < 7; k++) {
          displayNum = j < 10 ? "0" + j : j;
          if (j == 1) {
            if (firstDate.toString().split(" ")[0] == weekDays[k].shortDay) {
              content += `<td class="py-2 border border-gray-300"> ${displayNum} </td>`;
              j++;
            } else {
              content += `<td class="py-2 border border-gray-300"></td>`;
            }
          } else if (j > lastDate.getDate()) {
            content += `<td class="py-2 border border-gray-300"></td>`;
          } else {
            content += `<td class="py-2 border border-gray-300"> ${displayNum} </td>`;
            j++;
          }
        }
        content += `</tr>`;
      }
      content += `</tbody>`;

      content += `</table>`;
      content += `</div>`;
    }

    console.log(content);
    return content;

  }

  let calendarShow = 1;

  function nextSlide() {
    let tables = document.querySelectorAll(".calendarDiv");
    document.querySelector(".prevButton").disabled = false;
    calendarShow++;
    if (calendarShow <= tables.length) {
      for (let i = 0; i < tables.length; i++) {
        tables[i].style.display = "none";
      }
      document.getElementById(`calendarTable_${calendarShow}`).style.display =
        "block";
      if (calendarShow == tables.length) {
        document.querySelector(".nextButton").disabled = true;
      }
    }
  }

  function prevSlide() {
    let tables = document.querySelectorAll(".calendarDiv");
    document.querySelector(".nextButton").disabled = false;
    calendarShow--;
    if (calendarShow >= 1) {
      for (let i = 0; i < tables.length; i++) {
        tables[i].style.display = "none";
      }
      document.getElementById(`calendarTable_${calendarShow}`).style.display =
        "block";
      if (calendarShow == 1) {
        document.querySelector(".prevButton").disabled = true;
      }
    }
  }

  function settingDate(date, day) {
    date = new Date(date);
    date.setDate(day);
    date.setHours(23);

    return date;
  }
})();

// Tabs Switching functionality
(function () {
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

// Lazy load images
(function () {
  const images = document.querySelectorAll("img");
  const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px -500px 0px"
  };
  const imgObserver = new IntersectionObserver((entries, imageObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        preloadImage(entry.target);
        imgObserver.unobserve(entry.target);
      }
    });
  }, imgOptions);

  images.forEach(image => {
    imgObserver.observe(image);
  });

  function preloadImage(img) {
    const src = img.getAttribute("img");
    if (!src) {
      return;
    }
    img.src = src;
  }
})();

// Menu Dropdown Toggle
(function () {
  const hamburger = document.querySelector("#hamburger");
  const menu = document.querySelector("#menu");
  hamburger.addEventListener("click", function (e) {
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  });
})();

// Carousel Slider
(function () {
  const slider = document.querySelector(".category-cards");
  let isDown = false;
  let startX;
  let scrollLeft;
  slider ? slider.classList.add("active") : null;
  if (!(slider == null)) {
    slider.addEventListener("mousedown", e => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", e => {
      if (!isDown) return; // stop the fn from running
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    });
  }
})();
