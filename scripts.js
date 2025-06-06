// ======= FUNCIONALIDAD GENERAL DEL SITIO =======

// Esperar a que todo el contenido esté cargado
document.addEventListener('DOMContentLoaded', function () {
    // Ocultar el loader después de que todo se haya cargado
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.querySelector('.loader-container').classList.add('hidden');
        }, 1500); // Mostrar loader por 1.5 segundos
    });

    // Funcionalidad del menú hamburguesa
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Mostrar/ocultar botón de volver arriba
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Funcionalidad del botón volver arriba
    document.getElementById('back-to-top').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Selector de tema oscuro/claro
    const themeBtn = document.getElementById('theme-button');
    const themeIcon = themeBtn.querySelector('i');
    const themeText = themeBtn.querySelector('.theme-text');

    themeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeText.textContent = 'Modo Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeText.textContent = 'Modo Oscuro';
            localStorage.setItem('theme', 'light');
        }
    });

    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeText.textContent = 'Modo Claro';
    }

    // ======= FUNCIONALIDAD DEL MENÚ DE PRODUCTOS =======
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-items');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Quitar la clase activa de todos los botones
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Añadir clase activa al botón clicado
            this.classList.add('active');

            // Ocultar todos los menús
            menuItems.forEach(item => item.classList.add('hidden'));

            // Mostrar el menú correspondiente
            const targetMenu = document.getElementById(this.getAttribute('data-category'));
            targetMenu.classList.remove('hidden');
        });
    });

    // ======= FUNCIONALIDAD DE LA GALERÍA Y LIGHTBOX =======
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            currentIndex = index;
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');

            lightboxImg.setAttribute('src', imgSrc);
            lightboxCaption.textContent = imgAlt;
            lightbox.classList.add('active');

            // Prevenir scroll cuando el lightbox está activo
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar lightbox
    closeLightbox.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Cerrar lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Navegar entre imágenes
    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    });

    // Actualizar contenido del lightbox
    function updateLightbox() {
        const imgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('src');
        const imgAlt = galleryItems[currentIndex].querySelector('img').getAttribute('alt');

        lightboxImg.setAttribute('src', imgSrc);
        lightboxCaption.textContent = imgAlt;
    }

    // Navegar con teclado cuando el lightbox está activo
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightbox();
        } else if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ======= VALIDACIÓN DEL FORMULARIO DE RESERVAS =======
    const reservationForm = document.getElementById('reservation-form');
    const formSuccess = document.querySelector('.form-success');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Reiniciar mensajes de error
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });

            let isValid = true;

            // Validar nombre
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '' || nameInput.value.length < 3) {
                showError(nameInput, 'Por favor, ingresa un nombre válido');
                isValid = false;
            }

            // Validar email
            const emailInput = document.getElementById('email');
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Por favor, ingresa un correo electrónico válido');
                isValid = false;
            }

            // Validar teléfono
            const phoneInput = document.getElementById('phone');
            if (!isValidPhone(phoneInput.value)) {
                showError(phoneInput, 'Por favor, ingresa un número de teléfono válido');
                isValid = false;
            }

            // Validar fecha
            const dateInput = document.getElementById('date');
            if (dateInput.value === '' || !isValidDate(dateInput.value)) {
                showError(dateInput, 'Por favor, selecciona una fecha válida');
                isValid = false;
            }

            // Validar hora
            const timeInput = document.getElementById('time');
            if (timeInput.value === '') {
                showError(timeInput, 'Por favor, selecciona una hora');
                isValid = false;
            }

            // Validar número de personas
            const guestsInput = document.getElementById('guests');
            if (guestsInput.value === '') {
                showError(guestsInput, 'Por favor, selecciona el número de personas');
                isValid = false;
            }

            // Validar términos
            const termsInput = document.getElementById('terms');
            if (!termsInput.checked) {
                showError(termsInput, 'Debes aceptar la política de privacidad');
                isValid = false;
            }

            // Si el formulario es válido, mostrar mensaje de éxito
            if (isValid) {
                reservationForm.reset();
                formSuccess.style.display = 'block';

                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });

        // Función para mostrar errores
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            formGroup.classList.add('error');
            formGroup.querySelector('.error-message').textContent = message;
        }

        // Validar email con regex
        function isValidEmail(email) {
            const re = /^[a-zA-Z0-9_-]+\w[.]?[a-z0-9]+[@]\w+[.]\w{2,3}\w$/;
            return re.test(email);
        }

        // Validar teléfono
        function isValidPhone(phone) {
            // Acepta formatos comunes de teléfono mexicano
            const re = /^(\\+?52|0)?(1|5)?[0-9]{8,10}$/;
            return re.test(phone.replace(/\\s/g, ''));
        }

        // Validar que la fecha no sea anterior a hoy
        function isValidDate(date) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(date);
            selectedDate.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }
    }

});