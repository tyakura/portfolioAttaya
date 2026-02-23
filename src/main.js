import './style.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'

new Swiper('.swiper', {
    modules: [Navigation,Autoplay],
    slidesPerView: 2,
    spaceBetween: 24,
    navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
    },
    breakpoints: {
        1024: {slidesPerView: 1},
        640: {slidesPerView: 1}
    },

});
