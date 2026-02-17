import { toast, Bounce } from "react-toastify";

export const showToast = (message, type) => {
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };
  if (type === 0) {
    toast.error(message, options);
  } else if (type === 1) {
    toast.success(message, options);
  } else {
    toast.info(message, options);
  }
};
