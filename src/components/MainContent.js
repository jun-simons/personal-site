// src/components/MainContent.js
import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'; 
import Scrollbar from 'smooth-scrollbar';
import CircleType from 'circletype';

import { ReactComponent as Blob1 } from "../assets/blobanimation.svg";
import { ReactComponent as Blob2 } from "../assets/blobanimation2.svg";
import { ReactComponent as Blob3 } from "../assets/blobanimation3.svg";
import { ReactComponent as Blob4 } from "../assets/blobanimation4.svg";



const MainContent = () => {
  useEffect(() => {
    // GSAP Timeline loader

    const t1 = gsap.timeline();

    t1.from(".loader", {
        y: 100,
        duration: 1.4,
        ease: "power4.out",
        delay: 1.4,
        opacity: 0
    },
    "-=1")

    t1.from(".loader2", {
        opacity:0,
        duration: 2,
     }, 
     "-=.8")


    // gsap.to('.title-out', {
    //     x: '-100%', // Move the element to the left of the screen
    //     opacity: 0, // Optionally fade out the element
    //     ease: 'power2.inOut', // Use a specific easing function
    //     scrollTrigger: {
    //         trigger: '.title-out', // Trigger on the landing section
    //         start: 'bottom center', // Start when the top of the landing section is 80% in view
    //         // end: 'bottom 20%', // End when the bottom of the landing section is 20% in view
    //         scrub: 0.5, // Adjust the scrub value to lock the scroll animation to the scroll bar
    //         markers: true
    //     },
    // });

    // Circular Text scroll cue
    const text = document.getElementById('rotated')
    const rotate = new CircleType(text).radius(70);

    window.addEventListener('scroll', function(){
        text.style.transform = 'rotate(' + (window.scrollY * 0.15) + 'deg)'
      })


    //GSAP ScrollTrigger and Smooth Scrollbar

    gsap.registerPlugin(ScrollTrigger);
    
    // smooth scroll effect
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

    // functions to adjust background color/text color
    function update_bg_forward(section) {
        gsap.to(
            '.main', {
                backgroundColor: section.dataset.bgcolor, 
                color: section.dataset.textcolor, 
                overwrite: 'auto',
            });
        const loadElements = section.querySelectorAll('.load');
        const header_loadElements = section.querySelectorAll('.hload');

        // Use GSAP to animate each load element
        gsap.fromTo(
            loadElements,
            { opacity: 0, y: 50 }, // Starting state
            {
                opacity: 1, // Ending state
                y: 0,
                duration: 0.7,
                stagger: 0.4,
            }
        );

        gsap.fromTo(
            header_loadElements,
            { opacity: 0, y: 50 }, // Starting state
            {
                opacity: 1, // Ending state
                y: 0,
                duration: 0.5,
                stagger: 0.2,
                delay: 0.5,
            }
        );

        const leaveElements = section.querySelectorAll('.leave');
        gsap.to(leaveElements, {
            opacity: 0,
            duration: 1,
        });
    }

    function update_bg_backward(section, prevBackgroundColor, prevTextColor) {
        gsap.to('.main', {
            backgroundColor: prevBackgroundColor,
            color: prevTextColor,
            overwrite: 'auto',
        });
        const loadElements = section.querySelectorAll('.load');
        const header_loadElements = section.querySelectorAll('.hload');
        gsap.to(loadElements,
            {
                opacity: 0,
                duration: 1,
            })
        gsap.to(header_loadElements,
            {
                opacity: 0,
                duration: 1,
            })
    }

    function on_leave(section) {
        const leaveElements = section.querySelectorAll('.leave');
        gsap.to(leaveElements,
            {
                opacity: 0,
                duration: 1,
            })
    }


    //control sequence for section color changes
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
                update_bg_forward(section),
            onLeave: ()=> 
                on_leave(section),
            onLeaveBack: () => 
                update_bg_backward(section, prevBackgroundColor, prevTextColor),
            });

        });

        return () => {};
  }, []);

  return (
    <body class="min-h-screen bg-[#1f1f1f]">
        
        <div className="main h-screen w-full overflow-auto bg-grain">
            {/* Landing Section: */}
            <section className="landing min-h-screen w-screen relative flex flex-col items-center font-alt-display "
            data-bgcolor="#C9C3BD"
            data-textcolor="#000000">
                <div className = "grain absolute w-full h-full z-40 bg-grain"></div>
                <h1 className="loader title-out text-[11rem] mt-64 z-30">JUN SIMONS</h1>
                <div className="blur-landing w-full h-full z-10 bg-[#f7f3ed] absolute">
                    <div className="blobs absolute z-10 min-w-full flex flex-col">
                        
                        <Blob3 style={{position: 'absolute', width: '700px', height: '700px', alignSelf:'center', marginLeft: '-600px'}}/>
                        
                        <Blob4 style={{position: 'absolute', width: '700px', height: '700px', alignSelf:'center', marginLeft: '600px'}}/>
                        
                        <Blob2 style={{position: 'absolute', width: '500px', height: '600px', alignSelf:'center', marginLeft: '-200px', marginTop: '200px'}}/>
                        
                        <Blob1 style={{position: 'absolute', width: '700px', height: '700px',alignSelf:'center', marginLeft: '500px' }}/>
                    </div>
                </div>
                <div class="loader2 wheel animate-spin-slow circular-text absolute z-20 mr-[84%] mt-[40%]">
                    <span className = "animate-spin" id="rotated">
                        scroll • scroll • scroll • scroll • scroll • scroll • 
                    </span>
                </div>
            </section>

            {/* About Me Section: */}
            <section className="min-h-screen w-screen relative flex flex-col items-center"
            data-bgcolor="#C9C3BD"  
            data-textcolor="#121111">
                <div className="w-3/5">
                    <h2 className="load opacity-0 mt-32 font-display-lite text-4xl text-left leading-12">
                        I'm a sophomore at Rensselaer Polytechnic Institute studying Computer Science, 
                        where I'm <b>focusing on my fundamentals</b>
                    </h2>
                    <h2 className="load opacity-0 mt-10 font-display-lite text-4xl text-left leading-12">
                        <b>Top Skills:</b> Python, C++, AWS, Docker, Kubernetes, Git, React
                    </h2>
                    <h2 className="load opacity-0 mt-16 font-display-lite text-4xl text-left leading-12">
                        At <b>Johnson and Johnson</b> I built containerized web apps, optimized HPC clusters, reduced AWS spending,
                        and implemented auto-QC for digital pathology images.
                    </h2>
                    <h2 className="load opacity-0 mt-10 font-display-lite text-4xl text-left leading-12">
                        I also like playing with hardware, and using engineering to make art!
                    </h2>
                    <h2 className="load leave opacity-0 mt-10 font-display text-4xl text-left leading-12">
                        Scroll to view projects
                    </h2>
                </div>
            </section>

            {/* Projects Section: */}
            <section className="mt-20 min-h-screen w-screen relative flex flex-col justify-left px-32"
            data-bgcolor="#141414"
            data-textcolor="#ebe8e6">
                <h2 className="hload opacity-0 font-display text-8xl ">Projects</h2>
                <h2 className="hload opacity-0 mt-32 font-display-lite text-4xl text-left leading-12">
                [ Coming soon :&#41; ]
                </h2>
            </section>
            
            {/* Contact Section: */}
            <section className="min-h-screen w-screen relative flex items-center justify-center px-32 mt-0"
            data-bgcolor="#070707"
            data-textcolor="#ffffff">
                <h2 className="hload opacity-0 font-display text-8xl ">Contact me</h2>
                <h2 className="hload opacity-0 mt-32 font-display-lite text-4xl text-left leading-12">
                Instagram
                </h2>
            </section>
        </div>
        
    </body>
  );
};

export default MainContent;
