(function (window, $, _, ScrollMagic, TweenMax){
    'use strict';

    var $body = $('body'),
        controller = new ScrollMagic(),
        asideChangers = [];

    $(window).load(function(){


        $('.aside-container').first().addClass('active');
        $body.addClass('script');
        // $('.aside-list').first().addClass('active');

    });

    $('.aside-list-label').on('click', function(){

        var $this = $(this);
        $this.parent().children().removeClass('active');
        $this.addClass('active');
        $('.in-line-note.active').removeClass('active');
    });

    $('.in-line-note').on ('click mouseover', function(){

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


    function AsideChanger(_element) {

        this.tween;
        this.scene;
        this.chapter = $(_element).attr('id');

        console.log(this.chapter);

    }

    String.prototype.indexOfEnd = function(string) {
        var io = this.indexOf(string);
        return io == -1 ? -1 : io + string.length;
    };

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
        this.scene.addIndicators();
    };

    $.each($('.aside-trigger'), function() {
        // console.log(this);

        var changer = new AsideChanger(this);

        changer.scrollAnimate();
        asideChangers.push(changer);


    });


})(window, window.jQuery, window._, window.ScrollMagic, window.TweenMax);