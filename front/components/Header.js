import Link from 'next/link';
import classes from './Header.module.css'
import Search from './Search';

export default function Header() {
    return (
        <header className={classes.header} >
            <div className={classes.logo}>
                <Link href='/'>
                    <a>Shooting Events</a>
                </Link>
            </div>
            <Search />
            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            <a>Events</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/events/add"><a>Add Event</a></Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
