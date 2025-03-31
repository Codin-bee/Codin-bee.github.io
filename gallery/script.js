document.addEventListener("DOMContentLoaded", function () {
    revealOnScroll(); // Initial reveal check

    // Initialize theme handling
    initSwitchers();

    // Blur active element for cleaner UI
    document.activeElement.blur();

    // Event listeners for scroll and click reveal behavior
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('click', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('load', () =>{
        const userLang = getUserLanguage();
        changeLanguage(userLang);
    }
    )
});

/**
 * Handles theme selection and application.
 */
function initSwitchers() {
    const themeSelect = document.getElementById('theme-select');
    if (!themeSelect) return;

    // Load the saved theme or set a default
    let savedTheme = localStorage.getItem('beekeeping-theme');
    if (!savedTheme) {
        savedTheme = 'dark'; // Default theme
        localStorage.setItem('beekeeping-theme', savedTheme);
    }

    // Apply the saved theme
    applyTheme(savedTheme);
    themeSelect.value = savedTheme;

    // Listen for changes in the theme selector
    themeSelect.addEventListener('change', function () {
        const selectedTheme = themeSelect.value;
        applyTheme(selectedTheme);
        localStorage.setItem('beekeeping-theme', selectedTheme);
    });


    const langSelect = document.getElementById('lang-select');
    langSelect.value = getUserLanguage();
    langSelect.addEventListener('change', function () {
        const selectedLang = langSelect.value;
        changeLanguage(selectedLang);
    });
}

/**
 * Applies the specified theme to the document body.
 * @param {string} theme - The theme to apply 
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

async function loadLanguage(lang) {
    const response = await fetch('lang-content.json');
    const translations = await response.json();
    updateContent(translations[lang]);

    //Save the preffered language
    localStorage.setItem('language', lang);
}

function getUserLanguage() {
    // Preffered language saved in local storage
    const storedLang = localStorage.getItem('language');
    if (storedLang) return storedLang;

    // Gettting language from url
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang) return urlLang;

    //Getting language from browser settings
    const browserLang = navigator.language.split('-')[0];
    
    const supportedLanguages = ['en', 'cs'];
    //English be default
    return supportedLanguages.includes(browserLang) ? browserLang : 'en';
}

function changeLanguage(lang) {
    loadLanguage(lang);
    history.pushState(null, '', '?lang=' + lang);
}

function updateContent(translations) {
    document.querySelectorAll('[id]').forEach(element => {
        const key = element.id;
        if (translations[key]) {
            if (element.placeholder !== undefined) {
                element.placeholder = translations[key];
            } else {
                element.textContent = translations[key];
            }
        } else {
            console.warn(`Missing translation for key: ${key}`);
        }
    });
}



