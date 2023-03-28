import { showToast } from "./Toast.js";
import { clearAllData , noDataImg} from "./utils.js";
import UI from "./Ui.js";
export default class LocalList {
    hasItem() {
        let data = localStorage.getItem('list');
        if (data != '[]') {
            noDataImg.style.display = "none";
            clearAllData.style.display = '';
            return true
        } else {
            noDataImg.style.display = "block";
            clearAllData.style.display = 'none';
            return false
        }
    }

    addItem(reqData) {
        let listData = [];
        if (localStorage.getItem('list') === null || localStorage.getItem('list') == "null") {
            listData = [];
        } else {
            listData = JSON.parse(localStorage.getItem('list'));
        }
        // Store Data
        try {
            localStorage.setItem(reqData.id, reqData.frontPage);
            reqData.frontPage = "";
            listData.push(reqData);
            localStorage.setItem('list', JSON.stringify(listData));
            showToast("Data Added Successfully ", "bg-primary");

        } catch (error) {
            showToast('Something Went Wrong', 'bg-danger')
            this.removeItem(reqData.id);
        }
    }

    getItem(id) {
        let data = []
        let listData = JSON.parse(localStorage.getItem('list'));
        listData.forEach((item, inx) => {
            if (id == item.id) {
                data = listData.splice(inx, 1);
            }
        });
        data[0].frontPage = localStorage.getItem(id);
        return data[0];
    }

    updateItem(reqData) {
        let listData = JSON.parse(localStorage.getItem('list'));
        listData.forEach((item, inx) => {
            if (reqData.id == item.id) {
                listData[inx] = reqData;
            }
        });
        localStorage.setItem('list', JSON.stringify(listData));
        localStorage.setItem(reqData.id, reqData.frontPage)
    }

    removeItem(id) {
        let listData = [];
        if (localStorage.getItem('list') === null) {
            listData = []
        } else {
            listData = JSON.parse(localStorage.getItem('list'));
        }
        listData.forEach((item, inx) => {
            if (id == item.id) {
                listData.splice(inx, 1);
            }
        });

        localStorage.setItem('list', JSON.stringify(listData));
        localStorage.removeItem(id);
    }

    removeAllDAta() {
        let blankData = []
        localStorage.setItem('list', JSON.stringify(blankData));
        const ui = new UI();
        ui.showList();
    }
}