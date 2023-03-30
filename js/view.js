import LocalList from "./Local.js";
import UI from "./Ui.js";
import { showToast } from "./Toast.js";
let bookImgObj = {};
import {
  imgUpdate,
  booktitleTag,
  bookauthorNameTag,
  bookisbnNoTag,
  imgInput,
  updateBook,
  deleteBook,
  updateForm,
  updateFormTitle,
  updateFormAuthor,
  updateFormIsbn,
  updateFormId
} from "./utils.js";

function Onload() {
  const localList = new LocalList();
  const url = window.location.search
  const urlParams = new URLSearchParams(url);
  const bookId = urlParams.get('id')
  let BookData = [];
  try {
    BookData = localList.getItem(bookId);
  } catch (error) {
    window.location.href = "/index.html"
  }

  booktitleTag.innerHTML = BookData.title
  bookauthorNameTag.innerHTML = BookData.author
  bookisbnNoTag.innerHTML = BookData.isbn
  imgInput.src = BookData.frontPage
  imgInput.style.backgroundImage = `url('${BookData.frontPage}')`
  updateBook.value = BookData.id
  deleteBook.value = BookData.id

}

Onload();

updateBook.addEventListener('click', (e) => {
  const ui = new UI();
  ui.updateBookList(e.target.value);
})


// Update Form
updateForm.addEventListener('submit', function (e) {
  const title = updateFormTitle.value,
    author = updateFormAuthor.value,
    isbn = updateFormIsbn.value,
    id = updateFormId.value;
  let frontPage = {};

  let localList = new LocalList();
  const ui = new UI();

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

deleteBook.addEventListener('click', (e) => {
  var result = confirm("Are you Sure");
  if (result) {
    const id = e.target.value;
    let localList = new LocalList();
    try {
      localList.removeItem(id);
      window.location.href = '/index.html';
    } catch (error) {
      showToast('Something Went Wrong', 'bg-danger')
    }
  }

})