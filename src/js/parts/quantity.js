document.addEventListener('click', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('qty-btn')) {
        const input = targetEl.closest('.quantity').querySelector('input')
        let value = +input.value

        if (targetEl.classList.contains('plus')) {
            value++

            input.value = value
        }

        if (targetEl.classList.contains('minus')) {
            value--

            if (value <= 1) {
                value = 1
            }
            input.value = value
        }

    }
})

document.addEventListener('input', function (e) {
    let targetEl = e.target;

    if (targetEl.classList.contains('qty')) {
        let value = +targetEl.value

        if (value <= 1) {
            value = 1
        }

        targetEl.value = value
    }
})