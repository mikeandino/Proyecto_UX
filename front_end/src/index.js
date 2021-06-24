import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/firestore";
import "firebase/auth";
import { FirebaseAppProvider } from "reactfire";

const firebaseConfig = {
  apiKey: "AIzaSyAwcDXjPYwrjWuFRiGhnRE_na9xjGT7wtE",
  authDomain: "proyecto-ux-d0012.firebaseapp.com",
  projectId: "proyecto-ux-d0012",
  storageBucket: "proyecto-ux-d0012.appspot.com",
  messagingSenderId: "385432520257",
  appId: "1:385432520257:web:3c6278a124e39c8c6ce8c0",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
