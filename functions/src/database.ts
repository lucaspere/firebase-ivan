import { initializeApp } from "firebase/app";
import * as functions from "firebase-functions";
import { getDatabase } from "firebase/database";
import admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyCXnpJVdSVvndtmkfW0rR9h8B7b6-VCOJM",
  authDomain: "ivan-6ee57.firebaseapp.com",
  databaseURL: "https://ivan-6ee57.firebaseio.com",
  projectId: "ivan-6ee57",
  storageBucket: "ivan-6ee57.appspot.com",
  messagingSenderId: "327517691726",
  appId: "1:327517691726:web:1e56a4822eef0e83e2481f",
};

export const app = initializeApp(firebaseConfig);
export const adminApp = admin
  .initializeApp(functions.config().firebase)
  .database();

// Get a reference to the database service
export const realTimeDB = getDatabase(app);
