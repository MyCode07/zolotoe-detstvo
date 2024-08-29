document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('_person')) {
        const video = targetEl.querySelector('video');

        targetEl.classList.toggle('_active')
        if (targetEl.classList.contains('_active')) {
            video.play();
        }
        else {
            let src = video.currentSrc;
            video.pause();

            // setTimeout(() => {
            //     video.src = '';
            //     video.src = src;
            // }, 300);
        }
    }

    if (!targetEl.closest('_person') && !targetEl.classList.contains('_person') && document.querySelector('._person._active')) {
        document.querySelector('._person').classList.remove('_active')
        const video = document.querySelector('._person').querySelector('video');

        video.pause();
    }
})