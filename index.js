
let myLibrary = [];

const library = document.querySelector("#library");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  /* this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages,` + (this.read ? " has been read" : " not read yet");
  } */
}


function addBookToLibrary (book) {
  const bookCard = document.createElement("tr");
  bookCard.className = "book";

  for (const property in book) {
    const prop = document.createElement("td");
    prop.classList.toggle("property");
    let node;

    if (property === "read") {
      node = document.createElement("button");
      node.setAttribute("id", "book" + myLibrary.length);
      node.textContent = ((book.read === 'true') ? "Read": "Not read");
      node.addEventListener('click', toggleRead);
    } else {
      node = document.createTextNode(book[property]);
    }

    prop.appendChild(node);
    bookCard.appendChild(prop);
    
  }

  //add delete button
  const prop = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.classList.toggle("delete-button");
  deleteButton.setAttribute("id", "delete" + myLibrary.length);
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener('click', deleteBook);
  prop.appendChild(deleteButton);
  bookCard.appendChild(prop);
  
  //push book to html
  library.appendChild(bookCard);

  //add book to library array
  myLibrary.push(book);
  
   
}

function deleteBook (e) {
  const deleteButton = e.target;
  const bookCard = deleteButton.parentElement.parentElement;
  let bookIndex = deleteButton.id.slice(-1);

  //remove from array
  myLibrary.splice(bookIndex, 1);

  //remove from HMTL
  bookCard.remove();
}

function toggleRead (e) {
  const readButton = e.target;

  //the index of the book in myLibrary
  const book = myLibrary[readButton.id.slice(-1)];

  //changing the read state and button text
  if (book.read) {
    book.read = false;
    readButton.textContent = "Not Read";
  } else {
    book.read = true;
    readButton.textContent = "Read";
  }
}

//adding a new book
function addNewBook (e) {
  //prevent reload
  e.preventDefault();

  // parsing inputs and setting fields back to empty
  let book = new Book;

  for (const property in book) {
    const input = document.getElementById(property);
    if (property === "read") {
      book[property] = (book.read === "true"? true: false);
    } else {
      book[property] = input.value;
    }
    input.value = ""
  }
  console.log(book);  

  // adding book to library
  addBookToLibrary(book);

  //TODO: add input validation
  
  
} 

const formElem = document.querySelector('form');
formElem.addEventListener('submit', addNewBook);

//add some test books
let harryPotter = new Book("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", 223, false);

addBookToLibrary(harryPotter);