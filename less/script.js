(($) => {
    $(document).ready(() => {

        let navigation = $('#navigation'),
            headerHeight = $('header').outerHeight(),
            currentItem = '',
            lastSection = false,
            scrollingHelp = true;

        headerHeightSet = () => {
                $('.parallax-layer-base').css('padding-top', headerHeight);
                $('aside').css('padding-top', headerHeight);
                $('section').css('height', $(document).height() - headerHeight);
            },

            navigationClick = function (event) {
                let offset = $($(this).attr('href')).position().top;
                event.preventDefault();
                $('.parallax').animate({
                    scrollTop: offset - headerHeight
                }, 750);
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

        $('.parallax-layer-base').css('padding-top', headerHeightSet);
        navigation.find('li a').on('click', navigationClick);
        $('.parallax').on('load scroll', navigationActive);
        $(document).bind('mousewheel', navigationScrolling);
        $('button').on('click', function () {
            if (scrollingHelp) {
                scrollingHelp = false;
                $(this).text('Включить scrollHelper');
            } else {
                scrollingHelp = true;
                $(this).text('Отключить scrollHelper');
            }
        });

    });
})(jQuery);
