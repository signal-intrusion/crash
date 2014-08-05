(function ($, _){
    'use strict';

    $('.aside-list-label').on('click', function(){

        var $this = $(this);
        $this.parent().children().removeClass('active');
        $this.addClass('active');
    });

    $('.in-line-note').click(function(){

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



})(window.jQuery, window._);