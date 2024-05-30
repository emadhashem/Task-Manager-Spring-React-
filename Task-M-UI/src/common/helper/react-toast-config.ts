import {ToastOptions} from "react-toastify";
import {Bounce} from "react-toastify";
type ToastType = 'info' | 'success' | 'warning' | 'error'

export default function (toastType: ToastType) {
    const options: ToastOptions = {
        type: toastType,
        autoClose: 2500,
        position: "top-right",
        theme: "light",
        transition: Bounce,
        progress: undefined,
    }
    return options
}