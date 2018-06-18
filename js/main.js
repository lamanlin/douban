//封装回到顶部，显示客户端
~function (jQuery){
    //鼠标移入顶部显示图片
    function download() {
        $(this).hover(function () {
            $(this).find("div").css("display", "block");
        }, function () {
            $(this).find("div").css("display", "none");
        });
    }

    //热门话题实现跑马灯
    function marquee() {
        var $rightTop = $(this),
            $wrapBox = $rightTop.children("div"),
            $begContent = $rightTop.find("ul").eq(0);
        var begHeight = parseFloat($begContent.css("height"));
        function move() {
            var scrTop = parseFloat($wrapBox.scrollTop());
            scrTop++;
            $wrapBox.scrollTop(scrTop);
            if (scrTop >= begHeight) {
                $wrapBox.scrollTop(0);
            }
        }

        var scrTimer = window.setInterval(move, 100);
        $rightTop.hover(function () {
            window.clearInterval(scrTimer);
        }, function () {
            scrTimer = window.setInterval(move, 100);
        });
    }

    //回到顶部
    function topTop() {
        _this=this;
        $(this).click(function () {
            $("html,body").animate({scrollTop: 0}, 500);
        });
        window.onscroll = function () {
            var $curHeight = $(window).height(), $curTop = $(window).scrollTop();
            if ($curTop > $curHeight) {
                $(_this).css("display", "block");
            }if ($curTop==0){
                $(_this).css("display", "none");
            }
        }
     }

    jQuery.fn.extend({
       download:download,
        marquee:marquee,
        topTop:topTop
    });


   
    
}(jQuery);