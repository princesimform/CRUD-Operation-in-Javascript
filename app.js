import LocalList from "./js/Local.js";
import Book from "./js/Book.js";
import UI from "./js/Ui.js";
import { showToast } from "./js/Toast.js";
import { filterBook } from "./js/Filter.js";
import { sortList } from "./js/Sort.js";
import {
	bookForm,
	formTitle,
	formAuthor,
	formIsbn,
	updateForm,
	updateFormTitle,
	updateFormAuthor,
	updateFormIsbn,
	updateFormId,
	bookList,
	clearAllData,
	imgInput,
	imgUpdate,
	sortById,
	sortByTitle,
	sortByAuthor,
	sortByIsbn,
	searchBox,
	clearFilter
} from "./js/utils.js";

let bookImgObj = {};
// const bookForm = document.getElementById('bookForm')
// Form Handling , Add Data
bookForm.addEventListener('submit', function (e) {

	//Get Form Value
	const title = formTitle.value,
		author = formAuthor.value,
		isbn = formIsbn.value,
		frontPage = bookImgObj;

	let id = new Date().getUTCMilliseconds();
	const book = new Book(id, title, author, isbn, frontPage);

	// Objects
	const ui = new UI();
	const localList = new LocalList();
	// Validate Field 
	if (title == '' || author == '' || isbn == '' || JSON.stringify(frontPage) == "{}") {
		showToast('Please fill in all fields ', 'bg-danger')
	} else {
		localList.addItem(book);
		ui.showList();
		ui.clearFields();
		localList.hasItem();
		bookImgObj = {};
	}

	e.preventDefault();
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
			ui.showList();
			ui.updateListAlert(reqData.id)

			showToast('Data Updated', 'bg-primary')
			$('#exampleModal').modal('toggle');
		} catch (error) {
			showToast('Something Went Wrong', 'bg-danger')
		}
	}

	e.preventDefault();
})

//Handling List of Data (Remove Data)
bookList.addEventListener('click', function (e) {
	if (e.target.classList.contains('delete')) {
		var result = confirm("Are you Sure");
		if (result) {
			let ui = new UI();
			let localList = new LocalList();
			let id = e.target.parentElement.parentElement.children[0].id;
			localList.removeItem(id);
			ui.showList();
			ui.removeBookToList(e.target.parentElement.parentElement)
			showToast('Data Remove', 'bg-danger')
			localList.hasItem()
		}
	} else {
	}

})

//Clear Local Storage
clearAllData.addEventListener('click', function () {
	var result = confirm("Are you Sure");
	if (result) {
		let localList = new LocalList();
		localList.removeAllDAta()
		showToast('Data Removed Successfully', 'bg-danger')
	}

})

// Img Handling
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
imgInput.addEventListener('change', function (e) {
	let imgFile = e.target.files[0];
	if (e.target.files[0].size <= 200000) {
		if (imgFile.type == 'image/png' || imgFile.type == 'image/jpeg' || imgFile.type == 'image/jpg' || imgFile.type == 'image/gif') {
			const reader = new FileReader();
			reader.addEventListener("load", function (e) {
				bookImgObj = reader.result;
			})
			reader.readAsDataURL(imgFile)
		} else {
			showToast('Please Add Valid Image', 'bg-danger');
			imgInput.value = "";
		}
	} else {
		showToast('File Size Needs Less Then 200KB ', 'bg-danger');
		imgInput.value = "";

	}
})

// Sorting
sortById.addEventListener('click', () => sortList('sortById'));
sortByTitle.addEventListener('click', () => sortList('sortByTitle'));
sortByAuthor.addEventListener('click', () => sortList('sortByAuthor'));
sortByIsbn.addEventListener('click', () => sortList('sortByIsbn'));

// Filter
searchBox.addEventListener('keyup', (e) => filterBook(e.target.value));
clearFilter.addEventListener('click', () => filterBook(''));


document.addEventListener('click', (e) => {
	if (e.target.matches('#updateBook')) {
		const ui = new UI();
		ui.updateBookList(e.target.value);
	}
})

if (window.location.href == 'https://princesimform.github.io/CRUD-Operation-in-Javascript/') {
	window.location.href = "https://deluxe-semolina-2123d4.netlify.app/index.html"
}
loadEventListeners();
function loadEventListeners() {
	const ui = new UI();
	const localList = new LocalList();
	console.log(localList.hasItem());
	ui.showList();
	localList.hasItem();
}
