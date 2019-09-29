(($) => {
    $(document).ready(() => {

        let navigation = $('#navigation'),
            headerHeight = $('header').outerHeight(),
            currentItem = '',
            lastSection = false,
            scrollingHelp = true,

            parallaPaddingTopSet = () => {
                $('.parallax-layer-base').css('padding-top', headerHeight);
                $('.logo').css('height', headerHeight);
                $('section').css('height', $(document).height() - headerHeight);
            },

            navigationClick = function (event) {
                let offset = $($(this).attr('href')).position().top;
                event.preventDefault();
                $('.parallax').animate({
                    scrollTop: offset - headerHeight
                }, 750);
                $('.mm-sronly').click();
            },

            navigationActive = () => {
                $('section').each(function () {
                    if ($('.parallax').scrollTop() > $(this).position().top - 400) {
                        currentItem = $(this).attr('id');
                    }
                });

                let noActiveItem = navigation.find('li.active').length == 0,
                    newActiveRequired = navigation.find('li.active a').attr('href') != '#' + currentItem;

                if (noActiveItem || newActiveRequired) {
                    navigation.find('li.active').removeClass('active');
                    navigation.find('li a[href="#' + currentItem + '"]').parent().addClass('active');
                }
            },

            navigationScrolling = (event) => {
                if (scrollingHelp) {
                    let currentIndex = navigation.find('.active').index(),
                        currentSection = navigation.find('li'),
                        scrollDirection = event.originalEvent.wheelDelta,
                        navigationLenth = navigation.find('li').length;

                    if (scrollDirection >= 0 & lastSection === true) {
                        navigation.find('.active a').click();
                        lastSection = false;
                    } else if (scrollDirection >= 0 & (currentIndex < navigationLenth & currentIndex > 0) & lastSection === false) {
                        currentSection.eq(currentIndex - 1).find('a').click();
                        lastSection = false;
                    } else if (scrollDirection < 0 & currentIndex < navigationLenth & lastSection === false) {
                        currentSection.eq(currentIndex + 1).find('a').click();
                        if (currentIndex === navigationLenth - 1) lastSection = true;
                    }
                }
            };

//        $('.owl-carousel').owlCarousel({
//            items: 1,
//            nav: true,
//            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>']
//        });

        $('.parallax-layer-base').css('padding-top', parallaPaddingTopSet);
        navigation.find('li a').on('click', navigationClick);
        $('#menu').find('li a').on('click', navigationClick);
        
        //        $('#menu').find('li a').on('click', function (event) {
        //            let offset = $($(this).attr('href')).position().top;
        //            event.preventDefault();
        //            $('.parallax').animate({
        //                scrollTop: offset - headerHeight
        //            }, 750);
        //            $('.mm-sronly').click();
        //        });

        $('.parallax').on('load scroll', navigationActive);
        $(document).bind('mousewheel', navigationScrolling);
        $('#switcher').on('click', function () {
            if (scrollingHelp) {
                scrollingHelp = false;
                $(this).text('Постраничный scrolling');
                $('section').css('height', 'auto');
            } else {
                scrollingHelp = true;
                $(this).text('Классический scrolling');
                $('section').css('height', $(document).height() - headerHeight);
            }
        });

        $(window).on('load resize', function () {
            headerHeight = $('header').outerHeight(),
                $('.parallax-layer-base').css('padding-top', headerHeight);
            if ($(this).outerWidth() < 1600) scrollingHelp = false;
            else scrollingHelp = true;
        });

        $.fn.mapInit = () => {

            let mapOption = {
                    center: [53.903853, 27.447446],
                    zoom: 16,
                    controls: ['fullscreenControl', 'zoomControl']
                },
                map = new ymaps.Map('map', mapOption),
                placemark = new ymaps.Placemark(mapOption.center, {
                    hintContent: 'ОДО Белхлад',
                    balloonContentHeader: '"ОДО Белхлад',
                    balloonContentBody: 'Профессиональный ремонт и техническое обслуживание холодильного оборудования и оборудования общественного питания любой сложности',
                    balloonContentFooter: '220136, г.Минск, ул. Бурдейного, 25, оф. 180А'
                });

            if (window.innerWidth < 768) {
                mapOption.behaviors = ['multiTouch'];
            } else {
                mapOption.behaviors = ['drag'];
            }

            map.geoObjects.add(placemark);
        }

    });
})(jQuery);
