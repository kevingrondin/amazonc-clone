import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyAztHj09OVAbE63JoDWpUaPsX46afI1N2w",
//   authDomain: "kg-amaz.firebaseapp.com",
//   databaseURL: "https://kg-amaz.firebaseio.com",
//   projectId: "kg-amaz",
//   storageBucket: "kg-amaz.appspot.com",
//   messagingSenderId: "785081309435",
//   appId: "1:785081309435:web:bb1ff639a6f7c2f16fb85e",
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();
const auth = firebase.auth();

async function login(email, password) {
  let user = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      console.log("ERREUR_FIREBASE_CONNECT-USER", err);
      return err;
    });
  return user;
}

async function register(email, password) {
  let user = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      console.log("ERREUR_FIREBASE_CREATE-USER", err);
      return err;
    });
  return user;
}

async function logout() {
  const logout = await firebase
    .auth()
    .signOut()
    .catch((err) => {
      console.log("ERREUR_FIREBASE_DECONNEXION", err);
      return err;
    });
  return logout;
}

export default { auth, register, login, logout };
