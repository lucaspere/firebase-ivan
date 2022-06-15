import { initializeApp } from "firebase/app";
import * as functions from "firebase-functions";
import { getDatabase } from "firebase/database";
import admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const app = initializeApp(firebaseConfig);
export const adminApp = admin
  .initializeApp(functions.config().firebase)
  .database();

// Get a reference to the database service
export const realTimeDB = getDatabase(app);
