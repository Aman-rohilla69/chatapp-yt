import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("ChatApp");
  //-------------------Parse the user data and storing in state:----------------------
  // parse ka matlab hai ki jo user data cookies/localStorage me string format me store hai usko JavaScript object me convert karna taki hum uske properties ko access kar sake, aur isse hum global state management ke liye use karenge taki app ke kisi bhi component me user data ko access kar sake, isse hum global state management ke liye use karenge taki app ke kisi bhi component me user data ko access kar sake
  // parsing the user data from cookies/localStorage and storing in state for global access across the app
  // if the user data exists in cookies/localStorage, parse it and set it as the initial state, otherwise set it to undefined
  //
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined,
  );
  return (
    // providing the user data and the function to update it to the entire app through context, so that any component can access and update the user data as needed mtlb ki hum user data aur usko update karne wali function ko context ke through poore app me provide kar rahe hai, taki koi bhi component us user data ko access kar sake aur zarurat padne par usko update kar sake...
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
