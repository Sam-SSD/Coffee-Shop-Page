// ======= FUNCIONALIDAD GENERAL DEL SITIO =======

/**
 * Inicialización de la página
 * Espera a que todo el contenido del DOM esté cargado antes de ejecutar el código
 */
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Gestión del Loader
     * Muestra una animación de carga mientras se cargan todos los recursos
     * Se oculta después de 1.5 segundos para asegurar una transición suave
     */
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.querySelector('.loader-container').classList.add('hidden');
        }, 1500); // Mostrar loader por 1.5 segundos
    });

    /**
     * Funcionalidad del Menú Hamburguesa
     * Controla la apertura y cierre del menú en dispositivos móviles
     * Alterna las clases 'active' para mostrar/ocultar el menú
     */
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    /**
     * Cierre del Menú Móvil
     * Cierra el menú cuando se hace clic en un enlace
     * Mejora la experiencia de usuario en dispositivos móviles
     */
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /**
     * Efecto de Scroll en el Header
     * Cambia el estilo del header cuando se hace scroll
     * Añade la clase 'scrolled' para modificar la apariencia
     */
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        /**
         * Control del Botón "Volver Arriba"
         * Muestra/oculta el botón según la posición del scroll
         * Aparece cuando el usuario ha scrolleado más de 300px
         */
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    /**
     * Funcionalidad del Botón "Volver Arriba"
     * Permite volver al inicio de la página con animación suave
     * Utiliza scrollTo con behavior: 'smooth' para una transición fluida
     */
    document.getElementById('back-to-top').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /**
     * Sistema de Tema Oscuro/Claro
     * Permite cambiar entre modo claro y oscuro
     * Actualiza iconos y texto del botón según el tema actual
     */
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

    /**
     * Persistencia del Tema
     * Recupera el tema guardado en localStorage
     * Aplica el tema guardado al cargar la página
     */
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeText.textContent = 'Modo Claro';
    }

    // ======= FUNCIONALIDAD DEL MENÚ DE PRODUCTOS =======
    /**
     * Sistema de Pestañas del Menú
     * Permite cambiar entre diferentes categorías de productos
     * Maneja la visibilidad de las secciones del menú
     */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-items');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const currentMenu = Array.from(menuItems).find(item => !item.classList.contains('hidden'));
            const targetMenu = document.getElementById(this.getAttribute('data-category'));

            if (currentMenu === targetMenu) return;

            if (currentMenu) {
                currentMenu.classList.add('fade-slide-out');
                setTimeout(() => {
                    currentMenu.classList.add('hidden');
                    currentMenu.classList.remove('fade-slide-out');

                    // Mostrar y animar fade-slide-in del nuevo menú
                    targetMenu.classList.remove('hidden');
                    targetMenu.classList.add('fade-slide-in');
                    setTimeout(() => {
                        targetMenu.classList.remove('fade-slide-in');
                    }, 500); // Duración igual a la transición CSS
                }, 500); // Duración igual a la transición CSS
            } else {
                targetMenu.classList.remove('hidden');
                targetMenu.classList.add('fade-slide-in');
                setTimeout(() => {
                    targetMenu.classList.remove('fade-slide-in');
                }, 500);
            }
        });
    });

    // ======= FUNCIONALIDAD DE LA GALERÍA Y LIGHTBOX =======
    /**
     * Sistema de Galería y Lightbox
     * Permite ver las imágenes en tamaño completo
     * Incluye navegación entre imágenes y controles
     */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    let currentIndex = 0;

    /**
     * Inicialización de la Galería
     * Configura los eventos de clic para cada imagen
     * Prepara el lightbox con la imagen seleccionada
     */
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

    /**
     * Cierre del Lightbox
     * Permite cerrar el lightbox de diferentes maneras
     * Restaura el scroll normal de la página
     */
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

    /**
     * Navegación en el Lightbox
     * Permite navegar entre imágenes con botones
     * Mantiene un índice circular de las imágenes
     */
    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightbox();
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightbox();
    });

    /**
     * Actualización del Lightbox
     * Actualiza la imagen y el texto mostrado
     * Mantiene sincronizados los elementos visuales
     */
    function updateLightbox() {
        const imgSrc = galleryItems[currentIndex].querySelector('img').getAttribute('src');
        const imgAlt = galleryItems[currentIndex].querySelector('img').getAttribute('alt');

        lightboxImg.setAttribute('src', imgSrc);
        lightboxCaption.textContent = imgAlt;
    }

    /**
     * Navegación con Teclado
     * Permite navegar en el lightbox usando las teclas de flecha
     * Incluye soporte para Escape para cerrar el lightbox
     */
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
    /**
     * Sistema de Validación de Formulario
     * Valida todos los campos del formulario de reservas
     * Muestra mensajes de error apropiados
     */
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

            /**
             * Validación de Campos
             * Verifica cada campo del formulario
             */
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

            // Si todo es válido, mostrar mensaje de éxito
            if (isValid) {
                reservationForm.reset();
                formSuccess.style.display = 'block';

                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }

    /**
     * Muestra un mensaje de error para un campo específico
     * @param {HTMLElement} input - El campo que tiene el error
     * @param {string} message - El mensaje de error a mostrar
     */
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
    }

    /**
     * Valida el formato de un email
     * @param {string} email - El email a validar
     * @returns {boolean} - true si el email es válido
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida el formato de un número de teléfono
     * @param {string} phone - El número de teléfono a validar
     * @returns {boolean} - true si el número es válido
     */
    function isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return phoneRegex.test(phone);
    }

    /**
     * Valida que la fecha sea futura
     * @param {string} date - La fecha a validar
     * @returns {boolean} - true si la fecha es válida
     */
    function isValidDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        return selectedDate >= today;
    }
});