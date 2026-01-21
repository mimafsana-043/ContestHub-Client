import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../Firebase/Firebase.config';
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider;

const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    };

    const updateUserProfile = (profile) =>{
        return  updateProfile(auth.currentUser, profile);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };


    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);

    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((loggedUser) => {
            console.log('auth state changed', loggedUser);
            setUser(loggedUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user, setUser ,createUser, signIn, logOut, googleSignIn, loading, setLoading, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;