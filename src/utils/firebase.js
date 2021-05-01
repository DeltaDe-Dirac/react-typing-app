import React, { createContext } from "react";
import app from "firebase/app";

const FirebaseContext = createContext(null);
export { FirebaseContext };

const children = ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    });
  }
  return <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>;
};

export default children;
