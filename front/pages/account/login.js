import Layout from "@components/Layout";
import { useState, useEffect, useContext } from "react";
import AuthContext from "@context/AuthContext";
import { FaUser } from "react-icons/fa";
import classes from "../../styles/AuthForm.module.css";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error)
},[error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <Layout title="User Login">
      <div className={classes.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Adress</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="login" className="btn" />
        </form>
        <p>
          Don't have an account? <Link href="/account/register">register</Link>
        </p>
      </div>
    </Layout>
  );
}
