import { auth, googleprovider } from "../config/firebase";
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
export const Auth = () => {
    const [Email, SetEmail] = useState("");
    const [Password, setPassword] = useState("");


    // console.log(auth.currentUser);
    const SignIn = async () => {
        try {

            await createUserWithEmailAndPassword(auth, Email, Password)

        } catch (error) {
            console.error(error)
        }
    };


    const SignInWithGoogle = async () => {
        try {

            console.log(auth.currentUser);
            await signInWithPopup(auth, googleprovider)

        } catch (error) {
            console.error(error)
        }
    };



    const LogOut = async () => {
        try {

            console.log(auth.currentUser);
            await signOut(auth)

        } catch (error) {
            console.error(error)
        }
    };





    return (
        <div>
            <input type="text" placeholder="Email" onChange={(e) => SetEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={SignIn}>Sign In</button>
            <button onClick={SignInWithGoogle}>Sign In With Google</button>
            <button onClick={LogOut}>Logout</button>
        </div>
    );
};
