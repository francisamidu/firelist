// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { browserSessionPersistence, getAuth } from "firebase/auth";
import { getApps } from "firebase/app";
import {
  addDoc,
  deleteDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import getConfig from "next/config";

const apps = getApps();
const { publicRuntimeConfig } = getConfig();
const {
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_APP_ID,
  FIREBASE_API_KEY,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_SENDER_ID,
} = publicRuntimeConfig;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  databaseUrl: FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
if (typeof window !== "undefined" && !apps.length) {
  auth.setPersistence(browserSessionPersistence);
}
export {
  app,
  auth,
  addDoc,
  db,
  deleteDoc,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
};
