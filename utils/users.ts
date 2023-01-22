import { db } from "./firebase";
import { collection, getDocs, doc } from "firebase/firestore";

const getUsers = async () => {
    const users = await getDocs(collection(db, "users"));

    users.docs.map((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
}

const getProducts = async () => {
    const products = await getDocs(collection(db, "products"));

    products.docs.map((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
}

export { getUsers, getProducts };