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

    gsap.registerPlugin(ScrollTrigger);
    
    const scrollBar = Scrollbar.init(document.querySelector('.main'), {
        damping: 0.06,
        delegateTo: document,
        alwaysShowTracks: false,
        speed: 3,
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
    <div className="main h-screen w-full flex flex-col overflow-auto">
        <section className="min-h-screen w-screen relative flex flex-col items-center justify-center font-display px-64"
        data-bgcolor="#b5ada5"
        data-textcolor="#000000">
            <div className="card">
                <h1 className="first-load text-6xl">Hello, my name is:</h1>
                <div className="reveal overflow-hidden">
                    <h1 className="second-load text-8xl mt-7">Jun Simons</h1>
                </div>
                <hr className="first-load w-[480px] h-[3px] mt-1 bg-black border-0"></hr>
            </div>
        </section>
        <section className="min-h-screen w-screen relative flex items-center justify-center px-32"
        data-bgcolor="#1f1f1f"
        data-textcolor="#ebe8e6">
            <h2>About Me</h2>
            {/* Your About Me content goes here */}
        </section>

        <section className="min-h-screen w-screen relative flex items-center justify-centern px-32"
        data-bgcolor="#070707"
        data-textcolor="#ffffff">
            <h2>Projects</h2>
            {/* Your Projects content goes here */}
        </section>
        <section className="min-h-screen w-screen relative flex items-center justify-center px-32"
        data-bgcolor="#070707"
        data-textcolor="#ffffff">
            <h1 className="text-2xl font-bold">Jun Simons</h1>
        </section>
    </div>
  );
};

export default MainContent;
