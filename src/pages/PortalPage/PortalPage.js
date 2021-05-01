import React, { useContext, useState, useEffect } from "react";
import "./PortalPage.css";

import { Container } from "react-bootstrap";
import { FirebaseContext } from "../../utils/firebase";
import "firebase/analytics";
import "firebase/auth";

export default function PortalPage() {
  const [isLoggedIn, setIsLoggedin] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedin(true);
        // console.log("displayName:", user.displayName);
        // console.log("email:", user.email);
        // console.log("photoURL", user.photoURL);
        // console.log("emailVerified:", user.emailVerified);
        // console.log("uid:", user.uid);
      } else {
        setIsLoggedin(false);
      }
    });
    return () => {
      // cleanup
    };
  }, [isLoggedIn]);

  return (
    <Container>
      <h1>{isLoggedIn === null ? null : isLoggedIn ? "Hello logged in user" : "Hello anonymous user"}</h1>
    </Container>
  );
}
