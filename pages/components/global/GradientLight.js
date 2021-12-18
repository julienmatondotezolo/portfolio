import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import styles from '../../../styles/global/GradientLight.module.scss'

function GradientLight() {
    const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 })

    useEffect(() => {
        const moveCursor = (e) => {
          const x = e.clientX - 16
          const y = e.clientY - 16
          setCursorXY({ x, y })
        }
    
        window.addEventListener("mousemove", moveCursor);
    
        return () => {
          window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <div className={styles.gradientContainer}>
            <div className={styles.gradientWrapper}>
                {/* <div className={styles.gradientLight}></div> */}
                <motion.div
                    className={`${styles.gradientLight} ${styles.gradientColorYellow}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: .4 }}
                    transition={{ duration: 5 }}
                    whileTap={{ scale: 1.5 }}
                    style={{
                        left: 0.2 * cursorXY.x,
                        top: (0.1 * cursorXY.y),
                    }}
                />
            </div>
        </div>
    )
}

export default GradientLight
