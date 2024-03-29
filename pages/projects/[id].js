import React, { useState, useEffect } from "react"
import Image from 'next/image'
import Link from "next/link";
import dateFormat from "dateformat";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import stylesProject from '../../styles/Projects.module.scss'
import stylesClickMe from '../../styles/global/ClickMe.module.scss'

// export const getStaticPaths = async () => {
//     const res = await fetch('https://dashboard-emji.herokuapp.com/api/projects?populate=image')
//     const data = await res.json()

//     const paths = data.data.map(project => {
//         return {
//             params: { 
//                 id: project.id.toString(),
//             }
//         }
//     })

//     return {
//         paths,
//         fallback: false
//     }
// }

export const getServerSideProps = async (context) => {
    const { id } = context.query
    const res = await fetch(`https://dashboard-emji.herokuapp.com/api/projects/${id}?populate=image`)
    const allRes = await fetch(`https://dashboard-emji.herokuapp.com/api/projects?populate=image`)
    const data = await res.json()
    const allData = await allRes.json()

    return {
        props: { 
            projectDetail: data.data,
            projects: allData.data,
        }
    }
}

const Details = ({ projectDetail, projects }) => {
    const [animationName, setAnimationName] = useState(false)
    const projectLength = projects.length + 1;

    function transitionClick(direction) {
        direction == 'next' ? setAnimationName(true) : setAnimationName(false)
        console.log('transition:', animationName)
    }

    useEffect(() => {
        setAnimationName(true)
    }, [projectDetail.id])

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

    const imageVariant = {
        hidden: {
            x: 200,
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
        },
        exit: {
            x: -200,
            opacity: 0,
        } 
    }

    const textArticleVariant = {
        hidden: {
            x: 200,
            y: '-50%',
            opacity: 0
        },
        visible: {
            x: 0,
            y: '-50%',
            opacity: 1
        },
        exit: {
            x: -200,
            y: '-50%',
            opacity: 0,
            scale: 0
        } 
    }

    const infoVariant = {
        hidden: {
            y: 400,
            opacity: 0
        },
        visible: {
            y: 0,
            opacity: 1
        },
        exit: {
            y: -400,
            opacity: 0,
        } 
    }

    const previousVariant = {
        hidden: {
            x: 50,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: -400,
            y: -400,
            opacity: 0,
        } 
    }

    const nextVariant = {
        hidden: {
            x: -50,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: -400,
            y: -400,
            opacity: 0,
        } 
    }

    const nextProject = ((projectDetail.id + 1) % projectLength) === 0 ? 1 : projectDetail.id + 1
    const previousProject = ((projectDetail.id - 1) % projectLength) === 0 ? 1 : projectDetail.id - 1

    return (
        <div className={stylesProject.projectDetail}>
            <Link href={"/projects/" + projectDetail.id} key={projectDetail.id} passHref scroll={false}>
                <div className={stylesProject.projectName}>
                        <motion.figure
                            variants={imageVariant}
                            initial="hidden"
                            // animate="visible"
                            animate={animationName ? "visible" : "exit"}
                            exit="exit"
                            transition={{
                                duration: 1.5, ease: "easeOut", delay: .5
                            }}>
                            {}
                            <img src={ projectDetail.attributes.image.data.attributes.url ? projectDetail.attributes.image.data.attributes.url : "https://picsum.photos/200"} alt="Picture"/>
                        </motion.figure>
                        <motion.article
                            variants={textArticleVariant}
                            initial="hidden"
                            animate="visible"
                            // animate={animationName ? "visible" : "hidden"}
                            exit="exit"
                            transition={{
                                duration: 1, ease: "easeOut", delay: .7
                            }}>
                            <h3>{ projectDetail.attributes.type ? projectDetail.attributes.type : 'Website & Branding' }</h3>
                            <h1><strong>{ projectDetail.attributes.title }</strong></h1>
                            <p>{ projectDetail.attributes.description }</p>
                        </motion.article>
                        <div className={stylesProject.nextProject}>
                            <section>
                                <motion.span
                                    variants={infoVariant}
                                    initial="hidden"
                                    animate="visible"
                                    // animate={animationName ? "visible" : "hidden"}
                                    exit="exit"
                                    transition={{
                                        duration: 1, ease: "easeOut", delay: .6
                                    }}>
                                    <p>{ projectDetail.attributes.type ? projectDetail.attributes.type : 'Website' }</p>
                                    <a target="_blank">
                                        <Link href={ projectDetail.attributes.project_url ? projectDetail.attributes.project_url : '/' } passHref={true}>
                                            <p target="_blank">
                                                Visit project
                                            </p>
                                        </Link>
                                    </a>
                                </motion.span>
                                <motion.span
                                    variants={infoVariant}
                                    initial="hidden"
                                    animate="visible"
                                    // animate={animationName ? "visible" : "hidden"}
                                    exit="exit"
                                    transition={{
                                        duration: 1, ease: "easeOut", delay: .7
                                    }}>
                                    <p>Project Date</p>
                                    <p>
                                        <strong>
                                        {projectDetail.attributes.published_date ? dateFormat(new Date(projectDetail.attributes.published_date), "dd mmm, yyyy") : 'Dec 2021'}
                                        </strong>
                                    </p>
                                </motion.span>
                            </section>

                            <section style={{flexDirection: `${projectDetail.id !== 1 ? 'row' : 'row-reverse'}`}}>
                                { projectDetail.id !== 1 ? 
                                <Link href={"/projects/" + previousProject} key={previousProject} passHref scroll={false}>
                                    <motion.span
                                        variants={previousVariant}
                                        initial="hidden"
                                        animate="visible"
                                        // animate={animationName ? "visible" : "hidden"}
                                        exit="exit"
                                        transition={{
                                            duration: 1, ease: "easeOut", delay: .6
                                        }}>
                                        <p>Previous project</p>
                                        <motion.svg xmlns="http://www.w3.org/2000/svg" 
                                            width="38.929" 
                                            height="15.515" 
                                            viewBox="0 0 54.5 23.121"
                                            style={{rotate: '180deg'}}>
                                            <path d="M7.5,18h53" transform="translate(-7.5 -6.439)" fill="none" stroke="#000" strokeWidth="3"/>
                                            <path d="M18,7.5,28.5,18,18,28.5" transform="translate(24.5 -6.439)" fill="none" stroke="#000" strokeWidth="3"/>
                                        </motion.svg>
                                    </motion.span>
                                </Link>
                                : '' }
                                <Link href={"/projects/" + nextProject} key={nextProject} passHref scroll={false}>
                                    <motion.span
                                        onClick={(e) => transitionClick('next')}
                                        variants={nextVariant}
                                        initial="hidden"
                                        animate="visible"
                                        // animate={animationName ? "visible" : "hidden"}
                                        exit="exit"
                                        transition={{
                                            duration: 1, ease: "easeOut", delay: .6
                                        }}>
                                        <p>Next project</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="38.929" height="15.515"  viewBox="0 0 54.5 23.121">
                                            <path d="M7.5,18h53" transform="translate(-7.5 -6.439)" fill="none" stroke="#000" strokeWidth="3"/>
                                            <path d="M18,7.5,28.5,18,18,28.5" transform="translate(24.5 -6.439)" fill="none" stroke="#000" strokeWidth="3"/>
                                        </svg>
                                    </motion.span>
                                </Link>
                            </section>
                        </div>
                </div>
            </Link>

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

export default Details
