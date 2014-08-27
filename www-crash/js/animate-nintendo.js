// animation file for nintendo story

(function(window, $, _, ScrollMagic, TweenMax, TimelineMax) {
    'use strict';

    console.log('hey nintendo');

    var controller = new ScrollMagic(),
        mwp1pos,
        mwp2pos,
        bwp1pos,
        bwp2pos,
        fwp1pos,
        fwp2pos;

    $(window).ready(function() {

    });

    var donkeyElements = '<div class="anim-sprite mario run" id="mario-sprite"></div>';
    donkeyElements += '<div class="anim-sprite fire" id="fire-sprite"></div>';
    donkeyElements += '<div class="anim-sprite barrel down" id="barrel-sprite-1"></div>';
    donkeyElements += '<div class="anim-sprite barrel down" id="barrel-sprite-2"></div>';
    donkeyElements += '<div class="anim-sprite barrel down" id="barrel-sprite-3"></div>';
    donkeyElements += '<div class="anim-sprite barrel down" id="barrel-sprite-4"></div>';
    donkeyElements += '<div class="waypoint" id="mario-waypoint-1"></div>';
    donkeyElements += '<div class="waypoint" id="barrel-waypoint-1"></div>';
    donkeyElements += '<div class="waypoint" id="barrel-waypoint-2"></div>';
    donkeyElements += '<div class="waypoint" id="barrel-waypoint-3"></div>';
    donkeyElements += '<div class="waypoint" id="fire-waypoint-1"></div>';
    donkeyElements += '<div class="waypoint" id="fire-waypoint-2"></div>';


    $('#donkey-animation').html($(donkeyElements));

    mwp1pos = $('#mario-waypoint-1').position();
    mwp2pos = $('#mario-waypoint-2').position();
    bwp1pos = $('#barrel-waypoint-1').position();
    bwp2pos = $('#barrel-waypoint-2').position();
    fwp1pos = $('#fire-waypoint-1').position();
    fwp2pos = $('#fire-waypoint-2').position();

    var marioTween = new TimelineMax()
        .add(TweenMax.to('#mario-sprite', 3, {
            top: mwp1pos.top,
            left: mwp1pos.left,
            ease: Linear.easeNone,
            onComplete: function() {
                $('#mario-sprite').removeClass('run');
                marioScene.reverse(false);
                marioScene.enabled(false);
            },
            onStart: function() {
                $('#mario-sprite').css('display','block');
                marioScene.reverse(false);
                marioScene.enabled(false);
            }
        })
    );

    var barrelTween = new TimelineMax()


        .add(TweenMax.staggerTo('.barrel', 3, {
            top: bwp1pos.top,
            left: bwp1pos.left,
            ease: Linear.easeNone,
            onComplete: function() {
                $(this.target).removeClass('down');
                TweenMax.to($(this.target), 1.8, {
                    top: bwp2pos.top,
                    left: bwp2pos.left,
                    ease: Linear.easeNone,
                    onComplete: function() {
                        $(this.target).addClass('done');
                    },
                    onStart: function() {
                    }
                });
            },
            onStart: function() {
                $(this.target).css('opacity', 1);
            }
        }, 2.5));

    var fireTween = new TimelineMax()

        .add(TweenMax.to('.fire', 9, {
            top: fwp1pos.top,
            left: fwp1pos.left,
            ease: Linear.easeNone,
            delay: 1,
            onComplete: function() {
            },
            onStart: function() {
            }
        }))
        .add(TweenMax.to('.fire', 4, {
            top: fwp2pos.top,
            left: fwp2pos.left,
            ease: Linear.easeNone,
            onComplete: function() {
                $(this.target).css('opacity', 0);
                $('#mario-sprite').addClass('dead');
            },
            onStart: function() {
            }
        }));

    var marioScene = new ScrollScene({
            triggerElement: '#donkey-animation',
            offset: -100
        })
        .on('start', function() {
            this.enabled(false);
        })
        .setTween(marioTween)
        .addTo(controller);

    var barrelScene = new ScrollScene({
            triggerElement: '#donkey-animation',
            offset: -100
        })
        .on('start', function() {
            this.enabled(false);
        })
        .setTween(barrelTween)
        .addTo(controller);

    var fireScene = new ScrollScene({
            triggerElement: '#donkey-animation',
            offset: -100
        })
        .on('start', function() {
            this.enabled(false);
        })
        .setTween(fireTween)
        .addTo(controller);

    marioScene.addIndicators();

})(window, window.jQuery, window._, window.ScrollMagic, window.TweenMax, window.TimelineMax);