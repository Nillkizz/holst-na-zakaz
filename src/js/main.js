import LazyLoad from 'vanilla-lazyload';
import { header } from './parts/header.js';
import index from './pages/index.js'

document.addEventListener('DOMContentLoaded', () => {
    header()

    switch (window.location.pathname) {
        case '/':
            index();
            break;
    }
    window.lazyContent = new LazyLoad({
        use_native: true // <-- there you go
    });
})