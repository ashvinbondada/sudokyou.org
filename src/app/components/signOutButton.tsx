'use client'
import React from 'react';
import {  signOut } from 'firebase/auth';
import { firebaseAuth } from '../firebase';

const SignOutButton = () => {
  const handleSignOut = async () => {
    // const auth = getAuth();
    try {
      await signOut(firebaseAuth);
      console.log('Sign-out successful.');
      window.location.reload(); // Trigger a hard refresh
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;