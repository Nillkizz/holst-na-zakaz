import Alpine from 'alpinejs';
import { Accordeon } from './toggle-showing-items.js';
import Swiper from 'swiper';

export default () => {

    Alpine.data('calculator', () => {
        const jsonElement = document.getElementById('calculatorJsonData');
        const jsonData = JSON.parse(jsonElement.innerHTML)
        const data = {
            data: { ...jsonData },
            size: jsonData.steps[0].default,
            processing: jsonData.steps[1].default,
            cover: jsonData.steps[2].default,

            image: undefined,
            frames_modal_show: false,
            totalPrice() {
                const area = this.size.width * this.size.height;
                const baseArea = this.data.base.size.width * this.data.base.size.height;
                const mustBeMultiply = baseArea < area
                const multiplier = _computePriceMultiplier.bind(this)(this.data.base.multiplier)
                const coverPrice = this.cover.price * _computePriceMultiplier(this.data.steps[2].multiplier)
                const framePrice = this.frames.frame.price * _computePriceMultiplier(this.frames.data.multiplier)
                const outPrice = this.data.base.price * multiplier + this.processing.price;
                return Math.round(outPrice / 100) * 100 + this.data.base.subtract + coverPrice + framePrice;

                function _computePriceMultiplier(multiplier) {
                    if (mustBeMultiply)
                        return ((multiplier - 1) * (area / baseArea)) + 1;
                    else return 1;
                }
            },
            isEqSizes(size1, size2) {
                return (size1.width == size2.width) && (size1.height == size2.height)
            },
            photo: {
                data: '',
                dataURL: '',
                file: '',
                [':style']() {
                    return `background-image: url(${this.photo.dataURL});`;
                },
                field: {
                    ['@change'](e) {
                        const file = e.target.files[0];
                        const image = new Image();
                        image.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = image.width;
                            canvas.height = image.height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                            this.photo.file = file;
                            this.photo.dataURL = canvas.toDataURL(file.type);
                            this.photo.data = this.photo.dataURL.split(',').slice(-1)[0];
                        }
                        image.src = URL.createObjectURL(file);
                    }
                },
                button: {
                    getEl() { return document.querySelector('#sec3-calculator .about-order .photo .upload'); },
                    ['@click']() { this.$refs.uploadPhoto.click() },
                    [':class']() {
                        return { inverted: this.photo.dataURL.length }
                    },
                    [':style']() {
                        return {
                            bottom: !this.photo.dataURL.length ? `calc(50% - ${this.$el.offsetHeight / 2}px)` : '10px',
                            left: `calc(50% - ${this.$el.offsetWidth / 2}px)`
                        }
                    }
                }
            },
            frames: {
                swiper: (() => {
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    function getSlidesPerView() {
                        if (width > 1280) return 4;
                        if (width > 1080) return 3;
                        if (width > 860) return 2;
                        return 1;
                    }
                    function getGridRows() {
                        if (height > 620 && width > 860) return 2;
                        return 1;
                    }
                    return new Swiper('#sec3-calculator .swiper', {
                        slidesPerView: getSlidesPerView(),
                        grid: {
                            rows: getGridRows(),
                        },
                        spaceBetween: 30,

                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                    })
                })(),
                data: jsonData.steps[3],
                frame: jsonData.steps[3].default,
                filter: {
                    colors: [],
                    widthFrom: '',
                    widthTo: '',
                },
                openBtn: {
                    ['@click']() {
                        this.frames_modal_show = true;
                    },
                    [':class']() {
                        return {
                            inverted: this.frames.frame.id === -1
                        }
                    },
                    ['x-text']() {
                        return this.frames.frame.id !== -1 ? this.frames.frame.name : 'Выбрать рамку'
                    }
                },
                set(newFrame) {
                    if (this.frame.id !== newFrame.id) this.frame = newFrame;
                    else this.frame = this.data.default;
                },
                getColors() {
                    const colors = this.data.frames.map(frame => frame.color);
                    let _hexColors = [];
                    let uniqColors = [];
                    colors.forEach(color => {
                        if (_hexColors.includes(color.hex)) return;
                        _hexColors.push(color.hex);
                        uniqColors.push(color);
                    })
                    return uniqColors;
                },
                getFilteredFrames() {
                    let frames = this.data.frames
                    if (this.filter.colors.length) frames = frames.filter(doFilterByColor.bind(this));
                    if (this.filter.widthFrom || this.filter.widthTo) frames = frames.filter(doFilteryByWidth.bind(this));
                    Alpine.nextTick(() => this.swiper.update());
                    return frames;

                    function doFilterByColor(frame) {
                        return this.filter.colors.includes(frame.color.hex)
                    }
                    function doFilteryByWidth(frame) {
                        const from = Number(this.filter.widthFrom)
                        const to = this.filter.widthTo.length ? Number(this.filter.widthTo) : Infinity;
                        return from < frame.width && to > frame.width
                    }
                }
            }
        };
        jsonElement.remove();
        return data;
    });

    const accordeonConfig = {
        onlyOneExpanded: false
    };


    Alpine.start();
    new Accordeon(accordeonConfig);

}