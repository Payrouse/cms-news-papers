import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBprJjvb0hoVKNdz_6FHdafs_r3QyUBdZs',
  authDomain: 'el-planeta-96973.firebaseapp.com',
  projectId: 'el-planeta-96973',
  storageBucket: 'el-planeta-96973.appspot.com',
  messagingSenderId: '400933796088',
  appId: '1:400933796088:web:eae45225cbe55df05f230d',
  measurementId: 'G-VKMXBFY26Q',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = firebase.app();
const storage = firebase.storage();

export { storage };
