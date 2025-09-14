$(document).ready(function(){

   $(".icon-bar-box").click(function() {
     if($(".sidebar-bx").css('right') == '-200px'){
        $(".sidebar-bx").animate({right: "0px"}, 500);
        $(this).animate({right: "200px"}, 500);
     }
     else{
        $(".sidebar-bx").animate({right: "-200px"}, 500);
        $(this).animate({right: "0px"}, 500);  
     }
  });
  //$(".mobile-menu").on("swiperight",function(){
 //   $(".mobile-menu").animate({right: "-200px"}, 500);
 // });
});