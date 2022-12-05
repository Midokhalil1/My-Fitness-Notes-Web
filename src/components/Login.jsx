import { useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider,
  signInWithPopup } from "firebase/auth"
  import { Navigate, useNavigate } from "react-router-dom";

  const firebaseConfig = {
    apiKey: "AIzaSyBAG6pJYsHxHs6STxAGWZDldgtm1e4em5s",
    authDomain: "my-fitness-notes-frontend.firebaseapp.com",
    projectId: "my-fitness-notes-frontend",
    storageBucket: "my-fitness-notes-frontend.appspot.com",
    messagingSenderId: "146775143479",
    appId: "1:146775143479:web:e5ca96d4c424c2ecaefbb2"
  };

export default function Login({ setUser }) {
   const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    const app = initializeApp(firebaseConfig) // connects to Firebase
    const auth = getAuth(app) // connects us to Firebase Auth
    const response = await signInWithEmailAndPassword(auth, email, password)
      .catch(alert)
    setUser(response.user)
  }
  const handleGoogleLogin = async () => {
    const app = initializeApp(firebaseConfig) // connects to Firebase
    const auth = getAuth(app) // connects us to Firebase Auth
    const provider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)
      .catch(alert)
    setUser(response.user)
    navigate('/Notes')

  }
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:{' '}
          <input type="email" name="email"
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="yourname@domain.com" />
        </label><br />
        <label htmlFor="password">Password:{' '}
          <input type="password" name="password"
            value={password} onChange={e => setPassword(e.target.value)}
            placeholder="•••••••" />
        </label><br />
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </>
  )
}