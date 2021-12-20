/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react"
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { motion, useMotionValue, useTransform, useViewportScroll, useSpring } from "framer-motion"
import styles from '../styles/Home.module.scss'
import stylesProject from '../styles/Projects.module.scss'
import stylesClickMe from '../styles/global/ClickMe.module.scss'

export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()

    return {
        props: { projects: data }
    }
}

const Home = ({projects}) => {
    const [isComplete, setIsComplete] = useState(false);
    const { scrollYProgress } = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

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
            <Head>
                <title>eMJi - Home</title>
                <meta name="description" content="Home - eMji" />
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                {projects.map(project => (
                    <Link href="/projects/1" passHref scroll={true}>
                        <motion.div
                            initial={{ opacity: 0, y: 500, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: .8, ease: "easeOut",
                            }}
                            className={stylesProject.projectName}>
                            <figure>
                                <img src={ project.image ? project.image : "https://picsum.photos/200"} alt="Picture"/>
                            </figure>
                            <article>
                                <h3><strong>{ project.title ? project.title : 'Project name 1'}</strong></h3>
                                <p>{ project.type ? project.type : 'Website & Branding'}</p>
                            </article>
                        </motion.div>
                    </Link>
                ))}

                <section>
                    <Link href="/projects">
                        <a>All projects</a>
                    </Link>
                </section>
            </div>

            <div className={styles.scrollDown}>
                <motion.div className={styles.item}
                    // style={{
                    //     scaleY: scale
                    // }}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="24.976" height="23.121" viewBox="0 0 24.976 23.121">
                    <path
                        variants={scrollDownVariants}
                        initial="hidden"
                        animate="visible"
                        // animate={{ pathLength: isComplete ? 1 : 0 }}
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
