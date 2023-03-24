import { searchBox } from "./utils.js";
function filterBook(val) {
    const text = val.toLowerCase();
    document.querySelectorAll('.book-item').forEach((book) => {
        let bookBlock = book.querySelectorAll('.filter-block');
        for (let index = 0; index < bookBlock.length; index++) {
            if (bookBlock[index].innerHTML.indexOf(text) != -1) {
                book.style.display = "";
                break;
            } else {
                book.style.display = "none";
            }
        }
    })
    if (text == "") {
        searchBox.value = "";
    }
}

export { filterBook } 