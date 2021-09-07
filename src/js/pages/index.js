import calculator from '../modules/calculator.js';
import ChiefSlider from '../modules/chief-slider.min.js';
import { Accordeon } from '../modules/toggle-showing-items.js';

export default () => {
    const sections = [
        sec4,
        sec7,
        sec8,
    ]
    sections.forEach((section) => {
        section();
    });
    document.querySelectorAll('[data-tsi-accordeon]').forEach(accordeon=>{
        new Accordeon(accordeon);
    })
    calculator();
}

function sec4() {
    const sliderSelector = '#sec4-our_works .slider'
    const slider = document.querySelector(sliderSelector);
    const slider_indicators = slider.querySelector('.slider__indicators');

    let slides = Array.from(slider.querySelectorAll('.slider__item'))
        .filter(function (slide) {
            const is_mobile = Array.from(slide.classList).indexOf('mobile') > -1;
            if (window.innerWidth < 1024) return is_mobile
            else return !is_mobile
        });
    Array.from(slider.querySelectorAll('.slider__item')).forEach(function (slide) {
        if (slides.indexOf(slide) === -1) slide.remove();
    })
    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('li');
        indicator.dataset.slideTo = i;
        slider_indicators.appendChild(indicator);
    }

    if (slides.length > 1) {
        const slider = new ChiefSlider(sliderSelector, {
            loop: true
        });
    } else {
        slider.querySelectorAll('.slider__control').forEach(function (control) { control.style.display = 'none' })
    }
}
function sec7() {
    const sliderSelector = '#sec7-examples_and_prices .slider'
    const slider = document.querySelector(sliderSelector);
    const slider_indicators = slider.querySelector('.slider__indicators');

    let slides = Array.from(slider.querySelectorAll('.slider__item'))

    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('li');
        indicator.dataset.slideTo = i;
        slider_indicators.appendChild(indicator);
    }

    if (slides.length > 3) {
        const slider = new ChiefSlider(sliderSelector, {
            loop: true
        });
    } else {
        slider.querySelectorAll('.slider__control').forEach(function (control) { control.style.display = 'none' })
    }
}


function sec8() {
    if (window.innerWidth >= 1280) return;
    const sliderSelector = '#sec8-reviews .slider'
    const slider = document.querySelector(sliderSelector);
    const slider_indicators = slider.querySelector('.slider__indicators');

    let slides = Array.from(slider.querySelectorAll('.slider__item'))

    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('li');
        indicator.dataset.slideTo = i;
        slider_indicators.appendChild(indicator);
    }

    if (slides.length > 1) {
        const slider = new ChiefSlider(sliderSelector, {
            loop: true
        });
    } else {
        slider.querySelectorAll('.slider__control').forEach(function (control) { control.style.display = 'none' })
    }

}