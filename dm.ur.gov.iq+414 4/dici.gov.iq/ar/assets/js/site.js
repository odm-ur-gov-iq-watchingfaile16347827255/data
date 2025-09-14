const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  const testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

$('#contact_mail').submit(function(e){
    e.preventDefault();
    if($('#name').val() == ''){
        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال الاسم '
          })
    }else if($('#email').val() == ''){
        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال ايميل صالح  '
          })
    }else if(! testEmail.test($('#email').val())){
        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال ايميل صالح  '
          })
    }else if($('#msg').val() == ''){
        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال معلومات الايميل '
          })
    }else if($('.calc_result_msg').val() == '' || $('.calc_result_msg').val() != 32){

        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال قيمة صحيحة ناتج الجمع '
          })
    }else{
        //    get form content 
        var data = new FormData(document.getElementById("contact_mail"));
        $.ajax({
            url: base_url+"email",
            type: "post",
            data: data,
            processData: false,
            contentType: false,
    
            success: function (data) {
                let response = JSON.parse(data);
                if (response.success) {
                    // show success message
                    Toast.fire({
                        icon: 'success',
                        title: 'تم ارسال الايميل بنجاح '
                      })
                      $('#email').val('');
                      $('#full_name').val('');
                      $('#description').val('');

                      $('#contact_mail').reset();

                    //   $('#token').val(response.token);

                } else {
    
                    // fire error 
    
                    Toast.fire({
                        icon: 'error',
                        title: 'خطأ في الايميل المرسل '
                      })

                    //   $('#token').val(response.token);
    
    
                }
            }
        })
    }
})



//
// ─── SEND MSG FROM CONTACT US PAGE WITH MORE DETAILES ───────────────────────────
//

$('#send-message').submit(function(e){
    e.preventDefault();
    if($('#name').val() == ''){
        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال الاسم '
          })
    }else if($('#email').val() == ''){
        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال ايميل صالح  '
          })
    }else if(! testEmail.test($('#email').val())){
        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال ايميل صالح  '
          })
    }else if($('#msg').val() == ''){
        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال معلومات الرسالة  '
          })
    }else if($('.calc_result').val() == '' || $('.calc_result').val() != 25){

        Toast.fire({
            icon: 'error',
            title: 'يرجى ادخال قيمة صحيحة ناتج الجمع '
          })
    }else{
        //    get form content 
        var data = new FormData(document.getElementById("send-message"));
        $.ajax({
            url: base_url+"msg",
            type: "post",
            data: data,
            processData: false,
            contentType: false,
    
            success: function (data) {
                let response = JSON.parse(data);
    
                if (response.success) {
                    // show success message
                    Toast.fire({
                        icon: 'success',
                        title: 'تم ارسال الايميل بنجاح '
                      })
                      $('#send-message').reset();
                    //   $('#token_msg').val(response.token);

                } else {
    
                    // fire error                      
    
                    Toast.fire({
                        icon: 'error',
                        title: 'هناك خطأ في الايميل' 
                      })

                    //   $('#token_msg').val(response.token);
    
    
                }
            }
        })
    }
})




/* -------------------------------------------------------------------------- */
// search submit
/* -------------------------------------------------------------------------- */

// $('.search_engin').keypress(function(e){
//     var key = e.which;
//     if(key == 13){
//         $value = $(this).val();
//         if(check_valid_input($value)){
            

//             /* -------------------------------------------------------------------------- */
//             //  send ajax 
//             /* -------------------------------------------------------------------------- */


//              //    get form content 
//             var data = new FormData();
//             data.append('search_value', $value);
//             $.ajax({
//                 url: base_url+"search",
//                 type: "post",
//                 data: data,
//                 processData: false,
//                 contentType: false,
        
//                 success: function (data) {
        
//                     console.log(data+'jj');
//                 }
//             })
//         }else{
//             $(this).after('<br><span class="text-danger alert_span">النص يحتوي على عبارات غير مسموحة </span>');
//             $('.alert_span').delay("slow").fadeOut();
//         }
//     }
// })

// function check_valid_input($value){
//     $prevent = ['<script>','<','>','or','and','alert','.php','cookie','<script','script'];

//     if($prevent.includes($.trim($value.toLowerCase())) || $value == ''){
//         return false ;
//     }else{
//        return true ;
//     }
// }
