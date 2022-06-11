import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const PROJECT_ID = process.env.PROJECT_ID;
const APP_ID = process.env.APP_ID;
const SENDER_ID = process.env.SENDER_ID;
const API_KEY = process.env.API_KEY;

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://ivan-6ee57-default-rtdb.firebaseio.com",
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const realTimeDB = getDatabase(app);
