import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCrDgkhr3somvm4CgO2W7WB6jF-ATIM_cw",
    authDomain: "conepc-769bf.firebaseapp.com",
    projectId: "conepc-769bf",
    storageBucket: "conepc-769bf.appspot.com",
    messagingSenderId: "708788959179",
    appId: "1:708788959179:web:384e9c35d1a1b12111a84e"
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default Firebase;
