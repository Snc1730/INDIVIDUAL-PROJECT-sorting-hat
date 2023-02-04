// created array for firstYear students
const firstYear = [
  {
    id: 1,
    name: "Harry",
    house: "Gryffindor",
  },
  {
    id: 2,
    name: "Snape",
    house: "Slytherin",
  },
  {
    id: 3,
    name: "Luna",
    house: "Ravenclaw",
  },
  {
    id: 4,
    name: "Newton",
    house: "Hufflepuff",
  }
];

// created array for darkArmy
const darkArmyArray = [
  {
    id: 1,
    name: "He Who Shall Not Be Named",
    house: "Dark Army",
  },
];

// created renderToDom function
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);

  selectedDiv.innerHTML = htmlToRender;
};

// created student cards, then rendered them to the dom
const cardsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card border-secondary mb-3" style="width: 18rem;">
    <img src=${student.imageUrl} class="card-img-top">
    <div class="card-body">
     <h5 class="card-title">${student.name}</h5>
     <p class="card-text">${student.house}</p>
     <button class="btn btn-danger" id="delete--${student.id}">Delete</button>
     <button class="btn btn-danger" id="expel--${student.id}">Expel</button>
    </div>
  </div>`;
  }
  renderToDom("#app", domString);
};

// created expelled student cards, then rendered them to the dom
const expelledCardsOnDom = (array) => {
  let domString = "";
  for (const student of array) {
    domString += `<div class="card border-secondary mb-3" style="width: 18rem;">
    <img src=${student.imageUrl} class="card-img-top">
    <div class="card-body">
     <h5 class="card-title">${student.name}</h5>
     <p class="card-text">${student.house}</p>
     <button class="btn btn-danger" id="delete--${student.id}">Delete</button>
    </div>
  </div>`;
  }
  renderToDom("#app2", domString);
};

// created variable for my summon form button
const sumFormBtn = document.querySelector("#sumForm");

// created variable to hold my form HTML
const formHtml = `<form>
    <div class="form-floating mb-3">
      <input
      type="text"
      class="form-control"
      id="name"
      placeholder="Name"
      required />
      <label for="floatingInput">Name</label>
    </div>
    <button type="submit" class="btn btn-success" id="form-sort">
      Sort!
    </button>
</form>`;

// created event listener to render my form HTML to the dom when button is clicked
sumFormBtn.addEventListener("click", () => {
  let sortString = `<div id=sortText>Type in your name and click the sort button to discover your house!</div>`;
  renderToDom("#app", formHtml);
  renderToDom("#app2", sortString);
});

// created variables for my app divs
const app = document.querySelector("#app");
const app2 = document.querySelector("#app2");

// created delete button for cards
app.addEventListener("click", (e) => {
  if (e.target.id.includes("delete")) {
    const [, id] = e.target.id.split("--");
    const index = firstYear.findIndex((taco) => taco.id === Number(id));
    firstYear.splice(index, 1);
    cardsOnDom(firstYear);
    expelledCardsOnDom(darkArmyArray);
  }
});

app2.addEventListener("click", (e) => {
  if (e.target.id.includes("delete")) {
    const [, id] = e.target.id.split("--");
    const index = darkArmyArray.findIndex((taco) => taco.id === Number(id));
    darkArmyArray.splice(index, 1);
    cardsOnDom(firstYear);
    expelledCardsOnDom(darkArmyArray);
  }
});

// created expel button for cards
app.addEventListener("click", (e) => {
  if (e.target.id.includes("expel")) {
    const [, id] = e.target.id.split("--");
    const index = firstYear.findIndex((taco) => taco.id === Number(id));
    const expelledStudent = {
      id: darkArmyArray.length + 1,
      name: firstYear[index].name,
      house: "Dark Army",
    };
    firstYear.splice(index, 1);
    darkArmyArray.push(expelledStudent);
    cardsOnDom(firstYear);
    expelledCardsOnDom(darkArmyArray);
  }
});

// created event listener to run script after form is added to dom via clicking the button
sumFormBtn.addEventListener("click", () => {
  const houseArray = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
  const form = document.querySelector("form");

  // created event listener to prevent submission of empty form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // created event listener that runs script to sort new student into house via random number generator upon submission
  form.addEventListener("submit", () => {
    let x = Math.floor(Math.random() * 4);
    const newStudentObj = {
      id: firstYear.length + 1,
      name: document.querySelector("#name").value,
      house: houseArray[x],
    };
    firstYear.push(newStudentObj);
    cardsOnDom(firstYear);
    expelledCardsOnDom(darkArmyArray);
  });
});

// created filter for buttons
const filter = (array, houseString) => {
  const houseFilterArray = [];

  for (const wiz of array) {
    if (wiz.house === houseString) {
      houseFilterArray.push(wiz);
    }
  }

  return houseFilterArray;
}

// created variables for filter buttons
const showAllButton = document.querySelector("#all");
const showGryfButton = document.querySelector("#gryff");
const showRavButton = document.querySelector("#rav");
const showHuffButton = document.querySelector("#huff");
const showSlyButton = document.querySelector("#sly");
const showExpelledButton = document.querySelector("#exp");

// Created filter buttons
showAllButton.addEventListener("click", () => {
  cardsOnDom(firstYear);
  expelledCardsOnDom(darkArmyArray);
});

showGryfButton.addEventListener("click", () => {
  const gryfStudent = filter(firstYear, "Gryffindor");
  let gryfString = `<div id=gryfText>Gryffindor values courage, bravery, nerve, and chivalry. Gryffindor's mascot is the lion, and its colours are scarlet red and gold (maroon and gold on the ties and scarves). During the books, the Head of this house is the Transfiguration Professor and Deputy Headmistress, Minerva McGonagall until she becomes headmistress, and the house ghost is Sir Nicholas de Mimsy-Porpington, more commonly known as Nearly Headless Nick. According to Rowling, Gryffindor corresponds roughly to the element of fire. The founder of the house is Godric Gryffindor.</div>`
  cardsOnDom(gryfStudent);
  renderToDom("#app2", gryfString);
});

showRavButton.addEventListener("click", () => {
  const ravStudent = filter(firstYear, "Ravenclaw");
  let ravString =  `<div id=ravText>Ravenclaw values intelligence, learning, wisdom and wit. The house mascot is an eagle and the house colours are blue and bronze (blue and silver in the Harry Potter and Fantastic Beasts films and on the ties and scarves). During the books, the head of this house is the Charms teacher, Professor Filius Flitwick, and the house ghost is the Grey Lady. According to Rowling, Ravenclaw corresponds roughly to the element of air. The founder of this house is Rowena Ravenclaw.</div>`
  cardsOnDom(ravStudent);
  renderToDom("#app2", ravString);
});

showHuffButton.addEventListener("click", () => {
  const huffStudent = filter(firstYear, "Hufflepuff");
  let huffString = `<div id=huffText>Hufflepuff values hard work, patience, justice, and loyalty. The house mascot is the badger, and canary yellow and black (or golden yellow and graphite in the Fantastic Beasts films) are its colours. During the books, the Head of this house is the Herbology Professor Pomona Sprout, and the house ghost is the Fat Friar. According to Rowling, Hufflepuff corresponds roughly to the element of earth. The founder of this house is Helga Hufflepuff.</div>`
  cardsOnDom(huffStudent);
  renderToDom("#app2", huffString);
});

showSlyButton.addEventListener("click", () => {
  const slyStudent = filter(firstYear, "Slytherin");
  let slyString = `<div id=slyText>Slytherin values ambition, cunning, leadership, and resourcefulness; the Sorting Hat said in Harry Potter and the Philosopher's Stone that Slytherins will do anything to get their way. The house mascot of Slytherin is the serpent, and the house colours are green and silver. Throughout the series, until the seventh book, the Head of House is Professor Severus Snape. Then, the previous Head of House Professor Horace Slughorn comes out of retirement, re-assuming authority after Snape becomes headmaster. The ghost of Slytherin house is Bloody Baron. According to Rowling, Slytherin corresponds roughly to the element of water. The founder of this house is Salazar Slytherin.</div>`
  cardsOnDom(slyStudent);
  renderToDom("#app2", slyString);
});

showExpelledButton.addEventListener("click", () => {
  const expStudent = filter(darkArmyArray, "Dark Army");
  let expString = `<div id=expText>The Army of Voldemort is the representation of the strength of the dark wizard's power to command, they serve to fulfill his desires. The Death Eaters was the name given to the most ardent followers of Lord Voldemort. The group primarily consisted of wizards and witches who were radical pure-blood supremacists who practiced the Dark Arts with reckless abandon, malevolence and without regard to or fear of wizarding law.</div>`
  expelledCardsOnDom(expStudent);
  renderToDom("#app", expString);
})

// created startapp function that passes both arrays through respective cardsOnDom function
const startApp = () => {
  cardsOnDom(firstYear);
  expelledCardsOnDom(darkArmyArray);
};

startApp();
