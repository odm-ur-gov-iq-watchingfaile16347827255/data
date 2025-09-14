
function ArbNetRotator(tab, cnt) {
    $(tab).mouseenter(function (e, trg) {
        if (trg) e.stopPropagation();
        $(tab).siblings().removeClass("active");
        $(this).addClass("active");
        $(cnt).hide();
        $(cnt).eq($(this).index()).show();
        if (trg) return false;
    });

    $(tab).eq(0).parent().mouseenter(function (e) {
        e.stopPropagation();
        clearInterval(window.arbnettmrrotator);
        return false;
    });

    $(tab).eq(0).parent().mouseleave(function (e) {
        e.stopPropagation();
        var rot = $(this);
        window.arbnettmrrotator = setInterval(function () {
            rot.find("li").eq(rot.find("li.active").index() + 1 == rot.find("li").length ? 0 : rot.find("li.active").index() + 1).trigger('mouseenter', true);
        }, $(".news_headlinesZee").attr("auto_news_headlines"));
        return false;
    });

    $(tab).eq(0).parent().mouseleave();
}

function ArbNetTicker(ticker, speed) {
    $(ticker + " .controlsZee .prev," + ticker + " .controlsZee .next," + ticker + " .controlsZee .pause").removeAttr("href");
    $(ticker + " .controlsZee .pause").click(function () {
        if($(this).hasClass("pause"))
        {
            $(this).parent().parent().find('.ticker_feeds').stop();
            $(this).attr("class","play");
        }
        else
        {
            $(this).siblings(arbnettkrdir).click();
            $(this).attr("class","pause")
        }
    });
    $(ticker + " .controlsZee .prev," + ticker + " .controlsZee .next").click(function () {
        window.arbnettkrdir = $(this).hasClass("prev") ? ".prev" : ".next";
        $(this).siblings(".play").attr("class","pause");
        var tkr = $(ticker + ' .ticker_feeds');
        var dir = $(".page_wrapperZee").css("directionZee") == "ltr" ? tkr.css("left") : tkr.css("right");
        var anm = {}; var prop = $(".page_wrapperZee").css("directionZee") == "ltr" ? "left" : "right"; 
        anm[prop] = (prop == "left" && $(this).hasClass("prev")) || (prop == "right" && $(this).hasClass("next")) ? -1 * tkr.width() : $(ticker + ' .wrapperZee').width();
        dir = anm[prop] > 0 ? anm[prop] - parseInt(dir.replace("px","")) : tkr.width() + parseInt(dir.replace("px",""));
        tkr.stop().animate(anm, dir * speed, 'linear', function(){
            var dir  = $(".page_wrapperZee").css("directionZee") == "ltr" ? "left" : "right";
            if(parseInt($(this).css("left").replace("px","")) == -1 * $(this).width())
            {
                $(this).css("left", $(this).parent().width() + "px");
                $(this).parent().parent().find(".controlsZee .prev").click();
            }
            else
            {
                $(this).css("left", ($(this).width() * -1) + "px");
                $(this).parent().parent().find(".controlsZee .next").click();
            }
        });
    });

    $(ticker + " .controlsZee .prev").click();
}

$(document).ready(function () {
    // start tabs

});
