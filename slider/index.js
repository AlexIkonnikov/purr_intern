function Slider(element) {
    const container = element;
    const slideWidth = container.offsetWidth;
    const belt = container.querySelector(`.content-wrapper`);
    const buttons = container.querySelectorAll(`button`);
    const slides = container.querySelectorAll(`.item`);
    belt.style.left = -(slideWidth) + `px`;

    let sliderIsNotMoving = true;
    let prevSlide = 0;
    let activeSlide = 1;
    let stepInPixel = 20;
    let dots = [];

    const createClone = () => {
        const firstSlideClone = slides[0].cloneNode(true);
        const lastSlideClone = slides[slides.length - 1].cloneNode(true);
        belt.append(firstSlideClone);
        belt.prepend(lastSlideClone);
    };

    const isFirstSlideCloneShowed = () => {
        return activeSlide === (slides.length + 1);
    };

    const isLastSlideCloneShowed = () => {
        return activeSlide < 1;
    };

    const setFirstSlideActive = () => {
        activeSlide = 1;
        belt.style.left = -500;
    };

    const setLastSlideActive = () => {
        activeSlide = slides.length;
        belt.style.left = -500 * activeSlide;
    };

    const checkDirection = () =>  {
        if (prevSlide < activeSlide) {
            return `right`;
        } else {
            return `left`;
        }
    };

    const setStep = () => {
        let diff = Math.abs(activeSlide - prevSlide)
        switch (diff) {
            case 1:
                stepInPixel = 20;
                break;
            case 2:
                stepInPixel = 25;
                break;
            case 3:
                stepInPixel = 50;
                break;
            default: 
                stepInPixel = 100;
        }
    };

    const setPosition = () => {
        sliderIsNotMoving = false;
        let from = - prevSlide * slideWidth;
        let to = - activeSlide * slideWidth;
        setStep();
        let timer = setInterval(() => {
            from = checkDirection() === `right` ? (from - stepInPixel) : (from + stepInPixel);
            belt.style.left = from + `px`;
            if (from === to) {
                clearTimeout(timer);
                sliderIsNotMoving = true;

                if (isFirstSlideCloneShowed()) {
                    setFirstSlideActive();
                }

                if (isLastSlideCloneShowed()) {
                    setLastSlideActive();
                }
            }
        }, 20);
    };

    const setActiveDot = () => {
        if (isFirstSlideCloneShowed()) {
            dots[0].classList.add(`dots-wrapper__item--active`);
            dots[dots.length - 1].classList.remove(`dots-wrapper__item--active`);
            return;
        }

        if (isLastSlideCloneShowed()) {
            dots[0].classList.remove(`dots-wrapper__item--active`);
            dots[dots.length - 1].classList.add(`dots-wrapper__item--active`);
            return;
        }

        dots.forEach((dot, index) => {
            if (index === activeSlide - 1) {
                dot.classList.add(`dots-wrapper__item--active`);
                return;
            }
            dot.classList.remove(`dots-wrapper__item--active`);
        });
    };

    const changeSlide = () => {
        setPosition();
        setActiveDot();
    };

    const createDots = (count) => {
        const list = document.createElement(`ul`);
        list.classList.add(`dots-wrapper`);
        for (i = 0; i < count; i++) {
            const item = document.createElement(`li`);
            item.classList.add(`dots-wrapper__item`);
            if (i === 0) {
                item.classList.add(`dots-wrapper__item--active`);
            }
            list.append(item);
        }
        dots = Array.from(list.children);
        dots.forEach((dot, index) => {
            dot.addEventListener(`click`, () => {
                if (sliderIsNotMoving) {
                    activeSlide = index + 1;
                    prevSlide = 1 + dots.findIndex((element) => {
                        return element.classList.contains(`dots-wrapper__item--active`);
                    });
                    if (prevSlide != activeSlide) {
                        changeSlide();
                    }
                }
            });
        });
        return list;
    };

    const init = () => {
        createClone();

        if (slides.length > 1) {
            container.append(createDots(slides.length));
        } else {
            buttons.forEach((btn) => btn.remove());
            return;
        }

        buttons.forEach((btn) => {
            btn.addEventListener(`click`, (evt) => {
                if (evt.target.dataset.dir === `next` && sliderIsNotMoving) {
                    activeSlide += 1;
                    prevSlide = activeSlide - 1;
                    changeSlide();
                }
                if (evt.target.dataset.dir === `prev` && sliderIsNotMoving) {
                    activeSlide -= 1;
                    prevSlide = activeSlide + 1;
                    changeSlide();
                }
            })
        });
    };

    init();
}