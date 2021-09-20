// Book class

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

// UI class
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title} </td>
        <td>${book.author} </td>
        <td>${book.pages} </td>
        

        <td> <a href="#" class="delete">X</a> </td>`;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      // delete whole row, first parent: td, second parent row
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
  }

  static toggleForm() {
    const form = document.getElementById("form-div");
    form.classList.toggle("hidden");
  }
  static addedMessage() {
    const message = document.querySelector(".added-message");
    message.classList.toggle("hidden");
    setTimeout(() => {
      message.classList.toggle("hidden");
    }, 2000);
  }

  static removedMessage() {
    const message = document.querySelector(".removed-message");
    message.classList.toggle("hidden");

    setTimeout(() => {
      message.classList.toggle("hidden");
    }, 2000);
  }
}

// Event display book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// event show & remove form to add a book
document.querySelector(".button").addEventListener("click", UI.toggleForm);
document.querySelector("#submit").addEventListener("click", UI.toggleForm);

// Event add a book
document.getElementById("book-form").addEventListener("submit", (e) => {
  // prevent default submit action
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;

  // validate
  if (title == "") {
    alert("Please fill in a title");
  } else {
    const book = new Book(title, author, pages);

    // add book to UI
    UI.addBookToList(book);

    // add book to store
    Store.addBook(book);

    UI.addedMessage();
    // clear form after submit
    UI.clearFields();
  }
});

// store class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
      // turn into string
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    }, UI.removedMessage());
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// event remove a book
document.getElementById("book-list").addEventListener("click", (e) => {
  //reove from UI
  UI.deleteBook(e.target);

  // remove from store
  Store.removeBook(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent
  );
});
