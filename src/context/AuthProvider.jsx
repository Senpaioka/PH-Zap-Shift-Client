import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import {auth} from '../firebase/firebase.config';
import { useState, useEffect } from "react";



const provider = new GoogleAuthProvider();
provider.addScope('email');
provider.addScope('profile'); 


function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);



    // gmail authentication
    async function authenticateWithGoogle() {
        setIsLoading(true);
        
        try {
            return await signInWithPopup(auth, provider)
            // If an error happens, it automatically throws it up the call stack. 
        }
        finally {
            setIsLoading(false);
        }
    }







    // setting user
    useEffect(() => {
        // on mount
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsLoading(true);
            if(currentUser) {
                setUser(currentUser);
                setIsLoading(false);
            }
        })

        // on unmount
        return () => {
            unsubscribe();
        }
    })




    // info
    const authInfo = {
        user,
        isLoading,
        authenticateWithGoogle,
    }



    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}


export default AuthProvider;