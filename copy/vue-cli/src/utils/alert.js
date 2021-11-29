import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Alert = {
  showError(message, callback = null) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Error Messages!",
        html: message,
        icon: "error",
        confirmButtonText: "OK",
      })
        .then((value) => resolve(value))
        .catch((error) => reject(error));
    });
  },
  showInfo(message) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Info Messages!",
        html: message,
        icon: "info",
        confirmButtonText: "OK",
      })
        .then((value) => resolve(value))
        .catch((error) => reject(error));
    });
  },
  showSuccess(message) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Success!",
        html: message,
        icon: "success",
        confirmButtonText: "OK",
      })
        .then((value) => resolve(value))
        .catch((reason) => reject(reason));
    });
  },
  showWarning(message) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Warning!",
        html: message,
        icon: "warning",
        confirmButtonText: "OK",
      })
        .then((value) => resolve(value))
        .catch((error) => reject(error));
    });
  },
  showPrompt(message, buttons = null) {
    if (!buttons) {
      buttons = {
        confirmText: "Yes",
        cancelText: "No",
      };
    }
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Note!",
        html: message,
        icon: "warning",
        showCancelButton: true,
        focusCancel: true,
        cancelButtonColor: "#d33",
        confirmButtonText: buttons.confirmText,
        cancelButtonText: buttons.cancelText,
      })
        .then((value) => resolve(value))
        .catch((reason) => reject(reason));
    });
  },
  showInput(message) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: "Note!",
        html: message,
        icon: "warning",
        showCancelButton: true,
        focusConfirm: false,
        input: "text",
        confirmButtonText: "Ok",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel",
      })
        .then((value) => {
          resolve(value);
        })
        .catch((reason) => {
          reject(reason);
        });
    });
  },
};

export default Alert;
