"use strict";
(function () {
  window.onload = () => {
    const gallery = document.querySelector("#gallery");
    const time = 10000;
    function animStart() {
      if (!gallery.classList.contains("active")) {
        gallery.classList.add("active");
        setTimeout(animEnd, time);
      }
    }
    function animEnd() {
      gallery.classList.remove("active");
      gallery.offsetWidth;
    }
    document.addEventListener("scroll", animStart);
    window.addEventListener("resize", animStart);
    animStart();

    // Load JSON with photo lists
    fetch("photos.json")
      .then(res => res.json())
      .then(data => {
        for (const [folder, files] of Object.entries(data)) {
          const title = document.createElement("div");
          title.className = "batch-title";
          title.textContent = folder;
          gallery.appendChild(title);
          files.forEach(file => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.src = `assets/${folder}/${file}`;
            img.alt = file;
            figure.appendChild(img);
            const caption = document.createElement("figcaption");
            caption.textContent = file;
            figure.appendChild(caption);
            gallery.appendChild(figure);
          });
        }
      })
      .catch(err => console.error("Error loading photos.json", err));
  };
})();