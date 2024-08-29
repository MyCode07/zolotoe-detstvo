import Swiper from 'swiper';
import { Pagination, Autoplay, Thumbs } from 'swiper/modules';

const sliders = document.querySelectorAll('.swiper');
if (sliders.length) {
    sliders.forEach(slider => {
        const section = slider.closest('section');
        let prev = section.querySelector('.prev')
        let next = section.querySelector('.next')
        let pagination = section.querySelector('.pagination')

        if (slider.closest('.slider')) {
            new Swiper(slider, {
                modules: [Autoplay, Pagination],
                slidesPerView: 1,
                loop: true,
                spaceBetween: 20,
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                autoplay: {
                    delay: 4000,
                },
            })
        }
        if (slider.closest('.product__slider')) {
            let swiper = new Swiper(".thumbs-slider", {
                loop: true,
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            });

            let swiper2 = new Swiper(".main-slider", {
                modules: [Pagination, Thumbs],
                loop: true,
                spaceBetween: 10,
                pagination: {
                    el: pagination,
                    clickable: true,
                },
                thumbs: {
                    swiper: swiper,
                },
            });
        }

    })
}


