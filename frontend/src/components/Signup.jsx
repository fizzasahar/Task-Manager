import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Signup Successful");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Routes>
            <Route path='/signup'>
                <form onSubmit={handleSignup}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button type="submit">Signup</button>
                </form>
            </Route>
        </Routes>
    );
};

export default Signup;

