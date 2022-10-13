import db from "./firebase.js";

//Creating a new Tweet
const postForm = document.querySelectorAll(".post-sender .post-form");
const postCont = document.querySelector(".posts-container");

function btnsEffects() {
  //Change the post header button icon color when hover it
  const postHeaderBtn = document.querySelectorAll(".post .post-header button");
  const btnSvgPath = document.querySelectorAll(
    ".post .post-header button svg path"
  );

  postHeaderBtn.forEach((btn, i) => {
    btn.addEventListener("mouseover", () => {
      btnSvgPath[i].style.fill = "rgb(29, 161, 242)";
    });
  });

  postHeaderBtn.forEach((btn, i) => {
    btn.addEventListener("mouseout", () => {
      btnSvgPath[i].style.fill = "#5b7083";
    });
  });

  //effects on the post-btns
  const postBtns = document.querySelectorAll(".feed .post-btns button");

  postBtns.forEach((btn) => {
    const btnImgBox = btn.children[0];
    const btnSvgPath = btn.children[0].children[0].children[0];
    const btnSvgPath1 = btn.children[0].children[0].children[1];
    const btnSpan = btn.children[1];

    btn.addEventListener("mouseover", () => {
      if (btn.className == "comment-btn") {
        btnImgBox.style.backgroundColor = "rgba(29, 161, 242, 0.1)";
        btnSvgPath.style.fill = "rgb(29, 161, 242)";
        btnSpan.style.color = "rgb(29, 161, 242)";
      } else if (btn.className == "retweet-btn") {
        btnImgBox.style.backgroundColor = "rgba(23, 191, 99, 0.1)";
        btnSvgPath.style.fill = "rgb(23, 191, 99)";
        btnSpan.style.color = "rgb(23, 191, 99)";
      } else if (btn.className == "like-btn") {
        btnImgBox.style.backgroundColor = "rgba(224, 36, 94, 0.1)";
        btnSvgPath.style.fill = "rgb(224, 36, 94)";
        btnSpan.style.color = "rgb(224, 36, 94)";
      } else 
      if (btn.className == "send-btn") {
        btnImgBox.style.backgroundColor = "rgba(29, 161, 242, 0.1)";
        btnSvgPath.style.fill = "rgb(29, 161, 242)";
        btnSvgPath1.style.fill = "rgb(29, 161, 242)";
      }
    });

    btn.addEventListener("mouseout", () => {
      btnImgBox.style.backgroundColor = "";
      btnSvgPath.style.fill = "#5b7083";

      if (btn.className != "send-btn") {
        btnSpan.style.color = "#5b7083";
      } else if (btn.className == "send-btn") {
        btnSvgPath1.style.fill = "#5b7083";
      }
    });
  });
}
btnsEffects();

function createPost(content, time) {
  //creating the post
  let newPost = document.createElement("div");
  newPost.setAttribute("class", "post");
  newPost.innerHTML = `
  <div class="profile-img">
    <img
      src="https://cdn.discordapp.com/avatars/491136031135891468/19168c6b238d367fa7d797e302ceeea0.webp?size=128"
      alt="profile image"
    />
  </div>
  <div class="post-middle">
    <div class="post-header">
      <h2>Kak Awall</h2>
      <span class="username">@AwalMulanya</span>
      <div class="dropdown">
                  <button >
                    <svg onclick="dropDownFunction()" class="dropbtn" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="#5b7083"
                        d="M16.5 10.25c-.965 0-1.75.787-1.75 1.75s.784 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.786-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.966 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75 1.75-.786 1.75-1.75-.784-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75zm-4.5-2.5c-.965 0-1.75.787-1.75 1.75s.785 1.75 1.75 1.75c.964 0 1.75-.786 1.75-1.75s-.787-1.75-1.75-1.75zm0 2.5c-.414 0-.75-.336-.75-.75 0-.413.337-.75.75-.75s.75.336.75.75c0 .413-.336.75-.75.75z"
                      ></path>
                    </svg>
                  </button>
                  <div id="myDropdown" class="dropdown-content">
                    <a href="#edit">Edit</a>
                    <a href="#delete" id="dropdown-delete">Delete</a>
                  </div>
                </div>
    </div>
    <div class="post-content">
      ${content}
    </div>
    <div class="post-btns">
      
    <button class="send-btn">
      <div class="img-container">
        <svg viewBox="0 0 24 24">
          <path
            d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"
          ></path>
          <path
            d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"
          ></path>
        </svg>
      </div>
    </button>
  </div>
</div>`;
  postCont.appendChild(newPost);

  const popupCont = document.querySelector(".popup-container");
  const feedSec = document.querySelector(".feed");
  feedSec.style.display = "";

  btnsEffects();
}

postForm.forEach((form, index) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const twitterInp = document.querySelectorAll(
      ".post-sender .post-form textarea"
    );

    //get the twitter content
    const textArr = twitterInp[index].value.split(/\n/);
    let postText = "";
    for (let i = 0; i < textArr.length; i++) {
      postText += `<p>${textArr[i]}</p>`;
    }

    //get the time of the tweet
    let postId;
    function genTime() {
      const date = new Date();
      postId = `${date.getFullYear()}_${
        date.getMonth() + 1
      }_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
    }
    genTime();
    db.collection("posts").doc(postId).set({ id: postId, content: postText });

    popupCont.style.display = "none";
    form.reset();
  });
});

db.collection("posts").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type == "added") {
      const content = change.doc.data().content;
      const postId = change.doc.data().id;
      let idSplited = postId.split("_");

      const date = new Date();
      let nowTime = `${date.getFullYear()}_${
        date.getMonth() + 1
      }_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
      let nowTimeArr = nowTime.split("_");

      //transform the array elements into numbers
      for (let i = 0; i < idSplited.length; i++) {
        idSplited.splice(i, 1, Number(idSplited[i]));
        nowTimeArr.splice(i, 1, Number(nowTimeArr[i]));
      }

      const months = {
        1: "jan",
        2: "feb",
        3: "mar",
        4: "apr",
        5: "may",
        6: "jun",
        7: "jul",
        8: "aug",
        9: "sep",
        10: "oct",
        11: "nov",
        12: "dec",
      };

      let time;
      if (nowTimeArr[0] == idSplited[0]) {
        if (nowTimeArr[1] == idSplited[1]) {
          if (nowTimeArr[2] == idSplited[2]) {
            if (nowTimeArr[3] == idSplited[3]) {
              if (nowTimeArr[4] == idSplited[4]) {
                time = `${nowTimeArr[5] - idSplited[5]}s`;
              } else {
                time = `${nowTimeArr[4] - idSplited[4]}m`;
              }
            } else if (
              nowTimeArr[3] - idSplited[3] == 1 &&
              nowTimeArr[4] - idSplited[4] < 0
            ) {
              time = `${60 - idSplited[4] + nowTimeArr[4]}`;
            } else {
              time = `${nowTimeArr[3] - idSplited[3]}h`;
            }
          } else if (
            nowTimeArr[2] - idSplited[2] == 1 &&
            nowTimeArr[3] - idSplited[3] < 0
          ) {
            time = `${24 - idSplited[3] + nowTimeArr[3]}h`;
          } else {
            time = `${nowTimeArr[2] - idSplited[2]}d`;
          }
        } else {
          time = `${months[nowTimeArr[1]]} ${nowTimeArr[2]}`;
        }
      } else {
        time = `${nowTimeArr[0]} ${months[nowTimeArr[1]]} ${nowTimeArr[2]}`;
      }
      createPost(content, time);
    }
  });
});
