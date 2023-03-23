export default class LocalList {
	checkLocal() {
		if (JSON.stringify(sessionStorage.getItem('list')) === JSON.stringify(localStorage.getItem('list'))) {
			document.getElementById('storeLocal').style.display = 'none';
			return true;
		} else {
			document.getElementById('storeLocal').style.display = 'block';
			return false;
		}
	}

	addItem() {
		localStorage.setItem('list', sessionStorage.getItem('list'));
		document.getElementById('storeLocal').style.display = 'none';
	}
}