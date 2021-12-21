import React from 'react'
import GradientLight from './global/GradientLight'
import Navigation from './global/Navigation'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});
// import AnimatedCursor from "react-animated-cursor"

function Layout({children}) {
    const router = useRouter();
    return (
        <>
            <div className='contentFill'></div>
            <main>
                <div>
                    {children}
                </div>
            </main>
            {router.pathname !== "/" ? <Navigation /> : ''}
            <GradientLight />
            <AnimatedCursor
                innerSize={15}
                outerSize={40}
                color='207, 8, 27'
                outerAlpha={0.1}
                innerScale={0.7}
                outerScale={2}
            />
            <div className='toSmale'>
		        <article>
                    <h1 className="bold">No mobile version sorry</h1>
                    <h3 className="bold">Watch on desktop it's sick.</h3>
                </article>
            </div>
        </>
    )
}

export default Layout
