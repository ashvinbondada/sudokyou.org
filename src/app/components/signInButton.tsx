'use client'

import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signOut} from "firebase/auth";
import { firebaseAuth, googleProvider } from "../firebase";
import { useRouter } from 'next/navigation';

const SignInButton = () => {
  const [user, loading] = useAuthState(firebaseAuth);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      const user = result.user;
      console.log(user.displayName);
      console.log(user.metadata);
      // Redirect to '/accounts' after sign-in
      router.push('/accounts');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // const email = error.customData?.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(`Error during sign-in: ${errorMessage} (${errorCode})`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);
      console.log('Sign-out successful.');
      window.location.reload(); // Trigger a hard refresh after sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      {loading ? (
        <></> // Show nothing or a spinner while loading
      ) : (
        <>
          {user ? (
            <>
              <img
                className="text-black"
                src={user.photoURL ?? '/default-profile.png'} // Fallback if photoURL is null
                alt={user.displayName ?? 'User'} // Fallback if displayName is null
              />
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Sign In
            </button>
          )}
        </>
      )}
    </>
  );
};

export default SignInButton;
