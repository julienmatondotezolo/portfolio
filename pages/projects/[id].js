import React, { useState, useEffect } from "react"
import Image from 'next/image'
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import stylesProject from '../../styles/Projects.module.scss'
import stylesClickMe from '../../styles/global/ClickMe.module.scss'

export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()

    const paths = data.map(project => {
        return {
            params: { id: project.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id)
    const data = await res.json()

    return {
        props: { projectDetail: data }
    }
}

const Details = ({ projectDetail }) => {
    const [animationName, setAnimationName] = useState(false)

    useEffect(() => {
        console.log('Route id updated:', projectDetail.id);
        setAnimationName(true)
    }, [projectDetail.id])

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

    const sliderVariant = {
        hidden: {
            x: 400,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: -400,
            opacity: 0
        } 
    }

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
  
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const nextProject = projectDetail.id + 1
    const previousProject = projectDetail.id == 1 ? 100 : projectDetail.id - 1

    return (
        <motion.div
            variants={sliderVariant}
            initial="hidden"
            // animate="visible"
            animate={animationName ? "visible" : "hidden"}
            exit="exit"
            transition={{
                duration: 1, ease: "easeInOut", delay: 1
            }}
            className={stylesProject.projectDetail}>
            <div className={stylesProject.projectName}>
                    <figure>
                        <img src="https://picsum.photos/200" alt="Picture"/>
                    </figure>
                    <article>
                        <h3>Website & Branding</h3>
                        <h1><strong>{ projectDetail.title }</strong></h1>
                        <p>{ projectDetail.body }</p>
                    </article>
                    <div className={stylesProject.nextProject}>
                        <section>
                            <span>
                                <p>Website</p>
                                <p><strong>https://projectone.com/</strong></p>
                            </span>
                            <span>
                                <p>Project Date</p>
                                <p><strong>Dec 2021</strong></p>
                            </span>
                        </section>

                        <section style={{flexDirection: `${projectDetail.id !== 1 ? 'row' : 'row-reverse'}`}}>
                            { projectDetail.id !== 1 ? 
                            <Link href={"/projects/" + previousProject} key={previousProject} passHref scroll={false}>
                                <span>
                                    <p>Previous project</p>
                                    <motion.svg xmlns="http://www.w3.org/2000/svg" 
                                        width="38.929" 
                                        height="15.515" 
                                        viewBox="0 0 54.5 23.121"
                                        style={{rotate: '180deg'}}>
                                        <path d="M7.5,18h53" transform="translate(-7.5 -6.439)" fill="none" stroke="#000" strokeWidth="3"/>
                                        <path d="M18,7.5,28.5,18,18,28.5" transform="translate(24.5 -6.439)" fill="none" stroke="#000" strokeWidth="3"/>
                                    </motion.svg>
                                </span>
                            </Link>
                            : '' }
                            <Link href={"/projects/" + nextProject} key={nextProject} passHref scroll={false}>
                                <span>
                                    <p>Next project</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="38.929" height="15.515"  viewBox="0 0 54.5 23.121">
                                        <path d="M7.5,18h53" transform="translate(-7.5 -6.439)" fill="none" stroke="#000" strokeWidth="3"/>
                                        <path d="M18,7.5,28.5,18,18,28.5" transform="translate(24.5 -6.439)" fill="none" stroke="#000" strokeWidth="3"/>
                                    </svg>
                                </span>
                            </Link>
                        </section>
                    </div>
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
        </motion.div>
    )
}

export default Details
