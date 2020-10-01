import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from "@/pages/firebaseConfig";
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()