let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/* TODO: convert add book to modal(popup)
        Implement localStorage
        Implement feature to suggest books and autofill data
        add dark mode
        add summary/dashboard feature
 */
const addButton = document.querySelector(".modal");
addButton.addEventListener("click", toggleForm);

function toggleForm(e) {
  const btn = e.target;

  btn.classList.toggle("delete");
  btn.classList.toggle("modal");
  btn.textContent = (btn.textContent === "Close")? "ADD BOOK": "Close";
  
  const menu = document.querySelector(".new-book-form");

  menu.classList.toggle("hidden");
}

function renderBookInLibrary(book) {
  const library = document.querySelector("tbody");
  const bookCard = document.createElement("tr");
  bookCard.className = "book";

  for (const property in book) {
    const prop = document.createElement("td");
    prop.classList.toggle("property");
    let node;

    if (property === "read") {
      node = document.createElement("button");
      node.classList.toggle("button");
      node.setAttribute("id", "book" + myLibrary.length);

      if (book.read === true || book.read === "true") {
        node.textContent = "Read";
        node.classList.toggle("read");
      } else {
        node.textContent = "Not Read";
      }

      node.addEventListener("click", toggleRead);
    } else {
      node = document.createTextNode(book[property]);
    }

    prop.appendChild(node);
    bookCard.appendChild(prop);
  }

  //add delete button
  const prop = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.classList.toggle("delete");
  deleteButton.classList.toggle("button");
  deleteButton.setAttribute("id", "delete" + myLibrary.length);
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", deleteBook);
  prop.appendChild(deleteButton);
  bookCard.appendChild(prop);

  //push book to html
  library.appendChild(bookCard);
}

function deleteBook(e) {
  const deleteButton = e.target;
  const bookCard = deleteButton.parentElement.parentElement;
  let bookIndex = deleteButton.id.slice(-1);

  //remove from array
  myLibrary.splice(bookIndex, 1);

  //remove from HMTL
  bookCard.remove();
}

function toggleRead(e) {
  const readButton = e.target;

  console.log(e.target);

  //the index of the book in myLibrary
  const book = myLibrary[readButton.id.slice(-1)];

  //changing the read state and button text
  console.log(book);
  if (book.read) {
    book.read = false;
    readButton.textContent = "Not Read";
  } else {
    book.read = true;
    readButton.textContent = "Read";
  }
  readButton.classList.toggle("read");

  updateLocalStorage();
}

//adding a new book
function addNewBook(e) {
  let book;

  if (e.constructor.name == "Book") {
    book = e;
  } else {
    book = new Book();

    //prevent reload
    e.preventDefault();

    for (const property in book) {
      const input = document.getElementById(property);

      // input validation
      if (input.value === "") {
        alert("Please fill out all fields.");
        return;
      }
      if (property === "read") {
        book[property] = book.read === "true" ? true : false;
      } else {
        book[property] = input.value;
      }
      input.value = "";
    }
  }
  // adding book to library
  renderBookInLibrary(book);
  myLibrary.push(book);

  //setting library in local storage
  updateLocalStorage();

  //TODO: add input validation
}

function render (arr) {
  arr.forEach((book) => {
    addNewBook(book);
  })
}

function updateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

const formElem = document.querySelector("form");
formElem.addEventListener("submit", addNewBook);

//setting default data
let harryPotter = new Book(
  "Harry Potter and the Sorcerer's Stone",
  "J. K. Rowling",
  223,
  false
);
let LOR = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1137, true);
const DEFAULT_CONTENT = [harryPotter, LOR];

//displaying user data
if (localStorage.getItem("library")) {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  render(myLibrary);
} else {
  render(DEFAULT_CONTENT);
}