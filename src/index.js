let addToy = false;

document.addEventListener("DOMContentLoaded", (e) => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



fetch("http://localhost:3000/toys").then((resp) => resp.json()).then((toyArray) => renderToys(toyArray));

function renderToys(toyArray){
  const divforToys = document.querySelector("#toy-collection");
  // console.log(divforToys);
  toyArray.forEach((toyObj) => {
    // console.log("hi")
    const div = document.createElement("div");
    div.className = "card"

    const h2 = document.createElement("h2");
    h2.textContent = toyObj.name;
    
    // const imgUrl = toyObj.image;
    const img = document.createElement("img");
    img.className = "toy-avatar";
    img.src = toyObj.image;

    const p = document.createElement("p");
    let currLikes = toyObj.likes;
    p.textContent = toyObj.likes + " " + "Likes";

    const btn = document.createElement("button");
    btn.className = "like-btn";
    btn.id = toyObj.id;
    btn.textContent = "Like ❤️";

    btn.addEventListener("click", ()  => increaseLikes());


    const increaseLikes = () => {
      currLikes++
      p.textContent = `${currLikes} Likes` 
    };

    div.append(h2, img, p, btn);
    divforToys.append(div);

  })
}


const form = document.querySelector(".add-toy-form");
// console.log(form);

form.addEventListener("submit", (e) => handleNewToy(e))

function handleNewToy(e){
  e.preventDefault();
  console.log(e.target);
  const newToyObject = {
    id: 9,
    name: e.target.name.value ,
    image: e.target.image.value,
    likes: 0,
  };
  renderToys([newToyObject]);

  fetch("http://localhost:3000/toys" , {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept : "application/json",
    },
    body: JSON.stringify(newToyObject)
})
}




// function renderNewToys(e){
//   console.log(e);
//   // const newToyObject = {
//   //   name:   ,
//   //   image:    ,
//   // }
// }