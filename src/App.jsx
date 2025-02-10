import { motion, useAnimation, useInView, useScroll, useTransform } from "motion/react"
import { svg } from "motion/react-client"
import { useEffect, useRef } from "react"

const gridContainerVariants = {
  hidden: { opacity: 0 }, 
  show:{ 
    opacity:1,
    transition: { staggerChildren: 0.5, },
  },
}

const gridSquareVariants = {
  hidden: {opacity: 0}, 
  show: {opacity: 1}, 
}

const svgIconVariants = {
  hidden: { opacity: 0, pathLength: 0, fill: 'rgba(252, 211, 77, 0)'},
  visible: { opacity: 1, pathLength: 1, fill: "rgba(252, 211, 77, 1)"}
}


function App() {
  const { scrollYProgress: completionProgress } = useScroll()

  const containerRef = useRef(null)

  const isInView = useInView(containerRef, { once: true })
  const mainControls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  })

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "0%"]
  )

  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"]
  )

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible")
    }
  }, [isInView])

  return (
    <div className='card-container'>
      <motion.section 
        variants={ 
          gridContainerVariants
        } 
        initial='hidden'
        animate='show'
        className='grid'
      >
        {/* Fade Up */}
        <motion.div 
          className='card'
          variants={gridSquareVariants}
        >
          <motion.div
            className="w-20 h-20 bg-stone-100 rounded-lg" 
            initial={{ opacity: 0, y: 60}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.div 
            className="w-20 h-20 bg-stone-100 rounded-full"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut", delay: 0.7 }}
          />
        </motion.div>

        {/* Shape Shifting */}
        <motion.div 
          className='card'
          variants={gridSquareVariants}
        >
          <motion.div
            className="w-1/3 h-1/3 shadow-md bg-rose-400 rounded-lg"
            animate={{
              scale:  [1.2,  0.8,   2,  1.2],
              rotate: [0, -70, 120, 90],
              borderRadius: ['20%', '20%', '35%', '20%'],
            }}
            transition={{ 
              duration: 1, 
              ease: 'easeInOut', 
              repeat: Infinity, 
              repeatDelay: '1',
              delay: 1,
            }}
          />
        </motion.div>
        
        {/* Button Hover */}
        <motion.div 
          className='card'
          variants={gridSquareVariants}
        >
          <motion.button 
            className="bg-emerald-600 w-1/2 py-4 px-2 rounded-lg text-2xl text-gray-100 font-light tracking-wide"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, background: '#d1d5bd', color: 'black' }}
            transition={{ bounceDamping: 10, bounceStiffness: 600 }}
          >
            Tap!
          </motion.button>
        </motion.div>
        
        {/* Drag */}
        <motion.div 
          className='card'
          variants={gridSquareVariants}
        >
          <motion.div
            className="w-1/3 h-1/3 bg-orange-500 rounded-3xl cursor-grab"
            drag
            dragConstraints={{
              top: -70,
              right: 70,
              bottom: 70,
              left: -70,
              // top: 0,
              // right: 0,
              // bottom: 0,
              // left: 0,
            }}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
          /> 
        </motion.div>

        {/* Scroll */}
        <motion.div 
          className='card'
          variants={gridSquareVariants}
        >
          <motion.div className="w-40 aspect-square bg-gray-50/20 rounded-xl">
            <motion.div
              className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
              style={{ scaleY: completionProgress }}
            />
          </motion.div>
        </motion.div>
        
        {/* Animated SVG */}
        <motion.div 
          className='card'
          variants={gridSquareVariants}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-1/2 stroke-amber-500 stroke-[0.5]"
          >
            <motion.path
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              variants={svgIconVariants}
              initial="hidden"
              animate="visible"
              transition={{
                default: {duration: 2, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1},
                fill: {duration: 2, ease: 'easeIn', delay: 2, repeat: Infinity, repeatType: "reverse", repeatDelay: 1}
              }}
            /> 
          </motion.svg>
        </motion.div>

      </motion.section>
      
      {/* Text Transform */}
      <section className="flex flex-col gap-10 mb-10" ref={containerRef}>
        <motion.h1
          className="text-5xl tracking-wide text-slate-100 text-center"
          animate={mainControls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{ delay: 0.3 }}
        >
          Just Keep Scrolling
        </motion.h1>
        <motion.p
          style={{ translateX: paragraphOneValue }}
          className="text-slate-100 font-thin text-4xl w-1/2 mx-auto"
        >
          This is a basic tutorial on how to get up and running with Framer
          Motion with some TailwindCSS. If you enjoyed this video, please leave
          a like and also subscribe.
        </motion.p>
        <motion.p
          style={{ translateX: paragraphTwoValue }}
          className="text-slate-100 font-thin text-4xl w-1/2 mx-auto"
        >
          Have fun playing with Framer Motion. It is a very powerful library,
          when used properly. Add some life to your websites.
        </motion.p>
      </section>
    </div>
  )
}

export default App