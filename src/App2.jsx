import { motion, useAnimation, useInView, useScroll, useTransform } from "motion/react"
import { useEffect, useRef } from "react"

function App2() {
  //title
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, {margin: "-50px 0px -150px 0px"})
  const titleControl = useAnimation()
  useEffect(() => {
    if (titleInView) {
      titleControl.start("visible")
    } else {
      titleControl.start("hidden"); // Reset the animation when out of view
    }
  }, [titleInView])


  //p1
  const p1Ref = useRef(null)
  const p1InView = useInView(p1Ref, {margin: "-50px 0px -150px 0px"})
  const p1Control = useAnimation()
  useEffect(() => {
    if (p1InView) {
      p1Control.start("visible")
    } else {
      p1Control.start("hidden"); // Reset the animation when out of view
    }
  }, [p1InView])


  //p2
  const p2Ref = useRef(null)
  const p2InView = useInView(p2Ref, {margin: "-50px 0px -150px 0px"})
  const p2Control = useAnimation()
  useEffect(() => {
    if (p2InView) {
      p2Control.start("visible")
    } else {
      p2Control.start("hidden"); // Reset the animation when out of view
    }
  }, [p2InView])
 

  return (
    <>  
      <section className="flex flex-col gap-25 mb-10" >
        <p className="text-slate-100 font-thin text-4xl w-1/2 mx-auto">
          Have fun playing with Framer Motion. It is a very powerful library, when used properly. Add some life to your websites. 
          This is a basic tutorial on how to get up and running with Framer Motion with some TailwindCSS. If you enjoyed this video, please leave a like and also subscribe.
          Have fun playing with Framer Motion. It is a very powerful library, when used properly. Add some life to your websites. 
          This is a basic tutorial on how to get up and running with Framer Motion with some TailwindCSS. If you enjoyed this video, please leave a like and also subscribe.
        </p>

        <motion.h1
          className="text-5xl tracking-wide text-slate-100 text-center" ref={titleRef}
          initial="hidden"
          animate={titleControl}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: 0.3 }}
        >
          Just Keep Scrolling
        </motion.h1>
        
        <motion.p
          className="text-slate-100 font-thin text-4xl w-1/2 mx-auto" ref={p1Ref}
          initial="hidden"
          animate={p1Control}
          variants={{ hidden: { opacity: 0, x: -105 }, visible: { opacity: 1, x: 0 } }}
          transition={{delay: 0.4}}  
        >
          This is a basic tutorial on how to get up and running with Framer Motion with some TailwindCSS. If you enjoyed this video, please leave a like and also subscribe.
        </motion.p>

        <motion.p
          className="text-slate-100 font-thin text-4xl w-1/2 mx-auto" ref={p2Ref}
          initial="hidden"
          animate={p2Control}
          variants={{ hidden: { opacity: 0, x: 105 }, visible: { opacity: 1, x: 0 } }}
          transition={{delay: 0.4}}
        >
          Have fun playing with Framer Motion. It is a very powerful library, when used properly. Add some life to your websites.
        </motion.p>
      </section>
      {/* </div> */}
    </>
  )
}

export default App2