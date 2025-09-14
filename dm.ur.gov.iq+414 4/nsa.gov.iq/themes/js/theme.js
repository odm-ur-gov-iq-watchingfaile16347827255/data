$(document).ready(function () {

    $(".slider-item-in-list").hover(function () {

        var Id = $(this).attr("id");

        $(".slider-item-in-list").removeClass("selected-in-slider-list");
        $(this).addClass("selected-in-slider-list");

        $(".slider-item-view").hide();
        $("#slider-item-" + Id).show();

    });
});

function doSearch(){

    var Query = $("#search-query").val();

    if(Query !== ""){
        window.location = $("#data-url").attr("data-url") + "search/query/" + Query;
    }

}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function proccessContactForm(){

    var name = $("#name");
    var title = $("#title");
    var email = $("#email");
    var text = $("#text");

    if(name.val().trim().length <=0){
        $("#response").hide().fadeIn().html('الإسم مطلوب');
		name.focus();
        return false;

    }
	if(email.val().trim().length <=0 || !validateEmail(email.val().trim())){
        $("#response").hide().fadeIn().html('البريد الالكتروني مطلوب');
		email.focus();
        return false;
    }
	if(title.val().trim().length <=0){
        $("#response").hide().fadeIn().html('عنوان الرسالة مطلوب');
		title.focus();
        return false;
    }
	

	
	if(text.val().trim().length <=0){
        $("#response").hide().fadeIn().html('نص الرسالة مطلوب');
		text.focus();
        return false;

    }

}