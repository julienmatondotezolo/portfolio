import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, useViewportScroll, useSpring } from "framer-motion"

const ScrollDown = () => {
    const [isComplete, setIsComplete] = useState(false);
    const [height, setHeight] = useState(null);
    
    useEffect(() => {
        setHeight(document.getElementById("projects").offsetHeight);
    }, []);

    const { scrollYProgress } = useViewportScroll();
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

    function scrollTo(bool) {
        window.scrollTo({
            top: bool ? 0 : height,
            behavior: 'smooth',
        });
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

    const arrowVariants = {
        hidden: {
            pathLength: 0,
        },
        visible: {
            pathLength: 1,
        }
    }

    return (
        <motion.div
        onClick={(e) => scrollTo(isComplete)}
        variants={scrollVariants}
        initial="hidden"
        animate={isComplete ? "up" : "down"}
        whileHover={{scale: 1.2}}
        transition={{ ease: "easeInOut", duration: 1, repeat: 4, repeatType: 'reverse' }}
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
                variants={arrowVariants}
                initial="hidden"
                animate="visible"
                // animate={{ pathLength: isComplete ? 1 : 0 }}
                d="M7.5,18H30.976" 
                transform="translate(-7.5 -6.439)" 
                fill="none" 
                stroke="#fff" 
                strokeWidth="2"/>
            <motion.path
                variants={arrowVariants}
                initial="hidden"
                animate="visible" 
                d="M18,7.5,28.5,18,18,28.5" 
                transform="translate(-5.024 -6.439)" 
                fill="none" 
                stroke="#fff" 
                strokeWidth="2"/>
        </svg>
    </motion.div>
    )
}

export default ScrollDown
