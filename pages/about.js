import React, { useState, useEffect } from "react"
import Image from 'next/image'
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import styles from '../styles/Home.module.scss'
import stylesClickMe from '../styles/global/ClickMe.module.scss'

const About = () => {
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

    return (
        <div>
            <h1>About page</h1>
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

export default About
