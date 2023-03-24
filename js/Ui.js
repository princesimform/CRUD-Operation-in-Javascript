import LocalList from "./Local.js";
export default class UI {
    constructor() {
        this.gobalIndex = 1;
    }

    addBookToList(book) {
        const row = document.createElement('tr');
        row.className = 'book-item'
        row.innerHTML = `
    <td class="book-id book-item-block" id="${book.id}">${this.gobalIndex}</td>
    <td class="book-item-block">${book.title}</td>
    <td class="book-item-block">${book.author}</td>
    <td class="book-item-block">${book.isbn}</td>
    <td><a type="button" id="visitImg" class="btn btn-secondary"  href="/view.html?id=${book.id}" >Visit</a></td>
    <td><button type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"  id="updateBook" value="${book.id}" >Edit</button> <button type="button"   class="btn btn-danger delete">Delete</button></td>`;
        this.gobalIndex++;
        return row;
    }

    updateBookList(bookID) {
        const localList = new LocalList();
        let res = localList.getItem(bookID);
        document.getElementById('update-title').value = res.title;
        document.getElementById('update-author').value = res.author;
        document.getElementById('update-isbn').value = res.isbn;
        document.getElementById('update-id').value = res.id;
    }

    showList() {
        this.gobalIndex = 1;
        const listData = JSON.parse(localStorage.getItem('list'));
        const list = document.getElementById('bookList');
        list.innerHTML = '';
        if (listData !== null) {
            listData.forEach((item, inx) => {
                let row = this.addBookToList(item);
                list.appendChild(row)
            });
        }
    }

    clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
        document.getElementById('bookImg').value = "";
    }

    removeBookToList(book) {
        book.remove();
    }


}