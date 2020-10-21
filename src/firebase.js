import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCEnvHVS96p0KKgmro21EuV_Ud8HMGRgME",
  authDomain: "messenger-app-fe98d.firebaseapp.com",
  databaseURL: "https://messenger-app-fe98d.firebaseio.com",
  projectId: "messenger-app-fe98d",
  storageBucket: "messenger-app-fe98d.appspot.com",
  messagingSenderId: "192444807327",
  appId: "1:192444807327:web:bb7c98a2563d823f088aaa"
};

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const auth=firebase.auth();
  const provider= new firebase.auth.GoogleAuthProvider();


  export {auth , provider};
  export default db;