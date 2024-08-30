"use strict"

import { lockPadding } from "../utils/lockPadding.js";

const url = 'url';
const sentPopup = document.querySelector('.popup#thanks');
const errorPopup = document.querySelector('.popup#error');

const allowedFileTypes = [
    'image/x-png',
    'image/png',
    'image/avif',
    'image/webp',
    'image/png',
    'image/jpg',
    'image/jpeg',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.csv',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/pdf',
    'application/vnd.ms-powerpoint',
];

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.form')
    if (forms.length) {
        forms.forEach(form => {

            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                let error = validateForm(form)

                let formData = new FormData(form);

                const formFile = form.querySelector('input[name="file[]"]');
                if (formFile && formFile.files[0]) {
                    formData.append('file', formFile.files[0]);
                }

                formData.append('action', 'ajax_forms');

                if (error === 0) {
                    form.classList.add('_sending');

                    let response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    });

                    let result = await response.json();

                    if (response.ok) {
                        console.log(result);
                        sentMessage(form)
                        form.reset();
                        resetForm(formFile);
                        form.classList.remove('_sending');
                    }
                    else {
                        console.log(result);
                        failMessage(form)
                        resetForm(formFile);
                        form.classList.remove('_sending');
                    }
                }
                else {
                    fillAllFields(form)
                    resetForm(formFile);
                    form.classList.remove('_sending');
                }
            })

            checkFiles(form)
        })
    }
});



function validateForm(form) {
    let error = 0;
    const formReq = [...form.querySelectorAll('[data-required] input')].concat([...form.querySelectorAll('[data-required] textarea')])

    for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i]

        formRemoveError(input);
        validateInput()

        input.addEventListener('input', function () {
            formRemoveError(input);
            validateInput()
        })

        function validateInput() {
            if (input.getAttribute('type') === 'email') {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
            else {
                if (input.getAttribute('name') === 'phone') {
                    if (/[_]/.test(input.value) || input.value.length < 18) {
                        formAddError(input);
                        error++;
                    }
                }
                else {
                    if (input.value.length < 2) {
                        formAddError(input);
                        error++;
                    }
                }
            }
        }
    }

    const checkBoxContainers = form.querySelectorAll('[data-checkbox-container]')
    let checkedArr = [];
    for (let i = 0; i < checkBoxContainers.length; i++) {
        const checkBoxes = [...checkBoxContainers[i].querySelectorAll('input')]

        checkBoxes.forEach(input => {
            input.addEventListener('input', function () {
                input.closest('[data-checkbox-container]').classList.remove('_error')
            })
        })

        checkedArr.push(checkBoxes.some(input => {
            if (!input.checked) {
                input.closest('[data-checkbox-container]').classList.add('_error')
            }
            else {
                input.closest('[data-checkbox-container]').classList.remove('_error')
            }
            return input.checked
        }))
    }

    const checked = checkedArr.every(check => { return check == true })
    if (!checked === true) {
        error++
    }

    return error;
}

function formAddError(input) {
    input.closest('.form__item').classList.add('_error');
}

function formRemoveError(input) {
    input.closest('.form__item').classList.remove('_error');
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function sentMessage(form) {
    const activePopup = document.querySelector('.popup._open');
    if (activePopup) {
        activePopup.classList.remove('_open')
    }

    sentPopup.classList.add('_open')
    lockPadding();
}

function failMessage(form) {
    errorPopup.classList.add('_open')
    lockPadding();
}

function fillAllFields(form) {
    console.log('Запольните все поля');
}

function resetForm(formFile) {
    if (formFile) {
        const fileElem = formFile.closest('.file')
        const fileNameElem = fileElem.querySelector('.filename span');
        const deleteFileElem = fileElem.querySelector('._delete-file');

        fileNameElem.innerHTML = 'Прикрепить файл';
        formFile.value = '';

        deleteFileElem.style.display = 'none';
    }
}

function checkFiles(form) {
    const formFile = form.querySelector('input[name="file[]"]');

    if (!formFile) return;


    const fileElem = formFile.closest('.file')
    const deleteFileElem = fileElem.querySelector('._delete-file');

    let uploadedFiels = fileElem.querySelectorAll('.file-upload')

    formFile.addEventListener('change', () => {
        uploadedFiels = fileElem.querySelectorAll('.file-upload')
        if (uploadedFiels.length) {
            uploadedFiels.forEach(f => f.remove())
        }

        uploadFile(formFile.files);
        console.log(formFile.files);
    });


    deleteFileElem.addEventListener('click', () => {
        formFile.value = '';
        deleteFileElem.style.display = 'none';

        uploadedFiels = fileElem.querySelectorAll('.file-upload')
        if (uploadedFiels.length) {
            uploadedFiels.forEach(f => f.remove())
        }
    })


    function uploadFile(files) {
        [...files].forEach((file, index) => {
            console.log(index);

            if (!allowedFileTypes.includes(file.type)) {
                alert('Разрешены только текстовые документы и изображения.');
                formFile.value = '';

                deleteFileElem.style.display = 'none';

                return;
            }
            if (file.size > 20 * 1024 * 1024) {
                alert('Файл должен быть менее 20 МБ.');

                deleteFileElem.style.display = 'none';
                return;
            }

            deleteFileElem.style.display = 'block';

            var reader = new FileReader();

            reader.onload = function (e) {
                const newfile = `<div class="file-upload" data-id="${index}">${file.name}</div>`;
                fileElem.insertAdjacentHTML('beforeend', newfile)
            };

            reader.onerror = function (e) {
                alert('Ошибка');
            };

            reader.readAsDataURL(file);
        });
    }
}