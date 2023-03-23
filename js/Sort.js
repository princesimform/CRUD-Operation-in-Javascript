
function sortList(val) {

    const sortBy = val;
    var switching, rows, i, x, y, shouldSwitch;
    let table = document.getElementById('bookList');
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            if (val == "title") {
                x = rows[i].getElementsByClassName('book-item-block')[0];
                y = rows[i + 1].getElementsByClassName('book-item-block')[0];
            }
            if (val == "author") {
                x = rows[i].getElementsByClassName('book-item-block')[1];
                y = rows[i + 1].getElementsByClassName('book-item-block')[1];
            }

            if (val == "isbn") {
                x = rows[i].getElementsByClassName('book-item-block')[2];
                y = rows[i + 1].getElementsByClassName('book-item-block')[2];
            }

            if (val == "id") {
                x = rows[i].getElementsByClassName('book-id')[0];
                y = rows[i + 1].getElementsByClassName('book-id')[0];
            }
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
export { sortList }