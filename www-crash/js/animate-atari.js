// animation file for atari story

(function (window, $, _, ScrollMagic, TweenMax, TimelineMax){
    'use strict';

    console.log('hey atari');

    function preload(arrayOfImages) {
        $(arrayOfImages).each(function () {
            $('<img/>')[0].src = this;
        });
    }

    function renderTemplate(target, template, data) {

        var tmplMarkup = $(template).html(),
            compiledTmpl = _.template(tmplMarkup, { data: data }),
            $target = $(target);
        $target.html(compiledTmpl);
    }

    // preload([
    //         'images/anim-sprites/ghost.png',
    //         'images/anim-sprites/ghost-run.png',
    //         'images/anim-sprites/ghost-arcade.png',
    //         'images/anim-sprites/ghost-arcade-run.png',
    //         'images/anim-sprites/pacman.png',
    //         'images/anim-sprites/pacman-arcade.png',
    //     ]);

    var $lastNoteByID,
        $lastMarginLink,
        scenes = [],
        // years = $('.year-empty'),
        controller = new ScrollMagic(),
        wp1pos,
        wp2pos,
        wp3pos,
        wp4pos,
        wp5pos;

    $(window).ready(function(){

    });

    var pacmanElements = '<!-- <div class="anim-sprite ghost" id="ghost-sprite"></div> -->';
    pacmanElements += '<div class="anim-sprite pacman" id="pacman-sprite"></div>';
    pacmanElements += '<div class="anim-sprite ghost arcade" id="ghost-sprite"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-1"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-2"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-3"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-4"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-5"></div>';

    $('#pacman-animation').html($(pacmanElements));

    wp1pos = $('#pacman-waypoint-1').position(),
    wp2pos = $('#pacman-waypoint-2').position(),
    wp3pos = $('#pacman-waypoint-3').position(),
    wp4pos = $('#pacman-waypoint-4').position(),
    wp5pos = $('#pacman-waypoint-5').position();

    TweenMax.set('#pacman-sprite');

    var pacmanTween = new TimelineMax()
        .add(TweenMax.to('#pacman-sprite', 1, {
            top: wp1pos.top,
            left: wp1pos.left,
            ease: Linear.easeNone,
        }))
        .add(TweenMax.to('#pacman-sprite', 1, {
            top: wp2pos.top,
            left: wp2pos.left,
            ease: Linear.easeNone,
        }))
        .add(TweenMax.to('#pacman-sprite', 2, {
            top: wp3pos.top,
            left: wp3pos.left / 2 - 50,
            ease: Linear.easeNone
        }))
        .add(TweenMax.to('#pacman-sprite', 2, {
            top: wp3pos.top,
            left: wp3pos.left,
            ease: Linear.easeNone,
            onStart: function() {
                $('#pacman-sprite').css('content', 'url(images/anim-sprites/pacman.png)');

            },
            onReverseComplete: function() {
                $('#pacman-sprite').css('content', 'url(images/anim-sprites/pacman-arcade.png)');

            }
        }))


        .add(TweenMax.to('#pacman-sprite', 2, {
            top: wp4pos.top,
            left: wp4pos.left,
            ease: Linear.easeNone
        }))
        .add(TweenMax.to('#pacman-sprite', 2, {
            top: wp5pos.top,
            left: wp5pos.left,
            ease: Linear.easeNone
        }));

    var pacmanScene = new ScrollScene({
        triggerElement: '#pacman-animation',
        duration: 700,
        offset: -200
    })
        .on('update', function(e){
            var dir = e.target.parent().info('scrollDirection');
            if (dir === 'REVERSE') {
                $('#pacman-sprite').css('-webkit-transform', 'scale(-1, 1)');
            } else if (dir === 'FORWARD') {
                // console.log('hit');
                $('#pacman-sprite').css('-webkit-transform', '');
            }
        })
        .setTween(pacmanTween)
        .addTo(controller);

    // pacmanScene.addIndicators();

    TweenMax.set('#ghost-sprite');

    var ghostTween = new TimelineMax()
        .add(TweenMax.to('#ghost-sprite', 1, {
            top: wp1pos.top,
            left: wp1pos.left,
            ease: Linear.easeNone,
        }))
        .add(TweenMax.to('#ghost-sprite', 1, {
            top: wp2pos.top,
            left: wp2pos.left,
            ease: Linear.easeNone,
        }))
        .add(TweenMax.to('#ghost-sprite', 2, {
            top: wp3pos.top,
            left: wp3pos.left / 2 - 50,
            ease: Linear.easeNone
        }))
        .add(TweenMax.to('#ghost-sprite', 2, {
            top: wp3pos.top,
            left: wp3pos.left,
            ease: Linear.easeNone,
            onStart: function() {
                $('#ghost-sprite').addClass('console').removeClass('arcade');
            },
            onReverseComplete: function() {
                $('#ghost-sprite').addClass('arcade').removeClass('console');

            }
        }))

        .add(TweenMax.to('#ghost-sprite', 2, {
            top: wp4pos.top,
            left: wp4pos.left,
            ease: Linear.easeNone
        }))
        .add(TweenMax.to('#ghost-sprite', 2, {
            top: wp5pos.top,
            left: wp5pos.left,
            ease: Linear.easeNone
        }));

    var ghostScene = new ScrollScene({
        triggerElement: '#pacman-animation',
        duration: 690,
        offset: -130
    })
        .on('update', function(e){
            var dir = e.target.parent().info('scrollDirection');
            if (dir === 'REVERSE') {
                $('#ghost-sprite').css('-webkit-transform', 'scale(-1, 1)').addClass('run');
            } else if (dir === 'FORWARD') {
                // console.log('hit');
                $('#ghost-sprite').css('-webkit-transform', '').removeClass('run');
            }
        })
        .setTween(ghostTween)
        .addTo(controller);

    ghostScene.addIndicators();


})(window, window.jQuery, window._, window.ScrollMagic, window.TweenMax, window.TimelineMax);