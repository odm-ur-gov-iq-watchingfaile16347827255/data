$(document).on('change','.first_filter',function(){
    $('#form_submission').trigger('submit');
})

$(document).on('change','.second_filter',function(){
    $('#form_submission').trigger('submit');
})