import LocalList from "./Local.js";
import { updateFormTitle, updateFormAuthor, updateFormIsbn, updateFormId, bookList, formTitle, formAuthor, formIsbn, imgInput } from "./utils.js";
export default class UI {
    constructor() {
        this.gobalIndex = 1;
    }

    addBookToList(book) {
        const row = document.createElement('tr');
        row.className = 'book-item'
        row.innerHTML = `
    <td class="book-id filter-block" id="${book.id}">${this.gobalIndex}</td>
    <td class="book-item-block filter-block">${book.title}</td>
    <td class="book-item-block filter-block author">${book.author}</td>
    <td class="book-item-block filter-block isbn">${book.isbn}</td>
    <td><a type="button" id="visitImg" class="btn btn-secondary"  href="/view.html?id=${book.id}" >Visit</a></td>
    <td><button type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"  id="updateBook" value="${book.id}" >Edit</button> <button type="button"   class="btn btn-danger delete">Delete</button></td>`;
        this.gobalIndex++;
        return row;
    }

    updateBookList(bookID) {
        const localList = new LocalList();
        let res = localList.getItem(bookID);
        updateFormTitle.value = res.title;
        updateFormAuthor.value = res.author;
        updateFormIsbn.value = res.isbn;
        updateFormId.value = res.id;
    }

    showList() {
        this.gobalIndex = 1;
        const listData = JSON.parse(localStorage.getItem('list'));
        const list = bookList;
        list.innerHTML = '';
        if (listData !== null) {
            listData.forEach((item, inx) => {
                let row = this.addBookToList(item);
                bookList.appendChild(row)
            });
        }
    }

    updateListAlert(id) {
        let list = bookList.getElementsByTagName('tr');
        for (let i = 0; i < list.length; i++) {
            const trElement = list[i]
            const tdElement = list[i].getElementsByTagName('td');
            const tdElementId = tdElement[0].id;
            if (tdElementId == id) {
                console.log(tdElementId);
                trElement.classList.add('bg-success');
                trElement.classList.add('bg-opacity-25')
                setTimeout(() => {
                    trElement.classList.remove('bg-success')
                    trElement.classList.remove('bg-opacity-25')
                }, 2000);
            }
        }
    }

    clearFields() {
        formTitle.value = "";
        formAuthor.value = "";
        formIsbn.value = "";
        imgInput.value = "";
    }

    removeBookToList(book) {
        book.remove();
    }


}