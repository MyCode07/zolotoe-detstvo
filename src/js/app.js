import { maskInputs } from "./static/inputmask.js";
import './utils/smoothscrol.js';
import "./parts/forms.js";
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

runTicker();
hoverMouse();


accorden();


stickyHeader();
maskInputs('+7 (999) 999-99-99', '[name="phone"]')
animateAction();
animateStaggerAction();

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