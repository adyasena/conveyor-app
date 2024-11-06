import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAYrLgNcqWBqTmDPpyIIaiLo4uoiJ56fIo',
  authDomain: 'capstone-d11.firebaseapp.com',
  databaseURL: 'https://capstone-d11-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'capstone-d11',
  storageBucket: 'capstone-d11.appspot.com',
  messagingSenderId: '569281432024',
  appId: '1:569281432024:android:fdea8c25e4bbba82020aad',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };