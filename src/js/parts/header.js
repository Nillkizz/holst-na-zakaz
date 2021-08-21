window.addEventListener('DOMContentLoaded', () => {
    const mobileHeader = document.querySelector('header.mobile'),
        menuBtn = mobileHeader.querySelector('button.menu'),
        navWrapper = mobileHeader.querySelector('.nav-wrapper'),
        nav = navWrapper.querySelector('nav'),
        closeMenuBtn = navWrapper.querySelector('button.close');

    menuBtn.addEventListener('click', () => { toggleMenu(true) });
    closeMenuBtn.addEventListener('click', () => { toggleMenu(false) });
    nav.addEventListener('click', () => { toggleMenu(false) });

    function toggleMenu(state) {
        state = !state;
        if (state !== undefined) return navWrapper.classList.toggle('hidden', state);
        return navWrapper.classList.toggle('hidden');
    }
})