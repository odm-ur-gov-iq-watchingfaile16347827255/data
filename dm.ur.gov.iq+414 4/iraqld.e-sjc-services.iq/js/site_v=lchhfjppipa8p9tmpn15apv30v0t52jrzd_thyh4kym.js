/*
* HSCore
* @version: 4.0.0 (01 June, 2021)
* @author: HtmlStream
* @event-namespace: .HSCore
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/

$(document).ready(function () {
    const currentPath = window.location.pathname;
    $('.nav-link').each(function () {
        if ($(this).attr('href') === currentPath) {
            $(this).addClass('active');
        }
    });
    var yearSpan = $('#current-year-span')
    var lastupdatespan = $('#last-update-span')
    $.ajax({
        url: '/Legislations/GetYearAndLastUpdate',
        method: 'Get',
        success: function (data) {
            yearSpan.html(data.year);
            lastupdatespan.html(data.lastUpdate);
        }
    })
})

