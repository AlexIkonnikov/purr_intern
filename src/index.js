import './scss/main.scss';

const form = document.querySelector(`form.page-form`);

const checkForm = (evt) => {
    let errorsCount = 0;
    const inputs = evt.target.querySelectorAll(`.page-form__input`);

    inputs.forEach((input) => {
        if (input.value.trim().length === 0) {
            input.classList.add(`error`);
            errorsCount += 1;
        }
        if (input.value.trim().length > 0 && input.classList.contains(`error`)) {
            input.classList.remove(`error`);
        }
    });

    if (errorsCount > 0) {
        evt.preventDefault();
    }
}

form.addEventListener(`submit`, checkForm);

const cookiesBlock = document.querySelector(`.cookies`);
const cookiesBlockBtn = cookiesBlock.querySelector(`button`);
let isShowCookiesBlock = false;

const setStateCookiesBlock = () => {

    let to;
    if (isShowCookiesBlock) {
        to = -300;
    } else {
        to = 0;
    }
    let step = isShowCookiesBlock ? -5 : 5;

    let from = parseInt(getComputedStyle(cookiesBlock).bottom);

    let timer = setInterval(() => {
        from = from + step;
        cookiesBlock.style.bottom = (from) + `px`;
        if (from === to) {
            clearTimeout(timer);
            isShowCookiesBlock = !isShowCookiesBlock;
        }
    }, 20);
};

const showCookiesNotification = () => {
    setStateCookiesBlock();
};

const hideCookiesNotification = () => {
    setStateCookiesBlock();
};

cookiesBlockBtn.addEventListener(`click`, hideCookiesNotification);

setTimeout(showCookiesNotification, 1000);