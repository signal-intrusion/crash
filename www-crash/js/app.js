(function (window, $, _, ScrollMagic, TweenMax){
    'use strict';

    var $body = $('body'),
        controller = new ScrollMagic(),
        asideChangers = [],
        bookmarks;

    $body.addClass('script');

    $(window).load(function(){

        // console.log(asideChangers[1].scene.state());

        if (asideChangers[1] && asideChangers[1].scene.state() === "BEFORE"){



            setTimeout(function () {
                $('.aside-container').first().addClass('active');
            }, 100);
        }

        loadBookmarks();
        // console.log(supports_html5_storage());
        // $('.aside-list').first().addClass('active');
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
        return io == -1 ? -1 : io + string.length;
    };

    $('.aside-list-label').on('click', function(){

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

    function AsideChanger(_element) {

        this.tween;
        this.scene;
        this.chapter = $(_element).attr('id');
    }

    AsideChanger.prototype.scrollAnimate = function () {

        var _this = this;

        this.scene = new ScrollScene({triggerElement: '#' + _this.chapter, offset: 100 })
                        .on('start', function(e){

                            var _target,
                                direction = e.target.parent().info('scrollDirection');

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
                        })
                        .addTo(controller);
        // this.scene.addIndicators();

        return true;
    };

    $.each($('.aside-trigger'), function() {
        // console.log(this);

        var changer = new AsideChanger(this);

        changer.scrollAnimate();
        asideChangers.push(changer);


    });


    ///////////////////
    // bookmarks
    ///////////////////

    var bookmarks = {
        bookmarkArray: []
    }

    $('.aside-link-button').on('click', function(){

        var mark,
            title,
            link,
            $this = $(this),
            localMarks;

        if (localStorage.getItem('bookmarks') !== null && localStorage.getItem('bookmarks') !== undefined){
            localMarks = JSON.parse(localStorage.getItem('bookmarks'));
        } else {
            localMarks = {
                bookmarkArray: []
            };
        }

        console.log(localMarks);

        title = $this.attr('name');
        link = $this.attr('href');

        mark = {
            'title': title,
            'link': link
        };

        localMarks.bookmarkArray.push(mark);
        // console.log(localMarks);
        localStorage.setItem('bookmarks', JSON.stringify(localMarks));
        // console.log(localStorage.getItem('bookmarks'));
        bookmarks = localMarks;

        loadBookmarks();

        $('#bookmarks').animate({opacity: 0.5}, 100).animate({opacity: 1}, 100).animate({opacity: 0.5}, 100).animate({opacity: 1}, 100);

    });

    // remove bookmarks
    $('#bookmark-nav-target').on('click', 'div.remove-bookmark', function(e){
        console.log('fired' + this);
        var $this = $(this),
            mark,
            localMarks = bookmarks,
            index;

        mark = $this.attr('name');

        console.log(localMarks);
        localMarks.bookmarkArray = _.without(localMarks.bookmarkArray, _.findWhere(localMarks.bookmarkArray, { title: mark }));
        console.log(localMarks);
        localStorage.setItem('bookmarks', JSON.stringify(localMarks));
        bookmarks = localMarks;
        loadBookmarks();
    });

    function renderTemplate(target, template, data) {

        var tmplMarkup = $(template).html(),
            compiledTmpl = _.template(tmplMarkup, { data: data }),
            $target = $(target);

        $target.html(compiledTmpl);

    };

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