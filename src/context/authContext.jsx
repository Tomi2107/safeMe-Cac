import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig/firebase";
import { createContext, useContext, useEffect, useState } from "react";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("Error al crear auth context");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("No hay usuario suscripto");
        setUser("");
      } else {
        setUser(currentUser);
      }
    });
    return () => suscribed();
  }, []);

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response); // For debugging purposes
      return response; // Or handle success differently
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Or handle errors differently
    }
  };

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };

  const logout = async () => {
    const response = await signOut(auth);
  };

  return (
    <authContext.Provider value={{ register, login, logout, user }}>
      {children}
    </authContext.Provider>
  );
}


