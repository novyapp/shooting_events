import Link from "next/link";
import classes from "./Header.module.css";
import Search from "./Search";
import AuthContext from "@context/AuthContext";
import { Fragment, useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">
          <a>Shooting Events</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            // If logged in
            <Fragment>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                  <button onClick={() => logout()} className='btn-secondary btn-icon'>
                    <FaSignOutAlt /> Logout
                  </button>
              </li>
            </Fragment>
          ) : (
            // If guest
            <Fragment>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondery">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}
