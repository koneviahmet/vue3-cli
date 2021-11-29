import store from "../store/index.js";
import roleArr from "../utils/roles";

const can = {
  mounted(el, binding) {
    const value = binding.value;
    const role = store.getters._getCurrentRole || 1;

    if (!roleArr[value]) {
      el.parentNode.removeChild(el);
    } else {
      if (!roleArr[value].includes(role)) {
        el.parentNode.removeChild(el);
      }
    }
  },
};

export default can;
