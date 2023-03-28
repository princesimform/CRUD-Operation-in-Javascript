const bookForm = document.getElementById('bookForm')
const formTitle = document.getElementById('title')
const formAuthor = document.getElementById('author')
const formIsbn = document.getElementById('isbn')
const updateForm = document.getElementById('updateForm')
const updateFormTitle = document.getElementById('update-title')
const updateFormAuthor = document.getElementById('update-author')
const updateFormIsbn = document.getElementById('update-isbn')
const updateFormId = document.getElementById('update-id')
const bookList = document.getElementById('bookList')
const clearAllData = document.getElementById('clearAllData')
const imgInput = document.getElementById('bookImg');
const imgUpdate = document.getElementById('updateBookImg');
const sortById = document.getElementById('sortById')
const sortByTitle = document.getElementById('sortByTitle')
const sortByAuthor = document.getElementById('sortByAuthor')
const sortByIsbn = document.getElementById('sortByIsbn')
const searchBox = document.getElementById('searchBox')
const clearFilter = document.getElementById('clearFilter')
const booktitleTag = document.getElementById('Booktitle')
const bookauthorNameTag = document.getElementById('BookauthorName')
const bookisbnNoTag = document.getElementById('BookisbnNo');
const updateBook = document.getElementById('updateBook');
const deleteBook = document.getElementById('deleteBook');
const toastBody = document.getElementById('toastBody');
const toastBox = document.getElementById('toastBox');
const noDataImg = document.getElementById('noDataImg');
export {
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
    clearFilter,
    booktitleTag,
    bookauthorNameTag,
    bookisbnNoTag,
    updateBook,
    deleteBook,
    toastBody,
    toastBox,
    noDataImg
}