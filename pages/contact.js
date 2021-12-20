
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
                <h3><strong>Contact</strong></h3>
                <h1 className="red">Let's work</h1>
                <h1 className="red">together</h1>
            </div>
            <div className={styles.article}>
                <span>
                    <h3><strong>A question ?</strong></h3>
                    <Link href="mailto:info@emji.be" passHref>
                        <h3>info@emji.be</h3>
                    </Link>
                </span>
                <span>
                    <h3><strong>Business talk ?</strong></h3>
                    <Link href="mailto:business@emji.be" passHref>
                        <h3>business@emji.be</h3>
                    </Link>
                </span>
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
