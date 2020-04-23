import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCAJQzbS2NNcFNOjc6BGIFOX2iZUw9MEf0",
  authDomain: "crown-db-a2101.firebaseapp.com",
  databaseURL: "https://crown-db-a2101.firebaseio.com",
  projectId: "crown-db-a2101",
  storageBucket: "crown-db-a2101.appspot.com",
  messagingSenderId: "806230468960",
  appId: "1:806230468960:web:2415f956d4da9749ced605",
  measurementId: "G-6JLPYHKQDC",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
