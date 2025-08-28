import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./config"

export const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    await signOut(auth);
    return "Verification email sent";
}

export const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
        await signOut(auth);
        return false;
    } else {
        return true;
    }
}

export const logOut = async () => {
    await signOut(auth);
}

export const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
    return "Password reset email sent"
}