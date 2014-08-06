(function (window, $, _, ScrollMagic, TweenMax){
    'use strict';

    var $body = $('body'),
        controller = new ScrollMagic(),
        asideChangers = [];

    $(window).load(function(){

        $body.addClass('script');

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

    AsideChanger.prototype.scrollAnimate = function () {

        // this.tween = TweenMax.to(".dot-"+this.chartType, 0.5, {left: -150}, {left: 0, ease: Back.easeOut}, 0.04);
        var _this = this;
        console.log("hello: " + _this.chapter);



        this.scene = new ScrollScene({triggerElement: '#' + _this.chapter, offset: 0})
                        .on('start', function(e){
                            var _target = this.triggerElement().slice(1);
                            var direction = e.target.parent().info("scrollDirection");
                            console.log(direction);

                            $('.aside-container').removeClass('active');

                            if (direction === "FORWARD"){
                                $('.' + _target).addClass('active');
                            } else {
                                var number = parseInt(_target.slice(_target.length - 1))-1;
                                _target = "level-" + number;
                                console.log(_target);
                                $('.' + _target).addClass('active');
                            }

                        })
                        // .on('leave', function(){
                        //     var _target = this.triggerElement().slice(1);
                        //     console.log('leave ' + _target);

                        //     $('.' + _target).removeClass('active');
                        // })
                        .addTo(controller);
    };

    $.each($('.aside-trigger'), function() {
        // console.log(this);

        var changer = new AsideChanger(this);

        changer.scrollAnimate();
        asideChangers.push(changer);


    });



    // SkillChart Class will be used to store and display skill tables
    // function SkillChart(_skills, _contentBox, _chartType) {

    //     this.skills =  _skills;
    //     this.$contentBox = $(_contentBox);
    //     this.chartType = _chartType;
    //     this.tween;
    //     this.scene;

    //     this.getSkills = function(){

    //         return this.skills;
    //     };

    //     this.getSkill = function(passedSkill) {

    //         for (var index in this.skills) {
    //             if ( this.skills[index] === passedSkill) {
    //                 return this.skills[index];
    //             }
    //         }
    //     };
    // }

    // scene.addIndicators();

//     SkillChart.prototype.scrollAnimate = function(){

    //     this.tween = TweenMax.staggerFromTo(".dot-"+this.chartType, 0.5, {left: -150}, {left: 0, ease: Back.easeOut}, 0.04);

    //     // build scene
    //     this.scene = new ScrollScene({triggerElement: "#"+this.$contentBox.attr("id"), offset: -200})
    //                     .setTween(this.tween)
    //                     .addTo(controller);
    // };

    // var devSkillsObj = new SkillChart(devSkills, "#dev-target", "dev");
    // var uxSkillsObj = new SkillChart(uxSkills, "#ux-target", "ux");

    // devSkillsObj.skillDisplay("#skills-template");
    // uxSkillsObj.skillDisplay("#skills-template");

    // devSkillsObj.scrollAnimate();
    // uxSkillsObj.scrollAnimate();


})(window, window.jQuery, window._, window.ScrollMagic, window.TweenMax);