
/* =================================
   1. ANIMASI TYPING TEXT
================================= */

const typingText = document.querySelector("#home h2");

const roles = [
    "Junior Developer",
    "IoT Enthusiast",
    "Robotics Developer",
    "AI Explorer"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent =
        currentRole.substring(0, charIndex);

    let speed = deleting ? 45 : 100;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        speed = 1500;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();


/* =================================
   2. BACKGROUND BINTANG BERGERAK
================================= */

const canvas = document.createElement("canvas");

canvas.id = "stars-canvas";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stars = [];

    for (let i = 0; i < 120; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(0, 183, 255, ${star.opacity})`;

        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateStars);
}

resizeCanvas();
animateStars();

window.addEventListener("resize", resizeCanvas);


/* =================================
   3. ANIMASI SAAT SCROLL
================================= */

const revealElements = document.querySelectorAll(
    "section > *, .project-card, .skills-list div"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =================================
   4. NAVBAR AKTIF
================================= */

const navLinks = document.querySelectorAll("nav ul li a");

const sections = document.querySelectorAll("section");

const navObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {
                        link.classList.add("active");
                    }
                });

            }
        });
    },
    {
        threshold: 0.4
    }
);

sections.forEach(section => {
    navObserver.observe(section);
});


/* =================================
   5. TAHUN OTOMATIS FOOTER
================================= */

const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML =
        `&copy; ${new Date().getFullYear()} Anum Muhammad Firdaus. All Rights Reserved.`;
}

console.log("Portfolio JavaScript berhasil dijalankan!");
