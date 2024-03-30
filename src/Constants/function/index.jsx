import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../Firebase/config"


export const number = (num) => {
    if (String(num).length === 1) {
        return `000${num}`
    }
    if (String(num).length === 2) {
        return `00${num}`
    }
    if (String(num).length === 3) {
        return `0${num}`
    }
    else return num
}

export const time = (date) => {
    const day = `${formatDate(date.toDate().getDate())}.${formatDate(date.toDate().getMonth() + 1)}.${formatDate(date.toDate().getFullYear())}, ${formatDate(date.toDate().getHours())} : ${formatDate(date.toDate().getMinutes())}`
    return day
}

export const deleteOrder = async (id) => {
    if (window.confirm("Do you want to cancel the order?")) {

        await deleteDoc(doc(db, "orders", id))
    }

}

export const deleteProduct = async (id) => {
    if (window.confirm("Do you want to cancel the product?")) {

        await deleteDoc(doc(db, "products", id))
    }

}

export const formatDate = (n) => {
    return n < 10 ? '0' + n : n
}
export const toSent = async (todo) => {
    await updateDoc(doc(db, "orders", todo.id), {
      sent: !todo.sent,
    });
  };