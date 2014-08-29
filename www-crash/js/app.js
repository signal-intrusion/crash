(function (window, $, _, ScrollMagic, TweenMax){
    'use strict';

    var $body,
        controller = new ScrollMagic(),
        asideChangers = [],
        bookmarks,
        bookmarkManager,
        preventSprite = true,
        slideshow,
        rsp,
        sprites,
        activeAside = 1,
        width = $(window).width();

        $body = $('body');
        $body.addClass('script');

    var preventDelay = window.setTimeout(function(){

        preventSprite = false;
        window.clearTimeout(preventDelay);
    }, 2000);

    $(window).load(function(){

        if ($body.hasClass('home') && localStorage.getItem('leftoffTitle') !== undefined){
            var data = {
                title: localStorage.getItem('leftoffTitle'),
                link: localStorage.getItem('leftoffLink')
            };
            renderTemplate('#left-off', '#home-leftoff-template', data);
        }

        // initiolize the asides
        asideInit();
        activateNotes();

        // initialize the bookmarks and sprites
        bookmarkManager = new BookmarkManager();
        bookmarkManager.init();
        bookmarkManager.loadBookmarks();

        sprites = new Sprites();
        sprites.loadSprites();

            // Responsive image loader
            rsp = new Respeto({
                retina: true,
                imagePath: 'img/min/'
            });

            if (width <= 600) {
                rsp.load('small', {
                    imagePath: 'img/min/'
                }); // loads images with _small suffix
            }

            if (width > 600 && width <= 1024) {
                rsp.load('medium', {
                    imagePath: 'img/min/'
                }); // loads images with _medium suffix
            }

            if (width > 1024) {
                rsp.load('large', {
                    imagePath: 'img/min/'
                }); // sets image sources with _large suffix
            }

        preload([
            // "images/close.png",
            // "images/info.png",
            // "images/quote-bubble1-active.png",
        ]);
    });

    function preload(arrayOfImages) {
            $(arrayOfImages).each(function () {
                $('<img/>')[0].src = this;
            });
        }

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

    function noteActivate (input) {

        var $target,
            $input = $(input);
        $target = $('*[data-note="' + $input.attr('data-pointsTo') + '"]');
        $target.addClass('active');
        return true;
    }

    function activateNotes () {

        $.each($('.aside-input:checked'), function () {
            noteActivate(this);
        });
    }

    ///////////////////
    // aside changing
    ///////////////////

    function AsideChanger (_element) {
        this.chapter = $(_element).attr('id');
    }

    AsideChanger.prototype.scrollAnimate = function () {

        this.scene = new ScrollScene({triggerElement: '#' + this.chapter, offset: 200, duration: 210 })
                        .on('start', this.changeAsides)
                        .addTo(controller);
        return true;
    };

    AsideChanger.prototype.changeAsides = function (e) {

        var _target,
            direction = e.target.parent().info('scrollDirection'),
            $trigger = $(this.triggerElement()),
            leftHref,
            leftTitle;

        $('.aside-container').removeClass('active');

        // check direction of scroll
        if (direction === 'FORWARD' || direction === 'PAUSED'){

            // if forward get the trigger id and query element with class = trigger id
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

        // check for sprites to unlock on scroll
        if (!preventSprite && $body && $trigger.hasClass('scroll-sprite')) {

            if (!sprites.spriteIsSaved($trigger)) {
                console.log(sprites.spriteIsSaved($trigger));
                sprites.activateSprite($trigger);
            }
        }
    };

    function asideInit () {

        var $asideContainers = $('.aside-container'),
            asideCount = 0,
            requests = [],
            asideTotal = $asideContainers.length;

            console.log(asideTotal);



        // start by ajaxing all the asides
        $.each($asideContainers, function () {

            requests.push( loadAside(this) );
            // $.when(loadAside(this));
            // asideCount += 1;
            // console.log(asideTotal);

            // if (asideCount === asideTotal) {
                // finishAside($asideContainer);
            // }
        });
        $.when.apply(undefined, requests).then(function(){
            finishAside($asideContainers);
            console.log('when done');
        });

        return true;
    }

    function loadAside (asideContainer) {

        // var url = 0;
        var $asideContainer = $(asideContainer),
            slug = $asideContainer.attr('data-entry-slug');

        return $.get('ajax-aside?entrySlug=' + slug, function (data) {
                    $asideContainer.html(data);
                    console.log('suc');
                }).fail(function (data) {
                    console.log(data);
                });
    }

    function finishAside ($asideContainers) {

        $.each($('.aside-trigger'), function () {
            var changer = new AsideChanger(this);
            AsideChanger.prototype.scrollAnimate.call(changer);
            asideChangers.push(changer);
        });

        if (asideChangers[1] && asideChangers[1].scene.state() === 'BEFORE'){
            setTimeout(function () {
                $asideContainers.first().addClass('active');
            }, 100);
        }

        $.each($('.aside-wrapper'), function(){
            $(this).children('.margin-aside').addClass('ps-content');
            $(this).perfectScrollbar({
                wheelPropagation: true,
                maxScrollbarLength: 250
            });
        });

        $('.aside-list').on('click', 'label', function(){
            var $this = $(this);
            $this.parent().children().removeClass('active');
            $this.addClass('active');
            $('.in-line-note.active').removeClass('active');
            _.delay(function() {
                $('.aside-wrapper').scrollTop(0).perfectScrollbar('update');
            }, 300);
            // $('.ps-scrollbar-y-rail').css('display', 'inherit');
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
            $('.aside-wrapper').scrollTop(0).perfectScrollbar('update');
            // $('.ps-scrollbar-y-rail').css('display', 'inherit');
        });

        $('.aside-input').on('change', function() {

            var $this = $(this);
            if (!preventSprite && $body && $this.hasClass('scroll-sprite')) {

                if (!sprites.spriteIsSaved($this)) {
                    sprites.activateSprite($this);
                }
            }
            activateNotes();
        });
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
            renderTemplate('#bookmark-nav-target', '#bookmark-template', localMarks);
            bookmarks = localMarks;
        } else {
            //$insert = $('You can bookmark stories and chapters to read later.');
            $('#bookmark-nav-target').html('<li>You can bookmark stories and chapters to read later.</li>');
            /*localMarks = {
                bookmarkArray: [
                    {'title': 'test', 'link': 'linktest'},
                    {'title': 'test2', 'link': 'linktest2'}
                ]
            };*/
        }
        //bookmarks = localMarks;
        //renderTemplate('#bookmark-nav-target', '#bookmark-template', localMarks);
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
            .on('enter', function(e) {

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
    }

    ///////////////////
    // sprites
    ///////////////////

    function Sprites () {
        this.spriteArray;
    }

    Sprites.prototype.loadSprites = function () {

        $.get( 'sprite-drawer', function( data ) {
            $('#sprite-nav-target').html(data);
            Sprites.prototype.cleanSprites.call(this);
        });
    };

    Sprites.prototype.cleanSprites = function () {
        this.spriteArray = $('.sprite-image');
        $.each(this.spriteArray, function () {
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
    };

    Sprites.prototype.spriteIsSaved = function (trigger) {

        var $trigger = $(trigger),
            spriteToFind = $trigger.attr('data-sprite'),
            localSprite;

        localSprite = localStorage.getItem(spriteToFind);

        if (localSprite) {
            return true;
        } else {
            return false;
        }
    };

    Sprites.prototype.activateSprite = function (trigger) {

        var $trigger = $(trigger),
            spriteToSave,
            spriteImg,
            spriteMarkup;

        spriteToSave = $trigger.attr('data-sprite');
        spriteImg = $trigger.attr('data-spriteImage');
        spriteMarkup = '<img class="flying-sprite" src="' + spriteImg + '">';
        $body.append($(spriteMarkup));
        localStorage.setItem(spriteToSave, true);
        this.animateSprite();
        this.loadSprites();
    };

    Sprites.prototype.animateSprite = function () {

        TweenMax.to('.flying-sprite', 2, {
            height: '30px',
            width: '30px',
            top: '-30px',
            onComplete: function(){
                    $('#sprites').animate({opacity: 0.5}, 100).animate({opacity: 1}, 100).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);
                },
            ease: Elastic.easeIn,
            delay: 0.5 });
    };

    ///////////////////
    // gallery slideshow
    ///////////////////

    function Slideshow () {

        this.$slides = $('.slide');          //slides
        this.currentSlide = 0;               //keep track on the current slide
        this.stayTime = 3;               //time the slide stays
        this.slideTime = 0.3;                //fade in / fade out time

        this.init = function () {
            TweenMax.set(this.$slides.filter(':gt(0)'), {
                opacity:0,
                onComplete:function(){
                    $(this.target).css('pointer-events', 'none');
                }
            }); //we hide all images after the first one

            // add .zoom() to all images in gallery
            $.each($('.slide-image-container'), function(){
                $(this).zoom({
                    magnify: 1.1,
                    on:'click',
                    touch: true,
                    onZoomIn: function(){
                        $(this).toggleClass('zoomed');
                        console.log($(this));
                    },
                    onZoomOut: function(){
                        $(this).toggleClass('zoomed');
                    },
                });
            });

            // listenors for slideshow events
            $('#gallery-container').on('click', '.next', Slideshow.prototype.nextSlide.bind(this));
            $('#gallery-container').on('click', '.prev', Slideshow.prototype.prevSlide.bind(this));
            $('#gallery-container').on('click', '.esc', Slideshow.prototype.destroy.bind(this));
            $('.fig-container, #gallery-container').addClass('active');
        };
    }

    Slideshow.prototype.nextSlide = function () {

        //pause video
        var iframe = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframe.length; i += 1 ) {
            var func = 'pauseVideo';
            iframe[i].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
        }

        //fade out the old slide
        TweenMax.to( this.$slides.eq(this.currentSlide), this.slideTime, {
            opacity:0,
            onComplete:function(){
                // (this.target).remove();
                $(this.target).css('pointer-events', 'none');
            }
        });

        //find out which is the next slide
        this.currentSlide = ++this.currentSlide % this.$slides.length;

        //fade in the next slide
        TweenMax.to( this.$slides.eq(this.currentSlide), this.slideTime, {
            opacity:1,
            onComplete:function(){
                $(this.target).css('pointer-events', 'auto');
            }
        });
    };

    Slideshow.prototype.prevSlide = function () {

        //pause video
        var iframe = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframe.length; i += 1 ) {
            var func = 'pauseVideo';
            iframe[i].contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
        }

        //fade out the old slide
        TweenMax.to( this.$slides.eq(this.currentSlide), this.slideTime, {
            opacity:0,
            onComplete:function(){
                // (this.target).remove();
                $(this.target).css('pointer-events', 'none');
            }
        });

        //find out which is the next slide
        this.currentSlide = --this.currentSlide % this.$slides.length;

        //fade in the next slide
        TweenMax.to( this.$slides.eq(this.currentSlide), this.slideTime, {
            opacity:1,
            onComplete:function(){
                $(this.target).css('pointer-events', 'auto');
            }
        });
    };

    // remove listeners and functions associated with the slideshow and set it to null
    Slideshow.prototype.destroy = function () {
        $('.slide-image-container').trigger('zoom.destroy');
        $('#gallery-container').removeClass('active').html('');
        slideshow = null;
    };

    // hijack the click event on gollery links to make gallery ajax call
    $('.gallery-link, .gallery-image-link').on('click', function(e){

        var $this = $(this);
        e.preventDefault();

        // make a ajax call to /gallery?name=foo, append data to gallery-container
        $.get( $this.attr('href'), function( data ) {
            $('#gallery-container').html(data);
                slideshow = new Slideshow();
                slideshow.init();
        });
    });

})(window, window.jQuery, window._, window.ScrollMagic, window.TweenMax);
