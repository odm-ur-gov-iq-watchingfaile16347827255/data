$(document).ready(function(){
    if ($("iframe.note-video-clip")[0]){
        // Do something if class exists

         $('iframe.note-video-clip').width('100%');
    } else if($("descrption.note-video-clip video")[0]){
        $("descrption.note-video-clip video").width('100%');
    } else {
        // Do something if class does not exist
        console.log('not exist');
    }
})