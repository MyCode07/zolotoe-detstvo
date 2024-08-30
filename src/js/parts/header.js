const header = document.querySelector('header');

export const stickyHeader = () => {
    if (!header) return;

    const headerheigth = header.getBoundingClientRect().height /2;

    const sticky = () => {
        if (window.scrollY > headerheigth) {
            header.classList.add('_sticky')
        }
        else {
            header.classList.remove('_sticky')
        }

    }

    sticky();
    window.addEventListener('scroll', sticky);
}