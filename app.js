import LocalList from "./js/Local.js";
import Book from "./js/Book.js";
import UI from "./js/Ui.js";
import { showToast } from "./js/Toast.js";
import { filterBook } from "./js/Filter.js";
import { sortList } from "./js/Sort.js";
let bookImgObj = {};

// Form Handling , Add Data
document.getElementById('book-form').addEventListener('submit', function (e) {

	//Get Form Value
	const title = document.getElementById('title').value,
		author = document.getElementById('author').value,
		isbn = document.getElementById('isbn').value,
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
		console.log()
		localList.hasItem()
	}

	e.preventDefault();
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

	if (JSON.stringify(bookImgObj) == "{}") {
		frontPage = localList.getItem(id)
	} else {
		frontPage = bookImgObj;
	}
	let oldData = localList.getItem(id);
	if (oldData.author == author && oldData.isbn == isbn && oldData.title == title) {
		showToast('Please Update Data', 'bg-danger');
	} else {
		let reqData = { id: parseInt(id), title: title, author: author, isbn: isbn, frontPage: frontPage }
		try {
			localList.updateItem(reqData);
			ui.showList();
			showToast('Data Updated', 'bg-primary')
			$('#exampleModal').modal('toggle');
		} catch (error) {
			showToast('Something Went Wrong', 'bg-danger')
		}
	}

	e.preventDefault();
})

//Handling List of Data (Remove Data)
document.getElementById('bookList').addEventListener('click', function (e) {
	if (e.target.classList.contains('delete')) {
		let ui = new UI();
		let localList = new LocalList();
		let id = e.target.parentElement.parentElement.children[0].id;
		localList.removeItem(id);
		ui.showList();
		ui.removeBookToList(e.target.parentElement.parentElement)
		showToast('Data Remove', 'bg-danger')
		localList.hasItem()

	}
})

//Handling Local Storage
document.getElementById('clearAllData').addEventListener('click', function () {
	let localList = new LocalList();
	localList.removeAllDAta()
	showToast('Data Removed Successfully', 'bg-danger')
})



// Img Handling
let imgInput = document.getElementById('bookImg');
let imgUpdate = document.getElementById('updateBookImg');

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
	console.log(imgFile);
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
document.getElementById('sortById').addEventListener('click', () => sortList('id'));
document.getElementById('sortByTitle').addEventListener('click', () => sortList('title'));
document.getElementById('sortByAuthor').addEventListener('click', () => sortList('author'));
document.getElementById('sortByIsbn').addEventListener('click', () => sortList('isbn'));

// Filter
document.getElementById('searchBox').addEventListener('keyup', (e) => filterBook(e.target.value));
document.getElementById('clearFilter').addEventListener('click', () => filterBook(''));

document.addEventListener('click', (e) => {
	if (e.target.matches('#visitImg')) {
		const ui = new UI();
		ui.viewImg(e.target.value);
	}
	if (e.target.matches('#updateBook')) {
		const ui = new UI();
		ui.updateBookList(e.target.value);
	}

})

if(window.location.href == 'https://princesimform.github.io/CRUD-Operation-in-Javascript/'){
	window.location.href = "https://deluxe-semolina-2123d4.netlify.app/index.html"
}

