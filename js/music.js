//左侧轮播图
function banner() {
    var $bannerBox = $(".banner-box"),
        $innerBox = $(".inner-box"),
        $bannerTip = $bannerBox.children("ul").eq(0);
    var $imgList = null, $divList = null, $oLis = null;
    //1、ajax读取数据
    var jsonData = null;
    $.ajax({
        url: "json/banner.txt?_=" + Math.random(),
        type: "get",
        dataType: "json",
        async: false,
        success: function (data) {
            jsonData = data;
        }
    });
    //2、数据绑定（字符串绑定）
    ~function () {
        var str = "", str2 = "";
        $.each(jsonData, function (index, item) {
            str += "<div><img src='' trueImg='" + item["img"] + "'/></div>";
            index == 0 ? str2 += "<li class='selected'></li>" : str2 += "<li></li>";
        });
        str += "<div><img src='' trueImg='" + jsonData[0]["img"] + "'/></div>";
        $innerBox.html(str);
        $bannerTip.html(str2);
        $imgList = $innerBox.find("img");
        $divList = $innerBox.children("div");
        $oLis = $bannerTip.children("li");
        count = jsonData.length + 1;
        $innerBox.css("width", count * 590);
    }();
    //3、动画延迟加载
    window.setTimeout(lazyImg, 500);

    function lazyImg() {
        $imgList.each(function (index, item) {
            var _this = this;
            var oImg = new Image;
            oImg.src = $(this).attr("trueImg");
            oImg.onload = function () {
                $(_this).prop("src", this.src).css("display", "block");
            }
        });
        $imgList.animate({opacity: 1}, 500);
    }

    //4、实现自动轮播
    var index = 0, interval = 2000, autoTimer = null;
    autoTimer = window.setInterval(move, 2000);

    function changeBanner() {
        $innerBox.css({left: -index * 590});
        //焦点对齐
        var tempLi = index > $oLis.length - 1 ? 0 : index;
        var $curLi = $oLis.eq(tempLi);
        $curLi.addClass("selected").siblings().removeClass("selected");
    }

    function move() {
        if (index >= count - 1) {
            index = 0;
            $innerBox.css("left", 0);
        }
        index++;
        changeBanner();
    }

    //5、鼠标悬停，停止轮播
    $bannerBox.on("mouseover", function () {
        window.clearInterval(autoTimer);
    }).on("mouseout", function () {
        autoTimer = window.setInterval(move, 2000);
    });
    //6、焦点点击
    $oLis.on("click", function () {
        index = $(this).index();
        changeBanner();
    })
}

banner();

//左侧Li宽度自动分配
function equally() {
    var $firLi = $(".fir-musical ul li");
    $firLi.css({width: 100 / $firLi.length + "%"});
    var $secLi = $(".sec-musical ul li");
    $secLi.css({width: 100 / $secLi.length + "%"});
}

equally();

//左侧编辑推荐选项卡
function pushTab() {
    $("#left-btn").on("click", function () {
        $(".sec-tab").css("display", "none");
    })
    $("#right-btn").on("click", function () {
        $(".sec-tab").css("display", "block");
    })
}

pushTab();

//右侧热曲榜选项卡
function hotTab() {
    var hotSpot = document.getElementById("hot-spot"),
        changeTab_hot = document.getElementById("changeTab-hot");

    var links = hotSpot.getElementsByTagName("a"),
        oUls = changeTab_hot.getElementsByTagName("ul");
    for (var i = 0; i < links.length; i++) {
        links[i].index = i;
        links[i].onclick = function () {
            for (j = 0; j < oUls.length; j++) {
                links[j].className = oUls[j].className = null;
            }
            this.className="bg";
            oUls[this.index].className="home";
        }

    }
}
hotTab();