const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const icon = menuToggle.querySelector("i");
const links = document.querySelectorAll(".nav-links a");

// Open and close the menu
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});

// Close the menu when a navigation link is clicked
links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});



// ================= ACTIVE NAVIGATION =========================================================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ================= SCROLL REVEAL ====================================================================

// ================= SCROLL REVEAL =================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.15
});

// Sections
document.querySelectorAll(
".about, .services, .skills, .projects, .contact, .footer"
).forEach(section => {

    section.classList.add("hidden");
    observer.observe(section);

});

// Cards (staggered)
document.querySelectorAll(
".service-card, .skill-card, .project-card"
).forEach((card,index)=>{

    card.style.transitionDelay = `${index * 0.15}s`;

    observer.observe(card);

});

// ================= STICKY HEADER =================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

});

// =================LOADING ANIMATION-------PRELOADER =================

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 800);

});

// ================= TYPING ANIMATION =================================================================

const words = [
    "Full-Stack Web Developer",
    "Graphics Designer",
    "Python programmer",
    "Product Manager",
    "Data Analyst",
    "Founder, ACT TECH WORLD"
];

const typingText = document.getElementById("typing-text");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!deleting){

        typingText.textContent = currentWord.substring(0, charIndex++);
    }
    else{

        typingText.textContent = currentWord.substring(0, charIndex--);
    }

    let speed = 100;

    if(!deleting && charIndex === currentWord.length + 1){

        deleting = true;
        speed = 1500;

    }else if(deleting && charIndex === 0){

        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;

    }else{

        speed = deleting ? 50 : 100;

    }

    setTimeout(typeEffect, speed);

}

typeEffect();

// ================= SKILL BAR ANIMATION =================

const progressBars = document.querySelectorAll(".progress-bar");

const progressObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const bar = entry.target;

            bar.style.width = bar.dataset.progress + "%";

            progressObserver.unobserve(bar);

        }

    });

},{
    threshold:0.5
});

progressBars.forEach(bar => {

    progressObserver.observe(bar);

});


// ================= THEME TOGGLE =================

const themeBtn = document.getElementById("theme-toggle");

const body = document.body;

const savedTheme = localStorage.getItem("theme");

if(savedTheme){

    body.classList.add(savedTheme);

    if(savedTheme === "light-mode"){

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

    }

}

themeBtn.addEventListener("click",()=>{

    body.classList.toggle("light-mode");

    if(body.classList.contains("light-mode")){

        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("theme","light-mode");

    }else{

        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

        localStorage.removeItem("theme");

    }

});


// ================= EMAILJS CONTACT FORM =================

emailjs.init("zMRj8O4-n5l83Lubq");

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const button = contactForm.querySelector("button");

    button.innerHTML = "Sending...";
    button.disabled = true;

    emailjs.sendForm(
        "service_j8waolo",
        "template_h686u7g",
        contactForm
    )

    .then(() => {

        alert("✅ Message sent successfully!");

        contactForm.reset();

        button.innerHTML = "Send Message";
        button.disabled = false;

    })

    .catch((error) => {

    console.error(error);

    alert("❌ Failed to send message.");

    button.innerHTML = "Send Message";
    button.disabled = false;

});

});

