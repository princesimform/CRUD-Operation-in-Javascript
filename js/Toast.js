import { toastBody, toastBox } from "./utils.js";
function showToast(data, classes) {
	toastBody.innerText = data;
	toastBox.classList.add(classes);
	if (toastBox.classList.contains('bg-primary') && classes == "bg-danger") {
		toastBox.classList.remove('bg-primary');
	} else if (toastBox.classList.contains('bg-danger') && classes == "bg-primary") {
		toastBox.classList.remove('bg-danger');
	}
	var toastElList = [].slice.call(document.querySelectorAll('.toast-add'))
	var toastList = toastElList.map(function (toastEl) {
		return new bootstrap.Toast(toastEl)
	})
	toastList.forEach(toast => toast.show())
}

export { showToast }