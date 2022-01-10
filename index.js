let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
  let bookIndex = myLibrary.findIndex( book => book.title === bookCard.firstChild.textContent);

  //remove from array
  myLibrary.splice(bookIndex, 1);
  updateLocalStorage();

  //remove from HMTL
  bookCard.remove();
}

function toggleRead(e) {
  const readButton = e.target;
  const bookCard = e.target.parentElement.parentElement;

  //the book in myLibrary
  const book = myLibrary.find( book => book.title === bookCard.firstChild.textContent);

  //changing the read state and button text
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

  if (e.constructor.name == "Book" || e.constructor.name == "Object") {
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
        book[property] = input.value === "true" ? true : false;
      } else {
        book[property] = input.value;
      }
      input.value = "";
    }
  }
  
  // adding book to library
  if (bookExists(book)) {
    alert("Book exists in Library!");
    return;
  }

  renderBookInLibrary(book);
  myLibrary.push(book);

  //setting library in local storage
  updateLocalStorage();
}

function render (arr) {
  arr.forEach((book) => {
    addNewBook(book);
  })
}

function bookExists(book) {
  return myLibrary.find( element => element.title === book.title) != null;
}

function updateLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

//=================MAIN CODE==================//

// link the submit button
const formElem = document.querySelector("form");
formElem.addEventListener("submit", addNewBook);

//setting default data
let harryPotter = new Book("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", 223, false);
let LOR = new Book("The Lord of the Rings", "J. R. R. Tolkien", 1137, true);
const DEFAULT_CONTENT = [harryPotter, LOR];

//displaying user data
let userData = localStorage.getItem("myLibrary");
if (userData) {
  userData = JSON.parse(userData);
  render(userData);
} else {
   render(DEFAULT_CONTENT);
}

/* TODO: convert add book to modal(popup)
        Implement localStorage
        Implement feature to suggest books and autofill data
        add dark mode
        add summary/dashboard feature
 */
