
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages,` + (this.read ? " has been read" : " not read yet");
  }
}

//add some test books
let harryPotter = new Book("Harry Potter and the Sorcerer's Stone", "J. K. Rowling", 223, false);

console.log(harryPotter.info());

function addBookToLibrary() {

}