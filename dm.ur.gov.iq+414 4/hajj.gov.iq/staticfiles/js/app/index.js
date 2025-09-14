(function($) {
        $('#checkall').on('click', function () {
            $('.checkall').prop('checked',this.checked);
        });
})(jQuery);

(function($) {
    $.fn.autosubmit = function() {
        this.submit(function(event) {
            event.preventDefault();
            var form = $(this);
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                dataType:'html',
                data: form.serialize()
            }).done(function(response) {
                $(form).prepend(response);
            }).fail(function() {
                alert('request failed');
            });
        });
        return this;
    }
})(jQuery);

$(function() {
    $('form[data-ajax]').autosubmit();
});

(function($) {
$('#mobilemainnave').change(function() {
    window.location = $(this).val();
    if ($(this).val() === '2') {

    }
});
})(jQuery);


$(document).foundation();
