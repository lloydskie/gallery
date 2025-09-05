"use strict";
(function () {
  window.onload = () => {
    const gallery = document.querySelector("#gallery");
    const time = 10000;
    // Physics for each photo
    let figures = [];
    let swingStates = [];
  const damping = 0.96;
  const spring = 0.04;
  const maxSwing = 6;

    function setupFigures() {
      figures = Array.from(document.querySelectorAll('#gallery figure'));
      swingStates = figures.map(() => ({ angle: 0, velocity: 0 }));

      // Modal logic
      const modal = document.getElementById('imgModal');
      const modalImg = document.getElementById('modalImg');
      const caption = document.getElementById('caption');
      const downloadBtn = document.getElementById('downloadBtn');
      const closeBtn = modal.querySelector('.close');

      figures.forEach(fig => {
        const img = fig.querySelector('img');
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
          modal.style.display = 'block';
          modalImg.src = img.src;
          caption.textContent = img.alt;
          downloadBtn.href = img.src;
          downloadBtn.setAttribute('download', img.alt);
        });
      });
      closeBtn.onclick = function() {
        modal.style.display = 'none';
      };
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    }

    function animateSwing() {
      let stillSwinging = false;
      figures.forEach((fig, i) => {
        let state = swingStates[i];
  state.angle += state.velocity * 0.6;
  state.velocity *= damping;
  state.velocity -= state.angle * spring;
        // Clamp angle
        state.angle = Math.max(-maxSwing, Math.min(maxSwing, state.angle));
        fig.style.transform = `rotate(${state.angle}deg)`;
  if (Math.abs(state.angle) > 0.01 || Math.abs(state.velocity) > 0.01) {
          stillSwinging = true;
        }
      });
      if (stillSwinging) {
        requestAnimationFrame(animateSwing);
      }
    }

    // Scroll triggers swing for all, each with random velocity
    document.addEventListener('scroll', () => {
      if (!figures.length) return;
      figures.forEach((fig, i) => {
        // Some randomness, some similarity
        const base = Math.random() * 0.7 + 0.3;
        swingStates[i].velocity += ((Math.random() > 0.5 ? 1 : -1) * base * 2);
      });
      animateSwing();
    });

    // Mouse movement triggers swing for nearest photo only
    document.addEventListener('mousemove', e => {
      if (!figures.length) return;
      let minDist = Infinity, nearestIdx = -1;
      figures.forEach((fig, i) => {
        const rect = fig.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(cx - e.clientX, cy - e.clientY);
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = i;
        }
      });
      if (nearestIdx !== -1) {
        swingStates[nearestIdx].velocity += (Math.random() - 0.5) * 2;
        animateSwing();
      }
    });

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
        setupFigures();
      })
      .catch(err => console.error("Error loading photos.json", err));
  };
})();