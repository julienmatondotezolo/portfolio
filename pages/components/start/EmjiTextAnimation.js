import React from 'react'
import { motion, useMotionValue, useTransform } from "framer-motion"
import styles from '../../../styles/Start.module.scss'

const EmjiTextAnimation = (animation) => {
    const showEVariants = {
        hidden: {
            y: 50, scale: 0, width: 0
        },
        visible: {
            y: 0, opacity: 1, scale: 1, width: "auto"
        },
    }
    const textVariants = {
        hidden: {
            y: 0, opacity: 1, scale: 1
        },
        visible: {
            y: 50, opacity: 0, scale: 0, width: 0
        },
    }
    const koppelTekenVariants = {
        hidden: {
            y: 0, scale: 1
        },
        visible: {
            y: 50, scale: 0, width: 0
        },
    }
    return (
        <h1 className={styles.emji}>
            <motion.span
              variants={showEVariants}
              initial="hidden"
              animate={animation.animation ? "visible" : "hidden"}
              transition={{ 
                duration: .5,
              }}>e</motion.span>M

            <motion.span
              variants={textVariants}
              initial="hidden"
              animate={animation.animation ? "visible" : "hidden"}
              transition={{ 
                duration: .5,
              }}>atondo
            </motion.span>

            <motion.span
              variants={koppelTekenVariants}
              initial="hidden"
              animate={animation.animation ? "visible" : "hidden"}
              style={{
                opacity: 0
              }}
              transition={{ 
                duration: .5,
              }}>-
            </motion.span>
            J
            <motion.span
              variants={textVariants}
              initial="hidden"
              animate={animation.animation ? "visible" : "hidden"}
              transition={{ 
                duration: .5
              }}>
                ul
            </motion.span>i

            <motion.span
              variants={textVariants}
              initial="hidden"
              animate={animation.animation ? "visible" : "hidden"}
              transition={{ 
                duration: .5
              }}>
                en
            </motion.span>
        </h1>
    )
}

export default EmjiTextAnimation
