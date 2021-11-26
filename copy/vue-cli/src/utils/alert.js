import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';


const Alert = {
  showError (message, callback = null) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Hata mesajı!',
        html: message,
        icon: 'error',
        confirmButtonText: 'Tamam'
      })
        .then(value => resolve(value))
        .catch(error => reject(error))
    })
  },
  showInfo (message) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Bilgi mesajı!',
        html: message,
        icon: 'info',
        confirmButtonText: 'Tamam'
      })
        .then(value => resolve(value))
        .catch(error => reject(error))
    })
  },
  showSuccess (message) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Başarı mesajı!',
        html: message,
        icon: 'success',
        confirmButtonText: 'Tamam'
      }).then(value => resolve(value))
        .catch(reason => reject(reason))
    })
  },
  showWarning (message) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Uyarı mesajı!',
        html: message,
        icon: 'warning',
        confirmButtonText: 'Tamam'
      })
        .then(value => resolve(value))
        .catch(error => reject(error))
    })
  },
  showPrompt (message, buttons = null) {
    if (!buttons) {
      buttons = {
        confirmText: 'Evet',
        cancelText: 'Hayır'
      }
    }
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Dikkat!',
        html: message,
        icon: 'warning',
        showCancelButton: true,
        focusCancel: true,
        cancelButtonColor: '#d33',
        confirmButtonText: buttons.confirmText,
        cancelButtonText: buttons.cancelText
      }).then(value => resolve(value))
        .catch(reason => reject(reason))
    })
  },
  showInput (message) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: 'Dikkat!',
        html: message,
        icon: 'warning',
        showCancelButton: true,
        focusConfirm: false,
        input: 'text',
        confirmButtonText: 'Tamam',
        cancelButtonColor: '#d33',
        cancelButtonText: 'İptal'
      })
        .then((value) => {
          resolve(value)
        })
        .catch(reason => {
          reject(reason)
        })
    })
  }
}

export default Alert
