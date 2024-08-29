const productFitlerForm = document.querySelector('#product-fitler-form');
const productSection = document.querySelector('.products');
const fitlersArea = document.querySelector('.filters-area');
const productGrid = document.querySelector('.products .grid');
const productCount = document.querySelector('.woocommerce-result-count');
const productsPagination = document.querySelector('.woocommerce-pagination');
const body = document.body;
const resetFiltersBtn = document.querySelector('.active-filters .reset-filters')
const filterCheckboxes = document.querySelectorAll('.filter input[type="checkbox"]')
const activeFiltersWrap = document.querySelector('.active-filters__body');

const minPriceInput = document.querySelector('.filter input[name="min_price"]');
const maxPriceInput = document.querySelector('.filter input[name="max_price"]');
const orderbyInput = document.querySelector('.filter input[name="orderby"]');

const url = adminajaxurl.ajaxurl;

export async function productFilter() {
    let formdata = new FormData(productFitlerForm);

    if (minPriceInput.value == minPriceInput.dataset.value) {
        formdata.delete('min_price')
    }

    if (maxPriceInput.value == maxPriceInput.dataset.value) {
        formdata.delete('max_price')
    }

    if (orderbyInput.value == '') {
        formdata.delete('orderby')
    }

    const queryString = new URLSearchParams(formdata).toString()
    formdata.append('action', 'ajaxfilter')


    let newUrl = `${window.location.pathname}?${queryString}${window.location.hash}`;
    if (newUrl[newUrl.length - 1] == '?') {
        newUrl = newUrl.replace('?', '')
    }

    window.history.replaceState({}, '', newUrl)

    // formdata = Object.fromEntries(formdata)
    formdata = getUnifiedFormData(formdata)
    console.log('formdata', formdata);

    $.ajax({
        url: url,
        cache: false,
        timeout: 300000,
        type: 'GET',
        data: formdata,
        beforeSend: function () {
            body.classList.add('_loading')
        },
        success: function (result) {
            console.log(result);

            const title = document.querySelector('title')
            const pageTitle = document.querySelector('input#page-title');

            title.textContent = pageTitle.value
            productGrid.innerHTML = result.products;
            productCount.innerHTML = result.count;

            if (productsPagination) {
                if (result.pagination) {
                    productsPagination.innerHTML = result.pagination;
                }
                else {
                    productsPagination.innerHTML = '';
                }
            }
        },
        error: function (error) {
            console.log(error);
        },
        complete: function () {
            body.classList.remove('_loading')
            activeFitlersAction();
        }
    })
}

function getUnifiedFormData(formdata) {
    return [
        ...formdata.entries()
    ]
        .reduce((result, [key, value]) => {

            if (Object.hasOwn(result, key)) {
                if (Array.isArray(result[key])) {

                    result[key].push(value);
                } else {
                    result[key] = [result[key], value];
                }
            } else {
                result[key] = value;
            }
            return result;

        }, {});
}

function activeFitlersAction() {

    if (filterCheckboxes.length) {
        filterCheckboxes.forEach(input => {
            const id = input.id.replace('select-', '')
            const type = id.split('-')[0]


            if (input.checked) {
                addActiveFilter(type, id, input.value)
            }
            else {
                const active = activeFiltersWrap.querySelector(`[data-custom-field="${id}"]`)
                if (active) {
                    active.remove()
                }
            }
        })
    }

    if (minPriceInput.value !== minPriceInput.dataset.value) {
        addActiveFilter('price_filter', 'min_price', minPriceInput.value)
    }
    else {
        const activeMinPrice = activeFiltersWrap.querySelector('[data-custom-field="min_price"]')
        if (activeMinPrice) {
            activeMinPrice.remove()
        }
    }

    if (maxPriceInput.value !== maxPriceInput.dataset.value) {
        addActiveFilter('price_filter', 'max_price', maxPriceInput.value)
    }
    else {
        const activeMaxPrice = activeFiltersWrap.querySelector('[data-custom-field="max_price"]')
        if (activeMaxPrice) {
            activeMaxPrice.remove()
        }
    }

    if (!document.querySelector('.active-filters__item')) {
        resetFiltersBtn.classList.add('_hide')
    }


    function addActiveFilter(type, id, value) {
        const item = `<button class="active-filters__item" data-filter-type="${type}" data-custom-field="${id}">${value}</button>`
        resetFiltersBtn.classList.remove('_hide')

        if (!activeFiltersWrap.querySelector(`[data-custom-field="${id}"]`)) {
            activeFiltersWrap.insertAdjacentHTML('afterbegin', item)
        }
    }
}


export function removeSearchParam(name) {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search.slice(1))
    params.delete(name);

    let newUrl = `${window.location.pathname}?${params}${window.location.hash}`;
    if (newUrl[newUrl.length - 1] == '?') {
        newUrl = newUrl.replace('?', '')
    }

    window.history.replaceState({}, '', newUrl)
    console.log(newUrl);
}


// reset filters
export function resetFilters() {
    minPriceInput.value = minPriceInput.dataset.value
    maxPriceInput.value = maxPriceInput.dataset.value
    orderbyInput.value = ''
    window.history.pushState(null, null, productSection.dataset.pagenumlink);
}