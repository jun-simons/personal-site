// src/components/MainContent.js
import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'; 
import Scrollbar from 'smooth-scrollbar';

const MainContent = () => {
  useEffect(() => {

    const t1 = gsap.timeline();
    t1.from(".first-load",  {
        opacity: 0,
        duration: 1.4,
        y: -30,
        ease: "power4.out",
        delay: .5,
        stagger: {
            amount: 0.1
        }
    })

    t1.from(".second-load", {
        y: 100,
        duration: 1.4,
        ease: "power4.out",
        delay: 1.4,
        opacity: 0
    },
    "-=1.4")

    t1.to(".card", {
        minWidth: 100,
        minHeight: 100,
        duration: 1.4,
        ease: "power4.out",
        delay: 1.4
    },
    "-=.8")

    gsap.registerPlugin(ScrollTrigger);
    
    const scrollBar = Scrollbar.init(document.querySelector('.main'), {
        damping: 0.06,
        delegateTo: document,
        alwaysShowTracks: false,
        speed: 6,
    });
    ScrollTrigger.defaults({
        scroller: '.main',
    });
    ScrollTrigger.scrollerProxy('.main', {
        scrollTop(value) {
            if (arguments.length) {
                scrollBar.scrollTop = value;
            }
            return scrollBar.scrollTop;
        },
    });

    scrollBar.addListener(ScrollTrigger.update);

    //loop sections
    const sectionColor = document.querySelectorAll('[data-bgcolor]');
    sectionColor.forEach((section, i) => {
        //if index 0, do nothing, else store color value for previous
        const prevBackgroundColor = i === 0 ? '' : sectionColor[i-1].dataset.bgcolor;
        const prevTextColor = i === 0 ? '' : sectionColor[i-1].dataset.textcolor;

        ScrollTrigger.create({
            trigger: section,
            scroller: '.main',
            start: 'top 50%',
            onEnter: () => 
                gsap.to(
                    '.main', {
                        backgroundColor: section.dataset.bgcolor, 
                        color: section.dataset.textcolor, 
                        overwrite: 'auto',
                    }),
            onLeaveBack: () => 
                gsap.to('.main', {
                    backgroundColor: prevBackgroundColor,
                    color: prevTextColor,
                    overwrite: 'auto',
                }),
            });

        });

        return () => {};
  }, []);

  return (
    <body class="min-h-screen bg-[#1f1f1f]">
        <div className="main h-screen w-full overflow-auto">
            <section className="min-h-screen w-screen relative flex flex-col items-center justify-center font-display px-64"
            data-bgcolor="#ebe1d8"
            data-textcolor="#000000">
                {/* <div className="card bg-[#b5ada5] flex flex-col items-center justify-center min-w-[600px] min-h-[500px]"> */}
                    <h1 className="first-load  text-6xl">Hello, my name is:</h1>
                    <div className="reveal overflow-hidden">
                        <h1 className="second-load text-8xl mt-7">Jun Simons</h1>
                    </div>
                    <hr className="first-load w-[480px] h-[3px] mt-1 bg-black border-0"></hr>
                {/* </div> */}
            </section>
            <section className="min-h-screen w-screen relative flex flex-col items-center  px-32"
            data-bgcolor="#1f1f1f"
            data-textcolor="#ebe8e6">
                <div className="w-3/5">
                    <h2 className="font-display-lite text-4xl text-left leading-12">
                        I'm a sophomore at Rensselaer Polytechnic Institute studying Computer Science, 
                        where I'm <b>focusing on my fundamentals</b>
                    </h2>
                    <h2 className="mt-10 font-display-lite text-4xl text-left leading-12">
                        At <b>Johnson and Johnson</b> I built containerized web apps, optimized HPC clusters, reduced AWS spending,
                        and implemented auto-QC for digital pathology images.
                    </h2>
                    <h2 className="mt-10 font-display-lite text-4xl text-left leading-12">
                        <b>Top Skills:</b> Python, React, C++, AWS, Docker, Kubernetes, Git
                    </h2>
                </div>
                
                {/* Your About Me content goes here */}
            </section>

            <section className="min-h-screen w-screen relative flex  justify-center px-32"
            data-bgcolor="#ebe1d8"
            data-textcolor="#000000">
                <h2 className="font-display text-6xl">Projects</h2>
                {/* Your Projects content goes here */}
            </section>
            <section className="min-h-screen w-screen relative flex items-center justify-center px-32"
            data-bgcolor="#070707"
            data-textcolor="#ffffff">
                <h1 className="text-2xl font-bold">Jun Simons</h1>
            </section>
        </div>
    </body>
  );
};

export default MainContent;
