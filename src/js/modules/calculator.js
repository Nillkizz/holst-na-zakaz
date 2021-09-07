import Alpine from 'alpinejs';
import Swiper from 'swiper';
import ImageCompare from 'image-compare-viewer';

export default () => {

    Alpine.data('calculator', () => {
        const jsonElement = document.getElementById('calculatorJsonData');
        const jsonData = JSON.parse(jsonElement.innerHTML);
        const data = {
            init() {
                window.addEventListener('resize', (() => {
                    const swiper = this.frames.swiper;
                    swiper.on('destroy', ((e) => {
                        this.frames.swiper = this.frames.makeSwiper();
                    }).bind(this));
                    swiper.destroy();
                }).bind(this));

                this.$watch('frames_modal_show', e => {
                    document.documentElement.classList.toggle('stop-scrolling', e);
                });

                this.$nextTick(() => {
                    this.$el.querySelector('.processing [data-tsi-accordeon]').accordeon.update();
                    this.$el.querySelector('.cover [data-tsi-accordeon]').accordeon.update();
                    this.$el.querySelectorAll('#sec3-calculator [image-compare]').forEach(el => {
                        new ImageCompare(el, {
                            smoothing: true,
                            smoothingAmount: 100,
                            controlShadow: true,
                            addCircle: true,
                            addCircleBlur: true
                        }).mount();
                    });
                });
            },

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
                sizes: {
                    maxWidth: 300,
                    maxHeight: 450,
                },
                [':style']() {
                    function limitImageSize(sizes) {
                        const maxWidth = this.photo.sizes.maxWidth;
                        const maxHeight = this.photo.sizes.maxHeight;
                        const aspectRatio = sizes.height / sizes.width;
                        const preHeight = Math.min(sizes.height, maxHeight)
                        const preWidth = preHeight / aspectRatio;
                        const height = (preWidth <= maxWidth) ? preHeight : maxWidth * aspectRatio;
                        const width = preWidth <= maxWidth ? preWidth : maxWidth;
                        return { width, height };
                    }
                    function computeImageSize() {
                        const maxWidth = this.photo.sizes.maxWidth;
                        const maxHeight = this.photo.sizes.maxHeight;
                        const aspectRatio = this.size.width / this.size.height;
                        const height = aspectRatio >= 1 ? maxWidth : maxHeight / aspectRatio;
                        const width = aspectRatio < 1 ? maxHeight : maxWidth * aspectRatio;
                        return limitImageSize.bind(this)({ width, height });
                    }
                    const sizes = computeImageSize.bind(this)()
                    return `background-image: url(${this.photo.dataURL}); height: ${sizes.height}px; width: ${sizes.width}px`;
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
                makeSwiper() {
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    function getConfig() {
                        return {
                            slidesPerView: (width > 1280) ? 4 : (width > 1080) ? 3 : (width > 860) ? 2 : 1,
                            grid: {
                                rows: (height > 620 && width > 860) ? 2 : 1,
                            },
                            spaceBetween: 30,
                        }
                    };
                    const swiper = new Swiper('#sec3-calculator .swiper', getConfig());
                    return swiper;
                },
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
                    function getConfig() {
                        return {
                            slidesPerView: getSlidesPerView(),
                            grid: {
                                rows: getGridRows(),
                            },
                            spaceBetween: 30,

                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        }
                    };
                    const swiper = new Swiper('#sec3-calculator .swiper', getConfig());
                    return swiper;

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


    Alpine.start();
}