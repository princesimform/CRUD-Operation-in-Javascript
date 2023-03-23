import { showToast } from "./Toast.js";
export default class SessionList {
    addItem(reqData) {
        let listData = [];
        if (sessionStorage.getItem('list') === null || sessionStorage.getItem('list') == "null") {
            listData = [];
        } else {
            listData = JSON.parse(sessionStorage.getItem('list'));
        }
        // Store Data
        listData.push(reqData);
        try {
            sessionStorage.setItem('list', JSON.stringify(listData));
            sessionStorage.setItem(reqData.id, reqData.frontPage);
            showToast("Data Added Successfully ", "bg-primary");

        } catch (error) {
            showToast('Something Went Wrong', 'bg-danger')
            this.removeItem(reqData.id);
        }
    }
    removeItem(id) {
        let listData = [];
        if (sessionStorage.getItem('list') === null) {
            listData = []
        } else {
            listData = JSON.parse(sessionStorage.getItem('list'));
        }
        listData.forEach((item, inx) => {
            if (id == item.id) {
                listData.splice(inx, 1);
            }
        });

        sessionStorage.setItem('list', JSON.stringify(listData));
        sessionStorage.removeItem(id);
    }
    updateItem(reqData) {
        let listData = JSON.parse(sessionStorage.getItem('list'));
        listData.forEach((item, inx) => {
            if (reqData.id == item.id) {
                listData[inx] = reqData;
            }
        });
        sessionStorage.setItem('list', JSON.stringify(listData));
        sessionStorage.setItem(reqData.id, reqData.frontPage)
    }
    getItem(id) {
        let data = []
        let listData = JSON.parse(sessionStorage.getItem('list'));
        listData.forEach((item, inx) => {
            if (id == item.id) {
                data = listData.splice(inx, 1);
            }
        });
        data[0].frontPage = sessionStorage.getItem(id);
        return data[0];
    }
}
