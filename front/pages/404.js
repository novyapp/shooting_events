import Layout from "@components/Layout";
import classes from "@styles/404.module.css";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa"

export default function NotFoundPage() {
  return (
    <Layout title="Page not Found">
        <div className={classes.error} >
            <h1><FaExclamationTriangle />404</h1>
            <h1>Sorry, there is nothing here!</h1>
            <Link href='/'>Go back to Homepage</Link>
        </div>

    </Layout>
  )
}
