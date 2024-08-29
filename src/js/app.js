// import { maskInputs } from "./static/inputmask.js";

import "./parts/sliders.js";
// import "./parts/popup.js";
// import "./parts/menu.js";
import { accorden } from "./static/accordeon.js";
// import { replaceDomElements } from "./static/ticker.js";
import { runTicker } from "./static/ticker.js";
// import { stickyHeader } from "./parts/header.js";

// replaceDomElements();
runTicker();

if (window.innerWidth < 1300) {
    accorden();
}
else {
}

// stickyHeader();
// maskInputs('+7 (999) 999-99-99', '._mask-phone')

import { Fancybox } from "@fancyapps/ui";
Fancybox.bind("[data-fancybox]", {
    Carousel: {
        Panzoom: {
        },
    },
});

const inputItems = [...document.querySelectorAll('input ')].concat([...document.querySelectorAll('textarea ')])
if (inputItems.length) {
    inputItems.forEach(input => {
        if (input.closest('.form__item')) {
            input.addEventListener('input', () => {
                console.log(input.value);
                if (input.value != '') {
                    input.classList.add('_active')
                }
                else {
                    input.classList.remove('_active')
                }
            })
        }
    })
}


// var hoverMouse = function ($el) {
//     $el.each(function () {
//         var $self = $(this);
//         var hover = false;
//         var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
//         var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;

//         var attachEventsListener = function () {
//             $(window).on("mousemove", function (e) {
//                 //
//                 var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

//                 // cursor
//                 var cursor = {
//                     x: e.clientX,
//                     y: e.clientY + $(window).scrollTop()
//                 };

//                 // size
//                 var width = $self.outerWidth();
//                 var height = $self.outerHeight();

//                 // position
//                 var offset = $self.offset();
//                 var elPos = {
//                     x: offset.left + width / 2,
//                     y: offset.top + height / 2
//                 };

//                 // comparaison
//                 var x = cursor.x - elPos.x;
//                 var y = cursor.y - elPos.y;

//                 // dist
//                 var dist = Math.sqrt(x * x + y * y);

//                 // mutex hover
//                 var mutHover = false;

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

//         var onHover = function (x, y) {
//             TweenMax.to($self, 0.4, {
//                 x: x * 0.8,
//                 y: y * 0.8,
//                 //scale: .9,
//                 rotation: x * 0.05,
//                 ease: Power2.easeOut
//             });
//         };
//         var onLeave = function () {
//             TweenMax.to($self, 0.7, {
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

// hoverMouse($('._btn'));