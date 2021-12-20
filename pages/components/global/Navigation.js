import React, { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRouter } from 'next/router';
import Link from "next/link";
import styles from '../../../styles/global/Navigation.module.scss'

const Navigation = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
  
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
  
    const [element, setElement] = useState({width: null, left: null, hover: false})

    function getElementEvent(event) {
        const elementWidth = event.target.clientWidth
        const elementLeft = event.target.offsetLeft
        setElement({width: elementWidth, left: elementLeft, hover: true})
    }

    function changeHoverState(event) {
        const elementWidth = event.target.clientWidth
        const elementLeft = event.target.offsetLeft
        setElement({width: elementWidth, left: elementLeft, hover: false})
    } 

    const strokeVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            height: 3,
            y: -3
        },
        hover: {
            opacity: 1,
            height: 5,
            y: 0
        }
    }

    const navigationVariants = {
        hidden: {
            y: -20,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
        },
        exit: {
            y: -20,
            opacity: 0,
        },
    }

    const navListVariants = {
        hidden: {
            scale: 1,
            fontWeight: 400,
        },
        hover: {
            scale: 1.4,
            fontWeight: 500,
        },
    }

    const router = useRouter();

    return (
        <header className={styles.navigation}>
            <motion.nav
                variants={navigationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                    duration: 1, ease: "easeInOut", delay: 3,
                }}>
                <Link href="/" passHref>
                    <h2 className={styles.logo}>eMJi</h2>
                </Link>
                <ul>
                    <motion.div
                        variants={strokeVariants}
                        initial="hidden"
                        animate={element.hover ? "hover" : "visible"}
                        // transition={{
                        //     duration: .5, ease: "easeInOut",
                        // }}
                        className={styles.strokeAnimation}
                        style={{
                            // translateX: cursorXSpring,
                            left: element.left,
                            width: element.width
                        }}
                    />
                    <motion.li
                        variants={navListVariants}
                        initial="hidden"
                        whileHover="hover"
                        onMouseEnter={getElementEvent} 
                        onMouseLeave={changeHoverState} 
                        className={router.pathname == "/projects" ? styles.active : ""}>
                        <Link href="/projects">
                            <a>Projects</a>
                        </Link>
                    </motion.li>

                    {/* <motion.li
                        variants={navListVariants}
                        initial="hidden"
                        whileHover="hover" 
                        onMouseEnter={getElementEvent} 
                        onMouseLeave={changeHoverState} 
                        className={router.pathname == "/about" ? styles.active : ""}>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </motion.li> */}

                    <motion.li 
                        variants={navListVariants}
                        initial="hidden"
                        whileHover="hover"
                        onMouseEnter={getElementEvent} 
                        onMouseLeave={changeHoverState} 
                        className={router.pathname == "/contact" ? styles.active : ""}>
                        <Link href="/contact">
                            <a>Contact</a>
                        </Link>
                    </motion.li>
                </ul>
            </motion.nav>
        </header>
    )
}

export default Navigation
