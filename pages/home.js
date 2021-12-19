/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react"
import Image from 'next/image'
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import styles from '../styles/Home.module.scss'
import stylesProject from '../styles/Projects.module.scss'
import stylesClickMe from '../styles/global/ClickMe.module.scss'

const Home = () => {
    const textVariants = {
        hidden: {
            y: 20, opacity: 0
        },
        visible: {
            y: 0, opacity: 1
        }
    }

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
  
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);
  
    useEffect(() => {
      const moveCursor = (e) => {
        cursorX.set(e.clientX - 5);
        cursorY.set(e.clientY - 5);
      };
  
      window.addEventListener("mousemove", moveCursor);
  
      return () => {
        window.removeEventListener("mousemove", moveCursor);
      };
    }, []);

    const transitionVariants = {
        hidden: {
            scale: 200
        },
        visible: {
            scale: 0
        },
        exit: {
            scale: 200
        } 
    }

    const scrollDownVariants = {
        hidden: {
            pathLength: 0,
        },
        visible: {
            pathLength: 1,
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.hero}>
                <article>
                    <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ 
                        duration: 1,
                        delay: .5
                    }}>
                        <strong>UX-UI</strong> designer<span>.</span></motion.h1>
                    <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ 
                        duration: 1,
                        delay: 1
                    }}>
                        <strong>Full stack</strong> developer<span>.</span>
                    </motion.h1>
                </article>
            </div>

            <div className={stylesProject.project}>
                <Link href="/projects/1" passHref scroll={false}>
                <div className={stylesProject.projectName}>
                    <figure>
                        <img src="https://picsum.photos/200" alt="Picture"/>
                    </figure>
                    <article>
                        <h3><strong>Project name 1</strong></h3>
                        <p>Website & Branding</p>
                    </article>
                </div>
                </Link>

                <div className={stylesProject.projectName}>
                    <figure>
                        <img src="https://picsum.photos/200" alt="Picture"/>
                    </figure>
                    <article>
                        <h3><strong>Project name 1</strong></h3>
                        <p>Website & Branding</p>
                    </article>
                </div>

                <section>
                    <Link href="/projects">
                        <a>All projects</a>
                    </Link>
                </section>
            </div>

            <div className={styles.scrollDown}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24.976" height="23.121" viewBox="0 0 24.976 23.121">
                    <path
                        variants={scrollDownVariants}
                        initial="hidden"
                        animate="visible"
                        d="M7.5,18H30.976" 
                        transform="translate(-7.5 -6.439)" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2"/>
                    <path
                        variants={scrollDownVariants}
                        initial="hidden"
                        animate="visible" 
                        d="M18,7.5,28.5,18,18,28.5" 
                        transform="translate(-5.024 -6.439)" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2"/>
                </svg>
            </div>

            <motion.div
                variants={transitionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                    duration: 1, ease: "easeInOut",
                }}
                className={stylesClickMe.transitonDiv}
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
            />
        </div>
    )
}

export default Home
