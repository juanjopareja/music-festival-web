document.addEventListener("DOMContentLoaded", function() {
    startApp();
})

function startApp() {
    fixedNavigation();
    createGallery();
    scrollNav();
}

function fixedNavigation() {
    const bar = document.querySelector(".header");
    const festivalAbout = document.querySelector(".festival-about");
    const body = document.querySelector("body");

    window.addEventListener("scroll", function() {
        if (festivalAbout.getBoundingClientRect().top < 0) {
            bar.classList.add("fixed");
            body.classList.add("body-scroll");
        } else {
            bar.classList.remove("fixed");
            body.classList.remove("body-scroll");
        }
    })
}

function scrollNav() {
    const links = document.querySelectorAll(".main-navigation a");
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();

            const sectionScroll = event.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({ behavior: "smooth"});
        })
    });
}

function createGallery() {
    const gallery = document.querySelector(".image-gallery");

    for (let i = 1; i <= 12; i++) {
        const image = document.createElement("picture");
        image.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galería">
        `;   
        image.onclick = function() {
            showImage(i);
        }

        gallery.appendChild(image);
    }
}

function showImage(id) {
    const image = document.createElement("picture");
    image.innerHTML = `
        <source srcset="build/img/big/${id}.avif" type="image/avif">
        <source srcset="build/img/big/${id}.webp" type="image/webp">
        <img loading="lazy" src="build/img/big/${id}.jpg" alt="imagen galería">
    `;

    // Create overlay
    const overlay = document.createElement("DIV");
    overlay.appendChild(image);
    overlay.classList.add("overlay");
    overlay.onclick = function() {
        const body = document.querySelector("body");
        body.classList.remove("fix-body");
        overlay.remove();
    }

    // Add HTML overlay
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fix-body");
    
    // Close overlay button
    const closeImage = document.createElement("P");
    closeImage.textContent = "X";
    closeImage.classList.add("btn-close");
    closeImage.onclick = function() {
        const body = document.querySelector("body");
        body.classList.remove("fix-body");
        overlay.remove();
    }
    overlay.appendChild(closeImage);
}