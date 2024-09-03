import { TweenMax, Power2, Elastic } from 'gsap'
import { isMobile } from '../utils/isMobile.js';

const buttons = document.querySelectorAll('._btn');


// export const hoverMouse = () => {
//     if (!buttons) return;

//     buttons.forEach((item) => {
//         let hover = false;
//         const offsetHoverMax = 0.7;
//         const offsetHoverMin = 0.5;

//         const attachEventsListener = () => {
//             window.addEventListener("mousemove", (e) => {
//                 const hoverArea = hover ? offsetHoverMax : offsetHoverMin;

//                 // cursor
//                 const cursor = {
//                     x: e.clientX,
//                     y: e.clientY + window.scrollY
//                 };

//                 // size
//                 const width = item.offsetWidth;
//                 const height = item.offsetHeight;

//                 // position
//                 const offset = item.getBoundingClientRect();
//                 const elPos = {
//                     x: offset.left + width / 2,
//                     y: offset.top + height / 2
//                 };

//                 // comparison
//                 const x = cursor.x - elPos.x;
//                 const y = cursor.y - elPos.y;



//                 // distance
//                 const dist = Math.sqrt(x * x + y * y);

//                 // mutex hover
//                 let mutHover = false;

//                 // anim
//                 if (dist < width * hoverArea) {
//                     mutHover = true;
//                     if (!hover) {
//                         hover = true;
//                     }
//                     onHover(x, y);
//                 }

//                 // reset
//                 if (!mutHover && hover) {
//                     onLeave();
//                     hover = false;
//                 }
//             });
//         };

//         const onHover = (x, y) => {
//             console.log(x, y);

//             TweenMax.to(item, 0.4, {
//                 x: x * 0.2,
//                 y: y * 0.2,
//                 rotation: x * 0.02,
//                 ease: Power2.easeOut
//             });
//         };

//         const onLeave = () => {
//             TweenMax.to(item, 0.7, {
//                 x: 0,
//                 y: 0,
//                 scale: 1,
//                 rotation: 0,
//                 ease: Elastic.easeOut.config(1.2, 0.4)
//             });
//         };

//         attachEventsListener();
//     });
// };


export function hoverMouse() {
    if (!buttons || isMobile.any()) return;

    buttons.forEach((item) => {

        let hover = false;
        const offsetHoverMax = 0.7;
        const offsetHoverMin = 0.5;


        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Координаты мыши относительно начала элемента
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Вычисляем симметричные движения относительно центра
            const offsetX = mouseX - centerX; // Движение по X относительно центра
            const offsetY = mouseY - centerY; // Движение по Y относительно центра


            TweenMax.to(item, 0.3, {
                x: offsetX * 0.1,
                y: offsetY * 0.2,
                rotation: 0.06,
                ease: Power2.easeOut
            });

        });


        item.addEventListener('mouseleave', () => {
            TweenMax.to(item, 0.3, {
                x: 0,
                y: 0,
                rotation: 0,
                ease: Power2.easeOut
            });
        });

        const onHover = (x, y) => {
            console.log(x, y);


        };

        const onLeave = () => {
            TweenMax.to(item, 0.7, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: 0,
                ease: Elastic.easeOut.config(1.2, 0.4)
            });
        };
    });
}