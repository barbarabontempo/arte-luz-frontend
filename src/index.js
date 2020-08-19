BASE_URL = "http://localhost:3000/posts";
const postsOl = document.querySelector(".all-posts");
const newPostForm = document.querySelector("#new-post-form");
const loginForm = document.querySelector("#login-form");
const navbarDiv = document.querySelector(".container");
const postsArray = [];

// -----------------LOGIN FORM--------------------
loginForm.addEventListener("submit", handleLoginForm);

function handleLoginForm(evt) {
  evt.preventDefault();
  let username = evt.target.username.value;
  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      usernameFromFrontEnd: username,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      if (response.id) {
        showUserInfo(response);
      } else {
        console.log(response);
      }
    });
}



// ------------ WHAT TO DO WITH USER RESPONSE ------------
let showUserInfo = (user) => {
  makeNewPostLi(user);
  newPostForm.user_id.value = user.id
  user.posts.forEach(singlePost => {
    mainPagePostToHtml(singlePost)
  });
//make the id of the user be equal to the hidden value 
//create new post is submitted we have that id
//new post form.input.value = user.id 

};
// ------------ APPEND AFTER LOGIN ------------

function makeNewPostLi() {
  navbarDiv.innerHTML = "";
  let newPostLi = document.createElement("button");
  newPostLi.className = "item1";
  newPostLi.id = "make-post-button";
  newPostLi.innerText = "Make a New Post";

  let paintingsLi = document.createElement("li")
  paintingsLi.innerText = "Paintings"

  let drawingsLi = document.createElement("li")
  drawingsLi.innerText = "Drawings"

  let photographyLi = document.createElement("li")
  photographyLi.innerText = "Photography"

  let randomLi = document.createElement("li")
  randomLi.innerText = "Random"

  let logOutButton = document.createElement("button");
  logOutButton.className = "btn btn-danger";
  logOutButton.innerText = "Logout";

  navbarDiv.append(paintingsLi, drawingsLi, photographyLi, randomLi, newPostLi, logOutButton);

  const modal = document.querySelector("#modal");
  newPostLi.addEventListener("click", () => {
    modal.style.display = "block";
  });
  // Hide the form
  modal.addEventListener("click", (e) => {
    if (e.target.dataset.action === "close") {
      modal.style.display = "none";
    }
  });
  logOutButton.addEventListener("click", (evt) => {
    logOut();
  });

}

let logOut = () => {
  makeNewPostLi();
  postsOl.innerHTML=""
};


// function posts() {
//   fetch(BASE_URL)
//     .then((r) => r.json())
//     .then((postsArr) => {
//       postsArr.forEach((postObj) => {
//         mainPagePostToHtml(postObj);
//         // postsArray.push(postObj)
//       });
//     });
// }
// posts();

function mainPagePostToHtml(postObj) {
  let postLi = document.createElement("li");
  postLi.className = "post-item";

  let postPicture = document.createElement("img");
  postPicture.className = "images";
  postPicture.src = postObj.image;

  let titleh3 = document.createElement("h4");
  titleh3.className = "h4-titles";
  titleh3.innerText = postObj.title;

  let detailDiv = document.createElement("div");
  detailDiv.className = "detail-div";
  let userNameSpan = document.createElement("span");
  userNameSpan.className = "username-spans";
  userNameSpan.innerText = postObj.user_name;

  let likesSpan = document.createElement("span");
  likesSpan.className = "likes-span";
  likesSpan.innerText = `❤️ ${postObj.likes.length}`;

  detailDiv.append(userNameSpan, likesSpan);
  postLi.append(postPicture, titleh3, detailDiv);
  postsOl.append(postLi);
}

//------------- NEW POST FORM -------------------
let createNewPostForm = (evt) => {
    evt.preventDefault()

    const userInput = {
      title: evt.target.title.value,
      image: evt.target.image.value,
      description: evt.target.description.value,
      category: evt.target.category.value,
      user_id: evt.target.user_id.value
    }

    console.log(userInput)
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
      .then(r => r.json())
      .then((newPost) => {
        mainPagePostToHtml(newPost)
        newPostForm.reset()
      })
  }
  newPostForm.addEventListener("submit", createNewPostForm)
