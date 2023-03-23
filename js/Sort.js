
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
                x = rows[i].getElementsByClassName('book-item-block')[0].innerHTML.toLowerCase();
                y = rows[i + 1].getElementsByClassName('book-item-block')[0].innerHTML.toLowerCase();
            }
            if (val == "author") {
                x = rows[i].getElementsByClassName('book-item-block')[1].innerHTML.toLowerCase();
                y = rows[i + 1].getElementsByClassName('book-item-block')[1].innerHTML.toLowerCase();
            }

            if (val == "isbn") {
                x = Number(rows[i].getElementsByClassName('book-item-block')[2].innerHTML.toLowerCase());
                y = Number(rows[i + 1].getElementsByClassName('book-item-block')[2].innerHTML.toLowerCase());
                console.log(x);
                console.log(y);
            }

            if (val == "id") {
                x = rows[i].getElementsByClassName('book-id')[0].innerHTML.toLowerCase();
                y = rows[i + 1].getElementsByClassName('book-id')[0].innerHTML.toLowerCase();
            }
            if (x > y) {
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