/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react"
import Image from 'next/image'
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import styles from '../../styles/Home.module.scss'
import stylesProject from '../../styles/Projects.module.scss'
import stylesClickMe from '../../styles/global/ClickMe.module.scss'

export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()

    return {
        props: { projects: data }
    }
}

const Projects = ({projects}) => {
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

    return (
        <div className={styles.content}>
            <div className={styles.hero}>
                <article>
                    <h1>My</h1>
                    <h1><strong>Projects</strong><span>.</span></h1>
                    <ul>
                        <li>All</li>
                        <li>Website</li>
                        <li>Mobile app</li>
                        <li>Branding</li>
                        <li>Animation</li>
                    </ul>
                </article>
            </div>

            <div className={stylesProject.project}>

                {projects.map(project => (
                    <Link href={"/projects/" + project.id} key={project.id} passHref scroll={true}>
                        <div className={stylesProject.projectName}>
                                <figure>
                                    <img src={ project.image ? project.image : "https://picsum.photos/200"} alt="Picture"/>
                                </figure>
                                <article>
                                    <h3><strong>{project.title ? project.title : 'Project name'}</strong></h3>
                                    <p>{ project.type ? project.type : 'Website & Branding'}</p>
                                </article>
                        </div>
                    </Link>
                ))}
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

export default Projects
