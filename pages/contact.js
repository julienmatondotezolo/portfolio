
import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import Image from 'next/image'
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import styles from '../styles/Contact.module.scss'
import stylesClickMe from '../styles/global/ClickMe.module.scss'

const Contact = () => {
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

    const textArticleVariant = {
        hidden: {
            x: -200,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        },
        exit: {
            y: 800,
            opacity: 0,
            scale: 0
        } 
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

    return (
        <div className={styles.contact}>

            <div className={styles.article}>
                <motion.h3
                    variants={textArticleVariant}
                    initial="hidden"
                    animate="visible"
                    // animate={animationName ? "visible" : "hidden"}
                    exit="exit"
                    transition={{
                        duration: 1, ease: "easeOut", delay: .5
                    }}>
                    <strong>Contact</strong>
                </motion.h3>
                <motion.h1
                    variants={textArticleVariant}
                    initial="hidden"
                    animate="visible"
                    // animate={animationName ? "visible" : "hidden"}
                    exit="exit"
                    transition={{
                        duration: 1, ease: "easeOut", delay: .9
                    }}
                    className="red">
                    Let's work
                </motion.h1>

                <motion.h1
                    variants={textArticleVariant}
                    initial="hidden"
                    animate="visible"
                    // animate={animationName ? "visible" : "hidden"}
                    exit="exit"
                    transition={{
                        duration: 1, ease: "easeOut", delay: 1.2
                    }}
                    className="red">
                    together
                </motion.h1>
            </div>
            <div className={styles.article}>
                <motion.span
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ 
                        duration: 1,
                        delay: 1.4
                    }}>
                    <h3><strong>A question ?</strong></h3>
                    <Link href="mailto:info@emji.be" passHref>
                        <motion.h3
                        whileHover={{ scale: 1.3 }}
                        transition={{
                            duration: .1,
                            ease: 'easeOut'
                        }}
                        >info@emji.be</motion.h3>
                    </Link>
                </motion.span>
                <motion.span
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ 
                        duration: 1.6,
                        delay: 1
                    }}>
                    <h3><strong>Business talk ?</strong></h3>
                    <Link href="mailto:business@emji.be" passHref>
                        <motion.h3
                        whileHover={{ scale: 1.3 }}
                        transition={{
                            duration: .1,
                            ease: 'easeOut'
                        }}
                        >business@emji.be</motion.h3>
                    </Link>
                </motion.span>
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

export default Contact
