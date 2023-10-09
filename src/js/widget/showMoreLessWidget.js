$.widget("obrs.showMoreLessWidget", {
    options: {
        showChar: 100,
        ellipsestext: '...',
        moretext: 'Read more',
        lesstext: 'Show less'
    },
    _create: function () {
        var self = this;
        self.el = {};
        self.data = {};

        self.el.form = $("#signup-form");

       
    },
    _init: function () {
        var options = this.options;
        var self = this;

        self.uiEventInitialization();

    },
    uiEventInitialization: function () {
        var self = this;

        $('.more').each(function() {
            var content = $(this).html();

            if(content.length > self.options.showChar) {

                var c = content.substr(0, self.options.showChar);
                var h = content.substr(self.options.showChar, content.length - self.options.showChar);

                var html = c + '<span class="moreellipses">' + self.options.ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + self.options.moretext + '</a></span>';

                $(this).html(html);
            }

        });
        
        $(".morelink").click(function(){
            if($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(self.options.moretext);
            } else {
                $(this).addClass("less");
                $(this).html(self.options.lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
    },
    destroy: function () {
    }
});