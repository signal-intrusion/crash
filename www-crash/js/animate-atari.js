// animation file for atari story

(function(window, $, _, ScrollMagic, TweenMax, TimelineMax) {
    'use strict';

    console.log('hey atari');

    function preload(arrayOfImages) {
        $(arrayOfImages).each(function() {
            $('<img/>')[0].src = this;
        });
    }

    preload([
        'images/anim-sprites/ghost.png',
        'images/anim-sprites/ghost-run.png',
        'images/anim-sprites/ghost-arcade.png',
        'images/anim-sprites/ghost-arcade-run.png',
        'images/anim-sprites/pacman.png',
        'images/anim-sprites/pacman-arcade.png',
    ]);

    var controller = new ScrollMagic(),
        wp1pos,
        wp2pos,
        wp3pos,
        wp4pos,
        wp5pos,
        wp6pos;

    $(window).ready(function() {

    });

    var pacmanElements = '<!-- <div class="anim-sprite ghost" id="ghost-sprite"></div> -->';
    pacmanElements += '<div class="anim-sprite pacman" id="pacman-sprite"></div>';
    pacmanElements += '<div class="anim-sprite ghost arcade" id="ghost-sprite"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-1"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-2"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-3"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-4"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-5"></div>';
    pacmanElements += '<div class="waypoint" id="pacman-waypoint-6"></div>';


    $('#pacman-animation').html($(pacmanElements));

    wp1pos = $('#pacman-waypoint-1').position();
    wp2pos = $('#pacman-waypoint-2').position();
    wp3pos = $('#pacman-waypoint-3').position();
    wp4pos = $('#pacman-waypoint-4').position();
    wp5pos = $('#pacman-waypoint-5').position();
    wp6pos = $('#pacman-waypoint-6').position();

    TweenMax.set('#pacman-sprite');

    var pacmanTween = new TimelineMax()
        .add(TweenMax.to('#pacman-sprite', 1, {
            top: wp1pos.top,
            left: wp1pos.left,
            ease: Linear.easeNone,
            onReverseComplete: function() {
                $('#pacman-sprite').css('-webkit-transform', '');
                pacmanScene.reverse(true);
                pacmanScene.enabled(true);
            },
            onStart: function() {
                pacmanScene.reverse(false);
                pacmanScene.enabled(false);
            }
        }))
        .add(TweenMax.to('#pacman-sprite', 1, {
            top: wp2pos.top,
            left: wp2pos.left,
            ease: Linear.easeNone,
        }))
        .add(TweenMax.to('#pacman-sprite', 1, {
            top: wp3pos.top,
            left: wp3pos.left / 2 - 50,
            ease: Linear.easeNone
        }))
        .add(TweenMax.to('#pacman-sprite', 1, {
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
        .add(TweenMax.to('#pacman-sprite', 1, {
            top: wp4pos.top,
            left: wp4pos.left,
            ease: Linear.easeNone
        }))
        .add(TweenMax.to('#pacman-sprite', 1, {
            top: wp5pos.top,
            left: wp5pos.left,
            ease: Linear.easeNone,
        }))
        .add(TweenMax.to('#pacman-sprite', 1, {
            top: wp6pos.top,
            left: wp6pos.left,
            ease: Linear.easeNone,
            onComplete: function() {
                $('#pacman-sprite').css('-webkit-transform', 'scale(-1, 1)');
                pacmanScene.reverse(true);
                pacmanScene.enabled(true);
                // pacmanScene.on();
            },
            onStart: function() {
                pacmanScene.reverse(false);
            }
        }));

    var pacmanScene = new ScrollScene({
            triggerElement: '#pacman-animation',
            offset: -50
        })
        .on('start', function() {
            this.enabled(false);
        })
        .setTween(pacmanTween)
        .addTo(controller);

    pacmanScene.addIndicators();

    TweenMax.set('#ghost-sprite');

    var ghostTween = new TimelineMax()
        .add(TweenMax.to('#ghost-sprite', 1, {
            top: wp1pos.top,
            left: wp1pos.left,
            ease: Linear.easeNone,
            delay: 0.5,
            onStart: function() {
                ghostScene.reverse(false);
            },
            onReverseComplete: function() {
                ghostScene.reverse(false);
                ghostScene.enabled(true);
                $('#ghost-sprite').removeClass('run');
            }
        }))
        .add(TweenMax.to('#ghost-sprite', 1, {
            top: wp2pos.top,
            left: wp2pos.left,
            ease: Linear.easeNone,
        }))
        .add(TweenMax.to('#ghost-sprite', 1, {
            top: wp3pos.top,
            left: wp3pos.left / 2 - 50,
            ease: Linear.easeNone
        }))
        .add(TweenMax.to('#ghost-sprite', 1, {
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
        .add(TweenMax.to('#ghost-sprite', 1, {
            top: wp4pos.top,
            left: wp4pos.left,
            ease: Linear.easeNone
        }))
        .add(TweenMax.to('#ghost-sprite', 1, {
            top: wp5pos.top,
            left: wp5pos.left,
            ease: Linear.easeNone,
            onStart: function() {
                ghostScene.reverse(false);
            },
            onComplete: function() {
                ghostScene.reverse(true);
                ghostScene.enabled(true);
                $('#ghost-sprite').addClass('run');
            }
        }));

    var ghostScene = new ScrollScene({
        triggerElement: '#pacman-animation',
        offset: -50
    })
    .on('start', function() {
        this.enabled(false);
    })
    .setTween(ghostTween)
        .addTo(controller);
    ghostScene.addIndicators();

})(window, window.jQuery, window._, window.ScrollMagic, window.TweenMax, window.TimelineMax);
