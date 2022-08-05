import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userset, setUserset] = useState({});
  const [current, setCurrent] = useState();
  useEffect(
    () =>
      onSnapshot(query(collection(db, "users")), (snapshot) => {
        setUserset(snapshot.docs);
      }),
    []
  );

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      let userpost = userset.map(
        (post) => post.data().id === currentUser.uid && post.data()
      );
      userpost = userpost.filter(isNaN);

      setCurrent(userpost[0]);

      if (userpost.length > 0) {
      } else {
        setDoc(doc(db, "users", currentUser.uid), {
          id: currentUser.uid,

          email: currentUser.email,
          user_img: currentUser.photoURL,
          user_name: currentUser.displayName,

          background: "hero-pattern",
          bubble: "black",
          text: "white",

          timestamp: serverTimestamp(),
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userset, current]);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, current }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
