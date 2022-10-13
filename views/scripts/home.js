//this makes the nav-link hover effect
const navLink = document.querySelectorAll(".left-sidebar .nav-link");
navLink.forEach((e) =>
  e.addEventListener("mouseover", () => {
    e.setAttribute("class", "nav-link active");
  })
);
navLink.forEach((e) =>
  e.addEventListener("mouseout", () => {
    const navLinkH1 = e.children[1];
    if (navLinkH1.innerHTML != "Home") {
      e.setAttribute("class", "nav-link");
    }
  })
);

//this resize the textarea
const twitterInp = document.querySelectorAll(
  ".post-sender .post-form textarea"
);

twitterInp.forEach((e, i) => {
  e.addEventListener("input", () => {
    if ((i = 0)) {
      if (e.scrollHeight > 52) {
        e.style.height = e.scrollHeight + "px";
      }

      //this if statement sets the correct height when the text is erased it
      if (e.scrollHeight % 26 != 0) {
        for (let i = 2; i < 10; i++) {
          if (e.scrollHeight < 26 * i && e.scrollHeight > 26 * (i - 1)) {
            e.style.height = 26 * (i - 1) + "px";
          }
        }
      }
    } else if ((i = 1)) {
      if (e.scrollHeight > 156) {
        e.style.height = e.scrollHeight + "px";
      }

      //this if statement sets the correct height when the text is erased it
      if (e.scrollHeight % 26 != 0) {
        for (let i = 6; i < 30; i++) {
          if (e.scrollHeight < 26 * i && e.scrollHeight > 26 * (i - 1)) {
            e.style.height = 26 * (i - 1) + "px";
          }
        }
      }
    }
  });
});

//twitter popup
const popupBtn = document.querySelectorAll(".tweet-btn");
const popupCont = document.querySelector(".popup-container");
const closePopup = document.querySelectorAll(".popup-header .esc-btn");
const feedSec = document.querySelector(".feed");

popupBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    popupCont.style.display = "flex";
    if (i = 0) {
      feedSec.style.display = "none";
    }
  });
});

closePopup.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (i == 0) {
      const messagePopup = document.querySelector(".message-popup");
      const tweetPopup = document.querySelector(".tweet-popup");
      messagePopup.style.display = "none";
      tweetPopup.style.display = "initial";
    }

    popupCont.style.display = "none";
    feedSec.style.display = "";
  });
});

// Dropdown function
function dropDownFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
