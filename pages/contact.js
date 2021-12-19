
import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import Image from 'next/image'
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import styles from '../styles/Contact.module.scss'
import stylesClickMe from '../styles/global/ClickMe.module.scss'
import Input from "./components/Input";

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

    const { register, handleSubmit, watch, formState: { errors }  } = useForm();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    console.log(watch("example"));

    return (
        <div>
            <div className={article}>
                <h3>Contact</h3>
                <h1>Let's work</h1>
                <h1>together</h1>
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
