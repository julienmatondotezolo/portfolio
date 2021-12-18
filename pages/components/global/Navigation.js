import React from 'react'
import { useRouter } from 'next/router';
import Link from "next/link";
import styles from '../../../styles/global/Navigation.module.scss'

const Navigation = () => {
    const router = useRouter();
    return (
        <header className={styles.navigation}>
            <nav>
                <Link href="/home">
                    <h2 className={styles.logo}>eMJi</h2>
                </Link>
                <ul>
                    <li className={router.pathname == "/projects" ? styles.active : ""}>
                        <Link href="/projects">
                            <a>Projects</a>
                        </Link>
                    </li>

                    <li className={router.pathname == "/about" ? styles.active : ""}>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </li>

                    <li className={router.pathname == "/contact" ? styles.active : ""}>
                        <Link href="/contact">
                            <a>Contact</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation
