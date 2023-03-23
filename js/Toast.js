function showToast(data, classes) {
	document.getElementById('toastBody').innerText = data;
	document.getElementById('toastBox').classList.add(classes);
	if (document.getElementById('toastBox').classList.contains('bg-primary') && classes == "bg-danger") {
		document.getElementById('toastBox').classList.remove('bg-primary');
	} else if (document.getElementById('toastBox').classList.contains('bg-danger') && classes == "bg-primary") {
		document.getElementById('toastBox').classList.remove('bg-danger');
	}
	var toastElList = [].slice.call(document.querySelectorAll('.toast-add'))
	var toastList = toastElList.map(function (toastEl) {
		return new bootstrap.Toast(toastEl)
	})
	toastList.forEach(toast => toast.show())
}

export {showToast}