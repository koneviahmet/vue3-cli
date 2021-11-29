import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({ duration: 2500, dismissible: true });

const notyfSuccess = (text) => {
  notyf.success(text);
};

const notyfError = (text) => {
  notyf.error(text);
};

export default notyf;
export { notyfSuccess, notyfError };
