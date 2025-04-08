import { testBooks } from "./testbooks.js";
import { displayBook } from "./displayBook.js";
const myLibrary = [];
const library = document.querySelector(".lib");
const addBookBtn = document.querySelector(".add-book");
const bookFormContainer = document.querySelector(".book-form-container");
const bookForm = document.querySelector(".book-form");
const closeForm = document.querySelector(".close-form");

addBookBtn.addEventListener("click", () => {
  bookFormContainer.classList.add("open-book-container");
});

closeForm.addEventListener("click", () => {
  bookFormContainer.classList.remove("open-book-container");
});

function Book(title, author, pages, read, description, imgSrc) {
  if (!new.target) {
    throw new Error('You must use the "new" operator to call the constructor');
  }
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read),
    (this.imgSrc = imgSrc),
    (this.description = description),
    (this.id = crypto.randomUUID());
}

function addBookToTheLibrary(title, author, pages, read, description, imgSrc) {
  if (!title) {
    throw new Error("you should specify the title");
  }
  if (!author) {
    throw new Error("you should specify the author");
  }
  if (!pages) {
    throw new Error("you should specify the pages");
  }
  if (!description) {
    throw new Error("you should specify the description");
  }
  const newBook = new Book(title, author, pages, read, description, imgSrc);
  myLibrary.push(newBook);
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value;
  const author = form.author.value;
  const pages = form.pages.value;
  const description = form.description.value;
  let read = null;
  form.readStatus.value === "read" ? (read = true) : (read = false);
  const coverFile = form.cover.files[0];

  if (coverFile) {
    const reader = new FileReader();

    reader.onload = function () {
      const coverSrc = reader.result;
      addBookToTheLibrary(title, author, pages, read, description, coverSrc);
      displayBook(myLibrary[myLibrary.length - 1], library);
      bookFormContainer.classList.remove("open-book-container");
    };
    reader.readAsDataURL(coverFile);
    form.reset();
  } else {
    addBookToTheLibrary(title, author, pages, read, description, "#");
    displayBook(myLibrary[myLibrary.length - 1], library);
    form.reset();
    bookFormContainer.classList.remove("open-book-container");
  }
});

//adding testbooks to the library
testBooks.forEach((book) => {
  addBookToTheLibrary(
    book.title,
    book.author,
    book.pages,
    book.read,
    book.description,
    book.imgSrc
  );
});

//initial display of a library
myLibrary.forEach((book) => {
  displayBook(book, library);
});
