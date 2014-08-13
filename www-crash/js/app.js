(function (window, $, _, ScrollMagic, TweenMax){
    'use strict';

    var $body,
        controller = new ScrollMagic(),
        asideChangers = [],
        bookmarks,
        bookmarkManager,
        preventSprite = true;

        $body = $('body');
        $body.addClass('script');

    var preventDelay = window.setTimeout(function(){

        preventSprite = false;
        window.clearTimeout(preventDelay);
    }, 2000);

    $(window).load(function(){

        if (asideChangers[1] && asideChangers[1].scene.state() === 'BEFORE'){
            setTimeout(function () {
                $('.aside-container').first().addClass('active');
            }, 100);
        }

        if ($body.hasClass('home') && localStorage.getItem('leftoffTitle') !== undefined){
            var data = {
                title: localStorage.getItem('leftoffTitle'),
                link: localStorage.getItem('leftoffLink')
            };

            renderTemplate('#left-off', '#home-leftoff-template', data);
        }

        asideInit();
        bookmarkManager = new BookmarkManager();
        bookmarkManager.init();
        bookmarkManager.loadBookmarks();
        loadSprites();
    });

    function supports_html5_storage() {
      try {
        return 'localStorage' in window && window.localStorage !== null;
      } catch (e) {
        return false;
      }
    }

    String.prototype.indexOfEnd = function(string) {
        var io = this.indexOf(string);
        return io === -1 ? -1 : io + string.length;
    };

    $('.aside-list').on('click', 'label', function(){
        var $this = $(this);
        $this.parent().children().removeClass('active');
        $this.addClass('active');
        $('.in-line-note.active').removeClass('active');
    });

    $('.in-line-note').on('click mouseover', function(){
        var target,
            $this = $(this),
            get = $.grep(this.className.split(' '), function(v){
                return v.indexOf('note-') === 0;
            }).join();
        target = get.slice(5);
        $('.' + target).click();
        $('.in-line-note.active').removeClass('active');
        $this.addClass('active');
    });

    ///////////////////
    // aside changing
    ///////////////////

    function AsideChanger (_element) {
        this.chapter = $(_element).attr('id');
    }

    AsideChanger.prototype.scrollAnimate = function () {

        this.scene = new ScrollScene({triggerElement: '#' + this.chapter, offset: 100 })
                        .on('start', function(e){

                            var _target,
                                direction = e.target.parent().info('scrollDirection'),
                                $trigger = $(this.triggerElement()),
                                leftHref,
                                leftTitle;

                            $('.aside-container').removeClass('active');

                            // check direction of scroll
                            if (direction === 'FORWARD'){

                                // if forward get the trigger id and query element with class =  trigger id
                                _target = this.triggerElement().slice(1);
                                $('.' + _target).addClass('active');
                            } else {

                                // if backward subtract 1 from trigger id and query element with that class
                                _target = this.triggerElement();
                                var index = _target.indexOfEnd('level-');
                                var number = parseInt(_target.slice(index))-1;
                                _target = 'level-' + number;
                                $('.' + _target).addClass('active');
                            }

                            // get the chapter id and save to leftoff
                            leftHref = $trigger.next().attr('data-cat') + '#' + $trigger.next().attr('id');
                            leftTitle = $trigger.next().attr('data-name');
                            saveLeftoff(leftHref, leftTitle);

                            if (!preventSprite && $body && $trigger.hasClass('scroll-sprite')) {

                                if (!spriteIsSaved($trigger)) {
                                    console.log(spriteIsSaved($trigger));
                                    activateSprite($trigger);
                                }
                            }

                        })
                        .addTo(controller);
        return true;
    };

    function spriteIsSaved (trigger) {

        var $trigger = $(trigger),
            spriteToFind = $trigger.attr('data-sprite'),
            localSprite;

        localSprite = localStorage.getItem(spriteToFind);

        if (localSprite) {
            return true;
        } else {
            return false;
        }

    }

    function activateSprite (trigger) {
        var $trigger = $(trigger),
            spriteToSave,
            spriteImg,
            spriteMarkup;

        spriteToSave = $trigger.attr('data-sprite');
        spriteImg = $trigger.attr('data-spriteImage');
        spriteMarkup = '<img class="flying-sprite" src="' + spriteImg + '">';
        $body.append($(spriteMarkup));
        localStorage.setItem(spriteToSave, true);
        animateSprite($(spriteMarkup));
        loadSprites();
    }

    function animateSprite (sprite) {
        var $sprite = $(sprite)[0];

        TweenMax.to('.flying-sprite', 1.2, {
            height: '30px',
            width: '30px',
            top: '-30px',
            onComplete: function(){
                    $('#sprites').animate({opacity: 0.5}, 100).animate({opacity: 1}, 100).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);
                },
            ease:Power4.easeIn, delay:0.3 });
    }

    function asideInit() {

        $.each($('.aside-trigger'), function() {
            var changer = new AsideChanger(this);
            AsideChanger.prototype.scrollAnimate.call(changer);
            asideChangers.push(changer);
        });

        return true;
    }

    ///////////////////
    // left-off
    ///////////////////

    function saveLeftoff (leftoffLink, leftoffTitle) {
        localStorage.setItem('leftoffTitle', leftoffTitle);
        localStorage.setItem('leftoffLink', leftoffLink);
    }

    ///////////////////
    // bookmarks
    ///////////////////

    function BookmarkManager () {

        this.init = function () {

            // add a bookmark
            $('.aside-link-button').on('click', function () {
                BookmarkManager.prototype.addBookmark.call(this);
            });

            // remove bookmarks
            $('#bookmark-nav-target').on('click', 'div.remove-bookmark', function () {
                BookmarkManager.prototype.removeBookmark.call(this);
            });
        };
    }

    BookmarkManager.prototype.addBookmark = function () {

        var mark,
            title,
            link,
            $this = $(this),
            localMarks;

        // get the bookmarks from localstorage or if empty create new bookmark object
        if (localStorage.getItem('bookmarks') !== null && localStorage.getItem('bookmarks') !== undefined){
            localMarks = JSON.parse(localStorage.getItem('bookmarks'));
        } else {
            localMarks = {
                bookmarkArray: []
            };
        }

        // get the title and link for this new bookmark
        title = $this.attr('name');
        link = $this.attr('href');
        mark = {
            'title': title,
            'link': link
        };

        localMarks.bookmarkArray.push(mark);
        localStorage.setItem('bookmarks', JSON.stringify(localMarks));
        bookmarks = localMarks;

        BookmarkManager.prototype.loadBookmarks.call(this);

        $('#bookmarks').animate({opacity: 0.5}, 100).animate({opacity: 1}, 100).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);
    };

    BookmarkManager.prototype.removeBookmark = function () {
        var $this = $(this),
            mark,
            localMarks = bookmarks;

        mark = $this.attr('name');
        localMarks.bookmarkArray = _.without(localMarks.bookmarkArray, _.findWhere(localMarks.bookmarkArray, { title: mark }));
        localStorage.setItem('bookmarks', JSON.stringify(localMarks));
        bookmarks = localMarks;
        BookmarkManager.prototype.loadBookmarks.call(this);
    };

    BookmarkManager.prototype.loadBookmarks = function () {

        var localMarks;

        if (localStorage.getItem('bookmarks') !== null && localStorage.getItem('bookmarks') !== undefined){
            localMarks = JSON.parse(localStorage.getItem('bookmarks'));
        } else {
            localMarks = {
                bookmarkArray: [
                    {'title': 'test', 'link': 'linktest'},
                    {'title': 'test2', 'link': 'linktest2'}
                ]
            };
        }
        bookmarks = localMarks;
        renderTemplate('#bookmark-nav-target', '#bookmark-template', localMarks);
        return true;
    };

    function renderTemplate(target, template, data) {

        var tmplMarkup = $(template).html(),
            compiledTmpl = _.template(tmplMarkup, { data: data }),
            $target = $(target);

        $target.html(compiledTmpl);
    }

    //<div class="year-empty" id="year-1977"></div>

    ///////////////////
    // timeline
    ///////////////////

    var years = $('.year-empty');
    // console.log(years);

    function adjustActive(_this){
        var targetID = $(_this) .attr('id');
        var $timelineItem = $('.' + targetID);
        $($('.timeline-list-item').children()).removeClass('timeline-active');
        $('.timeline-list-item').removeClass('timeline-list-active');
        $timelineItem.addClass('timeline-list-active');
        $($timelineItem.children()[0]).addClass('timeline-active');
    }


    $('#timeline').on('click', 'a[href^=#]', function (e) {
        var id = $(this).attr('href'),
            $elem = $(id);
        if ($elem.length > 0) {
            e.preventDefault();
            // controller.enabled(false);
            preventSprite = true;
            TweenMax.to(window, 1, {scrollTo: {y: $elem.offset().top - 50, autoKill: false}, onComplete: function(e){
                    // console.log(id);
                    // controller.enabled(true);
                    preventSprite = false;
                    _.delay(adjustActive, 2, id);
                }
            });
            if (window.history && window.history.pushState) {
                // if supported by the browser we can even update the URL.
                history.pushState('', document.title, id);

            }
        }
    });

    for (var i = 0; i < years.length; i += 1) {
        // assign handler "scene" and add it to Controller
        var scene = new ScrollScene({
            triggerElement: years[i]
        })
            .addTo(controller)
            .on("enter", function(e) {

                var direction = e.target.parent().info('scrollDirection'),
                    _$this = $(this.triggerElement()),
                    targetID,
                    $timelineItem;

                if (direction === 'FORWARD') {
                    targetID = _$this.attr('id');
                    $timelineItem = $('.' + targetID);
                } else {
                    var $find = $('#' + (_$this.attr('id')));
                    var indexOfFind = years.index($find);
                    var yearName = $(years[indexOfFind - 1]).attr('id');
                    $timelineItem  = $('.' + yearName);
                    // console.log($timelineItem);
                }
                $($('.timeline-list-item').children()).removeClass('timeline-active');
                $('.timeline-list-item').removeClass('timeline-list-active');
                // console.log($timelineItem);
                $timelineItem.addClass('timeline-list-active');

                $($timelineItem.children()[0])
                    .toggleClass('timeline-active');
            });
        // scenes.push(scene);
    }

    ///////////////////
    // sprites
    ///////////////////

    function loadSprites () {

        $.get( "sprite-drawer", function( data ) {

            $('#sprite-nav-target').html(data);
            cleanSprites();
        });


    }

    function cleanSprites () {
        var spriteArray = $('.sprite-image');
        $.each(spriteArray, function () {
            var $this = $(this),
                searchTarget = $this.attr('data-sprite'),
                test = localStorage.getItem(searchTarget);

            if (!test) {
                $this.attr({
                    src:'images/ui/mystery.png',
                    title: 'find me!'
                })
                .parent().attr('href', '')
                .parent().attr('title', 'find me!');
            }
        });
    }


})(window, window.jQuery, window._, window.ScrollMagic, window.TweenMax);