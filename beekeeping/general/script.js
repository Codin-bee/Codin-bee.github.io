document.addEventListener("DOMContentLoaded", function () {
    revealOnScroll(); // Initial reveal check

    // Load external header and footer
    loadExternalContent();

    // Initialize theme handling
    initThemeSelector();

    // Blur active element for cleaner UI
    document.activeElement.blur();

    // Event listeners for scroll and click reveal behavior
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('click', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
});

/**
 * Loads external header and footer, and initializes theme selector after header is loaded.
 */
function loadExternalContent() {
    fetch('../general/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;

            // Initialize the theme selector after the header is loaded
            initThemeSelector();
        });

    fetch('../general/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            revealOnScroll(); // Ensure footer elements are revealed if applicable
        });
}

/**
 * Handles theme selection and application.
 */
function initThemeSelector() {
    const themeSelect = document.getElementById('theme-select');
    if (!themeSelect) return;

    // Load the saved theme or set a default
    let savedTheme = localStorage.getItem('beekeeping-theme');
    if (!savedTheme) {
        savedTheme = 'yellow'; // Default theme
        localStorage.setItem('beekeeping-theme', savedTheme);
    }

    // Apply the saved theme
    applyTheme(savedTheme);
    themeSelect.value = savedTheme;

    // Listen for changes in the theme selector
    themeSelect.addEventListener('change', function () {
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
        localStorage.setItem('beekeeping-theme', selectedTheme); // Save the selected theme
    });
}

/**
 * Applies the specified theme to the document body.
 * @param {string} theme - The theme to apply (e.g., "yellow").
 */
function applyTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme', 'yellow-theme', 'blue-theme', 'green-theme', 'purple-theme');
    document.body.classList.add(`${theme}-theme`);
}

/**
 * Reveals elements on scroll by adding an 'active' class if they are within the viewport.
 */
function revealOnScroll() {
    const reveals = document.querySelectorAll('body *');
    const windowHeight = window.innerHeight;
    const revealPoint = 40;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
}