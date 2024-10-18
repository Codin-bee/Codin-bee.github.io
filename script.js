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
