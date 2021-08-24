document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('#sec4-our_works .slider');
    const slider_indicators = slider.querySelector('.slider__indicators');

    let slides = Array.from(slider.querySelectorAll('.slider__item'))
        .filter(function (slide) {
            const is_mobile = Array.from(slide.classList).indexOf('mobile') > -1;
            if (window.screen.width < 1024) return is_mobile
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
        const slider = new ChiefSlider('#sec4-our_works .slider', {
            loop: true
        });
    } else {
        slider.querySelectorAll('.slider__control').forEach(function (control) { control.style.display = 'none' })
    }
});