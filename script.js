//Run Onload
import LocalList from "./js/Local.js";
import UI from "./js/Ui.js";
loadEventListeners();
function loadEventListeners() {
	const ui = new UI();
	const localList = new LocalList();
	ui.showList();
    localList.hasItem();
}
