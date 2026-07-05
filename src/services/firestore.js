import {
    doc,
    setDoc,
    getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const saveUserData = async (
    uid,
    data
) => {

    await setDoc(
        doc(db, "users", uid),
        data,
        {
            merge: true,
        }
    );

};

export const getUserData = async (
    uid
) => {

    const snapshot =
        await getDoc(doc(db, "users", uid));

    if (snapshot.exists()) {

        return snapshot.data();

    }

    return null;

};