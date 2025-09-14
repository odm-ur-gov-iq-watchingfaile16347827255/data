'use strict';

window.intro = (_prevLabel, _nextLabel, _doneLabel) => {
    introJs().setOptions({
        prevLabel: _prevLabel,
        nextLabel: _nextLabel,
        doneLabel: _doneLabel,
        hidePrev: true,
        hideNext: false,
        showButtons: true,
        exitOnEsc: true,
        exitOnOverlayClick: true
    }).start();
}

window.ChangeDirection = (function () {
    const _changeDirection = function (dir, lang) {
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', lang);
    };

    return {
        changeDirection: _changeDirection
    };
})();

window.controls = () => {
    //************Carousel Quick Services & Stats***********//
    $(document).ready(function () {
        var owl = $('.owl-carousel.fast-services');
        owl.owlCarousel({
            rtl: true,
            margin: 10,
            nav: false,
            dots: false,
            loop: false,
            rewind: false,
            responsive: {
                0: {
                    items: 1
                },
                412: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1024: {
                    items: 3
                }
                ,
                1300: {
                    items: 4
                }
            }
        });
        // Custom Button
        $('.nextFastService').click(function () {
            owl.trigger('next.owl.carousel');
        });
        $('.prevFastService').click(function () {
            owl.trigger('prev.owl.carousel');
        });
        owl.on('update.owl.carousel', function (event) {

        });
    });

    $(document).ready(function () {
        var owl = $('.owl-carousel.stats-reports');
        owl.owlCarousel({
            rtl: true,
            margin: 10,
            nav: false,
            dots: false,
            loop: false,
            rewind: true,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: {
                    items: 1
                },
                412: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1025: {
                    items: 3
                }
                ,
                1600: {
                    items: 4
                }
            }
        });
    });
}

function BlazorScrollToId(id) {
    const element = document.getElementById(id);
    if (element instanceof HTMLElement) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
    }
}

window.downloadFileFromStream = async (fileName, contentStreamReference) => {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.download = fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
    URL.revokeObjectURL(url);
}