export function displayBook(book, library, myLibrary) {
  function createElement(tag, className, parent, id, text, src, alt, type) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (parent) parent.appendChild(element);
    if (id) element.id = id;
    if (text) element.innerText = text;
    if (src) element.src = src;
    if (alt) element.alt = alt;
    if (type) element.type = type;

    return element;
  }
  const bookCard = createElement("div", "book-card", library, book.id);

  const bookImg = createElement(
    "img",
    null,
    bookCard,
    null,
    null,
    book.imgSrc,
    book.title
  );

  const aboutBook = createElement("div", "about", bookCard);

  const titleEl = createElement("h2", "title", bookCard, null, book.title);

  const descriptionEl = createElement(
    "div",
    "description",
    aboutBook,
    null,
    book.description
  );
  descriptionEl.addEventListener("click", () => {
    descriptionEl.classList.toggle("expanded");
  });

  const authorEl = createElement(
    "div",
    "author",
    aboutBook,
    null,
    `Author: ${book.author}`
  );

  const pagesEl = createElement(
    "div",
    "pages",
    aboutBook,
    null,
    `Pages: ${book.pages}`
  );

  const readEl = createElement("div", "read", aboutBook);

  const readInput = createElement(
    "input",
    null,
    readEl,
    `read-status-${book.id}`,
    null,
    null,
    null,
    "checkbox"
  );
  readInput.checked = book.read;

  const readLabel = createElement(
    "label",
    null,
    readEl,
    null,
    book.read ? "Read" : "Not Read"
  );
  readLabel.setAttribute("for", `read-status-${book.id}`);

  readInput.addEventListener("click", () => {
    book.read = !book.read;
    readLabel.innerText = book.read ? "Read" : "Not Read";
  });

  const deleteBook = createElement(
    "div",
    "delete-book",
    bookCard,
    null,
    "Delete"
  );
  deleteBook.addEventListener("click", () => {
    library.removeChild(bookCard);
    myLibrary.splice(
      myLibrary.findIndex((bk) => bk.id === book.id),
      1
    );
  });
}
