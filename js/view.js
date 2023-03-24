import LocalList from "./Local.js";
import UI from "./Ui.js";
import { showToast } from "./Toast.js";
let bookImgObj = {};
const imgUpdate = document.getElementById('updateBookImg');
const titleTag = document.getElementById('title');
const authorNameTag = document.getElementById('authorName');
const isbnNoTag = document.getElementById('isbnNo');
const bookImgTag = document.getElementById('bookImg');
const editBtn = document.getElementById('edit');
const DeleteBtn = document.getElementById('delete');

function Onload() {
    const localList = new LocalList();
    const url = window.location.search
    const urlParams = new URLSearchParams(url);
    const bookId = urlParams.get('id')
    let BookData = localList.getItem(bookId);
    console.log(BookData);

    titleTag.innerHTML = BookData.title
    authorNameTag.innerHTML = BookData.author
    isbnNoTag.innerHTML = BookData.isbn
    bookImgTag.src = BookData.frontPage
    editBtn.value = BookData.id
    DeleteBtn.value = BookData.id

}

Onload();

document.getElementById('edit').addEventListener('click', (e) => {
    const ui = new UI();
    ui.updateBookList(e.target.value);
})


// Update Form
document.getElementById('update-form').addEventListener('submit', function (e) {
    const title = document.getElementById('update-title').value,
        author = document.getElementById('update-author').value,
        isbn = document.getElementById('update-isbn').value,
        id = document.getElementById('update-id').value;
    let frontPage = {};

    let localList = new LocalList();
    const ui = new UI();

    console.log(frontPage);
    let oldData = localList.getItem(id);
    if (oldData.author == author && oldData.isbn == isbn && oldData.title == title && JSON.stringify(bookImgObj) == '{}') {
        showToast('Please Update Data', 'bg-danger');
    } else {

        if (JSON.stringify(bookImgObj) == "{}") {
            frontPage = localStorage.getItem(id)
        } else {
            frontPage = bookImgObj;
        }

        let reqData = { id: parseInt(id), title: title, author: author, isbn: isbn, frontPage: frontPage }
        try {
            localList.updateItem(reqData);
            showToast('Data Updated', 'bg-primary');
            Onload();
            $('#exampleModal').modal('toggle');
        } catch (error) {
            console.log(error);
            showToast('Something Went Wrong', 'bg-danger')
        }
    }

    e.preventDefault();
})


imgUpdate.addEventListener('change', function (e) {
    let imgFile = e.target.files[0];

    if (imgFile.type == 'image/png' || imgFile.type == 'image/jpeg' || imgFile.type == 'image/jpg' || imgFile.type == 'image/gif') {
        const reader = new FileReader();
        reader.addEventListener("load", function (e) {
            bookImgObj = reader.result;
        })
        reader.readAsDataURL(imgFile)
    } else {
        showToast('Please Add Valid Image', 'bg-danger');
        imgUpdate.value = "";
    }
})

document.getElementById('delete').addEventListener('click', (e) => {
    const id = e.target.value;
    console.log();
    let localList = new LocalList();
    try {
        localList.removeItem(id);
        window.location.href = '/index.html';
    } catch (error) {
        console.log(error);
        showToast('Something Went Wrong', 'bg-danger')
    }
})