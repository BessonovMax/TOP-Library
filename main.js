const myLibrary = [];
const libary = document.querySelector(".lib");
const addBookBtn = document.querySelector(".add-book");
const bookFormContainer = document.querySelector(".book-form-container");
const bookForm = document.querySelector(".book-form");
const closeForm = document.querySelector(".close-form");

const testBooks = [
  {
    title: "Harry Potter and Sorcerer's Stone",
    author: "J.K. Rowling",
    pages: 223,
    read: true,
    description:
      "Harry Potter and the Sorcerer's Stone is a fantasy novel written by British author J.K. Rowling. It follows the life of a young wizard, Harry Potter, who discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry. Along with his friends Ron Weasley and Hermione Granger, Harry faces various challenges, including the dark wizard Lord Voldemort, who seeks to regain power. The book explores themes of friendship, bravery, and the battle between good and evil.",
    imgSrc: "./assets/harry_potter_and_sorcerer's_stone.jpg",
  },
  {
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    pages: 423,
    read: false,
    description:
      "In the first part of The Lord of the Rings trilogy, young hobbit Frodo Baggins inherits a powerful ring that must be destroyed to save Middle-earth. Joined by a fellowship of allies, he begins a perilous journey to Mount Doom, facing ancient evils and growing darkness along the way.",
    imgSrc: "./assets/the_fellowship_of_the_ring.jpg",
  },
  {
    title: "Roadside Picnic",
    author: "A. & B. Strugatsky",
    pages: 224,
    read: true,
    description:
      "After a mysterious alien visitation leaves behind dangerous and otherworldly zones, humanity struggles to understand the strange phenomena. Redrick “Red” Schuhart, a stalker who illegally ventures into the Zone to retrieve alien artifacts, risks everything for knowledge, survival, and hope in a world forever changed.",
    imgSrc: "./assets/roadside_picnic.jpg",
  },
  {
    title: "Angels & Demons",
    author: "Dan Brown",
    pages: 768,
    read: true,
    description:
      "When a physicist is murdered and a mysterious symbol is found branded on his chest, symbologist Robert Langdon is drawn into a secret war between science and religion. Racing through the heart of Vatican City, Langdon must stop a deadly plot linked to the ancient brotherhood of the Illuminati.",
    imgSrc: "./assets/angels_and_demons.jpg",
  },
];

addBookBtn.addEventListener("click", () => {
  bookFormContainer.classList.add("open-book-container");
});

closeForm.addEventListener("click", () => {
  bookFormContainer.classList.remove("open-book-container");
});

function displayBook(book) {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.id = book.id;

  const bookImg = document.createElement("img");
  bookImg.src = book.imgSrc;
  bookImg.alt = book.title;

  const aboutBook = document.createElement("div");
  aboutBook.className = "about";

  const titleEl = document.createElement("h2");
  titleEl.className = "title";
  titleEl.innerText = book.title;

  const descriptionEl = document.createElement("div");
  descriptionEl.className = "description";
  descriptionEl.addEventListener("click", () => {
    descriptionEl.classList.toggle("expanded");
  });
  descriptionEl.innerText = book.description;

  const authorEl = document.createElement("div");
  authorEl.className = "author";
  authorEl.innerText = `Author: ${book.author}`;

  const pagesEl = document.createElement("div");
  pagesEl.className = "pages";
  pagesEl.innerText = `Pages: ${book.pages}`;

  const readEl = document.createElement("div");
  readEl.className = "read";

  const readInput = document.createElement("input");
  readInput.type = "checkbox";
  readInput.id = `read-status-${book.id}`;
  readInput.checked = book.read;

  const readLabel = document.createElement("label");
  readLabel.innerText = book.read ? "Read" : "Not Read";
  readLabel.setAttribute("for", `read-status-${book.id}`);

  readInput.addEventListener("click", () => {
    book.read = !book.read;
    readLabel.innerText = book.read ? "Read" : "Not Read";
  });

  const deleteBook = document.createElement("div");
  deleteBook.className = "delete-book";
  deleteBook.innerText = "Delete";
  deleteBook.addEventListener("click", () => {
    libary.removeChild(bookCard);
    myLibrary.splice(
      myLibrary.findIndex((bk) => bk.id === book.id),
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

  console.log(typeof form);

  function clearFields() {
    form.title.value = "";
    form.author.value = "";
    form.pages.value = "";
    form.description.value = "";
    form.cover.files[0] = "";
  }

  if (coverFile) {
    const reader = new FileReader();

    reader.onload = function () {
      const coverSrc = reader.result;
      addBookToTheLibrary(title, author, pages, read, description, coverSrc);
      displayBook(myLibrary[myLibrary.length - 1]);
      bookFormContainer.classList.remove("open-book-container");
    };
    reader.readAsDataURL(coverFile);
    form.reset();
  } else {
    addBookToTheLibrary(title, author, pages, read, description, "#");
    displayBook(myLibrary[myLibrary.length - 1]);
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
  displayBook(book);
});
