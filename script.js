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

// ===============================
// GOOGLE DRIVE GALLERY
// ===============================

const DRIVE_API_KEY = "AIzaSyA8HzNgznfUHjDLRcKiEJdRsVcbL5DsNik";
const DRIVE_FOLDER_ID = "1eJbvIcny-UfhRuZax-FXg6SZM2bj-uX1";

async function loadGoogleDriveGallery() {

    const photoGrid = document.getElementById("photoGrid");

    if (!photoGrid) return;

    photoGrid.innerHTML = "<p>Loading photos...</p>";

    const query =
        `'${DRIVE_FOLDER_ID}' in parents and trashed = false and mimeType contains 'image/'`;

    const url =
        "https://www.googleapis.com/drive/v3/files" +
        "?q=" + encodeURIComponent(query) +
        "&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)" +
        "&pageSize=100" +
        "&key=" + encodeURIComponent(DRIVE_API_KEY);

    try {

        const response = await fetch(url);
        const data = await response.json();

        console.log("Google Drive:", data);

        if (!response.ok) {
            throw new Error(
                data.error?.message || "Google Drive API Error"
            );
        }

        photoGrid.innerHTML = "";

        if (!data.files || data.files.length === 0) {

            photoGrid.innerHTML =
                "<p>No photos found in Google Drive.</p>";

            return;
        }

        data.files.forEach(file => {

            // Card
            const card = document.createElement("div");
            card.className = "photo-card";

            // Full image link
            const fullImage =
                "https://drive.google.com/uc?export=view&id=" + file.id;

            // Image
            const img = document.createElement("img");

            img.src = file.thumbnailLink;
            img.alt = file.name;
            img.loading = "lazy";

            // CLICK IMAGE = FULL IMAGE
            img.addEventListener("click", function () {
                window.open(fullImage, "_blank");
            });

            // Download button
            const downloadButton =
                document.createElement("a");

            downloadButton.className = "download-btn";

            downloadButton.textContent = "⬇ Download";

            if (file.webContentLink) {

                downloadButton.href =
                    file.webContentLink;

                downloadButton.target = "_blank";

            } else {

                downloadButton.href =
                    "https://drive.google.com/uc?export=download&id=" +
                    file.id;

                downloadButton.target = "_blank";
            }

            card.appendChild(img);
            card.appendChild(downloadButton);

            photoGrid.appendChild(card);
        });

    } catch (error) {

        console.error("Gallery Error:", error);

        photoGrid.innerHTML = `
            <div class="gallery-error">
                <h3>Gallery could not be loaded</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

document.addEventListener(
    "DOMContentLoaded",
    loadGoogleDriveGallery
);