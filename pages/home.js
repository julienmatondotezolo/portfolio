import React from 'react'
import styles from '../styles/Home.module.scss'
import stylesClickMe from '../styles/global/ClickMe.module.scss'

const Home = () => {
    return (
        <div className={styles.hero}>
            <article>
                <h1><strong>UX-UI</strong> designer<span>.</span></h1>
                <h1><strong>Full stack</strong> developer<span>.</span></h1>
            </article>
        </div>
    )
}

export default Home
