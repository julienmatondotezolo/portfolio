import React, { useState, useEffect } from "react"
import Head from 'next/head'
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import styles from '../styles/Welcome.module.scss'
import styleStart from '../styles/Start.module.scss'
import stylesClickMe from '../styles/global/ClickMe.module.scss'
import Link from "next/link";
import EmjiTextAnimation from "./components/start/EmjiTextAnimation"

const Welcome = () => {
  const x = useMotionValue(445)
  const y = useMotionValue(445)

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [animationName, setAnimationName] = useState(false)

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

  const rotateY = useTransform(x, [0, 1024], [-20, 20])
  const rotateX = useTransform(y, [0, 1000], [20, -20])

  function handleMouse(event) {
    x.set(event.pageX)
    y.set(event.pageY)
    cursorX.set(event.clientX - 16);
    cursorY.set(event.clientY - 16);
    setAnimationName(true)
  }

  function handleMouseOut() {
    setAnimationName(false)
  }

  const textVariants = {
    hidden: {
      y: 20, opacity: 0
    },
    visible: {
      y: 0, opacity: 1
    },
    exit: {
      y: -40, opacity: 0
    }
  }

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

  const textAnimatorVariants = {
    hidden: {
      top: 0,
    },
    visible: {
      top: -114,
    }
  }

  const cursorMotion = {
    rest: { 
      // transform: "translate(-50%, -50%) scale(0)",
      transform: "translate(-50%, -50%) scale(0)",
      ease: "easeOut", 
      duration: 0.2, 
      type: "tween" 
    },
    hover: {
      // transform: "translate(-50%, -50%) scale(1)",
      transform: "translate(-50%, -50%) scale(1)",
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeIn"
      }
    },
    exit: {
      transform: "translate(-50%, -50%) scale(0)",
      ease: "easeOut", 
      duration: 0.2, 
      type: "tween" 
    }
  }

  const strokeVariants = {
    hidden: { 
      height: 0,
    },
    visible: {
      height: "40vh",
    },
    exit: {
      height: 0,
    }
  }

  return (
    <div>
      <Head>
        <title>eMJi - Welcome</title>
        <meta name="description" content="Home - eMji" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.hero}>
        <motion.div
          variants={strokeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: .5, ease: "easeInOut",
          }}
          className={styles.line}
        />
      </div>
      
      <div className={styles.article}>
        <Link href="/home" passHref>
          <motion.article
            initial="rest" 
            whileHover="hover"
            animate="rest"
            exit="exit"
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseOut}
            style={{
              display: "inline-block",
              // rotateY: rotateY,
              // rotateX: rotateX,
            }}>

            <motion.h1
              className={styleStart.textAnimationHolder}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                width: '100%'
              }}
              transition={{ 
                duration: 1,
              }}>
                <motion.span
                  variants={textAnimatorVariants}
                  initial="hidden"
                  animate={animationName ? "visible" : "hidden"}
                  transition={{ 
                    duration: 1,
                  }}>
                  <i>Hello !</i>
                  <i>But you</i>
                </motion.span>
            </motion.h1>
            
            <motion.h1
              className={styleStart.textAnimationHolder}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                width: '100%',
              }}
              transition={{ 
                duration: 1,
                delay: .5
              }}>
              <motion.span
                variants={textAnimatorVariants}
                initial="hidden"
                animate={animationName ? "visible" : "hidden"}
                transition={{ 
                  duration: 1,
                }}>
                <i style={{
                  height: 97,
                }}>My name is</i>
                <i>Can call me</i>
              </motion.span>
            </motion.h1>
          
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ 
                duration: .5,
                delay: 1
              }}>
                {/* Matondo Julien */}
                <EmjiTextAnimation animation={animationName}/>
            </motion.div>

            <motion.div
              variants={cursorMotion}
              className={stylesClickMe.clickMe}
              style={{
                top: cursorY,
                left: cursorX,
              }}
            >
              <p>Click me</p>
            </motion.div>

          </motion.article>
        </Link>
        <motion.figure
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ 
            duration: .5,
            delay: 1.5
          }}>
          <p>Behance</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </motion.figure>
      </div>

      <motion.div
        variants={transitionVariants}
        // initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 1, ease: "easeInOut", delay: .5
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

export default Welcome
