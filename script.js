/* =====================================================
   CURRENT YEAR
===================================================== */

const year = document.getElementById("year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}



/* =====================================================
   MOBILE MENU
===================================================== */

const mobileToggle =
    document.getElementById("mobileToggle");

const navLinks =
    document.getElementById("navLinks");


if (mobileToggle) {

    mobileToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("open");

            const icon =
                mobileToggle.querySelector("i");

            icon.classList.toggle("fa-bars");

            icon.classList.toggle("fa-xmark");

        }
    );

}



/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            navLinks.classList.remove("open");

            const icon =
                mobileToggle.querySelector("i");

            icon.classList.add("fa-bars");

            icon.classList.remove("fa-xmark");

        }
    );

});



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const sections =
            document.querySelectorAll(
                "main section[id]"
            );

        let current = "home";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 120;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.id;

                }

            }
        );


        navItems.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );


                const href =
                    item.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    "#" + current
                ) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);



/* =====================================================
   HERO SLIDER DOTS
===================================================== */

const dots =
    document.querySelectorAll(
        ".dot"
    );


dots.forEach(
    function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                dots.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                dot.classList.add(
                    "active"
                );

            }
        );

    }
);



/* =====================================================
   HERO ARROWS
===================================================== */

const previousButton =
    document.getElementById(
        "prevSlide"
    );


const nextButton =
    document.getElementById(
        "nextSlide"
    );


let currentSlide = 0;


function changeDot() {

    dots.forEach(
        function (dot) {

            dot.classList.remove(
                "active"
            );

        }
    );


    if (dots[currentSlide]) {

        dots[currentSlide]
            .classList.add("active");

    }

}


if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            currentSlide++;

            if (
                currentSlide >=
                dots.length
            ) {

                currentSlide = 0;

            }

            changeDot();

        }
    );

}


if (previousButton) {

    previousButton.addEventListener(
        "click",
        function () {

            currentSlide--;

            if (currentSlide < 0) {

                currentSlide =
                    dots.length - 1;

            }

            changeDot();

        }
    );

}



/* =====================================================
   AUTO SLIDE DOTS
===================================================== */

setInterval(
    function () {

        currentSlide++;

        if (
            currentSlide >=
            dots.length
        ) {

            currentSlide = 0;

        }

        changeDot();

    },
    5000
);
const heroBackground =
    document.getElementById("heroBackground");

const heroImages = [
    "images/hero1.jpg",
    "images/hero2.jpg",
    "images/hero3.jpg"
];

let currentImage = 0;

function changeHeroImage() {

    // Fade out
    heroBackground.style.opacity = "0";

    setTimeout(function () {

        // Next image
        currentImage++;

        if (currentImage >= heroImages.length) {
            currentImage = 0;
        }

        heroBackground.style.backgroundImage =
            `url("${heroImages[currentImage]}")`;

        // Fade in
        heroBackground.style.opacity = "1";

    }, 400);
}


// Change image every 10 seconds
setInterval(changeHeroImage, 10000);