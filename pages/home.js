/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react"
import useSWR from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import dynamic from 'next/dynamic'
import { Parallax } from 'react-scroll-parallax';
import { motion, useMotionValue, useTransform, useViewportScroll, useSpring } from "framer-motion"
import styles from '../styles/Home.module.scss'
import stylesProject from '../styles/Projects.module.scss'
import stylesClickMe from '../styles/global/ClickMe.module.scss'

export const getStaticProps = async () => {
    const res = await fetch('https://dashboard-emji.herokuapp.com/api/projects?populate=image&pagination[start]=0&pagination[limit]=2')
    const data = await res.json()

    return {
        props: { projects: data.data }
    }
}

const Home = ({projects}) => {
    // const { data, error } = useSWR('projects', fetcher)
    // console.log('SWR:', data)
    // if (error) return <div>failed to load</div>
    // if (!data) return <div>loading...</div>
    // const projects = data

    const [isComplete, setIsComplete] = useState(false);

    const [height, setHeight] = useState(null);
    const [elementHeight, setElementHeight] = useState(null)

    useEffect(() => {
        console.log(document.getElementById("projects"))
        setHeight(document.getElementById("projects").offsetHeight);
        // setElementHeight(document.getElementById("hero").offsetHeight)
    }, []);

    const { scrollYProgress } = useViewportScroll();
    const textParallax = useTransform(scrollYProgress, [0, elementHeight], [0, 400]);
    const projectsParallax = useTransform(scrollYProgress, [0, elementHeight], [0, -200]);

    const progressHide = useTransform(scrollYProgress, [0, 350], [1, 0])

    const scrollScale = useTransform(scrollYProgress, [0, height], [1, 1.5]);
    const scrollInnerScale = useTransform(scrollYProgress, [0, height], [0, 1]);

    useEffect(() => {
        const handleScroll = (e) => {
            scrollYProgress.set(window.scrollY);

            const pageHeight = (document.getElementById("projects").offsetHeight)
            pageHeight == (scrollYProgress.get()) ? setIsComplete(true) : setIsComplete(false)
        }
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function handleScroll(bool) {
        window.scrollTo({
            top: bool ? 0 : height,
            behavior: 'smooth',
        });
    }

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

    const scrollVariants = {
        hidden: {
            scale: 0.8
        },
        down: {
            rotate: 0,
            scale: 1
        },
        hover: {
            scale: 1.5
        },
        up: {
            rotate: 180,
        },
    }

    const dottVariant = {
        hidden: {
            y: 40,
            opacity: 0,
            scale: 0
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1
        },
        exit: {
            y: 800,
            opacity: 0,
            scale: 0
        } 
    }

    // const { data, error } = useSWR('projects', fetcher)
    // console.log('SWR:', data)
    // if (error) return <div>failed to load</div>
    // if (!data) return <div>loading...</div>

    return (
        <div className={styles.content}>
            <Head>
                <title>eMJi - Home</title>
                <meta name="description" content="Home - eMji" />
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                // y={[-100, 100]}
                className={styles.hero}>
                <motion.article
                    style={{opacity: progressHide}}
                >
                    <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ 
                        duration: 1,
                        delay: .5
                    }}>
                        <strong>UX-UI</strong> designer
                        <motion.span
                            variants={dottVariant}
                            initial="hidden"
                            animate="visible"
                            // animate={animationName ? "visible" : "hidden"}
                            exit="exit"
                            transition={{
                                duration: 1, ease: "easeOut", delay: 1.2
                            }}>
                        .</motion.span>
                    </motion.h1>
                    <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ 
                        duration: 1,
                        delay: 1
                    }}>
                        <strong>Full stack</strong> developer
                        <motion.span
                            variants={dottVariant}
                            initial="hidden"
                            animate="visible"
                            // animate={animationName ? "visible" : "hidden"}
                            exit="exit"
                            transition={{
                                duration: 1, ease: "easeOut", delay: 1.7
                            }}>
                        .</motion.span>
                    </motion.h1>
                </motion.article>
            </div>

            <motion.div id="projects" className={stylesProject.project}>
            {/* style={{ y: projectsParallax }} */}
                {projects.map((project, i) => (
                    <Link key={i} href={"/projects/" + project.id} passHref scroll={true}>
                        <motion.div
                            initial={{ opacity: 0, y: 500, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: .8, ease: "easeOut",
                            }}
                            className={stylesProject.projectName}>
                            <figure>
                                <img src={ project.attributes.image.data.attributes.url ? project.attributes.image.data.attributes.url : "https://picsum.photos/200"} alt="Picture"/>
                            </figure>
                            <article>
                                <h3><strong>{ project.attributes.title ? project.attributes.title : 'Project name 1'}</strong></h3>
                                <p>{ project.attributes.type ? project.attributes.type : 'Website & Branding'}</p>
                            </article>
                        </motion.div>
                    </Link>
                ))}

                <section>
                    <Link href="/projects">
                        <a>All projects</a>
                    </Link>
                </section>
            </motion.div>

            <motion.div
                onClick={(e) => handleScroll(isComplete)}
                variants={scrollVariants}
                initial="hidden"
                animate={isComplete ? "up" : "down"}
                whileHover={{scale: 1.2}}
                transition={{ ease: "easeInOut", duration: 1, repeat: 2, repeatType: 'reverse' }}
                className={styles.scrollDown}>
                <motion.div
                    style={{
                        scale: scrollScale,
                    }}
                    className={styles.container}
                >
                    <motion.div className={styles.item} style={{ scaleY: scrollInnerScale}} />
                    {/* <motion.div className={styles.item} style={{ scaleY: scrollYProgress}} /> */}
                </motion.div>

                <svg xmlns="http://www.w3.org/2000/svg" width="24.976" height="23.121" viewBox="0 0 24.976 23.121">
                    <motion.path
                        variants={scrollDownVariants}
                        initial="hidden"
                        animate="visible"
                        // animate={{ pathLength: isComplete ? 1 : 0 }}
                        d="M7.5,18H30.976" 
                        transform="translate(-7.5 -6.439)" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2"/>
                    <motion.path
                        variants={scrollDownVariants}
                        initial="hidden"
                        animate="visible" 
                        d="M18,7.5,28.5,18,18,28.5" 
                        transform="translate(-5.024 -6.439)" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2"/>
                </svg>
            </motion.div>

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
