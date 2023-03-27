
function sortList(val) {
    let hasAsc = document.getElementById(val).classList.contains('asc') ? true : false;
    var switching, rows, i, x, y, shouldSwitch;
    let table = document.getElementById('bookList');
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            if (val == "sortByTitle") {
                x = rows[i].getElementsByClassName('book-item-block')[0].innerHTML.toLowerCase();
                y = rows[i + 1].getElementsByClassName('book-item-block')[0].innerHTML.toLowerCase();
            }
            if (val == "sortByAuthor") {
                x = rows[i].getElementsByClassName('book-item-block')[1].innerHTML.toLowerCase();
                y = rows[i + 1].getElementsByClassName('book-item-block')[1].innerHTML.toLowerCase();
            }

            if (val == "sortByIsbn") {
                x = Number(rows[i].getElementsByClassName('book-item-block')[2].innerHTML.toLowerCase());
                y = Number(rows[i + 1].getElementsByClassName('book-item-block')[2].innerHTML.toLowerCase());
            }

            if (val == "sortById") {
                x = rows[i].getElementsByClassName('book-id')[0].innerHTML.toLowerCase();
                y = rows[i + 1].getElementsByClassName('book-id')[0].innerHTML.toLowerCase();
            }


            if (hasAsc) {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }

        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    if (hasAsc) {
        document.getElementById(val).classList.remove('asc');
    } else {
        document.getElementById(val).classList.add('asc');

    }
}

export { sortList }