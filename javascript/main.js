// ----------------------loader---------
let loader = document.querySelector(".loader");
window.addEventListener("load", function () {
  if (!praytimeSection) {
    loader.style.display = "none";
  }
});

// --------------------menu-----------------------
let menu = document.getElementById("menu");
let links = document.querySelector(".links");
menu.onclick = function () {
  if (menu.classList.contains("menu-opened")) {
    menu.classList.remove("menu-opened");
    links.style.display = "none";
  } else {
    menu.classList.add("menu-opened");
    links.style.display = "flex";
  }
};
// --------------------Main Click-----------------------
let mainButt = document.querySelector(".main-button");
let zikr = document.querySelector(".zikr");
let counter = document.querySelector(".counter");
let i = 0;

// ------------------------time ------------------------------------
let today = new Date();
let time = today.getHours();
let title = document.querySelector(".title");
let endMessage = document.querySelector(".end-message");
if (title) {
  console.log(time);
  function titleFunc() {
    if (time >= 3 && time < 15) {
      title.innerHTML = `الآن, أذكار الصباح`;
    } else {
      title.innerHTML = `الآن, أذكار المساء`;
    }
  }
  titleFunc();
  let strokeWidth = 315;
  mainButt.onclick = function () {
    zikrTime.style.display = "none";
    counter.classList.add("color-animation");
    setTimeout(() => {
      counter.classList.remove("color-animation");
    }, 300);
    navigator.vibrate(13);
    if (time >= 0 && time < 15) {
      zikr.innerHTML = morning[i];
      strokeWidth = strokeWidth - 315 / 52;
      if (strokeWidth > 0) {
        circle.setAttribute("stroke-dashoffset", strokeWidth);
      }
      counter.innerHTML = i + 1;
      if (i === 50) {
        endMessage.style.display = "flex";
        return;
      } else {
        i++;
        if (i > 0) {
          mainButt.classList.remove("color-animation-infinite");
        }
      }
    } else {
      zikr.innerHTML = evening[i];
      strokeWidth = strokeWidth - 315 / 58;
      if (strokeWidth > 0) {
        circle.setAttribute("stroke-dashoffset", strokeWidth);
      }
      counter.innerHTML = i + 1;
      if (i === 56) {
        endMessage.style.display = "flex";
        return;
      } else {
        i++;
        if (i > 0) {
          mainButt.classList.remove("color-animation-infinite");
        }
      }
    }
  };
  let exitEndMessage = document.querySelector(".end-message i");
  exitEndMessage.onclick = function () {
    endMessage.style.display = "none";
  };
}
//---------------------------- reset button ---------------------
let reset = document.querySelector(".reset");
if (reset) {
  reset.onclick = function () {
    zikrTime.style.display = "block";
    i = 0;
    mainButt.classList.add("color-animation-infinite");
    zikr.innerHTML = `<p>قال الله تعالى:</p>
    (فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ)
    <span>[البقرة: 152]</span>`;
    counter.innerHTML = i;
    navigator.vibrate(45);
    strokeWidth = 315;
    circle.setAttribute("stroke-dashoffset", strokeWidth);
  };
}
//------------------------------
//----------------------pryerTimes----------------------------------
let praytimeSection = document.querySelector(".prayTimeSection");
if (praytimeSection) {
  let loca = new XMLHttpRequest();
  loca.open(
    "Get",
    `https://ipgeolocation.abstractapi.com/v1/?api_key=f6975a7afec04d88b1c8ea63532309f7`
  );
  loca.send();
  loca.onload = function () {
    jsData = JSON.parse(loca.responseText);
    city = jsData.city;
    document.querySelector(".location .city").innerHTML = city;
    country = jsData.country;
    document.querySelector(".location .country").innerHTML = country;
    let prayer = new XMLHttpRequest();
    prayer.open(
      "Get",
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`
    );
    prayer.send();
    prayer.onload = function () {
      console.log(JSON.parse(prayer.responseText).data.timings);
      document.querySelector(".date .day").innerHTML = JSON.parse(
        prayer.responseText
      ).data.date.hijri.weekday.ar;
      document.querySelector(".date .datenum").innerHTML = JSON.parse(
        prayer.responseText
      ).data.date.gregorian.date;
      let prayTimes = document.querySelectorAll(".prayTimes .prayTime");
      let timesFromServer = [
        JSON.parse(prayer.responseText).data.timings.Fajr,
        JSON.parse(prayer.responseText).data.timings.Sunrise,
        JSON.parse(prayer.responseText).data.timings.Dhuhr,
        JSON.parse(prayer.responseText).data.timings.Asr,
        JSON.parse(prayer.responseText).data.timings.Maghrib,
        JSON.parse(prayer.responseText).data.timings.Isha,
      ];
      for (let i = 0; i < prayTimes.length; i++) {
        prayTimes[i].innerHTML = timesFromServer[i];
      }
      loader.style.display = "none";
      console.log(prayTimes);
    };
  };
}
