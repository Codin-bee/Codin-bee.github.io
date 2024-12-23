function revealOnScroll() {
    const reveals = document.querySelectorAll('body *');

    reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const revealPoint = 40;
        if (elementTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        } else {
            reveal.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
window.addEventListener('click', revealOnScroll);

const themeSelect = document.getElementById('theme-select');
themeSelect.addEventListener('change', function() {
document.body.classList.remove('dark-theme', 'light-theme', 'yellow-theme', 'blue-theme', 'green-theme', 'purple-theme');
document.body.classList.add(this.value + '-theme');
localStorage.setItem('theme', this.value);
});

indow.addEventListener('DOMContentLoaded', () => {
    document.activeElement.blur();
    let savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        savedTheme = 'yellow-theme';
        themeSelect.value = 'yellow';
    } else {
        themeSelect.value = savedTheme;
    }
    document.body.classList.add(`${savedTheme}-theme`);
});

/* Loading same header and footer for each site */
document.addEventListener("DOMContentLoaded", () => {
    fetch('../header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });
    fetch('../footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});