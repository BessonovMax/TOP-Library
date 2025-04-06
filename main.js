const myLibrary = [];
const bookCard = document.createElement("div");

bookCard.classList.add("book-card");

function Book(title, author, pages, read) {
  if (!new.target) {
    console.log('You must use the "new" operator to call the constructor');
  }
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.read = read),
    (this.id = crypto.randomUUID()),
    (this.info = () => {
      return [this.title, this.author, this.pages, this.read];
    });
}

Book.prototype.review = function () {
  return `${this.title} - хуйня собачья`;
};

function addBookToTheLibrary(title, author, pages, read) {
  if (!title) {
    throw new Error("you should specify the title");
  }
  if (!author) {
    throw new Error("you should specify the author");
  }
  if (!pages) {
    throw new Error("you should specify the pages");
  }
  if (!read) {
    throw new Error("you should specify if you read it");
  }
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}
