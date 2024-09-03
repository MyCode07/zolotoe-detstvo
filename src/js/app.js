import { maskInputs } from "./static/inputmask.js";
import "./parts/sliders.js";
import "./parts/tabs.js";
import "./parts/show-more.js";
import "./parts/popup.js";
import "./parts/menu.js";
import { accorden } from "./static/accordeon.js";
import { animateAction, animateStaggerAction } from "./parts/animations.js";
import { runTicker } from "./static/ticker.js";
import { stickyHeader } from "./parts/header.js";
import { hoverMouse } from "./parts/btn-hover.js";
// import { clock } from "./parts/countdawn.js";
import { Fancybox } from "@fancyapps/ui";

runTicker();
hoverMouse();

accorden();
// clock();


stickyHeader();
maskInputs('+7 (999) 999-99-99', '._mask-phone')
animateAction();
animateStaggerAction();

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