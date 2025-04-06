const myLibrary = [];
const libary = document.querySelector(".lib");

function displayBook(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.setAttribute("id", book.id);

  const bookImg = document.createElement("img");
  bookImg.setAttribute("src", book.imgSrc);
  bookImg.setAttribute("alt", book.title);

  const aboutBook = document.createElement("div");
  aboutBook.classList.add("about");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("title");
  titleEl.innerText = book.title;

  const descriptionEl = document.createElement("div");
  descriptionEl.classList.add("description");
  descriptionEl.addEventListener("click", () => {
    descriptionEl.classList.toggle("expanded");
  });
  descriptionEl.innerText = book.description;

  const authorEl = document.createElement("div");
  authorEl.classList.add("author");
  authorEl.innerText = `Author: ${book.author}`;

  const pagesEl = document.createElement("div");
  pagesEl.classList.add("pages");
  pagesEl.innerText = `Pages: ${book.pages}`;

  const readEl = document.createElement("div");
  readEl.classList.add("read");
  const readInput = document.createElement("input");
  readInput.type = "checkbox";
  readInput.id = "read-status";
  const readLabel = document.createElement("label");
  readLabel.innerText = book.read ? "Read" : "Not Read";
  readLabel.setAttribute("for", "read-status");
  readInput.addEventListener("click", () => {
    book.read = !book.read;
    readLabel.innerText = book.read ? "Read" : "Not Read";
  });

  const deleteBook = document.createElement("div");
  deleteBook.classList.add("delete-book");
  deleteBook.innerText = "Delete";
  deleteBook.addEventListener("click", () => {
    libary.removeChild(bookCard);
    myLibrary.splice(
      myLibrary.findIndex((book) => book.id === id),
      1
    );
  });

  readEl.appendChild(readInput);
  readEl.appendChild(readLabel);
  aboutBook.appendChild(descriptionEl);
  aboutBook.appendChild(authorEl);
  aboutBook.appendChild(pagesEl);
  aboutBook.appendChild(readEl);

  bookCard.appendChild(bookImg);
  bookCard.appendChild(titleEl);
  bookCard.appendChild(aboutBook);
  bookCard.appendChild(deleteBook);

  libary.appendChild(bookCard);
}

function Book(title, author, pages, read, description, imgSrc) {
  if (!new.target) {
    console.log('You must use the "new" operator to call the constructor');
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
  if (!imgSrc) {
    throw new Error("you should specify the image source");
  }
  const newBook = new Book(title, author, pages, read, description, imgSrc);
  myLibrary.push(newBook);
}

for (let i = 0; i < 10; i++) {
  addBookToTheLibrary(
    "Harry Potter and Sorcerer's Stone",
    "J.K. Rowling",
    223,
    false,
    "Harry Potter and the Sorcerer's Stone is a fantasy novel written by British author J.K. Rowling. It follows the life of a young wizard, Harry Potter, who discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry. Along with his friends Ron Weasley and Hermione Granger, Harry faces various challenges, including the dark wizard Lord Voldemort, who seeks to regain power. The book explores themes of friendship, bravery, and the battle between good and evil.",
    "./assets/harry_potter_and_sorcerer's_stone.jpg"
  );
}

myLibrary.forEach((book) => {
  displayBook(book);
});
