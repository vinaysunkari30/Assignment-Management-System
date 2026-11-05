import { ToastContainer } from "react-toastify";

const Toast = () => (
  <ToastContainer
    position="top-center"
    autoClose={1800}
    closeOnClick
    pauseOnHover
    draggable
    toastStyle={{
      borderRadius: "12px",
      padding: "14px 16px",
      fontSize: "18px",
      fontWeight: "500",
      fontFamily: "Roboto",
    }}
  />
);

export default Toast;
