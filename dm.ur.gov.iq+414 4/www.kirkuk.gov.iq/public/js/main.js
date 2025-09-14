(function ($) {
    "use strict";
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
    $('[data-toggle="datepicker"]').datepicker({
        format: "yyyy-mm-dd",
        months: [
            "كانون الثاني",
            "شباط",
            "آذار",
            "نيسان",
            "أيار",
            "حزيران",
            "تموز",
            "آب",
            "أيلول",
            "تشرين الأول",
            "تشرين الثاني",
            "كانون الأول",
        ],
        monthsShort: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
        ],
    });
    $(".aboutus").on("click", function () {
        $("#aboutus2").css("display", "block");
        $("#aboutbtnclose").removeAttr("style");
    });
    $("#aboutbtnclose").on("click", function () {
        $("#aboutus2").css("display", "none");
        $(this).css("display", "none");
    });

    $(".structuralbtn").on("click", function () {
        $("#structural2").css("display", "block");
        $("#structuralbtnclose").removeAttr("style");
    });
    $("#structuralbtnclose").on("click", function () {
        $("#structural2").css("display", "none");
        $(this).css("display", "none");
    });

    var Elimination = $("#Input5"),
        Side = $("#Input55"),
        inserSide =
            '<option value="ناحية يايجي">ناحية يايجي</option>' +
            '<option value="ناحية الملتقى (ملا عبد الله)">ناحية الملتقى (ملا عبد الله)</option>' +
            '<option value="ناحية تازة خورماتو">ناحية تازة خورماتو</option>' +
            '<option value="ناحية ليلان">ناحية ليلان</option>' +
            '<option value="ناحية شوان">ناحية شوان</option>' +
            '<option value="ناحية قرة هنجير (الربيع)">ناحية قرة هنجير (الربيع)</option>' +
            '<option value="مركز القضاء">مركز القضاء</option>',
        inserSide1 =
            '<option value="ناحية العباسي">ناحية العباسي</option>' +
            '<option value="ناحية الرياض">ناحية الرياض</option>' +
            '<option value="ناحية الزاب">ناحية الزاب</option>' +
            '<option value="مركز القضاء">مركز القضاء</option>',
        inserSide2 =
            '<option value="ناحية الرشاد">ناحية الرشاد</option>' +
            '<option value="مركز القضاء">مركز القضاء</option>',
        inserSide3 =
            '<option value="ناحية سركران">ناحية سركران</option>' +
            '<option value="ناحية التون كوبري">ناحية التون كوبري</option>' +
            '<option value="مركز القضاء">مركز القضاء</option>';

    // When the judiciary is changed it brings its aspects
    Elimination.on("change", function (event) {
        if (Elimination.val() == "قضاء كركوك") {
            Side.children("option:not(:first)").remove();
            Side.append(inserSide);
        }
        if (Elimination.val() == "قضاء الحويجة") {
            Side.children("option:not(:first)").remove();
            Side.append(inserSide1);
        }
        if (Elimination.val() == "قضاء داقوق") {
            Side.children("option:not(:first)").remove();
            Side.append(inserSide2);
        }
        if (Elimination.val() == "قضاء دبس") {
            Side.children("option:not(:first)").remove();
            Side.append(inserSide3);
        }
        if (Elimination.val() == "") {
            Side.children("option:not(:first)").remove();
            downloadExcel.addClass("d-none");
        }
    });
    /*------------------------------------
    Video Player
--------------------------------------*/
    $(".player").YTPlayer({
        showControls: false,
    });

    $(".player-small").YTPlayer({
        showControls: false,
    });

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($("#spinner").length > 0) {
                $("#spinner").removeClass("show");
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $(".navbar").addClass("sticky-top shadow-sm");
        } else {
            $(".navbar").removeClass("sticky-top shadow-sm");
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000,
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 0, "easeInOutExpo");
        return false;
    });

    // Slick carousel
    $(".filtering").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        dots: true,
        arrows: false,
    });

    // Search Mailrecord
    $(".closeModal").on("click", function () {
        $("#StaffServices").offcanvas("hide");
    });
    fetch_customer_data();

    function fetch_customer_data(query = "") {
        $.ajax({
            url: $("#getUel").text() + "/mailrecord/action",
            method: "GET",
            data: { query: query },
            dataType: "json",
            success: function (data) {
                $("#result").html(data.table_data);
            },
        });
    }

    $(document).on("keyup", "#search", function () {
        var query = $(this).val();
        fetch_customer_data(query);
    });

    let date = new Date().toLocaleDateString("ar-EG-u-nu-latn", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    $("#getDate").text(date);

    $("#newsTicker2").breakingNews({
        direction: "rtl",
        scrollSpeed: 1,
    });
})(jQuery);

function readURL(input) {
    "use strict";
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $(".image-upload-wrap").hide();

            $(".file-upload-image").attr("src", e.target.result);
            $(".file-upload-content").show();

            $(".image-title").html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        removeUpload();
    }
}

function removeUpload() {
    "use strict";
    $(".file-upload-input").replaceWith($(".file-upload-input").clone());
    $(".file-upload-content").hide();
    $(".image-upload-wrap").show();
}
$(".image-upload-wrap").bind("dragover", function () {
    $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
    $(".image-upload-wrap").removeClass("image-dropping");
});

function showMyImage(fileInput) {
    "use strict";
    document.getElementById("thumbnil").style.display = "";
    document.getElementById("showbotton").style.display = "";
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
            continue;
        }
        var img = document.getElementById("thumbnil");
        img.file = file;
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
}
