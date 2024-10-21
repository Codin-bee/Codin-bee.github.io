    function revealOnScroll() {
        const reveals = document.querySelectorAll('body *');

        reveals.forEach((reveal) => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const revealPoint = 75;
            if (elementTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            } else {
                reveal.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    
    const themeSelect = document.getElementById('theme-select');
    themeSelect.addEventListener('change', function() {
    document.body.classList.remove('dark-theme', 'light-theme', 'barbie-theme', 'blue-theme');
    document.body.classList.add(this.value + '-theme');
    localStorage.setItem('theme', this.value);
});

window.addEventListener('DOMContentLoaded', () => {
    document.activeElement.blur();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        themeSelect.value = savedTheme;
        document.body.classList.add(`${savedTheme}-theme`);
    }
//    setTimeout(() => {
//        window.scrollTo(0, 0);
//        revealOnScroll();
//    }, 100);
});