document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 800); // Small delay to show the animation
        }
    });

    // --- Navbar Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu nav a');

    if (hamburger && mobileMenu && closeMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- Swiper Init ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.team-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.team-pagination',
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }
        });

        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.testimonial-pagination',
                clickable: true,
            },
            breakpoints: {
                992: { slidesPerView: 2 }
            }
        });

        new Swiper('.clients-swiper', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            speed: 3000,
            breakpoints: {
                640: { slidesPerView: 4 },
                992: { slidesPerView: 6 },
                1200: { slidesPerView: 8 }
            }
        });
    }

    // --- GLightbox Init ---
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true
        });
    }

    // --- Three.js Interactive Earth ---
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 15;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        canvasContainer.appendChild(renderer.domElement);

        // Create Earth Group
        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        // Core Sphere
        const geometry = new THREE.IcosahedronGeometry(5, 4);
        const material = new THREE.MeshBasicMaterial({
            color: 0x05050A,
            wireframe: false
        });
        const earth = new THREE.Mesh(geometry, material);
        earthGroup.add(earth);

        // Wireframe Sphere (Neon Blue)
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00D2FF,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
        wireframe.scale.set(1.01, 1.01, 1.01);
        earthGroup.add(wireframe);

        // Create circular texture for stars
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.arc(8, 8, 8, 0, Math.PI * 2);
        context.fillStyle = "white";
        context.fill();
        const starTexture = new THREE.CanvasTexture(canvas);

        const createStarfield = (count, size, color, radiusOffset) => {
            const geometry = new THREE.BufferGeometry();
            const posArray = new Float32Array(count * 3);
            for(let i = 0; i < count * 3; i++) {
                const r = radiusOffset + Math.random() * 5;
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos(Math.random() * 2 - 1);
                
                posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                posArray[i * 3 + 2] = r * Math.cos(phi);
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const material = new THREE.PointsMaterial({
                size: size, color: color, map: starTexture,
                transparent: true, opacity: 0.8, alphaTest: 0.5
            });
            return new THREE.Points(geometry, material);
        };

        // Create 3 layers of stars for 3D parallax effect
        const stars1 = createStarfield(400, 0.08, 0x3A7BD5, 8);
        const stars2 = createStarfield(300, 0.05, 0x00D2FF, 10);
        const stars3 = createStarfield(200, 0.1, 0xFFFFFF, 12);
        
        scene.add(stars1);
        scene.add(stars2);
        scene.add(stars3);

        // Mouse interaction variables
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        // Resize handler
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Animation Loop
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.001;
            targetY = mouseY * 0.001;

            // Continuous auto-rotation for the meshes themselves
            earth.rotation.y += 0.001;
            earth.rotation.x += 0.0005;
            wireframe.rotation.y += 0.001;
            wireframe.rotation.x += 0.0005;
            
            // Continuous auto-rotation for stars at different speeds
            stars1.rotation.y += 0.0001;
            stars2.rotation.y += 0.0002;
            stars3.rotation.y += 0.00005;

            // Interactive parallax offset based on mouse position
            earthGroup.rotation.y += 0.05 * (targetX - earthGroup.rotation.y);
            earthGroup.rotation.x += 0.05 * (targetY - earthGroup.rotation.x);
            
            // Subtle interactive parallax for stars to enhance 3D feel
            stars1.rotation.x += 0.02 * (targetY - stars1.rotation.x);
            stars2.rotation.x += 0.01 * (targetY - stars2.rotation.x);
            stars3.rotation.x += 0.03 * (targetY - stars3.rotation.x);

            renderer.render(scene, camera);
        };

        animate();
    }
});
