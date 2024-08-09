import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email ,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleLogin = () =>{
        return signInWithPopup(auth, googleProvider);
    }
    const updateUser = (name, photo) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail};
            console.log('Logged user', currentUser);
            setUser(currentUser);
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', loggedUser, {withCredentials: true})
                .then((res)=>console.log('done', res.data))
            }
            else{
                axios.post('http://localhost:5000/logout', loggedUser, {withCredentials: true})
                .then(()=>console.log('doning'))
            }
            setLoading(false);
        })
        return ()=>{
            unSubscribe();
        }
    }, [user])
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    const authInfo = {user, createUser, login, logOut, updateUser, loading, googleLogin};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;