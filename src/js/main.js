import { header } from './parts/header.js';
import index from './pages/index.js'

document.addEventListener('DOMContentLoaded', ()=>{ 
    header()
    
    switch(window.location.pathname){
        case '/':
            index();
            break;
    }
})