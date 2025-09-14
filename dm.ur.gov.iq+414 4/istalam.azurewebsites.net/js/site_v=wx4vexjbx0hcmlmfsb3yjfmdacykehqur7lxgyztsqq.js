$(function () {
    $(':checkbox').filter(":disabled").each(function () {
        var pr = $(this).parent();
        $(this).remove();
        if ($(this).is(":checked")) {
            pr.append('<i class="text-success fa-solid fa-square-check"></i>');
        } else {
            pr.append('<i class="text-danger fa-solid fa-square-xmark"></i>');
        }
    });
})


$(document).ready(function () {
    $(document).on('click', '.tp-start-time', function () {
        timePicker($(this));
    });

    $(document).on('click', '.tp-end-time', function () {
        timePicker($(this));
    });
});

function timePicker($elem, minutesStep = 5, startHour = 1, startMinutes = 0, endHour = 12, endMinutes = 59, defaultTime) {
    let currentHour = '12';
    let currentMinutes = '00';
    let currentAbbreviated = 'AM';

    if (startHour < 1 || startHour > 12) {
        startHour = 12;
    }
    if (endHour < startHour || endHour > 12) {
        endHour = 12;
    }

    if (startMinutes < 0 || startMinutes > 59) {
        startMinutes = 0;
    }
    if (endMinutes <= startMinutes || endMinutes > 59) {
        endMinutes = 59;
    }

    if (minutesStep < 1 || minutesStep > 60) {
        minutesStep = 5;
    }

    if (!defaultTime) {
        let currentTime = $elem.val();
        console.log(currentTime);
        if (isValidTime(currentTime)) {
            currentHour = getHour(currentTime);
            $('#tp-h-value').html(currentHour);
            currentMinutes = getMinutes(currentTime);
            $('#tp-m-value').html(currentMinutes);
            currentAbbreviated = getAbbreviated(currentTime);
            $('#tp-t-value').html(currentAbbreviated);
        }
    }

    let modal = document.getElementById("tp-modal");
    $('body').append(modal);

    $elem.val(currentHour + ':' + currentMinutes + ' AM');

    $('#tp-h-up').off('click').on('click', function () {
        let val = parseInt($('#tp-h-value').html()) + 1;
        if (val == endHour + 1) {
            $('#tp-h-value').html(('0' + startHour).substr(-2));
        } else {
            $('#tp-h-value').html(('0' + val).substr(-2));
        }
    });

    $('#tp-h-down').off('click').on('click', function () {
        let val = parseInt($('#tp-h-value').html()) - 1;
        if (val == startHour - 1) {
            $('#tp-h-value').html(('0' + endHour).substr(-2));
        } else {
            $('#tp-h-value').html(('0' + val).substr(-2));
        }
    });

    $('#tp-m-up').off('click').on('click', function () {
        let val = parseInt($('#tp-m-value').html()) + minutesStep;
        if (val >= endMinutes + 1) {
            $('#tp-m-value').html((startMinutes == 0) ? '00' : ('0' + (startMinutes + minutesStep - startMinutes % minutesStep)).substr(-2));
        } else {
            $('#tp-m-value').html(('0' + val).substr(-2));
        }
    });

    $('#tp-m-down').off('click').on('click', function () {
        let val = parseInt($('#tp-m-value').html()) - minutesStep;
        if (val <= startMinutes - 1) {
            $('#tp-m-value').html(('0' + (endMinutes - endMinutes % minutesStep)).substr(-2));
        } else {
            $('#tp-m-value').html(('0' + val).substr(-2));
        }
    });

    $('#tp-t-value').off('click').on('click', function () {
        let val = $('#tp-t-value').html();
        if (val == 'AM' || val == 'PM') {
            if (val == 'AM') {
                $('#tp-t-value').html('PM');
            } else {
                $('#tp-t-value').html('AM');
            }
        }
        if (val == 'م' || val == 'ص') {
            if (val == 'ص') {
                $('#tp-t-value').html('PM');
            } else {
                $('#tp-t-value').html('AM');
            }
        }
    });

    $('#tp-set-btn').off('click').on('click', function () {
        let h = $('#tp-h-value').html();
        let m = $('#tp-m-value').html();
        let t = $('#tp-t-value').html();

        $elem.val(h + ':' + m + ' ' + t);

        //if ($elem.hasClass('tp-start-time')) {
        //    let $endTimeElem = $elem.closest('.tp-day-cont').find('.tp-end-time');
        //    if ($endTimeElem.length > 0) {
        //        if (compareTimes($elem.html(), $endTimeElem.html()) == 0 || compareTimes($elem.html(), $endTimeElem.html()) == 1) {
        //            $endTimeElem.html(newEndTime($elem.html(), minutesStep));
        //        }
        //    }
        //} else {
        //    let $startTimeElem = $elem.closest('.tp-day-cont').find('.tp-start-time');
        //    if ($startTimeElem.length > 0) {
        //        if (compareTimes($startTimeElem.html(), $elem.html()) == 0 || compareTimes($startTimeElem.html(), $elem.html()) == 1) {
        //            $elem.html(newEndTime($startTimeElem.html(), minutesStep));
        //        }
        //    }
        //}
        $('#tp-modal').modal('hide');
    });

    $('#tp-modal').modal('show');
}

function getHour(time) {
    return time.substr(0, time.indexOf(':'));
}

function getAbbreviated(time) {
    return time.substr(time.indexOf(':') + 4);
}

function getIntHour(time) {
    return parseInt(getHour(time));
}

function getMinutes(time) {
    return time.substr(time.indexOf(':') + 1, time.indexOf(':') + 0);
}

function getIntMinutes(time) {
    return parseInt(getMinutes(time));
}

function isValidTime(time) {
    let patt = /([01]?\d):([0-5]\d)/g;
    return patt.test(time);
}

function compareTimes(time1, time2) {
    if (!isValidTime(time1) || !isValidTime(time2)) {
        return -1;
    }
    if (time1 == time2) {
        return 0;
    } else if (getIntHour(time1) > getIntHour(time2)) {
        return 1;
    } else if (getIntHour(time1) == getIntHour(time2)) {
        if (getIntMinutes(time1) > getIntMinutes(time2)) {
            return 1;
        }
        else {
            return 2;
        }
    } else {
        return 2;
    }
}

function newEndTime(startTime, minutesStep) {
    if (!isValidTime(startTime)) {
        return -1;
    }

    let hour = getIntHour(startTime);
    let minutes = getIntMinutes(startTime);

    if (minutes + minutesStep > 59) {
        minutes = 0;
        hour++;
        if (hour > 23) {
            return startTime;
        }
    } else {
        minutes += minutesStep;
    }

    hour = ("0" + hour).substr(-2);
    minutes = ("0" + minutes).substr(-2);
    return hour + ":" + minutes;
}