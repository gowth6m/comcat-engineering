import { db } from "./firebase";
import { collection, getDocs, doc } from "firebase/firestore";

const getUsers = async () => {
    // const userDoc = await firestore
    //     .collection("users")
    //     .where("username", "==", username)
    //     .get();

    const snapshot = await getDocs(collection(db, "users"));

    snapshot.docs.forEach(element => {
        console.log(element);
    });

    // return userDoc;
}

export { getUsers };