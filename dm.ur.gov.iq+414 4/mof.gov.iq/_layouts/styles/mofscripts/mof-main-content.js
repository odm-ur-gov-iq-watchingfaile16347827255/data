/// <reference path="jquery-1.7.2.js" />
/// <reference path="jqueryslidemenu.js" />
/// <reference path="jquery.SPServices-0.7.2.js" />
/// <reference path="toastr.min.js" />

//Get current client culture/language
function getCurrentLanguage() {
    var cultureID = "0";
    var cookie = document.cookie.split(";");
    if (document.cookie.split(";").length > 1) {
        for (var index = 0; index <= cookie.length - 1; index++) {
            var strtemp = cookie[index].split("=");
            if (strtemp[0].trim() == "lcid") {
                cultureID = strtemp[1]
            }
        }
    }
    else {

        var strtemp = document.cookie.split("=");
        if (strtemp[0].trim() == "lcid")
            cultureID = strtemp[1];
    }

    return cultureID;
}

function topMenuJsSet(MenuContainer) {

    var cultureID = getCurrentLanguage();

    var arrowimages = { down: [], right: [] }
    jqueryslidemenu.buildmenu(MenuContainer, arrowimages, cultureID);
}


//Get Menu informations
function GetMainMenu(MenuContainer, menuType) {
    var cultureID = getCurrentLanguage();
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/GetBuildMenus",
        data: "{cultureID :\"" + cultureID + "\", menuType :\"" + menuType + "\"}",
        contentType: 'application/json; charset=utf-8',
        dataType: "JSON",
        success: function (r) {

            $("#" + MenuContainer).empty();
            $("#" + MenuContainer).append(r.d);

            var arrowimages = { down: [], right: [] }
            jqueryslidemenu.buildmenu(MenuContainer, arrowimages, cultureID);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //// alert(XMLHttpRequest.responseText);
        }
    });

    //    $("ul.Top-sf-menu").superfish({
    //        animation: { height: 'show' },  // slide-down effect without fade-in 
    //        delay: 1200                     // 1.2 second delay on mouseout 
    //    });
}



//CurrentPageChane Satic liks
function CurrentPageLanuage(LanuageID) {

    var url = window.location.href;
    if (LanuageID == "1033") {

        url = url.replace("/ar/", "/en/");
        url = url.replace("/aR/", "/en/");
        url = url.replace("/Ar/", "/en/");
        url = url.replace("/AR/", "/en/");
        //        //window.location.href = 'http://' + window.location.host + '/_layouts/Authenticate.aspx?Source=' + window.location.pathname;
        //        if (window.location.pathname.substring(0, 9).toUpperCase() == "/PAGES/AR")
        //            window.location.href = "http://" + window.location.host + "/Pages/en/" + window.location.pathname.substring(10, window.location.pathname.length) + window.location.search;
        //        else
        //            window.location.href = "http://" + window.location.host + "/Pages/" + window.location.pathname.substring(7, window.location.pathname.length) + window.location.search;
    }
    else {
        url = url.replace("/en/", "/ar/");
        url = url.replace("/eN/", "/ar/");
        url = url.replace("/En/", "/ar/");
        url = url.replace("/EN/", "/ar/");
        //        //window.location.href = 'http://' + window.location.host + '/_layouts/Authenticate.aspx?Source=' + window.location.pathname;
        //        if (window.location.pathname.substring(0, 9).toUpperCase() == "/PAGES/EN")
        //            window.location.href = "http://" + window.location.host + "/Pages/ar/" + window.location.pathname.substring(10, window.location.pathname.length) + window.location.search;
        //        else
        //            window.location.href = "http://" + window.location.host + "/Pages/" + window.location.pathname.substring(7, window.location.pathname.length) + window.location.search;
    }
    window.location.href = url;
}
//bind Static liks
function BindLinks(Control, Control1, Control2, Control3) {
    $("#" + Control).attr("href", '/Pages/aboutus.aspx');
    $("#" + Control1).attr("href", '/Pages/ContactUS.aspx');
    $("#" + Control2).attr("href", '/Pages/MofSitemap.aspx');
    $("#" + Control3).attr("href", '/Pages/MOFCustomerCare.aspx');
}


//Login User
function LoginUser(Control) {

    $("#" + Control).click(function () {
        window.location.href = 'https://' + window.location.host + '/_layouts/Authenticate.aspx?Source=' + window.location.pathname;


    });
}


//Logout User
function LogoutUser(Control) {
    $("#" + Control).click(function () {
       
       document.cookie = "WSS_KeepSessionAuthenticated=deleted; expires=" + new Date(-1).toUTCString();

        //         window.open('', '_parent', '');
        //        window.opener = null;
        //	    window.close();
        window.location.href = 'http://' + window.location.host + '/_layouts/SignOut.aspx';
    });
}



//ShareTweetInfo
function ShareTweetInfo(Control) {

    var BtnControl = $("#" + Control);

    var vTweetURL = 'https://twitter.com/intent/tweet?';
    var vPageURL = 'http://' + window.location.host + window.location.pathname;
    var vTitle = $(document).attr('title');

    var strURL = vTweetURL + 'text=' + encodeURIComponent(vTitle) + '&url=' + encodeURIComponent(vPageURL);

    BtnControl.attr("href", strURL);
    BtnControl.attr("target", "_blank");
    // BtnControl.attr("title", "Let your followers on Twitter know about this");
}



//ShareTweetInfo
function ShareTweetInfo1(Control) {



    var BtnControl = $("#" + Control);

    var vFaceBookURL = 'https://twitter.com/share';
    var vPageURL = 'http://' + window.location.host + window.location.pathname;
    var vTitle = $(document).attr('title');
    var vSummery = $(document).attr('title');

    BtnControl.attr("href", vFaceBookURL);
    BtnControl.attr("data-url", vPageURL);
    BtnControl.attr("data-text", vTitle);
    BtnControl.attr("data-count", "none");
    BtnControl.attr("target", "_blank");
}

//ShareFaceBookInfo
function ShareFaceBookInfo(Control) {

    var BtnControl = $("#" + Control);
    var vFaceBookURL = 'http://www.facebook.com/sharer.php?s=100';
    var vPageURL = 'http://' + window.location.host + window.location.pathname;
    var vImgPath = 'http://' + window.location.host + '/_layouts/images/MOF/MOf_FaceBook.png';
    var vTitle = $(document).attr('title');
    var vSummery = $(document).attr('title');
    //  BtnControl.attr("title", "Share this post/page");

    var strURL = vFaceBookURL + '&p[url]=' + encodeURIComponent(vPageURL) + '&p[images][0]=' + vImgPath + '&p[title]=' + encodeURIComponent(vTitle) + '&p[summary]=' + encodeURIComponent(vSummery);

    BtnControl.attr("href", strURL);
    BtnControl.attr("target", "_blank");

}






//Get Current Login User
function CurrentLoginUser(Control, liControl) {


    var thisField = "";
    var thisUserDisp;

    // Get the UserDisp.aspx page using AJAX
    $.ajax({
        // Need this to be synchronous so we're assured of a valid value
        async: false,
        // Force parameter forces redirection to a page that displays the information as stored in the UserInfo table rather than My Site.
        // Adding the extra Query String parameter with the current date/time forces the server to view this as a new request.
        url: 'http://' + window.location.host + "/_layouts/userdisp.aspx?Force=True&" + new Date().getTime(),
        complete: function (xData, Status) {
            thisUserDisp = xData;
        }
    });

    // The current user's ID is reliably available in an existing JavaScript variable
    var thisTextValue;
    thisTextValue = RegExp("FieldInternalName=\"Title\"", "gi");
    $(thisUserDisp.responseText).find("table.ms-formtable td[id^='SPField']").each(function () {
        if (thisTextValue.test($(this).html())) {
            // Each fieldtype contains a different data type, as indicated by the id
            switch ($(this).attr("id")) {
                case "SPFieldText":
                    thisField = $(this).text();
                    break;
            }
            // Stop looking; we're done
            return false;
        }
    });


    $("#" + Control)[0].innerHTML = thisField;
    $("#" + liControl).attr("Style", "DISPLAY:''");


    //$("#" + Control)[0].innerHTML = $().SPServices.SPGetCurrentUser();
}


// send  the current page to Friend
function sendmailtoFriend(Name, FromEmail, FriendEmail, msg) {

    var urls = "http://" + window.location.host + "/" + window.location.pathname + window.location.search

    var cultureID = getCurrentLanguage();
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/sendmailtoFriend",
        data: "{cultureID :\"" + cultureID + "\", Name :\"" + Name.val() + "\", FromEmail:\"" + FromEmail.val() + "\", FriendEmail:\"" + FriendEmail.val() + "\", msg:\"" + msg.val() + "\", urls:\"" + urls + "\"}",
        contentType: 'application/json; charset=utf-8',
        dataType: "JSON",
        success: function (r) {
            Name.val("");
            FromEmail.val("");
            FriendEmail.val("");
            msg.val("");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // // alert(XMLHttpRequest.responseText);
        }
    });
}


//Get Main Menu informations
function GetMainMenu1(MenuContainer, SubMenuContainer, menuType) {

    var cultureID = getCurrentLanguage();
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/GetBuildMenus1",
        data: "{cultureID :\"" + cultureID + "\", menuType :\"" + menuType + "\"}",
        contentType: 'application/json; charset=utf-8',
        dataType: "JSON",
        success: function (r) {

            $("#" + MenuContainer).empty();
            $("#" + MenuContainer).append(r.d);

            GetsubMenu(SubMenuContainer, "1");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // // alert(XMLHttpRequest.responseText);
        }
    });
}



//Get Sub Menu informations
function GetsubMenu(subMenuContainer, menuType) {

    var cultureID = getCurrentLanguage();
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/GetSubBuildMenus",
        data: "{cultureID :\"" + cultureID + "\", menuType :\"" + menuType + "\"}",
        contentType: 'application/json; charset=utf-8',
        dataType: "JSON",
        success: function (r) {

            $("#" + subMenuContainer).empty();
            $("#" + subMenuContainer).append(r.d);

            // ddlevelsmenu.setup("dvMainmenu", "topbar")
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });

}



//Get Left Menu informations
function GetMainMenuLeftSide(MenuContainer, menuType) {
    var cultureID = getCurrentLanguage();
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/GetBuildMenusLeft",
        data: "{cultureID :\"" + cultureID + "\", menuType :\"" + menuType + "\"}",
        contentType: 'application/json; charset=utf-8',
        dataType: "JSON",
        success: function (r) {
            $("#" + MenuContainer).empty();
            $("#" + MenuContainer).append(r.d);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });

    //    $("ul.sf-menu").superfish({
    //        animation: { height: 'show' },  // slide-down effect without fade-in 
    //        delay: 1200                     // 1.2 second delay on mouseout 
    //    });
}

//Get Menu Footer links informations
function GetFooterMenuLinks(MenuContainer) {
    var cultureID = getCurrentLanguage();
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/GetFooterMenuLinks",
        data: "{cultureID :\"" + cultureID + "\"}",
        contentType: 'application/json; charset=utf-8',
        dataType: "JSON",
        success: function (r) {

            $("#" + MenuContainer).empty();
            $("#" + MenuContainer).append(r.d);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });
}

//Get main page images
function GetItemImages(Container, Container1) {
    $("#" + Container).empty();
    $("#" + Container).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

    var cultureID = getCurrentLanguage();
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetItemImages",
        data: "{cultureID :\"" + cultureID + "\"}",
        contentType: 'application/json; charset=utf-8',
        dataType: "JSON",
        success: function (response) {// show the respose come from the database 
            var xmlDoc = $.parseXML(response.d); // Pass te dataset into xml
            var xml = $(xmlDoc);
            var _table = xml.find("Table1"); //  get the current table from xml .

            $("#" + Container).empty();
            $.each(_table, function (i, Items) {// run the loop to get the  records one by one from  table which pass from xml.

                var strURL;
                var strTarget;
                if (cultureID == '1033') {
                    if ($(this).find("LnkURL").text().substring(0, 4).toUpperCase() == 'HTTP') {
                        strURL = $(this).find("LnkURL").text();
                        strTarget = "target='_blank'";
                    }
                    else if ($(this).find("LnkURL").text().substring(0, 3).toUpperCase() == 'WWW') {
                        strURL = "http://" + $(this).find("LnkURL").text();
                        strTarget = "target='_blank'"
                    }
                    else if ($(this).find("LnkURL").text().substring(0, 3).toUpperCase() == 'MOF') {
                        strURL = $(this).find("LnkURL").text();
                    }
                    else if ($(this).find("LnkURL").text() != '#' && $(this).find("LnkURL").text() != "") {
                        strURL = "/pages/en/" + $(this).find("LnkURL").text();
                    }
                    else
                        strURL = $(this).find("LnkURL").text(); ;

                }
                else {
                    if ($(this).find("LnkURLAR").text().substring(0, 4).toUpperCase() == 'HTTP') {
                        strURL = $(this).find("LnkURLAR").text();
                        strTarget = "target='_blank'"
                    }
                    else if ($(this).find("LnkURLAR").text().substring(0, 3).toUpperCase() == 'WWW') {
                        strURL = "http://" + $(this).find("LnkURLAR").text();
                        strTarget = "target='_blank'"
                    }
                    else if ($(this).find("LnkURLAR").text().substring(0, 3).toUpperCase() == 'MOF') {
                        strURL = $(this).find("LnkURLAR").text();
                    }
                    else if ($(this).find("LnkURLAR").text() != '#' && $(this).find("LnkURLAR").text() != "") {
                        strURL = "/pages/ar/" + $(this).find("LnkURLAR").text();
                    }
                    else
                        strURL = $(this).find("LnkURLAR").text();

                }
                var liHtml = "<li onmouseover='funOver(\"" + Container1 + "\");' onmouseout='funcOut(\"" + Container1 + "\");'><DIV class='testicon'><a  " + strTarget + "  href='" + strURL + "'><DIV class='iconDiv'><img  src='" + $(this).find("Path").text() + "'  style='border:none;'   /></div><DIV class='iconDivtext' style='text-decoration:none;'>" + $(this).find("Title").text() + "</div></a></div></li>";
                //var liHtml = "<li onmouseover='funOver(\"" + Container1 + "\");' onmouseout='funcOut(\"" + Container1 + "\");'><a  " + strTarget + "  href='" + strURL + "'><img  src='" + $(this).find("Path").text() + "' width='62px' height='40px' style='border:none;'   /></a></li>";
                $("#" + Container).append(liHtml);
            });

            //            $('.' + Container1).roundabout("stopAutoplay", true);
            //$('.' + Container1).roundabout();

            $('.' + Container1).roundabout({
                shape: 'square',
                autoplay: true,
                lang: cultureID
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //// alert(XMLHttpRequest.responseText);
        }
    });
}
function funOver(obj) {

    $('.' + obj).roundabout("stopAutoplay", true);

}
function funcOut(obj) {

    $('.' + obj).roundabout("startAutoplay");

}


//function GetItemImages(Container) {
//    $("#" + Container).empty();
//    $("#" + Container).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

//    var cultureID = "";
//    $.ajax({
//        type: "POST",
//        url: "../_layouts/MOFInternet/Service.aspx/GetItemImages",
//        data: "{cultureID :\"" + cultureID + "\"}",
//        contentType: 'application/json; charset=utf-8',
//        dataType: "JSON",
//        success: function (response) {// show the respose come from the database 
//            var xmlDoc = $.parseXML(response.d); // Pass te dataset into xml
//            var xml = $(xmlDoc);
//            var _table = xml.find("Table1"); //  get the current table from xml .

//            $("#" + Container).empty();
//            $.each(_table, function (i, Items) {// run the loop to get the  records one by one from  table which pass from xml.

//                var liHtml = "<img  src='" + $(this).find("Path").text() + "' alt='' />";

//                $("#" + Container).append(liHtml);
//            });
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            // alert(XMLHttpRequest.responseText);
//        }
//    });
//}

// ============================================== Headline News Ticker ==============================================//
//HeadlineContainer = provide div id as string in which created main banner html append e.g. dvNewsMarquee
function GetNewsMarquee(HeadlineContainer, DefaultcultureID, DetailURL) {
    var cultureID = getCurrentLanguage();

    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    // today = yyyy + '-' + mm + '-' + dd
    today = $($(document)[0].body).find("[id*='hfCurrentDate']")[0].value;

    var key = "NewsHeadline";
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            var soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                <soapenv:Body> \
                    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                        <listName>" + value.d + "</listName> \
                        <viewFields> \
                            <ViewFields> \
                                <FieldRef Name='Title' /> \
                                <FieldRef Name='ArabicTitle' /> \
                                <FieldRef Name='ID' /> \
                                <FieldRef Name='FileDirRef' /> \
                                <FieldRef Name='Created' /> \
                            </ViewFields> \
                        </viewFields> \
                        <query> \
                            <Query> \
                                <Where> \
                                    <And> \
                                        <Eq><FieldRef Name='IsShow' /><Value Type='Boolean'>1</Value></Eq> \
                                        <And> \
                                            <Leq><FieldRef Name='PublishDate' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Leq> \
                                            <Geq><FieldRef Name='Expires' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Geq> \
                                        </And> \
                                    </And> \
                                </Where> \
                                <OrderBy> \
                                    <FieldRef Name='PublishDate' Ascending='False' /> \
                                </OrderBy> \
                            </Query> \
                        </query> \
                    </GetListItems> \
                </soapenv:Body> \
            </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processNewsMarqueeResults(xData, status, HeadlineContainer, cultureID, DetailURL);
                },
                contentType: "text/xml; charset=utf-8",
                error: function (xhr) {
                    //alert('Error!  Status = ' + xhr.status);
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs images for top right bannaer ajax request result
function processNewsMarqueeResults(xData, status, Container, culture, DetailURL) {
    $('#' + Container).empty();

    var liHtml = "<tr>";
    //$("#" + Container).append(liHtml);

    $(xData.responseText).find("z\\:row").each(function () {
        var title = "";

        if (culture == "1033") {        //for english
            title = $(this).attr("ows_Title");
        }
        else if (culture == "1025") {   // for arabic
            title = $(this).attr("ows_ArabicTitle");
        }

        var urlValue = $(this).attr("ows_FileDirRef");
        var urlArray;
        var urlName;

        if (urlValue == undefined) {
            urlName = "";
        }
        else {
            urlArray = urlValue.split(";#");
            urlName = urlArray[1];
        }

        liHtml = liHtml + "<td style='white-space:nowrap;'><img src='/_layouts/images/MOF/newticker_logo.png'></td><td style='white-space:nowrap;'><a  href='" + DetailURL + $(this).attr("ows_ID") + "'>" + title + "</a></td>";
        //$("#" + Container).append(liHtml);
    });

    liHtml = liHtml + "</tr>";
    $("#" + Container).append(liHtml);
}

//============================================== End Headline News Ticker ======================================================//
//=============================================================================================================================//

//============================================== Main Gallary Image ==============================================//
//ImageContainer = provide div id as string in which created html append e.g. dvItems
function GetOurGallaryMainImage(ImageContainer, DetailURL) {
    var key = "PhotoGallary";
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            var soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                    <soapenv:Body> \
                        <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                            <listName>" + value.d + "</listName> \
                            <viewFields> \
                                <ViewFields> \
                                    <FieldRef Name='FileDirRef' /> \
                                    <FieldRef Name='NameOrTitle' /> \
                                    <FieldRef Name='RequiredField' /> \
                                    <FieldRef Name='ID' /> \
                                    <FieldRef Name='Title' /> \
                                </ViewFields> \
                            </viewFields> \
                            <query> \
                                <Query> \
                                    <Where> \
                                        <Eq><FieldRef Name='IsShow' /><Value Type='Boolean'>1</Value></Eq> \
                                    </Where> \
                                </Query> \
                            </query> \
                            <rowLimit>1</rowLimit> \
                        </GetListItems> \
                    </soapenv:Body> \
                </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processOurGallaryMain(xData, status, ImageContainer, DetailURL);
                },
                contentType: "text/xml; charset=utf-8",
                error: function (xhr) {
                    //alert('Error!  Status = ' + xhr.status);
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs Our gallary main image ajax request result
function processOurGallaryMain(xData, status, GallaryContainer, DetailURL) {
    var port = window.location.port;
    if (port.length <= 0)
        port = "";
    else
        port = ":" + port;

    //Change the below to point to your image library
    var imageURL = window.location.protocol + "//" + window.location.hostname + port + L_Menu_BaseUrl + "/Lists/Gallary/";

    //clear existing html form container div
    $("#" + GallaryContainer).html("");

    $(xData.responseText).find("z\\:row").each(function () {
        var imageLink = imageURL + $(this).attr("ows_FileLeafRef").substring($(this).attr("ows_FileLeafRef").indexOf('#') + 1);
        var liHtml = "<a href='" + DetailURL + "'><img src='" + imageLink + "' width='253px' height='152px' alt='' /></a>";
        $("#" + GallaryContainer).append(liHtml);
    });
}

//============================================== End Main Gallary Image =======================================================//
//=============================================================================================================================//

//============================================== Discussion Board ==============================================//
//DiscussionContainer = provide div id as string in which created html append e.g. MOFDiscussionFourm
function GetDiscussionBoard(DiscussionContainer, DefaultcultureID, DetailURL) {
    var cultureID = getCurrentLanguage();

    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    var key = "Discussion";
    $.ajax({
        type: "POST",
        url: "_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                <soapenv:Body> \
                    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                        <listName>" + value.d + "</listName> \
                        <viewFields> \
                            <ViewFields> \
                                <FieldRef Name='ID' /> \
                                <FieldRef Name='Title' /> \
                                <FieldRef Name='ArabicTitle' /> \
                                <FieldRef Name='FileDirRef' /> \
                                <FieldRef Name='Created' /> \
                            </ViewFields> \
                        </viewFields> \
                        <query> \
                            <Query> \
                                <Where> \
                                    <Eq><FieldRef Name='IsShow' /><Value Type='Boolean'>1</Value></Eq> \
                                </Where> \
                                <OrderBy> \
                                    <FieldRef Name='Created' Ascending='False' /> \
                                </OrderBy> \
                            </Query> \
                        </query> \
                        <rowLimit>8</rowLimit> \
                    </GetListItems> \
                </soapenv:Body> \
            </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processDiscussionBoardResult(xData, status, DiscussionContainer, cultureID, DetailURL);
                },
                contentType: "text/xml; charset=\"utf-8\""
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs Discussion Board ajax request result
function processDiscussionBoardResult(xData, status, MOFDisscusion, culture, DetailURL) {
    $(xData.responseText).find("z\\:row").each(function () {

        var title = "";
        var detail = "";
        var createdDate = $(this).attr("ows_Created");
        var urlValue = $(this).attr("ows_FileDirRef");

        //formatting date
        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        var dateArray = reggie.exec($(this).attr("ows_Created"));

        // day                Month               year
        //tDate = dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1];


        var urlArray;
        var urlName;
        if (urlValue == undefined) {
            urlName = "";
        }
        else {
            urlArray = urlValue.split(";#");
            urlName = urlArray[1];
        }

        if (culture == "1033") {    // for english
            title = $(this).attr("ows_Title");
            detail = "Detail";

            createdDate = "Dated : " + dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1];
        }
        else if (culture == "1025") {   // for arabic
            title = $(this).attr("ows_ArabicTitle");
            detail = "التفاصيل";

            createdDate = "بتاريخ: " + dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1];
        }

        //var strlink = "/" + urlName + "/Flat.aspx?RootFolder=/Lists/Discussions/" + $(this).attr("ows_Title");
        //var strlink = "DiscussionForum.aspx?RootFolder=" + $(this).attr("ows_Title") + "&DiscussionID=" + $(this).attr("ows_ID");
        var strlink = DetailURL + "?DiscussionID=" + $(this).attr("ows_ID");

        var liHtml = "<div class='mof-intra-body-left-Disa'><dt class='newsItem'><h2>" + title + "</h2><p>" + createdDate + "</p><a href='" + strlink + "'>" + detail + "</a></dt></div>";
        $("#" + MOFDisscusion).append(liHtml);
    });


    $(function () {
        var ticker = $("#" + MOFDisscusion);
        ticker.children().filter("dt").each(function () {
            var dt = $(this);

            container = $("<div>");

            dt.next().appendTo(container);

            dt.prependTo(container);

            container.appendTo(ticker);
        });

        ticker.css("overflow", "hidden");
        function animator(currentItem) {
            var distance = currentItem.height();
            duration = (distance + parseInt(currentItem.css("marginTop"))) / 0.020;
            currentItem.animate({ marginTop: -distance }, duration, "linear", function () {
                currentItem.appendTo(currentItem.parent()).css("marginTop", 0);
                animator(currentItem.parent().children(":first"));
            });
        };

        animator(ticker.children(":first"));
        ticker.mouseenter(function () {
            ticker.children().stop();
        });

        ticker.mouseleave(function () {
            animator(ticker.children(":first"));
        });
    });
}

//============================================== End Discussion Board =========================================================//
//=============================================================================================================================//
//=============================================================================================================================//

// ============================================== Main right top Banner ==============================================//
//RightBannerContainer = provide div id as string in which created main banner html append e.g. tabSlides
//BannerNavigationContainer = provide div id as string in which created navigation html append e.g. tabSlideBottomNav
function GetMainBanner(RightBannerContainer, BannerNavigationContainer, DefaultcultureID, DetailURL) {
    var cultureID = getCurrentLanguage();

    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }


    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetBannerAnnouncements",
        data: "{cultureID:\"" + cultureID + "\"}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {// show the respose come from the database 
            var xmlDoc = $.parseXML(response.d); // Pass te dataset into xml
            var xml = $(xmlDoc);
            var _table = xml.find("Table1"); //  get the current table from xml .
            $.each(_table, function (i, Items) {// run the loop to get the  records one by one from  table which pass from xml.

                var liHtml = "<div><a href='" + DetailURL + $(this).find("ID").text() + "'><img src='" + $(this).find("Path").text() + "' alt='' /><h1><span>" + $(this).find("Title").text() + "</span></h1></a></div>";
                $("#" + RightBannerContainer).append(liHtml);

                var liBottomNav = "<a href='#tab-'" + $(this).find("ID").text() + "'></a>"
                $("#" + BannerNavigationContainer).append(liBottomNav);
            });

            if (response.d != "<NewDataSet />") {
                slideShow();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });
}


function slideShow() {
    $(".MOFslidetabs").tabs(".MOFimages > div", {

        // enable "cross-fading" effect
        effect: 'fade',
        fadeOutSpeed: "slow",

        // start from the beginning after the last tab
        rotate: true

        // use the slideshow plugin. It accepts its own configuration
    }).slideshow();

    $(".MOFslidetabs").data("slideshow").play();
}

// get the Main banner Style with Body
function GetMainBannerWithBody(RightBannerContainer, BannerNavigationContainer, DefaultcultureID, DetailURL) {
    var cultureID = getCurrentLanguage();

    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetBannerAnnouncements",
        data: "{cultureID:\"" + cultureID + "\"}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {// show the respose come from the database 
            var xmlDoc = $.parseXML(response.d); // Pass te dataset into xml
            var xml = $(xmlDoc);
            var _table = xml.find("Table1"); //  get the current table from xml .
            var dated
            $.each(_table, function (i, Items) {// run the loop to get the  records one by one from  table which pass from xml.

                var liHtml = "<div><a href='" + DetailURL + $(this).find("ID").text() + "'><img src='" + $(this).find("Path").text() + "' alt='' /><h1><span>" + $(this).find("Title").text() + "</span></h1><h4><span>" + $(this).find("Created").text() + "</span></h4></a></div>";
                $("#" + RightBannerContainer).append(liHtml);

                var liBottomNav = "<a href='#tab-'" + $(this).find("ID").text() + "'></a>"
                $("#" + BannerNavigationContainer).append(liBottomNav);
            });

            if (response.d != "<NewDataSet />") {
                slideShowWithBody();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });
}

function slideShowWithBody() {
    $(".MOFslidetabs").tabs(".MOFBanner > div", {

        // enable "cross-fading" effect
        effect: 'fade',
        fadeOutSpeed: "slow",

        // start from the beginning after the last tab
        rotate: true

        // use the slideshow plugin. It accepts its own configuration
    }).slideshow();

    $(".MOFslidetabs").data("slideshow").play();
}

/// show the Main banner with thumbnail style
function GetMainBannerWithThumbnail(RightBannerContainer, BannerThumbnailCantainer, DefaultcultureID, DetailURL) {
    var cultureID = getCurrentLanguage();

    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetBannerAnnouncementsThumbnail",
        data: "{cultureID:\"" + cultureID + "\"}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {// show the respose come from the database 
            var xmlDoc = $.parseXML(response.d); // Pass te dataset into xml
            var xml = $(xmlDoc);
            var _table = xml.find("Table1"); //  get the current table from xml .
            var dated
            $.each(_table, function (i, Items) {// run the loop to get the  records one by one from  table which pass from xml.

                var liHtml = "<div class='wrapperZee' style='display:none;'>";

                // display header on top of the image
                //liHtml = liHtml + "<div class='headline'><a href='" + DetailURL + $(this).find("ID").text() + "' title='" + $(this).find("Title").text() + "'>" + $(this).find("Title").text() + "</a></div>";

                liHtml = liHtml + "<div class='img_teaserZee'><a href='" + DetailURL + $(this).find("ID").text() + "' title='" + $(this).find("Title").text() + "'><img src='" + $(this).find("Path").text() + "' alt='' height='338' width='600' /></a></div>";

                // display some title of news
                liHtml = liHtml + "<p class='caption'>" + $(this).find("Title").text() + "<a href='" + DetailURL + $(this).find("ID").text() + "' title='" + $(this).find("Title").text() + "'></a></p>";

                //liHtml = liHtml + "<p class='caption'><span class='source'>Al Arabiya</span>" + +$(this).find("Description").text() + "... <a href='" + DetailURL + $(this).find("ID").text() + "' title='" + $(this).find("Title").text() + "'>More</a></p>";

                liHtml = liHtml + "</div>";

                $("#" + RightBannerContainer).append(liHtml);

                // add thumbnail
                var liThumbnail = "<li class=''><a href='" + DetailURL + $(this).find("ID").text() + "' title='" + $(this).find("Title").text() + "'><span>" + $(this).find("Title").text() + "</span></a></li>";
                $("#" + BannerThumbnailCantainer).append(liThumbnail);
            });
            CallBoxMethod();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });
}

//
function CallBoxMethod() {

    $('.tabs li a,.filter li a').removeAttr("href");
    $('.tabs li,.filter li').click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).parent().hasClass('filter')) {
            $(this).parent().parent().nextAll('.contentZee').hide();
            $(this).parent().parent().nextAll('.contentZee').eq($(this).index()).show();
        } else if ($(this).parent().parent().next().hasClass('contentZee')) {
            $(this).parent().parent().next().find('.wrapperZee,a.more,ul.pagerZee').hide();
            $(this).parent().parent().next().find('.wrapperZee').eq($(this).index()).show();
            $(this).parent().parent().next().find('a.more').eq($(this).index()).show();
            $(this).parent().parent().next().find('ul.pagerZee').eq($(this).index()).show();
        } else if ($(this).parent().next().hasClass('wrapperZee')) {
            $(this).parent().nextAll().hide();
            $(this).parent().nextAll().eq($(this).index()).show();
        }
        else {
            var selectedtab = $(this).index();
            var allcontentZees = $(this).parent().parent().parent().parent().find('.contentZee');

            for (i = 0; i < allcontentZees.length; i++) {
                var tempcontentZee = allcontentZees.eq(i);
                var temptabs = tempcontentZee.find(".tabs li");

                temptabs.parent().nextAll().hide();
                temptabs.removeClass("active");
                temptabs.parent().nextAll().eq(selectedtab).show();
                temptabs.eq(selectedtab).addClass("active");
            }
        }
        if ($(this).parent().parent().next().hasClass('contentZee') && $(this).parent().parent().next().find('.slider_mod01,.slider_mod02').length > 0) {
            $(this).parent().parent().next().find('.pagerZee:not([style*="display: none"],[style*="display:none"])>li').eq(0).click();
        }
    });
    // end tabs
    // start slider
    window.arbnetinanim = false;
    $('.slider_mod01,.slider_mod02').each(function () {
        $(this).find('.wrapperZee').each(function (wrapperZeeIndex) {
            var pagerZee = $(this).parent().find('.pagerZee').eq(wrapperZeeIndex);
            if ($(this).find(".slider ul").length > 1) $(this).find(".slider").css("width", ($(this).find(".slider ul").length * $(this).find(".slider ul:eq(0)").width()) + "px");
            if (pagerZee.length > 0) {
                var clone = pagerZee.find('li').eq(0).removeAttr("class").clone();
                pagerZee.children().remove();
                for (var i = 0; i < $(this).find(".slider ul").length; i++)
                    clone.clone().appendTo(pagerZee);
                pagerZee.find('li').eq(0).addClass("active");
                pagerZee.find('li>a').removeAttr("href");
                pagerZee.find('li').click(function () {
                    slider = $(this).parent().parent();
                    var wrapperZee = $(this).parent().parent().parent().find('.wrapperZee:not([style*="display: none"],[style*="display:none"])');
                    var ver = wrapperZee.find(".slider ul").length == 1;
                    var len = ver ? wrapperZee.height() : wrapperZee.width();
                    var dir = ver ? "top" : ($('.page_wrapperZee').css('directionZee') == "rtl" ? "right" : "left");
                    var anm = {};
                    var prop = dir;
                    anm[prop] = ((len * -1) * $(this).index()) + "px";
                    slider.find(".prev").toggleClass("off", $(this).index() == 0);
                    slider.find(".next").toggleClass("off", $(this).index() == $(this).parent().find("li").last().index());
                    $(this).siblings().removeClass("active");
                    $(this).addClass("active");
                    wrapperZee.find(".slider").animate(anm, 'linear');
                });
            }
            if (($(this).parent().hasClass('slider_mod01') && $(this).find(".slider ul").length == 1) || ($(this).parent().hasClass('slider_mod02') && $(this).find(".slider").height() <= $(this).height()))
                $(this).parent().find(".next").addClass('off');
        });
    });
    $(".slider_mod01 .prev,.slider_mod01 .next,.slider_mod02 .prev,.slider_mod02 .next").removeAttr("href").click(function () {
        if (window.arbnetinanim) return;
        slider = $(this).parent();
        var wrapperZee = slider.find('.wrapperZee:not([style*="display: none"],[style*="display:none"])');

        if ((wrapperZee.parent().hasClass('slider_mod02') && wrapperZee.find('.slider').height() <= wrapperZee.height()) || (wrapperZee.parent().hasClass('slider_mod01') && wrapperZee.find('.slider ul').length == 1)) return;

        var ver = wrapperZee.find(".slider ul").length == 1;
        var len = ver ? wrapperZee.height() : wrapperZee.width();
        var dist = Math.floor((ver ? wrapperZee.find(".slider").height() : wrapperZee.find(".slider").width()) / len);
        var sign = $(this).hasClass("prev") ? 1 : -1;
        var dir = ver ? "top" : ($('.page_wrapperZee').css('directionZee') == "rtl" ? "right" : "left");
        var pos = parseInt(wrapperZee.find(".slider").css(dir).replace("px", ""));
        pos = isNaN(pos) ? 0 : pos;
        var anm = {};
        var prop = dir;
        anm[prop] = ((len * sign) + pos) + "px";

        if (pos == 0 && sign == 1) return;

        slider.find(".prev").toggleClass("off", (len * sign) + pos == 0 || (sign == 1 && pos == 0));
        slider.find(".next").toggleClass("off", Math.abs((len * sign) + pos) == len * dist || (sign == -1 && Math.abs(pos) == len * dist));

        if (!((sign == -1 && Math.abs(pos) == len * dist) || (sign == 1 && pos == 0))) {
            window.arbnetinanim = true;
            wrapperZee.find(".slider").animate(anm, 'linear', function () {
                window.arbnetinanim = false;
            });
            var pagerZee = slider.find('.pagerZee:not([style*="display: none"],[style*="display:none"])');

            pagerZee.find('li').removeClass("active");
            pagerZee.find('li').eq(Math.abs((len * sign) + pos) / len).addClass("active");
        }
    });
    //end slider
    // start hide/show media box
    $('.media_boxZee .vid_icoZee').parents('a').removeAttr("href").click(function () {
        $(this).parents('.media_boxZee').fadeOut(300, function () {
            $(this).remove();
            $('#mbvbZee,#mbvbZeetxt').fadeIn(300);
        });
    });
    // end hide/show media box
    // start news stream    
    NewsStream();
    $('.livestream_temZee .latest_newsZee .controlsZee a.prev').removeAttr("href").click(function () {
        clearInterval(window.tmrNewsStrm);
        window.curnewsstrmul = window.curnewsstrmul.index() == 0 ? $('.livestream_temZee .latest_newsZee ul').eq($('.livestream_temZee .latest_newsZee ul').length - 1) : $('.livestream_temZee .latest_newsZee ul').eq(window.curnewsstrmul.index() - 1);
        $('.livestream_temZee .latest_newsZee ul').hide();
        window.curnewsstrmul.fadeIn(500);
        NewsStream();
    });
    $('.livestream_temZee .latest_newsZee .controlsZee a.next').removeAttr("href").click(function () {
        clearInterval(window.tmrNewsStrm);
        window.curnewsstrmul = window.curnewsstrmul.index() == $('.livestream_temZee .latest_newsZee ul').length - 1 ? $('.livestream_temZee .latest_newsZee ul').eq(0) : $('.livestream_temZee .latest_newsZee ul').eq(window.curnewsstrmul.index() + 1);
        $('.livestream_temZee .latest_newsZee ul').hide();
        window.curnewsstrmul.fadeIn(500);
        NewsStream();
    });
    $('.livestream_temZee .latest_newsZee .controlsZee a.pause').removeAttr("href").toggle(function () {
        clearInterval(window.tmrNewsStrm);
    }, function () {
        NewsStream();
    });

    function NewsStream() {
        window.tmrNewsStrm = setInterval(function () {
            window.curnewsstrmul = $('.livestream_temZee .latest_newsZee ul:not([style*="display: none"],[style*="display:none"])').next('ul');
            window.curnewsstrmul = window.curnewsstrmul.length == 0 ? $('.livestream_temZee .latest_newsZee ul:eq(0)') : window.curnewsstrmul;
            $('.livestream_temZee .latest_newsZee ul').hide();
            window.curnewsstrmul.fadeIn(500);
        }, 5000);
    }
    // end news stream
    // start photo slider
    $('.photo_sliderZee a.next,.photo_sliderZee a.prev').removeAttr("href").click(function () {
        var curphoto = $('.photo_sliderZee .wrapperZee:not([style*="display: none"],[style*="display:none"])');
        var curphotoindx = $(this).hasClass('next') ? (curphoto.index() == $('.photo_sliderZee .wrapperZee').length ? 0 : curphoto.index()) : (curphoto.index() == 1 ? $('.photo_sliderZee .wrapperZee').length - 1 : curphoto.index() - 2);
        $('.photo_sliderZee .wrapperZee').hide().eq(curphotoindx).fadeIn(500);
        $('.photo_sliderZee .socialZee').hide().eq(curphotoindx).fadeIn(500);
    });

    // end photo slider
    // start gallery
    $(".gallery_sliderZee .scrollerZee ul li a").removeAttr("href").click(function () {
        $(this).parents('.gallery_sliderZee').find('.photo_previewZee').hide().eq($(this).parent().index()).fadeIn(300);
    });

    $(".gallery_sliderZee .prev,.gallery_sliderZee .next").removeAttr("href").click(function () {
        if (window.arbnetinanim) return;
        var len = $(this).parent().width();
        var dist = Math.floor(($(this).siblings('ul').width()) / len);
        var sign = $(this).hasClass("prev") ? 1 : -1;
        var dir = $('.page_wrapperZee').css('directionZee') == "rtl" ? "right" : "left";
        var pos = parseInt($(this).siblings('ul').css(dir).replace("px", ""));
        pos = isNaN(pos) ? 0 : pos;
        var anm = {};
        var prop = dir;
        anm[prop] = (($(this).parent().find('li:eq(0)').width() * sign) + pos) + "px";

        if (pos == 0 && sign == 1) return;

        $(this).parent().find(".prev").toggleClass("off", (len * sign) + pos == 0 || (sign == 1 && pos == 0));
        $(this).parent().find(".next").toggleClass("off", Math.abs((len * sign) + pos) == len * dist || (sign == -1 && Math.abs(pos) == len * dist));

        if (!((sign == -1 && (Math.abs(pos) == len * dist || Math.abs(pos) + 2 == len * dist)) || (sign == 1 && pos == 0))) {
            window.arbnetinanim = true;
            $(this).siblings('ul').animate(anm, 'linear', function () {
                window.arbnetinanim = false;
            });
        }
    });
    //end gallery
    ArbNetRotator('.news_headlinesZee .news_listZee>li', '.news_headlinesZee .wrapperZee');
    ArbNetTicker('.ticker', 40);
}

//============================================== End Top Right Banner =========================================================//
//=============================================================================================================================//

//============================================== Public Reports ==============================================//
//PublicReportContainer = provide div id as string in which created html append e.g. dvPublicReports
function GetPublicReports(PublicReportContainer, DefaultcultureID, control) {
    var cultureID = getCurrentLanguage();

    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    //today = yyyy + '-' + mm + '-' + dd
    today = $($(document)[0].body).find("[id*='hfCurrentDate']")[0].value;

    $("#" + PublicReportContainer).empty();
    $("#" + PublicReportContainer).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

    var key = "PublicReport";
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                <soapenv:Body> \
                    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                        <listName>" + value.d + "</listName> \
                        <viewFields> \
                            <ViewFields> \
                                <FieldRef Name='EnglishTitle' /> \
                                <FieldRef Name='ArabicTitle' /> \
                                <FieldRef Name='ID' /> \
                                <FieldRef Name='FileDirRef' /> \
                                <FieldRef Name='FileLeafRef' /> \
                                <FieldRef Name='DocIcon' /> \
                                <FieldRef Name='Created' /> \
                            </ViewFields> \
                        </viewFields> \
                        <query> \
                            <Query> \
                                <Where> \
                                    <And> \
                                        <Eq><FieldRef Name='IsShow' /><Value Type='Boolean'>1</Value></Eq> \
                                        <And> \
                                            <Leq><FieldRef Name='PublishDate' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Leq> \
                                            <Geq><FieldRef Name='ExpiryDate' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Geq> \
                                        </And> \
                                    </And> \
                                </Where> \
                                <OrderBy> \
                                    <FieldRef Name='PublishDate' Ascending='False' /> \
                                </OrderBy> \
                            </Query> \
                        </query> \
                        <rowLimit>7</rowLimit> \
                    </GetListItems> \
                </soapenv:Body> \
            </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processPublicReports(xData, status, PublicReportContainer, cultureID, control);
                },
                contentType: "text/xml; charset=\"utf-8\""
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs Public Reports ajax request result
function processPublicReports(xData, status, Container, culture, control) {

    $("#" + Container).empty();
    $(xData.responseText).find("z\\:row").each(function () {

        var title = "";
        var tBody = "";
        var tDate = "";

        if (culture == "1033") {        //for english
            title = $(this).attr("ows_EnglishTitle");
            tDate = $(this).attr("ows_Created");
        }
        else if (culture == "1025") {   // for arabic
            title = $(this).attr("ows_ArabicTitle");
            tDate = $(this).attr("ows_Created");
        }

        var urlValue = $(this).attr("ows_FileDirRef");
        var urlArray;
        var urlName;

        if (urlValue == undefined) {
            urlName = "";
        }
        else {
            urlArray = urlValue.split(";#");
            urlName = urlArray[1];
        }


        if (title != undefined) {
            if ($(title).find("p")[0] != undefined) {
                var titletext = $(title).find("p")[0].innerHTML;
                titletext = titletext.slice(0, 150);
            }
            else {
                var titletext = title.slice(0, 150);
            }
        }

        var file = $(this).attr("ows_FileLeafRef").split(";#");
        //Get site url
        var URL = "http://" + window.location.host + "/" + urlName + "/" + file[1];

        var imgIcon = "ic" + $(this).attr("ows_DocIcon") + ".gif";



        var liHtml = "";
        if (culture == "1033") {        //for english
            liHtml = "<div class='mof-intra-body-left-hlines-n' style='background:url(/_layouts/images/" + imgIcon + ") no-repeat left 6px;'><a href='" + URL + "'>" + titletext + "</a><div class='mof-intra-body-left-hlines-nimg'><a href='../_layouts/download.aspx?SourceUrl=" + URL + "'><img src='/_layouts/images/MOF/icon_19.png' alt='' /></a></div></div>";
        }
        else if (culture == "1025") {   // for arabic
            liHtml = "<div class='mof-intra-body-left-hlines-n' style='background:url(/_layouts/images/" + imgIcon + ") no-repeat right 6px;'><a href='" + URL + "'>" + titletext + "</a><div class='mof-intra-body-left-hlines-nimg'><a href='../_layouts/download.aspx?SourceUrl=" + URL + "'><img src='/_layouts/images/MOF/icon_19.png' alt='' /></a></div></div>";
        }

        $("#" + Container).append(liHtml);
    });

    if ($(xData.responseText).find("z\\:row").length < 1)
        $("#" + control).attr("style", "Display:none");
    else
        $("#" + control).attr("style", "Display:''");


}

//============================================== End Public Reports ===========================================================//
//=============================================================================================================================//

//============================================== Research & Studies ==============================================//
//RSContainer = provide div id as string in which created html append e.g. dvResearchStudies
function GetResearchStudies(RSContainer, DefaultcultureID, control) {
    var cultureID = getCurrentLanguage();

    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }


    today = yyyy + '-' + mm + '-' + dd

    today = $($(document)[0].body).find("[id*='hfCurrentDate']")[0].value;

    $("#" + RSContainer).empty();
    $("#" + RSContainer).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

    var key = "ResearchStudies";
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                <soapenv:Body> \
                    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                        <listName>" + value.d + "</listName> \
                        <viewFields> \
                            <ViewFields> \
                                <FieldRef Name='EnglishTitle' /> \
                                <FieldRef Name='ArabicTitle' /> \
                                <FieldRef Name='ID' /> \
                                <FieldRef Name='FileDirRef' /> \
                                <FieldRef Name='FileLeafRef' /> \
                                <FieldRef Name='DocIcon' /> \
                                <FieldRef Name='Created' /> \
                            </ViewFields> \
                        </viewFields> \
                        <query> \
                            <Query> \
                                <Where> \
                                    <And> \
                                        <Eq><FieldRef Name='IsShow' /><Value Type='Boolean'>1</Value></Eq> \
                                        <And> \
                                            <Leq><FieldRef Name='PublishDate' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Leq> \
                                            <Geq><FieldRef Name='ExpiryDate' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Geq> \
                                        </And> \
                                    </And> \
                                </Where> \
                                <OrderBy> \
                                    <FieldRef Name='PublishDate' Ascending='False' /> \
                                </OrderBy> \
                            </Query> \
                        </query> \
                        <rowLimit>7</rowLimit> \
                    </GetListItems> \
                </soapenv:Body> \
            </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processResearchStudies(xData, status, RSContainer, cultureID, control);
                },
                contentType: "text/xml; charset=\"utf-8\""
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs News Headline ajax request result
function processResearchStudies(xData, status, Container, culture, control) {

    $("#" + Container).empty();
    $(xData.responseText).find("z\\:row").each(function () {

        var title = "";
        var tBody = "";
        var tDate = "";

        if (culture == "1033") {        //for english
            title = $(this).attr("ows_EnglishTitle");
            tDate = $(this).attr("ows_Created");
        }
        else if (culture == "1025") {   // for arabic
            title = $(this).attr("ows_ArabicTitle");
            tDate = $(this).attr("ows_Created");
        }

        var urlValue = $(this).attr("ows_FileDirRef");
        var urlArray;
        var urlName;

        if (urlValue == undefined) {
            urlName = "";
        }
        else {
            urlArray = urlValue.split(";#");
            urlName = urlArray[1];
        }

        var file = $(this).attr("ows_FileLeafRef").split(";#");
        //Get site url
        var URL = "http://" + window.location.host + "/" + urlName + "/" + file[1];

        var imgIcon = "ic" + $(this).attr("ows_DocIcon") + ".gif";

        var liHtml = "";


        //        if (title != undefined) {
        //            if ($(title).find("p")[0] != undefined) {
        //                var titletext = $(title).find("p")[0].innerHTML;
        //                titletext = titletext.slice(0, 150);
        //            }
        //            else {
        //                var titletext = title.slice(0, 150);
        //            }
        //        }
        var titletext = title;

        if (culture == "1033") {        //for english
            liHtml = "<div class='mof-intra-body-left-hlines-n' style='background:url(/_layouts/images/" + imgIcon + ") no-repeat left 6px;'><a href='" + URL + "'>" + titletext + "</a><div class='mof-intra-body-left-hlines-nimg'><a href='../_layouts/download.aspx?SourceUrl=" + URL + "'><img src='/_layouts/images/MOF/icon_19.png' alt='' /></a></div></div>";
        }
        else if (culture == "1025") {   // for arabic
            liHtml = "<div class='mof-intra-body-left-hlines-n' style='background:url(/_layouts/images/" + imgIcon + ") no-repeat right 6px;'><a href='" + URL + "'>" + titletext + "</a><div class='mof-intra-body-left-hlines-nimg'><a href='../_layouts/download.aspx?SourceUrl=" + URL + "'><img src='/_layouts/images/MOF/icon_19.png' alt='' /></a></div></div>";
        }

        $("#" + Container).append(liHtml);
    });


    if ($(xData.responseText).find("z\\:row").length < 1)
        $("#" + control).attr("style", "Display:none");
    else
        $("#" + control).attr("style", "Display:''");
}

//============================================== End Research & Studies =======================================================//
//=============================================================================================================================//

//============================================== Ministry News ==============================================//
//MinistryNewsContainer = provide div id as string in which created html append e.g. dvMinistryNews
function GetMinistryNewsHeadlines(MinistryNewsContainer, DefaultcultureID, control) {
    var cultureID = getCurrentLanguage();


    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    // today = yyyy + '-' + mm + '-' + dd

    today = $($(document)[0].body).find("[id*='hfCurrentDate']")[0].value;

    $("#" + MinistryNewsContainer).empty();
    $("#" + MinistryNewsContainer).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

    var key = "MinistryNews";
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                <soapenv:Body> \
                    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                        <listName>" + value.d + "</listName> \
                        <viewFields> \
                            <ViewFields> \
                                <FieldRef Name='Title' /> \
                                <FieldRef Name='ArabicTitle' /> \
                                <FieldRef Name='Body' /> \
                                <FieldRef Name='ArabicBody' /> \
                                <FieldRef Name='ID' /> \
                                <FieldRef Name='FileDirRef' /> \
                                <FieldRef Name='PublishDate' /> \
                                <FieldRef Name='Created' /> \
                            </ViewFields> \
                        </viewFields> \
                        <query> \
                            <Query> \
                                <Where> \
                                    <And> \
                                        <Eq><FieldRef Name='IsShow' /><Value Type='Boolean'>1</Value></Eq> \
                                        <And> \
                                            <Leq><FieldRef Name='PublishDate' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Leq> \
                                            <Geq><FieldRef Name='Expires' /><Value IncludeTimeValue='FALSE' Type='DateTime'>" + today + "</Value></Geq> \
                                        </And> \
                                    </And> \
                                </Where> \
                                <OrderBy> \
                                    <FieldRef Name='ID' Ascending='False' /> \
                                </OrderBy> \
                            </Query> \
                        </query> \
                        <rowLimit>5</rowLimit> \
                    </GetListItems> \
                </soapenv:Body> \
            </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processMinistryNewsHeadline(xData, status, MinistryNewsContainer, cultureID, control);
                },
                contentType: "text/xml; charset=\"utf-8\""
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs News Headline ajax request result
function processMinistryNewsHeadline(xData, status, Container, culture, control) {
    $("#" + Container).empty();
    $(xData.responseText).find("z\\:row").each(function () {

        var title = "";
        var tBody = "";
        var tDate = "";

        //formatting date
        var reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        var dateArray = reggie.exec($(this).attr("ows_PublishDate"));

        // day                Month               year
        //tDate = dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1];

        if (culture == "1033") {        //for english
            title = $(this).attr("ows_Title");
            tBody = $(this).attr("ows_Body");

            tDate = dateArray[3] + "-" + dateArray[2] + "-" + dateArray[1];
            tDate = "Dated: " + tDate;
        }
        else if (culture == "1025") {   // for arabic
            title = $(this).attr("ows_ArabicTitle");
            tBody = $(this).attr("ows_ArabicBody");

            tDate = dateArray[1] + "-" + dateArray[2] + "-" + dateArray[3];
            tDate = "بتاريخ: " + tDate;
        }

        var liHtml = "<div class='mof-intra-body-left-minisN-n'><h2><a href='MOFMinistryNewsDetail.aspx?ArticalID=" + $(this).attr("ows_ID") + "&LstName=MinistryNews' >" + title + "</a></h2><h4>" + tDate + "</h4></div>"
        $("#" + Container).append(liHtml);
    });


    if ($(xData.responseText).find("z\\:row").length < 1)
        $("#" + control).attr("style", "Display:none");
    else
        $("#" + control).attr("style", "Display:''");
}

//============================================== End Ministry News ============================================================//
//=============================================================================================================================//

// ============================================== Announcements ==============================================//
//AnnouncementsContainer = provide div id as string in which created main banner html append e.g. tabSlides
function GetAnnouncementsHeadlines(AnnouncementsContainer, DefaultcultureID) {
    var cultureID = getCurrentLanguage();


    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd

    $("#" + AnnouncementsContainer).empty();
    $("#" + AnnouncementsContainer).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

    var key = "Announcement";
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            var soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                <soapenv:Body> \
                    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                        <listName>" + value.d + "</listName> \
                        <viewFields> \
                            <ViewFields> \
                                <FieldRef Name='Title' /> \
                                <FieldRef Name='ArabicTitle' /> \
                                <FieldRef Name='Body' /> \
                                <FieldRef Name='ArabicBody' /> \
                                <FieldRef Name='ID' /> \
                                <FieldRef Name='FileDirRef' /> \
                                <FieldRef Name='Created' /> \
                            </ViewFields> \
                        </viewFields> \
                        <query> \
                            <Query> \
                                <Where> \
                                    <And> \
                                        <Eq><FieldRef Name='IsShow' /><Value Type='Boolean'>1</Value></Eq> \
                                        <Gt><FieldRef Name='Expires' /><Value IncludeTimeValue='False' Type='DateTime'>" + today + "</Value></Gt> \
                                    </And> \
                                </Where> \
                                <OrderBy> \
                                    <FieldRef Name='Created' Ascending='False' /> \
                                </OrderBy> \
                            </Query> \
                        </query> \
                        <rowLimit>4</rowLimit> \
                    </GetListItems> \
                </soapenv:Body> \
            </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processAnnouncements(xData, status, AnnouncementsContainer, cultureID);
                },
                contentType: "text/xml; charset=utf-8",
                error: function (xhr) {
                    //alert('Error!  Status = ' + xhr.status);
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs News Headline ajax request result
function processAnnouncements(xData, status, Container, culture) {
    $("#" + Container).empty();
    $(xData.responseText).find("z\\:row").each(function () {

        var title = "";
        var tBody = "";

        if (culture == "1033") {        //for english
            title = $(this).attr("ows_Title");
            tBody = $(this).attr("ows_Body");
        }
        else if (culture == "1025") {   // for arabic
            title = $(this).attr("ows_ArabicTitle");
            tBody = $(this).attr("ows_ArabicBody");
        }

        if (tBody != undefined) {
            if ($(tBody).find("p")[0] != null) {
                var teaserText = $(tBody).find("p")[0].innerHTML;
                teaserText = teaserText.slice(0, 150);
            }
            else {
                var teaserText = tBody.slice(0, 150);
            }
        }

        //        var teaserText = $(tBody).find("p")[0].innerHTML;
        //        teaserText = teaserText.slice(0, 150);

        var urlValue = $(this).attr("ows_FileDirRef");
        var urlArray;
        var urlName;

        if (urlValue == undefined) {
            urlName = "";
        }
        else {
            urlArray = urlValue.split(";#");
            urlName = urlArray[1];
        }

        var liHtml = "<div class='mof-intra-body-left-anno-n'><h2><a href='AnnouncementDetail.aspx?ArticalID=" + $(this).attr("ows_ID") + "'>" + title + "</a></h2><p>" + teaserText + "</p></div>"
        $("#" + Container).append(liHtml);
    });
}

//============================================== End Announcements ============================================================//
//=============================================================================================================================//



// ============================================== Directorates and Commission ==============================================//
//Container = provide div id as string in which created html append e.g. tabSlides
function GetDirectoratesCommission(Container, DefaultcultureID) {
    var cultureID = getCurrentLanguage();


    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    $("#" + Container).empty();
    $("#" + Container).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

    var key = "ContactDirectory";
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetDirectoratesCommission",
        data: "{cultureID: '" + cultureID + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            $("#" + Container).empty();
            var Trows = "";
            var Trow = "";
            var TCell1 = "";
            var TCell2 = "";
            var liHtml = "";

           /// if ($(value.d).find(",")) {
                Trows = value.d.split(',');
                for (var i = 0; i < Trows.length; i++) {
                    Trow = Trows[i].split('~');
                    TCell1 = Trow[0];
                    TCell2 = Trow[1];
                    liHtml = liHtml + "<div class='mof-intra-body-left-dac'><h2><a href='http://" + window.location.host + "/Pages/" + TCell2 + "'>" + TCell1 + "</a></h2></div>";
                }
           // }
           // else
             //   liHtml = liHtml + "<div class='mof-intra-body-left-dac'><h2><a href='http://" + window.location.host + "/Pages/" + TCell2 + "'>" + TCell1 + "</a></h2></div>";


            $("#" + Container).append(liHtml);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}


//=================================== End Directorates and Commission  =====================================================//
//=============================================================================================================================//

// ============================================== Department Contact Directory ==============================================//
//Container = provide div id as string in which created html append e.g. tabSlides
function GetContactDirectoryHeadlines(Container, DefaultcultureID) {
    var cultureID = getCurrentLanguage();


    if (cultureID == "0") {
        cultureID = DefaultcultureID
    }

    $("#" + Container).empty();
    $("#" + Container).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

    var key = "ContactDirectory";
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            var soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                <soapenv:Body> \
                    <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                        <listName>" + value.d + "</listName> \
                        <viewFields> \
                            <ViewFields> \
                                <FieldRef Name='Title' /> \
                                <FieldRef Name='ArabicTitle' /> \
                                <FieldRef Name='DeptContactDetail' /> \
                                <FieldRef Name='ID' /> \
                                <FieldRef Name='Created' /> \
                            </ViewFields> \
                        </viewFields> \
                        <query> \
                            <Query> \
                                <Where> \
                                    <Eq><FieldRef Name='IsInFrontView' /><Value Type='Boolean'>1</Value></Eq> \
                                </Where> \
                                <OrderBy> \
                                    <FieldRef Name='Title' Ascending='True' /> \
                                </OrderBy> \
                            </Query> \
                        </query> \
                        <rowLimit>10</rowLimit> \
                    </GetListItems> \
                </soapenv:Body> \
            </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processContactDirecotry(xData, status, Container, cultureID);
                },
                contentType: "text/xml; charset=utf-8",
                error: function (xhr) {
                    //alert('Error!  Status = ' + xhr.status);
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //  // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs News Headline ajax request result
function processContactDirecotry(xData, status, Container, culture) {
    $("#" + Container).empty();
    $(xData.responseText).find("z\\:row").each(function () {

        var title = "";
        var contact = $(this).attr("ows_DeptContactDetail");
        var ContactID = $(this).attr("ows_ID");
        var siteLang = "ar";

        if (culture == "1033") {        //for english
            title = $(this).attr("ows_Title");
            siteLang = "en";
        }
        else if (culture == "1025") {   // for arabic
            title = $(this).attr("ows_ArabicTitle");
            siteLang = "ar";
        }

       // var liHtml = "<div class='mof-intra-body-left-dcd'><h2>" + title + "</h2><p>" + contact + "</p></div>"
      //  var liHtml = "<div class='mof-intra-body-left-dcd'><a href='MOFCustomerCare.aspx?DepId=" + ContactID + "'><h2>" + title + "</h2></a>"
        var liHtml = "<div class='mof-intra-body-left-dcd'><a href='" + siteLang + "/MisnistryContactEmail.aspx?DepId=" + ContactID + "'><h2>" + title + "</h2></a>"
        //+ "<p><a href='mailto:" + contact + "'>" + contact + "</a></p>"
        +"</div>"
        $("#" + Container).append(liHtml);
    });
}

//=================================== End Department Contact Directory =====================================================//
//=============================================================================================================================//

//============================================== Department Images ==============================================//
//ImageContainer = provide div id as string in which created html append e.g. dvItems
function GetDepartmentLogs(ImageContainer, DetailURL) {
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetDepartmentsLogo",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {// show the respose come from the database 
            var xmlDoc = $.parseXML(response.d); // Pass te dataset into xml
            var xml = $(xmlDoc);
            var _table = xml.find("Table1"); //  get the current table from xml .
            var lenght = _table.length;

            for (var index = 0; index <= lenght - 1; index++) {

                //Get first item for one frame
                var item = _table[index];
                var liHtml = "<div><a href='" + DetailURL + $(item).find("ID").text() + "'><img src='" + $(item).find("Path").text() + "' /></a>";

                //Get second item for one frame
                index++;

                item = _table[index];
                if (item != undefined) {
                    liHtml = liHtml + "<a href='" + DetailURL + $(item).find("ID").text() + "'><img src='" + $(item).find("Path").text() + "' /></a>";
                }
                else {
                    liHtml = liHtml + "</div>";
                    $("#" + ImageContainer).append(liHtml);
                    break;
                }

                //Get third item for one frame
                index++;

                item = _table[index];
                if (item != undefined) {
                    liHtml = liHtml + "<a href='" + DetailURL + $(item).find("ID").text() + "'><img src='" + $(item).find("Path").text() + "' /></a>";
                }
                else {
                    liHtml = liHtml + "</div>";
                    $("#" + ImageContainer).append(liHtml);
                    break;
                }

                //  Get fourth item for one frame
                index++;

                item = _table[index];
                if (item != undefined) {
                    liHtml = liHtml + "<a href='" + DetailURL + $(item).find("ID").text() + "'><img src='" + $(item).find("Path").text() + "' /></a>";
                }
                else {
                    liHtml = liHtml + "</div>";
                    $("#" + ImageContainer).append(liHtml);
                    break;
                }

                liHtml = liHtml + "</div>";

                $("#" + ImageContainer).append(liHtml);
            }

            if (response.d != "<NewDataSet />") {
                initalizeScrollable();
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //   // alert(XMLHttpRequest.responseText);
        }
    });
}

function initalizeScrollable() {

    // initialize scrollable
    //    $(".scrollable").scrollable();

    // initialize scrollable together with the autoscroll plugin
    var root = $("#autoscroll").scrollable({ circular: true }).autoscroll({ autoplay: false });

    // provide scrollable API for the action buttons
    window.api = root.data("scrollable");
    api.play();
}

//============================================== End Department Images ========================================================//
//=============================================================================================================================//


//============================================== Weather Information ==============================================//
//WeatherContainer = provide table id as string in which created weather information html  append e.g. 'myTable tbody'

function GetWeather(WeatherContainer, DefaultcultureID, control) {  //MYVC fix - new weather function

    var cultureID = getCurrentLanguage();
    if (cultureID == "0")
        cultureID = DefaultcultureID

    var cities = ["Baghdad"];
    var citesinArabic = ["بغداد"];
    $('#' + WeatherContainer).empty();
    var index = 0;

    for (var i = 0; i < 1; i++) {
        var city = cities[i];
        //var searchtext = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
        var searchtext = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c' limit 1"

        //change city variable dynamically as required

        $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json&callback=?").success(function (data) {

            var weatherForecasts = data.query.results.channel.item.forecast;
            var ilHTML = '<table >';
            if (cultureID == "1033") {  // for english
                ilHTML = ilHTML + "<tr><td><h2>Weather for " + city + "</h2><br/><br/></td></tr>";
                ilHTML = ilHTML + "<tr><td align='center'>" + weatherForecasts[0].day + ' ' + weatherForecasts[0].date + "</td></tr>";
                //ilHTML = ilHTML + '<h3>' + weatherForecasts[1].day + ' ' + weatherForecasts[1].date + '</h3>';
            }
            else if (cultureID == "1025") { // for arabic
                ilHTML = ilHTML + "<tr><td><h2>الطقس - " + citesinArabic[index] + "</h2><br/><br/></td></tr>";
                ilHTML = ilHTML + "<tr><td align='center'><br/>" + GetDayArabic(weatherForecasts[0].day) + " " + GetMonthArabic(weatherForecasts[0].date) + "</td></tr>";
                //ilHTML = ilHTML + '<h3>' + GetDayArabic(weatherForecasts[1].day) + ' ' + GetMonthArabic(weatherForecasts[1].date) + '</h3>';
            }

            ilHTML = ilHTML + "<tr><td align='center'><br/><div class='weather_icon' title=" + weatherForecasts[0].text + " style='background-position:-" + (61 * weatherForecasts[0].code) + "px 0px'></div><br/>";
            //ilHTML = ilHTML + "<h3><div class='weather_icon' title=" + weatherForecasts[1].text + " style='background-position:-" + (61 * weatherForecasts[1].code) + "px 0px'></div></h3>";


            if (index == 0) {
                if (cultureID == "1033") {  //for English
                    ilHTML = ilHTML + "<tr><td align='center'>Max: <span>" + weatherForecasts[0].high + " </span>&nbsp;&nbsp;&nbsp;&nbsp; Min: <span>" + weatherForecasts[0].low + " </span></td></tr>"; //"</span><span>" + weatherForecasts[1].high + " </span></P>";
                    //ilHTML = ilHTML + "<tr><td align='center'>Min: <span>" + weatherForecasts[0].low + " </span></td></tr>"; //"</span><span>" + weatherForecasts[1].low + " </span></P>";

                }
                else if (cultureID == "1025") { //for Arabic
                    ilHTML = ilHTML + "<tr><td align='center'>العظمى: <span>" + weatherForecasts[0].high + " </span>&nbsp;&nbsp;&nbsp;&nbsp; الصغرى: <span>" + weatherForecasts[0].low + " </span></td></tr>"; //"</span><span>" + weatherForecasts[1].high + " </span></P>";
                    //ilHTML = ilHTML + "<tr><td align='center'>الصغرى: <span>" + weatherForecasts[0].low + " </span></td></tr>"; //"</span><span>" + weatherForecasts[1].low + " </span></P>";
                }
            }
            ilHTML = ilHTML + '</table>';
            $('#' + WeatherContainer).append(ilHTML);
            index++;
        });

    }
}

function GetWeather_XX(WeatherContainer, DefaultcultureID, control) {

    var cultureID = getCurrentLanguage();
    if (cultureID == "0") 
        cultureID = DefaultcultureID
    
    var cities = ["Baghdad"];
    var citesinArabic = ["بغداد"];
    $('#' + WeatherContainer).empty();
  
    for (var i = 0; i < 1; i++) {
        var city = cities[i];

        var locationQuery = 'SELECT id FROM xml WHERE url="http://wxdata.weather.com/wxdata/search/search?where=' + city + ' " AND itemPath="search.loc"'
        var locationUrl = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(locationQuery) + '&format=json';
        $.getJSON(locationUrl + '&callback=?', function (data) {
            if (data.query.count > 0) {
                if (data.query.results.loc.length > 1) {
                    for (var j = 0; j < data.query.results.loc.length - 1; j++) {
                        bindtheWeatherInfoMain(data.query.results.loc[j].id, cultureID, WeatherContainer, citesinArabic);
                    }
                }
                else {
                    bindtheWeatherInfoMain(data.query.results.loc.id, cultureID, WeatherContainer, citesinArabic);
                }
            } // end of If statment of count location ID

            //            else {
            //                $("#" + control).attr("style", "display:none");
            //            }
        });                     // end of outer or main getJSON Method
    } // end of loop on all the cities
}


function bindtheWeatherInfoMain(locationId, cultureID, WeatherContainer, citesinArabic) {
    var index = 0;
    var weatherUnit = 'c'; //c for Celcius, f for Fahrenheit
    var weatherQuery = 'SELECT * FROM rss WHERE url="http://xml.weather.yahoo.com/forecastrss/' + locationId + '_' + weatherUnit + '.xml"';
    var weatherUrl = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(weatherQuery) + '&format=json';

    $.getJSON(weatherUrl + '&callback=?', function (data) {
        if (data.query.results.item.title != 'City not found') {
            var CityName = data.query.results.item.title.split(',');
            var locName = CityName[0].substring(15, CityName[0].length);

            var LocationIDs = data.query.results.item.guid.content.split('_');
            var LocationID = LocationIDs[0];

            var weatherForecasts = data.query.results.item.forecast;
            var ilHTML = '';
            if (cultureID == "1033") {  // for english
                ilHTML = ilHTML + '<h2>Weather for ' + locName + '</h2>';
                ilHTML = ilHTML + '<h3>' + weatherForecasts[0].day + ' ' + weatherForecasts[0].date + '</h3>';
                ilHTML = ilHTML + '<h3>' + weatherForecasts[1].day + ' ' + weatherForecasts[1].date + '</h3>';
            }
            else if (cultureID == "1025") { // for arabic
                ilHTML = ilHTML + '<h2>الطقس لل ' + citesinArabic[index] + '</h2>';
                ilHTML = ilHTML + '<h3>' + GetDayArabic(weatherForecasts[0].day) + ' ' + GetMonthArabic(weatherForecasts[0].date) + '</h3>';
                ilHTML = ilHTML + '<h3>' + GetDayArabic(weatherForecasts[1].day) + ' ' + GetMonthArabic(weatherForecasts[1].date) + '</h3>';
            }

            ilHTML = ilHTML + "<h3><div class='weather_icon' title=" + weatherForecasts[0].text + " style='background-position:-" + (61 * weatherForecasts[0].code) + "px 0px'></div></h3>";
            ilHTML = ilHTML + "<h3><div class='weather_icon' title=" + weatherForecasts[1].text + " style='background-position:-" + (61 * weatherForecasts[1].code) + "px 0px'></div></h3>";

            if (index == 0) {
                if (cultureID == "1033") {  //for English
                    ilHTML = ilHTML + "<P>Max<span>" + weatherForecasts[0].high + "</span><span>" + weatherForecasts[1].high + " </span></P>";
                    ilHTML = ilHTML + "<P>Min<span>" + weatherForecasts[0].low + "</span><span>" + weatherForecasts[1].low + " </span></P>";

                }
                else if (cultureID == "1025") { //for Arabic
                    ilHTML = ilHTML + "<P>العظمى<span>" + weatherForecasts[0].high + "</span><span>" + weatherForecasts[1].high + " </span></P>";
                    ilHTML = ilHTML + "<P>الصغرى<span>" + weatherForecasts[0].low + "</span><span>" + weatherForecasts[1].low + " </span></P>";
                }
            }
            $('#' + WeatherContainer).append(ilHTML);
            index++;
        }
    }); //end of inner getJSON Method

}


//============================================== End Weather information ======================================================//
//=============================================================================================================================//


//============================================== Weather For All Cities Information ==============================================//
//WeatherContainer = provide table id as string in which created weather information html  append e.g. 'myTable tbody'
function GetWeatherAlCities_XX(WeatherContainer, DefaultcultureID) {
    var cultureID = DefaultcultureID

    //var cities = ["mosul", "Baghdad", "basrah", "Najaf","Al Kut","Al Hillah","Al Karkh","Al Kazimiyah","An Nasiriyah","Ar Rutbah","Baqubah","Nineveh","Arbil"];
    //var citesinArabic = ["الموصل", "بغداد", "البصرة", "النجف", "الكوت‎", "الحلة", "الكرخ", "الكاظمية", "والناصرية", "الرطبة", "بعقوبة", "نينوى", "اربيل"];

    var cities = ["Mosul", "Baghdad", "Basrah", "Najaf", "Baqubah", "Arbil"];
    //var citesinArabic = ["الموصل", "بغداد", "البصرة", "النجف", "بعقوبة", "اربيل"];


    $('#' + WeatherContainer).empty();

    var index = 0;
    // cities.length
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        //var city = 'Maastricht'
        var locationQuery = 'SELECT id FROM xml WHERE url="http://wxdata.weather.com/wxdata/search/search?where=' + city + ' " AND itemPath="search.loc"'
        var locationUrl = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(locationQuery) + '&format=json';

        $.getJSON(locationUrl + '&callback=?', function (data) {
            if (data.query.count > 0) {


                if (data.query.results.loc.length > 1) {

                    for (var j = 0; j < data.query.results.loc.length - 1; j++) {
                        var locationId = data.query.results.loc[j].id;

                        var weatherUnit = 'c'; //c for Celcius, f for Fahrenheit
                        var weatherQuery = 'SELECT * FROM rss WHERE url="http://xml.weather.yahoo.com/forecastrss/' + locationId + '_' + weatherUnit + '.xml"';
                        var weatherUrl = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(weatherQuery) + '&format=json';

                        $.getJSON(weatherUrl + '&callback=?', function (data) {
                            if (data.query.results.item.title != 'City not found' && data.query.results.item.title.split(',')[0] != "Conditions for Najafabad") {
                                var CityName = data.query.results.item.title.split(',');

                                var locName = CityName[0].substring(15, CityName[0].length);

                                var LocationIDs = data.query.results.item.guid.content.split('_');
                                var LocationID = LocationIDs[0];

                                var weatherForecasts = data.query.results.item.forecast;

                                if (index == 0) {
                                    if (cultureID == "1033") {  //for english 
                                        $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[0].day + ' ' + weatherForecasts[0].date + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[1].day + ' ' + weatherForecasts[1].date + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[2].day + ' ' + weatherForecasts[2].date + '</h1></td>' +
                                                              '</tr>');
                                        $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +
                                                             '</tr>');
                                    }
                                    else if (cultureID == "1025") { //for arabic
                                        $('#' + WeatherContainer).append('<tr>' +
                                                                '<td >&nbsp;</td>' +
                                                                '<td colspan="3"><h1>' + GetDayArabic(weatherForecasts[0].day) + ' ' + GetMonthArabic(weatherForecasts[0].date) + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + GetDayArabic(weatherForecasts[1].day) + ' ' + GetMonthArabic(weatherForecasts[1].date) + '</h1></td>' +
                                                                '<td  colspan="3"><h1>' + GetDayArabic(weatherForecasts[2].day) + ' ' + GetMonthArabic(weatherForecasts[2].date) + '</h1></td>' +
                                                             '</tr>');
                                        $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>الصغرى</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td  align="center" valign="middle"><h2>الصغرى</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>الصغرى</h2></td>' +
                                                             '</tr>');
                                        //$('#' + WeatherContainer).append('<tr class="weatherlocation"><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td><TD></TD><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td><TD></TD><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td></tr>');
                                    }
                                }

                                var ilHTML = '<tr>';

                                if (cultureID == "1033") {  // for english
                                    ilHTML = ilHTML + '<td><h3>' + locName + '</h3></td>';
                                }
                                else if (cultureID == "1025") { // for arabic

                                    ilHTML = ilHTML + '<td><h3>' + getCitesArabic(locName) + '</h3></td>';
                                    //ilHTML = ilHTML + '<td><h3>' +getCitesArabic(locName) citesinArabic[index] + '</h3></td>';
                                }

                                ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[0].text + " style='background-position:-" + (61 * weatherForecasts[0].code) + "px 0px'></div></td>";
                                ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[0].high + '</h2></td>';
                                ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[0].low + '</h2></td>';

                                ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[1].text + " style='background-position:-" + (61 * weatherForecasts[1].code) + "px 0px'></div></td>";
                                ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[1].high + '</h2></td>';
                                ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[1].low + '</h2></td>';

                                ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[2].text + " style='background-position:-" + (61 * weatherForecasts[2].code) + "px 0px'></div></td>";
                                ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[2].high + '</h2></td>';
                                ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[2].low + '</h2></td>';

                                ilHTML = ilHTML + '</tr>';
                                $('#' + WeatherContainer).append(ilHTML);
                                index++;
                            }

                        }); //end of inner getJSON Method
                    }
                }
                else {

                    var locationId = data.query.results.loc.id;
                    // $('#weatherData .weather-location').append('Weather for ' + city + ' (' + locationId + ')');

                    var weatherUnit = 'c'; //c for Celcius, f for Fahrenheit
                    var weatherQuery = 'SELECT * FROM rss WHERE url="http://xml.weather.yahoo.com/forecastrss/' + locationId + '_' + weatherUnit + '.xml"';
                    var weatherUrl = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(weatherQuery) + '&format=json';

                    $.getJSON(weatherUrl + '&callback=?', function (data) {
                        var CityName = data.query.results.item.title.split(',');

                        var locName = CityName[0].substring(15, CityName[0].length);

                        var LocationIDs = data.query.results.item.guid.content.split('_');
                        var LocationID = LocationIDs[0];

                        var weatherForecasts = data.query.results.item.forecast;

                        if (index == 0) {
                            if (cultureID == "1033") {  //for english 
                                $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[0].day + ' ' + weatherForecasts[0].date + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[1].day + ' ' + weatherForecasts[1].date + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[2].day + ' ' + weatherForecasts[2].date + '</h1></td>' +
                                                              '</tr>');
                                $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +
                                                             '</tr>');
                            }
                            else if (cultureID == "1025") { //for arabic
                                $('#' + WeatherContainer).append('<tr>' +
                                                                '<td >&nbsp;</td>' +
                                                                '<td colspan="3"><h1>' + GetDayArabic(weatherForecasts[0].day) + ' ' + GetMonthArabic(weatherForecasts[0].date) + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + GetDayArabic(weatherForecasts[1].day) + ' ' + GetMonthArabic(weatherForecasts[1].date) + '</h1></td>' +
                                                                '<td  colspan="3"><h1>' + GetDayArabic(weatherForecasts[2].day) + ' ' + GetMonthArabic(weatherForecasts[2].date) + '</h1></td>' +
                                                             '</tr>');
                                $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>الصغرى</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td  align="center" valign="middle"><h2>الصغرى</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>الصغرى</h2></td>' +
                                                             '</tr>');
                                //$('#' + WeatherContainer).append('<tr class="weatherlocation"><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td><TD></TD><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td><TD></TD><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td></tr>');
                            }
                        }

                        var ilHTML = '<tr>';

                        if (cultureID == "1033") {  // for english
                            ilHTML = ilHTML + '<td><h3>' + locName + '</h3></td>';
                        }
                        else if (cultureID == "1025") { // for arabic

                            ilHTML = ilHTML + '<td><h3>' + getCitesArabic(locName) + '</h3></td>';
                            //ilHTML = ilHTML + '<td><h3>' +getCitesArabic(locName) citesinArabic[index] + '</h3></td>';
                        }

                        ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[0].text + " style='background-position:-" + (61 * weatherForecasts[0].code) + "px 0px'></div></td>";
                        ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[0].high + '</h2></td>';
                        ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[0].low + '</h2></td>';

                        ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[1].text + " style='background-position:-" + (61 * weatherForecasts[1].code) + "px 0px'></div></td>";
                        ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[1].high + '</h2></td>';
                        ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[1].low + '</h2></td>';

                        ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[2].text + " style='background-position:-" + (61 * weatherForecasts[2].code) + "px 0px'></div></td>";
                        ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[2].high + '</h2></td>';
                        ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[2].low + '</h2></td>';

                        ilHTML = ilHTML + '</tr>';
                        $('#' + WeatherContainer).append(ilHTML);
                        index++;


                    }); //end of inner getJSON Method
                }
            } // end of If statment of count location ID
        });                          // end of outer or main getJSON Method
    } // end of loop on all the cities
}

function GetWeatherAlCities(WeatherContainer, DefaultcultureID) {
    var cultureID = DefaultcultureID

    //var cities = ["mosul", "Baghdad", "basrah", "Najaf","Al Kut","Al Hillah","Al Karkh","Al Kazimiyah","An Nasiriyah","Ar Rutbah","Baqubah","Nineveh","Arbil"];
    //var citesinArabic = ["الموصل", "بغداد", "البصرة", "النجف", "الكوت‎", "الحلة", "الكرخ", "الكاظمية", "والناصرية", "الرطبة", "بعقوبة", "نينوى", "اربيل"];

    var cities = ["Baghdad", "Mosul", "Basrah", "Najaf", "Baqubah", "Arbil"];
    //var citesinArabic = ["الموصل", "بغداد", "البصرة", "النجف", "بعقوبة", "اربيل"];


    $('#' + WeatherContainer).empty();

    var index = 0;
    // cities.length
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        //var city = 'Maastricht'
        //var searchtext = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'"
        var searchtext = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c' limit 3"
        //change city variable dynamically as required

        $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json&callback=?").success(function(data) {


            var weatherForecasts = data.query.results.channel.item.forecast; 

            if (index == 0) {
                if (cultureID == "1033") {  //for english 
                    $('#' + WeatherContainer).append('<tr>' +
                                                    '<td>&nbsp;</td>' +
                                                    '<td colspan="3"><h1>' + weatherForecasts[0].day + ' ' + weatherForecasts[0].date + '</h1></td>' +
                                                    '<td colspan="3"><h1>' + weatherForecasts[1].day + ' ' + weatherForecasts[1].date + '</h1></td>' +
                                                    '<td colspan="3"><h1>' + weatherForecasts[2].day + ' ' + weatherForecasts[2].date + '</h1></td>' +
                                                  '</tr>');
                    $('#' + WeatherContainer).append('<tr>' +
                                                    '<td>&nbsp;</td>' +

                                                    '<td align="center" valign="middle">&nbsp;</td>' +
                                                    '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                    '<td align="center" valign="middle"><h2>Min</h2></td>' +

                                                    '<td align="center" valign="middle">&nbsp;</td>' +
                                                    '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                    '<td align="center" valign="middle"><h2>Min</h2></td>' +

                                                    '<td align="center" valign="middle">&nbsp;</td>' +
                                                    '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                    '<td align="center" valign="middle"><h2>Min</h2></td>' +
                                                 '</tr>');
                }
                else if (cultureID == "1025") { //for arabic
                    $('#' + WeatherContainer).append('<tr>' +
                                                    '<td >&nbsp;</td>' +
                                                    '<td colspan="3"><h1>' + GetDayArabic(weatherForecasts[0].day) + ' ' + GetMonthArabic(weatherForecasts[0].date) + '</h1></td>' +
                                                    '<td colspan="3"><h1>' + GetDayArabic(weatherForecasts[1].day) + ' ' + GetMonthArabic(weatherForecasts[1].date) + '</h1></td>' +
                                                    '<td  colspan="3"><h1>' + GetDayArabic(weatherForecasts[2].day) + ' ' + GetMonthArabic(weatherForecasts[2].date) + '</h1></td>' +
                                                 '</tr>');
                    $('#' + WeatherContainer).append('<tr>' +
                                                    '<td>&nbsp;</td>' +

                                                    '<td align="center" valign="middle">&nbsp;</td>' +
                                                    '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                    '<td align="center" valign="middle"><h2>الصغرى</h2></td>' +

                                                    '<td align="center" valign="middle">&nbsp;</td>' +
                                                    '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                    '<td  align="center" valign="middle"><h2>الصغرى</h2></td>' +

                                                    '<td align="center" valign="middle">&nbsp;</td>' +
                                                    '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                    '<td align="center" valign="middle"><h2>الصغرى</h2></td>' +
                                                 '</tr>');
                    //$('#' + WeatherContainer).append('<tr class="weatherlocation"><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td><TD></TD><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td><TD></TD><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td></tr>');
                }
            }

            var ilHTML = '<tr>';

            if (cultureID == "1033") {  // for english
                ilHTML = ilHTML + '<td><h3>' + cities[index] + '</h3></td>';
            }
            else if (cultureID == "1025") { // for arabic

                ilHTML = ilHTML + '<td><h3>' + getCitesArabic(cities[index]) + '</h3></td>';
                //ilHTML = ilHTML + '<td><h3>' +getCitesArabic(locName) citesinArabic[index] + '</h3></td>';
            }

            ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[0].text + " style='background-position:-" + (61 * weatherForecasts[0].code) + "px 0px'></div></td>";
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[0].high + '</h2></td>';
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[0].low + '</h2></td>';

            ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[1].text + " style='background-position:-" + (61 * weatherForecasts[1].code) + "px 0px'></div></td>";
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[1].high + '</h2></td>';
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[1].low + '</h2></td>';

            ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[2].text + " style='background-position:-" + (61 * weatherForecasts[2].code) + "px 0px'></div></td>";
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[2].high + '</h2></td>';
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[2].low + '</h2></td>';

            ilHTML = ilHTML + '</tr>';
            $('#' + WeatherContainer).append(ilHTML);
            index++;


                    
                
            
        });                          // end of outer or main getJSON Method
    } // end of loop on all the cities
}

/// get the weather Detail information
function GetWeatherDetailInfo(locationId, cultureID, WeatherContainer) {
    var index = 0;

    var weatherUnit = 'c'; //c for Celcius, f for Fahrenheit
    var weatherQuery = 'SELECT * FROM rss WHERE url="http://xml.weather.yahoo.com/forecastrss/' + locationId + '_' + weatherUnit + '.xml"';
    var weatherUrl = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(weatherQuery) + '&format=json';

    $.getJSON(weatherUrl + '&callback=?', function (data) {
        if (data.query.results.item.title != 'City not found') {
            var CityName = data.query.results.item.title.split(',');

            var locName = CityName[0].substring(15, CityName[0].length);

            var LocationIDs = data.query.results.item.guid.content.split('_');
            var LocationID = LocationIDs[0];

            var weatherForecasts = data.query.results.item.forecast;

            if (index == 0) {
                if (cultureID == "1033") {  //for english 
                    $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[0].day + ' ' + weatherForecasts[0].date + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[1].day + ' ' + weatherForecasts[1].date + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + weatherForecasts[2].day + ' ' + weatherForecasts[2].date + '</h1></td>' +
                                                              '</tr>');
                    $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>Max</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>Min</h2></td>' +
                                                             '</tr>');
                }
                else if (cultureID == "1025") { //for arabic
                    $('#' + WeatherContainer).append('<tr>' +
                                                                '<td >&nbsp;</td>' +
                                                                '<td colspan="3"><h1>' + GetDayArabic(weatherForecasts[0].day) + ' ' + GetMonthArabic(weatherForecasts[0].date) + '</h1></td>' +
                                                                '<td colspan="3"><h1>' + GetDayArabic(weatherForecasts[1].day) + ' ' + GetMonthArabic(weatherForecasts[1].date) + '</h1></td>' +
                                                                '<td  colspan="3"><h1>' + GetDayArabic(weatherForecasts[2].day) + ' ' + GetMonthArabic(weatherForecasts[2].date) + '</h1></td>' +
                                                             '</tr>');
                    $('#' + WeatherContainer).append('<tr>' +
                                                                '<td>&nbsp;</td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>الصغرى</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td  align="center" valign="middle"><h2>الصغرى</h2></td>' +

                                                                '<td align="center" valign="middle">&nbsp;</td>' +
                                                                '<td align="center" valign="middle"><h2>العظمى</h2></td>' +
                                                                '<td align="center" valign="middle"><h2>الصغرى</h2></td>' +
                                                             '</tr>');
                    //$('#' + WeatherContainer).append('<tr class="weatherlocation"><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td><TD></TD><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td><TD></TD><td colspan="2"></td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">العظمى</td><td class="weatherlocation" style="width:30px; text-align:center !Important; font-size:10px;">الصغرى</td></tr>');
                }
            }

            var ilHTML = '<tr>';

            if (cultureID == "1033") {  // for english
                ilHTML = ilHTML + '<td><h3>' + locName + '</h3></td>';
            }
            else if (cultureID == "1025") { // for arabic

                ilHTML = ilHTML + '<td><h3>' + getCitesArabic(locName) + '</h3></td>';
                //ilHTML = ilHTML + '<td><h3>' +getCitesArabic(locName) citesinArabic[index] + '</h3></td>';
            }

            ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[0].text + " style='background-position:-" + (61 * weatherForecasts[0].code) + "px 0px'></div></td>";
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[0].high + '</h2></td>';
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[0].low + '</h2></td>';

            ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[1].text + " style='background-position:-" + (61 * weatherForecasts[1].code) + "px 0px'></div></td>";
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[1].high + '</h2></td>';
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[1].low + '</h2></td>';

            ilHTML = ilHTML + "<td align='center' valign='middle'><div class='weather_icon' title=" + weatherForecasts[2].text + " style='background-position:-" + (61 * weatherForecasts[2].code) + "px 0px'></div></td>";
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[2].high + '</h2></td>';
            ilHTML = ilHTML + '<td align="center" valign="middle"><h2>' + weatherForecasts[2].low + '</h2></td>';

            ilHTML = ilHTML + '</tr>';
            $('#' + WeatherContainer).append(ilHTML);
            index++;
        }

    }); //end of inner getJSON Method
}


// get the cities in arabic
function getCitesArabic(val) {
    var citesinArabic = ["الموصل", "بغداد", "البصرة", "النجف", "بعقوبة", "اربيل"];
    var cites = "";

    switch (val) {
        case ("Mosul"):
            cites = citesinArabic[0];
            break;
        case ("Baghdad"):
            cites = citesinArabic[1];
            break;
        case ("Basrah"):
            cites = citesinArabic[2];
            break;
        case ("Najaf"):
            cites = citesinArabic[3];
            break;
        case ("Baqubah"):
            cites = citesinArabic[4];
            break;
        case ("Arbil"):
            cites = citesinArabic[5];
            break;
    }

    return cites;
}


// get the days in Arabic
function GetDayArabic(val) {
    var DaysArabic = ["أَحَد", "إِثْنَيْنْ", "ثُلاَثَاءْ", "أَرْبِعَاء", "خَمِيْسْ", "جُمْعَة", "سَبْتْ"]
    var Day = "";

    switch (val) {
        case ("Sun"):
            Day = DaysArabic[0];
            break;
        case ("Mon"):
            Day = DaysArabic[1];
            break;
        case ("Tue"):
            Day = DaysArabic[2];
            break;
        case ("Wed"):
            Day = DaysArabic[3];
            break;
        case ("Thu"):
            Day = DaysArabic[4];
            break;
        case ("Fri"):
            Day = DaysArabic[5];
            break;
        case ("Sat"):
            Day = DaysArabic[6];
            break;
    }

    return Day;

}


// get the months in Arabic
function GetMonthArabic(val) {
    var MonthsArabic = ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"]

    var months = val.split(" ");
    var month = "";


    switch (months[1]) {
        case ("Jan"):
            month = MonthsArabic[0];
            break;
        case ("Feb"):
            month = MonthsArabic[1];
            break;
        case ("Mar"):
            month = MonthsArabic[2];
            break;
        case ("Apr"):
            month = MonthsArabic[3];
            break;
        case ("May"):
            month = MonthsArabic[4];
            break;
        case ("Jun"):
            month = MonthsArabic[5];
            break;
        case ("Jul"):
            month = MonthsArabic[6];
            break;
        case ("Aug"):
            month = MonthsArabic[7];
            break;
        case ("Sep"):
            month = MonthsArabic[8];
            break;
        case ("Oct"):
            month = MonthsArabic[9];
            break;
        case ("Nov"):
            month = MonthsArabic[10];
            break;
        case ("Dec"):
            month = MonthsArabic[11];
            break;
    }


    return months[0] + " " + month + " " + months[2]; ;
}
//============================================== End Weather Fro All Cities information ======================================================//


//============================================== Goverment Sites ===================================================//
//GovermentsiteContainer = provide div id as string in which created html append e.g. dvGovtSites
function GetGovermentsSites(GovermentsiteContainer) {

    $("#" + GovermentsiteContainer).empty();
    $("#" + GovermentsiteContainer).html('<center style="margin-top:10px;"><img src="/_layouts/images/MOF/loader.gif" /></center>');

    var key = "GovernmentSites";
    $.ajax({
        type: "POST",
        url: "../_layouts/MOFInternet/Service.aspx/GetListName",
        data: "{Key: '" + key + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (value) {
            soapEnv = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'> \
                    <soapenv:Body> \
                        <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'> \
                            <listName>" + value.d + "</listName> \
                            <viewFields> \
                                <ViewFields> \
                                    <ViewFields> \
                                        <FieldRef Name='Title' /> \
                                        <FieldRef Name='FileDirRef' /> \
                                        <FieldRef Name='NameOrTitle' /> \
                                        <FieldRef Name='RequiredField' /> \
                                        <FieldRef Name='FileRef' /> \
                                        <FieldRef Name='GovtSiteURL' /> \
                                    </ViewFields> \
                                </ViewFields> \
                            </viewFields> \
                            <query> \
                                <Query> \
                                    <Where> \
                                        <Eq><FieldRef Name='IsShow' /><Value Type='Boolean'>1</Value></Eq> \
                                    </Where> \
                                </Query> \
                            </query> \
                            <rowLimit>5</rowLimit> \
                        </GetListItems> \
                    </soapenv:Body> \
                </soapenv:Envelope>";

            //Get site url
            var URL = window.location.host;

            $.ajax({
                url: "https://" + URL + "/_vti_bin/Lists.asmx",
                type: "POST",
                dataType: "xml",
                data: soapEnv,
                complete: function (xData, status) {
                    processGovermentSites(xData, status, GovermentsiteContainer);
                },
                contentType: "text/xml; charset=\"utf-8\""
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // // alert(XMLHttpRequest.responseText);
        }
    });
}

// funciton for processs images for Goverment sites logs ajax request result
function processGovermentSites(xData, status, GovermentSitescontainer) {
    var port = window.location.port;
    if (port.length <= 0)
        port = "";
    else
        port = ":" + port;

    //Change the below to point to your image library
    var imageURL = window.location.protocol + "//" + window.location.hostname + port + L_Menu_BaseUrl + "/Lists/GovermentSites/";

    $("#" + GovermentSitescontainer).empty();
    $("#" + GovermentSitescontainer).html("");

    // Also working in safari and Chrome
    $(xData.responseText).find("z\\:row").each(function () {
        var imageLink = imageURL + $(this).attr("ows_FileLeafRef").substring($(this).attr("ows_FileLeafRef").indexOf('#') + 1);
        var siteURL = $(this).attr("ows_GovtSiteURL")

        var liHtml = "<a href='" + siteURL + "' target='_blank'><img src='" + imageLink + "' height='52' width='62' alt='' /></a>";
        $("#" + GovermentSitescontainer).append(liHtml);

    });
}

//============================================== End Goverment Site ======================================================//
//========================================================================================================================//


//============================================== Get the Query string value ======================================================//

function BindID(sParam) {
    var sPageURL = window.location.search.substring(1);

    var sParameterName = sPageURL.split('=');
    if (sParameterName[0] == sParam) {
        return sParameterName[1];
    }
}

//============================================== End  ======================================================//






//==================================================================== Validation Check==============================//



// validate the Form
function validateForm(fields, msg) {

    var validatefieldArr = fields.split(',') // get the form fields with comma saperator and put in arry.
    var msgArr = msg.split(',') // get the form fields with comma saperator and put in arry.

    var reason = "";
    for (var i = 0; i < validatefieldArr.length; i++) {
        var strFiled = $("#" + validatefieldArr[i]);
        if (strFiled[0].type == "textarea")
        //reason += validateTextArea($($(strFiled[0].previousSibling).find("div"))[0], msgArr[i]);
            reason += validateTextArea(strFiled[0], msgArr[i]);
        else if (strFiled[0].type == "text") {
            if (strFiled[0].id == "txtEmail")
                reason += validateEmail(strFiled[0], msgArr[i]);
            else if (strFiled[0].id.split('_')[3] == "txtURL")
                reason += ValidURL(strFiled[0], msgArr[i]);
            else
                reason += validateEmpty(strFiled[0], msgArr[i]);
        }
        else if (strFiled[0].type == "select-one")
            reason += validatedropDown(strFiled[0], msgArr[i]);
        else if (strFiled[0].type == "checkbox")
            reason += validateEmpty(strFiled[0], msgArr[i]);

    }

    if (reason != "") {
        alert(msgArr[msgArr.length - 1] + ":\n" + reason);
        return false;
    }
    return true;
}

// validate the Text Area
function validateTextArea(fld, msg) {


    var error = "";
    var msgarr = msg.split('-');

    if (fld.value.trim().toUpperCase() == "")
        error = msgarr[0] + ".\n"
    else
        fld.style.background = 'White';

    if (fld.id == "TxtComTitle") {
        if (fld.value.length > 200)
            error = msgarr[1] + ".\n";
    }
    else {
        if (fld.value.length > 500)
            error = msgarr[1] + ".\n";
    }

    return error;
}

// validate the Fields which are empty

function validateEmpty(fld, msg) {
    var error = "";

    if (fld.value.length == 0) {
        //  fld.style.background = 'Yellow';
        error = msg + ".\n"
    } else {
        fld.style.background = 'White';
    }
    return error;
}

// validate the Drop down Fields
function validatedropDown(fld, msg) {
    var error = "";

    if (fld.selectedIndex == 0) {
        // fld.style.background = 'Yellow';
        error = msg + ".\n";
    } else {
        fld.style.background = 'White';
    }
    return error;
}


// validate the user names
function validateUsername(fld) {
    var error = "";
    var illegalChars = /\W/; // allow letters, numbers, and underscores

    if (fld.value == "") {
        fld.style.background = 'Yellow';
        error = "You didn't enter a username.\n";
    } else if ((fld.value.length < 5) || (fld.value.length > 15)) {
        fld.style.background = 'Yellow';
        error = "The username is the wrong length.\n";
    } else if (illegalChars.test(fld.value)) {
        fld.style.background = 'Yellow';
        error = "The username contains illegal characters.\n";
    } else {
        fld.style.background = 'White';
    }
    return error;
}

/// validate the passwsord
function validatePassword(fld) {
    var error = "";
    var illegalChars = /[\W_]/; // allow only letters and numbers 

    if (fld.value == "") {
        fld.style.background = 'Yellow';
        error = "You didn't enter a password.\n";
    } else if ((fld.value.length < 7) || (fld.value.length > 15)) {
        error = "The password is the wrong length. \n";
        fld.style.background = 'Yellow';
    } else if (illegalChars.test(fld.value)) {
        error = "The password contains illegal characters.\n";
        fld.style.background = 'Yellow';
    } else if (!((fld.value.search(/(a-z)+/)) && (fld.value.search(/(0-9)+/)))) {
        error = "The password must contain at least one numeral.\n";
        fld.style.background = 'Yellow';
    } else {
        fld.style.background = 'White';
    }
    return error;
}
function trim(s) {
    return s.replace(/^\s+|\s+$/, '');
}


// validate the URL
function ValidURL(fld, msg) {

    var error = "";
    var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|#){1}([0-9A-Za-z]+\.)");
    if (fld.value == "#")
    {
        fld.style.background = 'White';
    }
    else if (!urlregex.test(fld.value))
    {
        error = msg + ".\n"
    } else
    {
        fld.style.background = 'White';
    }
    return error;
}



// validate the email
function validateEmail(fld, msg) {
    var msgarr = msg.split('-') // get the msgs with - saperator and put in arry.
    var error = "";
    var tfld = trim(fld.value);                        // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

    if (fld.value == "") {
        //  fld.style.background = 'Yellow';
        error = msgarr[0] + ".\n";
        //error = "You didn't enter an email address.\n";
    } else if (!emailFilter.test(tfld)) {              //test email for illegal characters
        // fld.style.background = 'Yellow';
        error = msgarr[1] + ".\n";
    } else if (fld.value.match(illegalChars)) {
        // fld.style.background = 'Yellow';
        error = msgarr[2] + ".\n";
    } else {
        fld.style.background = 'White';
    }
    return error;
}

// validate the phone
function validatePhone(fld) {
    var error = "";
    var stripped = fld.value.replace(/[\(\)\.\-\ ]/g, '');

    if (fld.value == "") {
        error = "You didn't enter a phone number.\n";
        //  fld.style.background = 'Yellow';
    } else if (isNaN(parseInt(stripped))) {
        error = "The phone number contains illegal characters.\n";
        //fld.style.background = 'Yellow';
    } else if (!(stripped.length == 10)) {
        error = "The phone number is the wrong length. Make sure you included an area code.\n";
        // fld.style.background = 'Yellow';
    }
    return error;
}







//check the character is  exist or not
function CheckCharacter(objField, culture) {
    var msg = "";


    if (culture == "1033")  // for english
        msg = "`~!@#$%^&*()_+=[]{}{\|';;/,<>?0-9 are not allowed";
    else if (culture == "1025") // for arabic
        msg = "`~ @ # $٪ ^ & * () _ + = [] {} {\ | '؛!؛/، <>؟0-9 لا يتم السماح لل";

    objField.keypress(function (e) {

        if (e.which == 1617 || e.which == 1567 || e.which >= 33 && e.which <= 44 || e.which >= 47 && e.which <= 64 || e.which >= 91 && e.which <= 96 || e.which >= 123 && e.which <= 126) {
            e.preventDefault();

            toastr.info(msg);
            objField.focus();
        }
    });
}

//check the number validation
function CheckNumber(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = "Enter Valid Character!";
    else if (culture == "1025") // for arabic
        msg = "أدخل مرخصة حرف!";

    objField.keypress(function (e) {
        if (e.which == 1617 || e.which == 1567 || e.which >= 33 && e.which <= 44 || e.which >= 58 && e.which <= 126) {
            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}

//check the number validation
function CheckOnlyNumber(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = "Enter Valid Number!";
    else if (culture == "1025") // for arabic
        msg = "أدخل رقم مرخصة!";

    objField.keypress(function (e) {
        if (e.which == 1617 || e.which == 1567 || e.which >= 33 && e.which <= 47 || e.which >= 58 && e.which <= 126) {
            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}

//check the Alpha Numeric validation
function CheckAlphaNumeric(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = '`~!@#$%^&*()_-+=[]{}{\|";;/.,<>? are not allowed';
    else if (culture == "1025") // for arabic
        msg = '`~ @ # $٪ ^ & * () _-+ = [] {} {\ |"؛!؟؛/، <> لا يتم السماح لل';

    objField.keypress(function (e) {
        if (e.which == 1617 || e.which == 1567 || e.which >= 33 && e.which <= 47 || e.which >= 58 && e.which <= 64 || e.which >= 123 && e.which <= 126) {
            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}
//check the Alpha Numeric with . validation
function CheckAlphaNumericWithDot(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = '`~!@#$%^&*()_-+=[]{}{\|";;/,<>? are not allowed';
    else if (culture == "1025") // for arabic
        msg = '`~ @ # $٪ ^ & * () _-+ = [] {} {\ |"؛!؟؛/، <> لا يتم السماح لل';

    objField.keypress(function (e) {

        if (e.which == 1617 || e.which == 1567 || e.which >= 33 && e.which <= 45 || e.which == 47 || e.which >= 58 && e.which <= 64 || e.which >= 123 && e.which <= 126) {
            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}


//check the phone numbervalidation
function CheckPhoneNumber(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = 'Please enter a valid Phone';
    else if (culture == "1025") // for arabic
        msg = 'الرجاء إدخال الهاتف صالح';

    objField.keypress(function (e) {
        if (e.which == 1617 || e.which == 1567 || e.which >= 33 && e.which <= 44 || e.which >= 46 && e.which <= 47 || e.which >= 58 && e.which <= 255) {
            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}

//check the iNVALID iNPUT numbervalidation
function CheckInvalidInput(objField, culture) {
    var msg = "";
    if (culture == "1033")  // for english
        msg = "Please enter a valid input";
    else if (culture == "1025") // for arabic
        msg = "الرجاء إدخال إدخال صالح";

    objField.blur(function () {
        if (objField[0].value.length > 30) {
            var description = objField[0].value.split(" ");
            if (description.length == 1) {
                toastr.warning(msg);
                objField.focus();
            }
        }
    });
}

//---------------- Check Email field on key press event. (Alpha numeric and "." "@" are allowed)
// check emial
function CheckEmail(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = '`~!#$%^&*()+=[]{}{\|";;/,<>? are not allowed';
    else if (culture == "1025") // for arabic
        msg = '`~  # $٪ ^ & * () + = [] {} {\ |"؛!؟؛/، <> لا يتم السماح لل';

    objField.keypress(function (e) {
        //  debugger;

        if (e.which == 1617 || e.which == 1567 || e.which == 47 || e.which == 96 || e.which >= 1 && e.which <= 7 || e.which >= 9 && e.which <= 44 || e.which >= 58 && e.which <= 63 || e.which >= 91 && e.which <= 94 || e.which >= 123 && e.which <= 255) {
            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}

// validate email
function validateEmail(fld, cultureID) {

    fld.blur(function (e) {

        var error = "";
        var tfld = trim(fld[0].value);                        // value of field with whitespace trimmed off
        var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

        if (cultureID == '1033')
            error = "Enter valid Email address";
        else
            error = "ادخل عنوان البريد الإلكتروني صالحة";
        if (fld[0].value != "") {
            if (!emailFilter.test(tfld)) {  //test email for illegal characters
                toastr.info(error);
                fld[0].focus();
            }
            else if (fld[0].value.match(illegalChars)) {
                toastr.info(error);
                fld[0].focus();
            }
        }
    });

}

//----------------

//---------------- Check Keywords field on key press event. (Alpha numeric and "," allowed)

function CheckKeywords(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = '`~!#$%^&*()_-+=[]{}{\|";;/.,<>? are not allowed';
    else if (culture == "1025") // for arabic
        msg = '`~  # $٪ ^ & * () _-+ = [] {} {\ |"؛!؟؛/، <> لا يتم السماح لل';

    objField.keypress(function (e) {

        if (e.which == 1617 || e.which == 1567 || e.which >= 1 && e.which <= 31 || e.which == 33 || e.which >= 35 && e.which <= 43 || e.which >= 45 && e.which <= 47 || e.which >= 58 && e.which <= 64 || e.which >= 91 && e.which <= 96 || e.which >= 123 && e.which <= 255) {
            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}

//----------------

//---------------- Check Ticket Title field on key press event. (Alpha numeric and (,), ("") and (.) are allowed)




function CheckTextArea(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = '` are not allowed';
    else if (culture == "1025") // for arabic
        msg = '` لا يتم السماح لل';

    objField.keypress(function (e) {

        if (e.which == 39 || e.which == 92) {

            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}
function CheckTicketTitle(objField, culture) {

    var msg = "";
    if (culture == "1033")  // for english
        msg = '`~!#$%^&*()_-+=[]{}{\|";;/.,<>? are not allowed';
    else if (culture == "1025") // for arabic
        msg = '`~  # $٪ ^ & * () _-+ = [] {} {\ |"؛!؟؛/، <> لا يتم السماح لل';

    objField.keypress(function (e) {

        if (e.which == 1617 || e.which == 1567 || e.which >= 1 && e.which <= 31 || e.which == 33 || e.which >= 35 && e.which <= 43 || e.which == 45 || e.which == 47 || e.which >= 58 && e.which <= 64 || e.which >= 91 && e.which <= 96 || e.which >= 123 && e.which <= 255) {
            e.preventDefault();
            toastr.info(msg);
            objField.focus();
        }
    });
}

//----------------

//---------------- Check Ticket upload field description field on key press event. (Alpha numeric are allowed)

function checkText(evt, obj) {

    var lang = getCurrentLanguage();
    var msg = "";
    if (lang == "1033")  // for english
        msg = '`~!@#$%^&*()_-+=[]{}{\|";;/.,<>? are not allowed';
    else if (culture == "1025") // for arabic
        msg = '`~ @ # $٪ ^ & * () _-+ = [] {} {\ |"؛!؟؛/، <> لا يتم السماح لل';
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode == 1617 || charCode == 1567 || charCode >= 33 && charCode <= 47 || charCode >= 58 && charCode <= 64 || charCode >= 91 && charCode <= 95 || charCode >= 123 && charCode <= 126) {
        var objFiled = $(obj);
        var str = objFiled[0].value;
        objFiled[0].value = str.substring(0, str.length);
        obj.focus();
        toastr.info(msg);
        return false;
    }
    return true;
}

//----------------

//================================================================Validation Check End ==============================//