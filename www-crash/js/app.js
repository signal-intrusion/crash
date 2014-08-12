(function (window, $, _, ScrollMagic, TweenMax){
    'use strict';

    var $body = $('body'),
        controller = new ScrollMagic(),
        asideChangers = [],
        bookmarks;

    $body.addClass('script');

    $(window).load(function(){

        if (asideChangers[1] && asideChangers[1].scene.state() === 'BEFORE'){
            setTimeout(function () {
                $('.aside-container').first().addClass('active');
            }, 100);
        }

        loadBookmarks();
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

                            if (direction === 'FORWARD'){
                                _target = this.triggerElement().slice(1);
                                $('.' + _target).addClass('active');
                            } else {
                                _target = this.triggerElement();
                                var index = _target.indexOfEnd('level-');
                                var number = parseInt(_target.slice(index))-1;
                                _target = 'level-' + number;
                                $('.' + _target).addClass('active');
                            }

                            console.log($trigger);
                            leftHref = $trigger.next().attr('id');
                            leftTitle = $trigger.next().attr('data-name');

                            saveLeftoff(leftHref, leftTitle);
                        })
                        .addTo(controller);

        return true;
    };

    function saveLeftoff (leftoffLink, leftoffTitle) {
        localStorage.setItem('leftoffTitle', leftoffTitle);
        localStorage.setItem('leftoffLink', leftoffLink);
    }

    $.each($('.aside-trigger'), function() {
        var changer = new AsideChanger(this);
        AsideChanger.prototype.scrollAnimate.call(changer);
        asideChangers.push(changer);
    });

    ///////////////////
    // left-off
    ///////////////////


    ///////////////////
    // bookmarks
    ///////////////////

    // add a bookmark
    $('.aside-link-button').on('click', function(){

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

        loadBookmarks();

        $('#bookmarks').animate({opacity: 0.5}, 100).animate({opacity: 1}, 100).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);

    });

    // remove bookmarks
    $('#bookmark-nav-target').on('click', 'div.remove-bookmark', function(){
        var $this = $(this),
            mark,
            localMarks = bookmarks;

        mark = $this.attr('name');
        localMarks.bookmarkArray = _.without(localMarks.bookmarkArray, _.findWhere(localMarks.bookmarkArray, { title: mark }));
        localStorage.setItem('bookmarks', JSON.stringify(localMarks));
        bookmarks = localMarks;
        loadBookmarks();
    });

    function renderTemplate(target, template, data) {

        var tmplMarkup = $(template).html(),
            compiledTmpl = _.template(tmplMarkup, { data: data }),
            $target = $(target);

        $target.html(compiledTmpl);

    }

    function loadBookmarks() {

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

    }



})(window, window.jQuery, window._, window.ScrollMagic, window.TweenMax);