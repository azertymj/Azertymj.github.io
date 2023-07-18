
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id  = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(Links => {
                Links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');

    header.classList.toggle('stiky', window.scrollY >100);

    menuIcon.classList.toggle('bx-x');
    navbar.classList.remove('active');
};

ScrollReveal({ 
    // reset: true,
    distance:'80px',
    duration: 2000,
    delay: 200,
 });

 ScrollReveal().reveal('.home-content, .heading ',{ origin: 'top'});
 ScrollReveal().reveal('.home-img, .service-container, .portfolio-box, .contact form ',{ origin: 'bottom'});
 ScrollReveal().reveal('.home-content h1, .about-img ',{ origin: 'left'});
 ScrollReveal().reveal('.home-content p, ..about-content',{ origin: 'right'});



 const typed =new Typed('.multiple-text',{
    strings:['Mobile Developer','Game Developer', 'Frontend Developer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
 })
 
function downloadDocument() {
    // URL du document à télécharger
    var documentUrl = "docs/cv.pdf";

    // Création d'un élément de lien temporaire
    var link = document.createElement("a");
    link.href = documentUrl;
    link.download = "cv.pdf";

    // Ajout de l'élément de lien au document
    document.body.appendChild(link);

    // Simulation du clic sur le lien pour déclencher le téléchargement
    link.click();

    // Suppression de l'élément de lien du document
    document.body.removeChild(link);
}
 
// Sélection de l'élément HTML
var element = document.getElementByClass("btn");

// Ajout de la classe invisible à l'élément
element.classList.add("invisible");
