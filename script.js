

const character = document.querySelector(".character");

const heroVisual = document.querySelector(".hero-visual");


// =========================================
// MOUSE PARALLAX
// =========================================

heroVisual.addEventListener("mousemove", (event) => {

    const rect = heroVisual.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 35;
    const rotateY = (centerX - x) / 35;

    character.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
    `;
});


heroVisual.addEventListener("mouseleave", () => {

    character.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale(1)
    `;

});


// =========================================
// CURSOR GLOW
// =========================================

const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

});

// =========================================
// SCROLL REVEAL
// =========================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            } else {

                entry.target.classList.remove("active");

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

// =========================================
// CONTACT PANEL
// =========================================

const contactOpen = document.getElementById("contact-open");
const contactClose = document.getElementById("contact-close");
const contactOverlay = document.getElementById("contact-overlay");

contactOpen.addEventListener("click", () => {
    contactOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
});


contactClose.addEventListener("click", () => {
    contactOverlay.classList.remove("active");
    document.body.style.overflow = "";
});


contactOverlay.addEventListener("click", (event) => {

    if (event.target === contactOverlay) {

        contactOverlay.classList.remove("active");
        document.body.style.overflow = "";

    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        contactOverlay.classList.remove("active");
        document.body.style.overflow = "";

    }

});

// =========================================
// PROJECT IMAGE PARALLAX
// =========================================

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    const image = card.querySelector("img");

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) / rect.width - 0.5;

        const y =
            (event.clientY - rect.top) / rect.height - 0.5;

        image.style.transform = `
            scale(1.1)
            translate(
                ${x * -10}px,
                ${y * -10}px
            )
        `;

    });


    card.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1.02)";

    });

});

/* =========================================================
   INTRO
========================================================= */

const introScreen = document.getElementById("intro-screen");

if (introScreen) {

    const seen = sessionStorage.getItem("kingVictoryIntro");

    if (seen) {

        introScreen.remove();

    } else {

        sessionStorage.setItem("kingVictoryIntro", "true");

        document.body.style.overflow = "hidden";

        /* Start exit */

        setTimeout(() => {
            introScreen.classList.add("exiting");
        }, 1450);

        /* Reveal website */

        setTimeout(() => {

            introScreen.classList.add("intro-hidden");

            document.body.style.overflow = "";

        }, 1950);

        /* Remove intro completely */

        setTimeout(() => {
            introScreen.remove();
        }, 2550);
    }
}