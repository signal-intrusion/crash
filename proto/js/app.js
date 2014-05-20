(function ($, ScrollMagic, ScrollScene, TweenMax, TimelineMax, _) {
    'use strict';

    var $lastNoteByID,
        $lastMarginLink,
        scenes = [],
        years = $('.year-empty'),
        controller = new ScrollMagic();

    var bios = [

        {
            "id": "jack-tramiel",
            "name": "Jack Tramiel",
            "bio": "Jack Tramiel was a survivor of Auchswitz. Tramiel founded a typewriter company, Commodore. Under Tramiel Commodore would expand into calculators and eventually computers. Tramiel's hardball business practices and uncompromising managment style made him many enemies inside and outside Commodore. Tramiel placed third place in a list of &ldquo;Bosses from Hell.&rdquo;",
            "quote": "&ldquo;Tramiel was well known for hardball business practices... Around Commodore, he referred to his business philosophy as &lsquo;the religion.&rsquo;&rdquo;",
            "links": [ {"title": "Jack Tramiel at Commodore", "url": "#" },
                       {"title": "Jack Tramiel at Atari", "url": "#" } ],
            "image": "images/tramiel.jpg",
            "href": "#"
        },
        {
            "id": "nolan-bushnell",
            "name": "Nolan Bushnell",
            "bio": "Nolan Bushnell founded Atari with Ted Dabney and Al Alcorn in 1972 for $500. They began distributing Pong arcade cabinets that year, essentially creating the video game industry. Bushnell sold Atari to Warner in 1976 for $28 million and left the company in less than two years. Bushnell would later found Pizza Time Theater, now know as Chuck E. Cheese's, and several other business and technology endevours. He is considered a innovator and hero by many in Silicon Valley.",
            "quote": "&ldquo;Nolan Bushnell can look you in the eye when he says he was twenty-nine years old when he started Atari with $250 of his own money and in four years had sold the company for $28 million&rdquo;",
            "links": [ {"title": "Nolan Bushnell and Atari", "url": "#" },
                       {"title": "Chuck E. Cheese", "url": "#" } ],
            "image": "images/bushnell.jpg",
            "href": "#"
        }
    ];

    for (var i = 0; i < years.length; i += 1) {
        // assign handler "scene" and add it to Controller
        var scene = new ScrollScene({
            triggerElement: years[i]
        })
            .addTo(controller)
            .on("enter", function(e) {
                var _$this = $(this.triggerElement());
                //console.log(_$this.attr('id'));
                var targetID = _$this.attr('id');
                var $timelineItem = $("." + targetID);
                $($('.timeline-list-item').children()).removeClass('timeline-active');
                $('.timeline-list-item').removeClass('timeline-list-active');

                $timelineItem.toggleClass('timeline-list-active');

                $($timelineItem.children()[0])
                    .toggleClass('timeline-active');
            });
        //scene.addIndicators();
        scenes.push(scene);
    }

    var wp1pos = $('#pacman-waypoint-1').position();
    var wp2pos = $('#pacman-waypoint-2').position();
    var wp3pos = $('#pacman-waypoint-3').position();
    var wp4pos = $('#pacman-waypoint-4').position();
    var wp5pos = $('#pacman-waypoint-5').position();

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
                $('#pacman-sprite').css('content', 'url(images/sprites/pacman.png)');

            },
            onReverseComplete: function() {
                $('#pacman-sprite').css('content', 'url(images/sprites/pacman-arcade.png)');

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
        .on("update", function(e){
            var dir = e.target.parent().info("scrollDirection");
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
        .on("update", function(e){
            var dir = e.target.parent().info("scrollDirection");
            if (dir === 'REVERSE') {
                $('#ghost-sprite').css('-webkit-transform', 'scale(-1, 1)').addClass('run');
            } else if (dir === 'FORWARD') {
                // console.log('hit');
                $('#ghost-sprite').css('-webkit-transform', '').removeClass('run');
            }
        })
        .setTween(ghostTween)
        .addTo(controller);

    // ghostScene.addIndicators();

    function toggleMarginNote(_this) {
        var $this = $(_this),
            thisID = $this.attr('id'),
            $noteByID = $('div[title="' + thisID + '"]'),
            thisYpos = $this.position().top - 50;
        $this.toggleClass('margin-link-active');
        $noteByID.toggleClass('abridged').css('top', thisYpos + 'px').toggleClass('unabridged');
        if ($lastNoteByID !== undefined) {
            $lastNoteByID.toggleClass('abridged').toggleClass('unabridged');
        }
        if ($lastMarginLink !== undefined) {
            $lastMarginLink.toggleClass('margin-link-active');
        }
        $lastNoteByID = $noteByID;
        $lastMarginLink = $this;
    }

    $('.nav-item').on('click', function(e) {

        $('body').removeClass('secondary-sources primary-sources article-content home');

        var id = e.target.id;
        //console.log(id);

        $('body').addClass(id);

    });


    $('.margin-link').on('mouseover click', function() {
        toggleMarginNote(this);
    });

    // build tween
    var imageTween = new TimelineMax ()
        .add([
            TweenMax.to("#stella-image-container .layer2", 1, {backgroundPosition: "0 -200%", ease: Linear.easeNone})
        ]);

    // build scene
    var imageScene = new ScrollScene({triggerElement: "#stella-image-container", duration: $(window).height()*2.5, offset: -$(window).height()})
                    .setTween(imageTween)
                    //.setPin("#stella-image-container",{pushFollowers: true})
                    .addTo(controller);

    // show indicators (requires debug extension)
    // imageScene.addIndicators();

        // build tween
    var imageTween2 = new TimelineMax ()
        .add([
            TweenMax.to("#yars-image-container .layer2", 1, {backgroundPosition: "0 -200%", ease: Linear.easeNone})
        ]);

    // build scene
    var imageScene2 = new ScrollScene({triggerElement: "#yars-image-container", duration: $(window).height()*2.5, offset: -$(window).height()})
                    .setTween(imageTween2)
                    //.setPin("#stella-image-container",{pushFollowers: true})
                    .addTo(controller);

    // show indicators (requires debug extension)
    // imageScene2.addIndicators();

    $('#slideleft button').click(function() {
        var $lefty = $(this).next();
        $lefty.animate({
          left: parseInt($lefty.css('left'),10) === 0 ?
            -$lefty.outerWidth() :
            0
        });
      });

    function toggleBio(_this) {
        var $this = $(_this),
            thisID = $this.attr('id'),
            $noteByID = $('li[title="' + thisID + '"]');

        $this.toggleClass('bio-link-active');
    }

    var renderBio = function (template, target, bio) {

        var $contentBox = $(target);
        var tmplMarkup = $(template).html();
        var compiledTmpl = _.template(tmplMarkup, {
            "bio": bio
        });
        $contentBox.html(compiledTmpl);

    };

    $('.bio-link').on('click', function(){
        // console.log("find" + $(this));
        var $this = $(this);
        var target = $this.attr('id');
        var bio = _.findWhere(bios, {id: target});
        $this.addClass('active');
        renderBio('#bio-template', "#bio-container", bio);

        $('aside.biography').animate({
            right: "0px"
        });

        $('.close-after, .close').on('click', function(){
            console.log('closing' + this);
            $('aside.biography').animate({
                right: "-50%"
            });
            $('.bio-link').removeClass('active');
        });
    });

    $('#defender-up :button').on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        var thisName = $this.attr('name');

        // console.log($this.attr('name'));
        $('.defender').removeClass('sales profits').addClass(thisName);
        $('#defender-up :button').removeClass('button-active');
        $this.addClass('button-active');

        if (thisName === "profits") {
            $('.profits-sprite').css('display', 'block');
            $('.sales-sprite').css('display', 'none');
        } else {
            $('.profits-sprite').css('display', 'none');
            $('.sales-sprite').css('display', 'block');
        }

    });

        function adjustActive(_this){
            console.log("fired");
            var targetID = $(_this) .attr('id');
            var $timelineItem = $("." + targetID);
            $($('.timeline-list-item').children()).removeClass('timeline-active');
            $('.timeline-list-item').removeClass('timeline-list-active');

            $timelineItem.toggleClass('timeline-list-active');

            $($timelineItem.children()[0])
                .toggleClass('timeline-active');
        }


    $("#timeline").on("click", "a[href^=#]", function (e) {
                    var id = $(this).attr("href"),
                        $elem = $(id);
                    if ($elem.length > 0) {
                        e.preventDefault();
                        TweenMax.to(window, 1, {scrollTo: {y: $elem.offset().top - 50 }, onComplete: function(e){adjustActive($(id))}});
                        if (window.history && window.history.pushState) {
                            // if supported by the browser we can even update the URL.
                            history.pushState("", document.title, id);
                        }
                    }
                });

})(window.jQuery, window.ScrollMagic, window.ScrollScene, window.TweenMax, window.TimelineMax, window._);
