import Link from "next/link"
import classes from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={classes.footer}>
        <p>Copyright &copy; Shooting Events 2022</p>
        <p>
            <Link href="/about">
                <a>About this Project</a>
            </Link>
        </p>
    </footer>
  )
}
