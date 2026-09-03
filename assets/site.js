/* ============================================================
   Portfolio — shared behaviors (index + project pages)
   Vanilla JS, no build step. Every feature checks that its
   target elements exist before wiring up, so this file is safe
   to include on any page regardless of markup present.
   ============================================================ */
(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- theme toggle (light/dark) ---------- */
    const themeToggles = document.querySelectorAll('[data-theme-toggle]');
    if (themeToggles.length) {
        const getTheme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
        const syncIcons = () => {
            const theme = getTheme();
            themeToggles.forEach((btn) => {
                const icon = btn.querySelector('i');
                if (icon) icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
                btn.setAttribute('aria-label', theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair');
            });
        };
        themeToggles.forEach((btn) => {
            btn.addEventListener('click', () => {
                const next = getTheme() === 'light' ? 'dark' : 'light';
                if (next === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                }
                try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
                syncIcons();
            });
        });
        syncIcons();
    }

    /* ---------- mobile menu ---------- */
    const menuBtn = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', String(isOpen));
            menuBtn.querySelector('i')?.classList.toggle('fa-bars', !isOpen);
            menuBtn.querySelector('i')?.classList.toggle('fa-xmark', isOpen);
        });
        mobileMenu.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.querySelector('i')?.classList.add('fa-bars');
                menuBtn.querySelector('i')?.classList.remove('fa-xmark');
            });
        });
    }

    /* ---------- nav hide-on-scroll + scrollspy ---------- */
    const nav = document.querySelector('nav[data-main-nav]');
    let lastScroll = 0;
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('a[data-nav-link]');

    function onScroll() {
        const current = window.pageYOffset;
        if (nav) {
            if (current <= 40 || mobileMenu?.classList.contains('open')) {
                nav.classList.remove('-translate-y-full');
            } else if (current > lastScroll) {
                nav.classList.add('-translate-y-full');
            } else {
                nav.classList.remove('-translate-y-full');
            }
        }
        lastScroll = current;

        if (sections.length && navLinks.length) {
            let activeId = sections[0].id;
            sections.forEach((section) => {
                if (window.scrollY + 120 >= section.offsetTop) {
                    activeId = section.id;
                }
            });
            navLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === `#${activeId}`;
                link.classList.toggle('text-accent-orange', isActive);
            });
        }

        const backToTop = document.getElementById('backToTop');
        if (backToTop) backToTop.classList.toggle('visible', current > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- smooth anchor scrolling ---------- */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    });

    /* ---------- back to top ---------- */
    document.getElementById('backToTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });

    /* ---------- reveal on scroll ---------- */
    const revealTargets = document.querySelectorAll('[data-reveal]');
    if (revealTargets.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealTargets.forEach((el, i) => {
            el.style.setProperty('--reveal-delay', `${(i % 6) * 80}ms`);
            io.observe(el);
        });
    }

    /* ---------- card-hover mouse-tracked glow ---------- */
    document.querySelectorAll('.card-hover').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    /* ---------- 3D tilt ---------- */
    if (canHover && !prefersReducedMotion) {
        document.querySelectorAll('.tilt').forEach((el) => {
            const strength = parseFloat(el.dataset.tiltStrength || '10');
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                el.style.transform = `rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateY(-4px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
            });
        });
    }

    /* ---------- animated stat counters ---------- */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length) {
        const counterIO = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                if (prefersReducedMotion || isNaN(target)) {
                    el.textContent = target + suffix;
                } else {
                    const duration = 1200;
                    const start = performance.now();
                    const step = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(eased * target) + suffix;
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
                counterIO.unobserve(el);
            });
        }, { threshold: 0.5 });
        counters.forEach((el) => counterIO.observe(el));
    }

    /* ---------- project filters ---------- */
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-category]');
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterButtons.forEach((b) => b.removeAttribute('data-active'));
                btn.setAttribute('data-active', 'true');
                const filter = btn.dataset.filter;
                projectCards.forEach((card) => {
                    const match = filter === 'all' || card.dataset.category.split(' ').includes(filter);
                    card.style.display = match ? '' : 'none';
                });
            });
        });
    }

    /* ---------- contact form (AJAX, Formspree) ---------- */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            const formData = new FormData(form);

            const name = form.querySelector('input[name="name"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const subject = form.querySelector('input[name="subject"]').value.trim();
            const message = form.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !subject || !message) {
                showToast('Veuillez remplir tous les champs', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Veuillez entrer une adresse email valide', 'error');
                return;
            }

            const originalLabel = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.ok || data.success) {
                        form.reset();
                        showToast('Message envoyé avec succès !', 'success');
                    } else {
                        throw new Error(data.error || 'Erreur lors de l\'envoi');
                    }
                })
                .catch(() => {
                    showToast('Une erreur est survenue. Veuillez réessayer.', 'error');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalLabel;
                });
        });
    }

    function showToast(message, type) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        const toastDiv = toast.querySelector('div');
        const icon = toast.querySelector('i');
        const text = toast.querySelector('span');
        text.textContent = message;
        toastDiv.className = 'px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm flex items-center gap-2';
        if (type === 'error') {
            toastDiv.classList.add('bg-red-500/90', 'text-white');
            icon.className = 'fas fa-exclamation-circle';
        } else {
            toastDiv.classList.add('bg-accent-orange/90', 'text-white');
            icon.className = 'fas fa-check-circle';
        }
        toast.classList.remove('translate-y-full', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        setTimeout(() => {
            toast.classList.add('translate-y-full', 'opacity-0');
            toast.classList.remove('translate-y-0', 'opacity-100');
        }, 3000);
    }
    window.showToast = showToast;

    /* ---------- hero 3D background (Three.js), index page only ---------- */
    const heroMount = document.getElementById('hero-3d');
    if (heroMount && window.innerWidth >= 768 && !prefersReducedMotion && window.THREE) {
        try {
            initHero3D(heroMount);
        } catch (err) {
            console.warn('Hero 3D disabled:', err);
        }
    }

    function initHero3D(mount) {
        const THREE = window.THREE;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        camera.position.z = 9;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        const group = new THREE.Group();
        scene.add(group);

        const geometry = new THREE.IcosahedronGeometry(3, 1);
        const wireMat = new THREE.MeshBasicMaterial({ color: 0xff4d00, wireframe: true, transparent: true, opacity: 0.35 });
        const wireMesh = new THREE.Mesh(geometry, wireMat);
        group.add(wireMesh);

        const particleCount = 90;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 4.2 + Math.random() * 1.4;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({ color: 0xffb27a, size: 0.045, transparent: true, opacity: 0.7 });
        const points = new THREE.Points(particleGeo, particleMat);
        group.add(points);

        let targetRotX = 0;
        let targetRotY = 0;
        window.addEventListener('mousemove', (e) => {
            targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.6;
            targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.6;
        });

        let visible = true;
        const io = new IntersectionObserver((entries) => {
            visible = entries[0].isIntersecting;
        });
        io.observe(mount);

        document.addEventListener('visibilitychange', () => {
            visible = visible && !document.hidden;
        });

        function animate() {
            requestAnimationFrame(animate);
            if (!visible) return;
            group.rotation.y += 0.0015;
            group.rotation.x += (targetRotX - group.rotation.x) * 0.02;
            group.rotation.y += (targetRotY * 0.3);
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
    }
})();
