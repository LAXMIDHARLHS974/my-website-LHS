document.addEventListener("DOMContentLoaded", () => {

    if (
        typeof gsap === "undefined" ||
        typeof ScrollTrigger === "undefined"
    ) {
        console.error(
            "GSAP or ScrollTrigger is not loaded."
        );

        return;
    }


    gsap.registerPlugin(ScrollTrigger);


    const scrollSection =
        document.querySelector(".project-scroll");

    const projectPin =
        document.querySelector(".project-pin");

    const projects =
        gsap.utils.toArray(".project-item");

    const dots =
        gsap.utils.toArray(".project-dots .dot");

    const counter =
        document.querySelector("#projectNumber");


    if (
        !scrollSection ||
        !projectPin ||
        projects.length === 0
    ) {
        return;
    }


    let currentProject = 0;


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    projects.forEach((project, index) => {

        gsap.set(project, {

            autoAlpha:
                index === 0 ? 1 : 0,

            x:
                index === 0 ? 0 : 45,

            scale:
                index === 0 ? 1 : .98

        });

    });


    /* =====================================================
       PROJECT CHANGE
    ====================================================== */

    function changeProject(index) {

        if (index === currentProject) {
            return;
        }


        const previous =
            projects[currentProject];

        const next =
            projects[index];


        /* Previous */

        gsap.killTweensOf(previous);

        gsap.to(previous, {

            autoAlpha: 0,

            x: -35,

            scale: .985,

            duration: .35,

            ease: "power2.out"

        });


        /* Next */

        gsap.killTweensOf(next);


        gsap.set(next, {

            display: "grid",

            autoAlpha: 0,

            x: 35,

            scale: .985

        });


        gsap.to(next, {

            autoAlpha: 1,

            x: 0,

            scale: 1,

            duration: .45,

            ease: "power2.out"

        });


        /* Dots */

        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === index
                );

            }
        );


        /* Counter */

        if (counter) {

            counter.textContent =
                String(index + 1)
                    .padStart(2, "0");

        }


        currentProject = index;

    }


    /* =====================================================
       SCROLLTRIGGER
    ====================================================== */

    ScrollTrigger.create({

        trigger:
            scrollSection,

        start:
            "top top",

        end:
            "bottom bottom",

        pin:
            projectPin,

        scrub:
            1,

        anticipatePin:
            1,

        invalidateOnRefresh:
            true,


        onUpdate:
            (self) => {

                let index =
                    Math.floor(
                        self.progress *
                        projects.length
                    );


                if (index < 0) {

                    index = 0;

                }


                if (
                    index >= projects.length
                ) {

                    index =
                        projects.length - 1;

                }


                changeProject(index);

            }

    });


    /* =====================================================
       REFRESH
    ====================================================== */

    window.addEventListener(
        "load",
        () => {

            ScrollTrigger.refresh();

        }
    );


    setTimeout(
        () => {

            ScrollTrigger.refresh();

        },
        500
    );

});