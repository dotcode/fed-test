define(
    ['jquery'],
    function ($) {
    'use strict';
        return function(docImages){
            var tooltip = $('<span id="tooltip"/>').hide().appendTo('body');
            $(docImages).each(function(index, el){
                var img = $(el),
                    content = el.alt.split(' - ')[1];
                img.on('mouseenter', function(event){
                    tooltip.text(content).show();
                }).on('mouseleave', function(event){
                    tooltip.hide();
                });
            });
            $(document).mousemove(function (e) {
                var mouseX = e.pageX - 65,
                    mouseY = e.pageY - 60;
                tooltip.css({ left: mouseX + "px", top: mouseY + "px" });
            });
        };
    }
);