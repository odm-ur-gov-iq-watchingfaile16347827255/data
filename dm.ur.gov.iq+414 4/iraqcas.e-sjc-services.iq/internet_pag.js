function ccc() {
    var delayMillis = 10;
    var p = document.getElementById("preview");
    p.className = "main1";
    setTimeout(function () {
        p.className = "hide";
        var p1 = document.getElementById("main_div");
        p1.className = "main";
        ChDIV('tab2', 'search');
    }, delayMillis);
    return false;
}


function ccc1() {

    var p = document.getElementById
    ("preview");
    p.className = "hide";
    var p1 = document.getElementById
    ("main_div");
    p1.className = "main";
    var p2 = document.getElementById("logindiv");
    p2.className = "hide";
    ChDIV('tab1', 'basic_info');
}

function ccc_convert_toTab3() {

    var p = document.getElementById
    ("preview");
    p.className = "hide";
    var p1 = document.getElementById
    ("main_div");
    p1.className = "main";
    var p2 = document.getElementById("logindiv");
    p2.className = "hide";
    ChDIV('tab3', 'basic_info');
}



function ccc_tab3() {

    document.getElementById("Button1").click();
    //    $("#Button1").click();

}


function ccc2() {

    var p = document.getElementById
    ("preview");
    p.className = "hide";
    var p1 = document.getElementById
    ("main_div");
    p1.className = "main";
    var p2 = document.getElementById("logindiv");
    p2.className = "hide";
    ChDIV('tab2', 'search');
}

function ccco() {

    var p = document.getElementById
    ("preview");
    p.className = "hide";
    var p1 = document.getElementById
    ("main_div");
    p1.className = "main";
    var p2 = document.getElementById("logindiv");
    p2.className = "hide";
    ChDIV('tab1', 'basic_info');
    var po = document.getElementById("part5_5");
    po.className = "part1_1class";
}


function ccc11(i, a, b, c, d, e, f) {

    var p = document.getElementById
    ("preview");
    p.className = "hide";
    var p1 = document.getElementById
    ("main_div");
    p1.className = "main";
    var p2 = document.getElementById("logindiv");
    p2.className = "hide";
    ChDIV('tab1', 'basic_info');
    Function_dynamic(i, a, b, c, d, e, f);

}



function waiting() {
    var delayMillis = 120000;
    setTimeout(function () {
        ccc();
    }, delayMillis);

}

function hide_login(s) {
    //var p = document.getElementById("logindiv");
    //var p2 = document.getElementById("link1");
    //p.className = "hide";
    //p2.className = "hide";
    document.getElementById('Label20').innerHTML = s + " ... مرحبا بك  </br></br>";
    //document.getElementById('Label3').innerHTML = "<p>تم الدخول بصورة صحيحة ... سوف يتم تحويلك الى مساحة العمل الخاصة بك</p><br/>";
    document.getElementById('Label17').innerHTML += "<p style=\"width:90%\">تقدم هذه الخدمه الاليه المناسبه في الحصول على قرارات محكمه التمييز والاطلاع على سير الدعاوى التي تنظرها المحكمه وللوصول الصحيح يجب اتباع احدى الطرق الاتيه في البحث عن القرار</p> ";
    document.getElementById('Label17').innerHTML += "<p style=\"width:90%\"><ul><li>الطريقة الاولى (بحث عن الرقم التمييزي) : ضمن الاطار الاول يتم ادخال الرقم المخصص للدعوى من قبل محكمه التمييز ثم نختار الهيئه المختصه التي تنظر الدعوى ومن ثم نختار السنه. </li></br><li>الطريقة الثانيه (بحث عن رقم الدعوى) : ضمن الاطار الثاني يتم اختيار المحكمه الاساس التي اصدرت القرار المميز وبعد ذالك ندخل رقم الدعوى الاصلي. </li></ul><br/></p>";
    document.getElementById('Label16').innerHTML += "<p style=\"width:100%\">بعد اجراء البحث والوصول الى القرار المطلوب نختار القرار ليتم اظهار التفاصيل الخاصه به ولعرض صورة القرار نختار صورة القرار </p>";
    waiting();
}

function ppp() {
    document.getElementById("log_b0").title = document.getElementById("log_b0").options[document.getElementById("log_b0").selectedIndex].text;

    // document.getElementById("log_b0").className = "LST22";
    //document.getElementById('Label52').innerHTML = document.getElementById("log_b0").options[document.getElementById("log_b0").selectedIndex].text;
}
function ppp22() {
    document.getElementById("log_e0").title = document.getElementById("log_e0").options[document.getElementById("log_e0").selectedIndex].text;

    // document.getElementById("log_b0").className = "LST22";
    //document.getElementById('Label52').innerHTML = document.getElementById("log_b0").options[document.getElementById("log_b0").selectedIndex].text;
}
function change_text() {
    document.getElementById('Label3').innerHTML = 'اسم المستخدم او كلمة المرور غير صحيحة يرجى التأكد منها';
}
function open_close_div(d) {

    var p = document.getElementById(d);
    if (p.className == "hide")
        p.className = "part1_1class";
    else
        p.className = "hide";
}



function ChDIV(s, dv) {
    //    var btn = document.getElementById(s);

    //    btn.className = "tab_click";

    //    var p = document.getElementById(dv);

    //    if (dv == "basic_info") {
    //        p.className = "";
    //        document.getElementById("search").className = "hide";
    //        document.getElementById("tab2").className = "tab_btn";

    //    }
    //    else if (dv == "search") {
    //        p.className = "";
    //        document.getElementById("basic_info").className = "hide";
    //        document.getElementById("tab1").className = "tab_btn";

    //    }

    var p = document.getElementById(dv);
    var btn = document.getElementById(s);
    if (s == "tab1") {
        btn.className = "tab_click";
        document.getElementById("tab2").className = "tab_btn";
        document.getElementById("tab3").className = "tab_btn";
        p.className = "";
        document.getElementById("search").className = "hide";
        document.getElementById("tab3").className = "hide";
    }
    else
        if (s == "tab2") {
            btn.className = "tab_click";
            document.getElementById("tab1").className = "hide";
            document.getElementById("tab3").className = "tab_btn";
            p.className = "";
            document.getElementById("basic_info").className = "hide";
            document.getElementById("tab3").className = "hide";
        }
        else
            if (s == "tab3") {
                btn.className = "tab_click";
                document.getElementById("tab1").className = "hide";
                document.getElementById("tab2").className = "tab_btn";
                p.className = "";
                document.getElementById("search").className = "hide";
                document.getElementById("tab3").className = "hide";

                //                var elements = document.getElementsByTagName("input");
                //                for (var ii = 0; ii < elements.length; ii++) {
                //                    if (elements[ii].type == "text") {
                //                        elements[ii].value = "";
                //                    }
                //                }

            }
}



var index = 1;

function myFunction() {
    var id = document.getElementById('txt_id').value;
    var court = document.getElementById('txt_court_id').value;

    var table = document.getElementById("terms");
    var row = table.insertRow(table.rows.length);
    var id11 = document.getElementById("row");

    var cell0 = row.insertCell(0);
    var iDiv = document.createElement('div');
    iDiv.id = 'D' + index;
    iDiv.className = 'delete1';
    
    cell0.appendChild(iDiv);

    var cell1 = row.insertCell(1);
    var t1 = document.createElement("input");
    t1.id = "txtName" + index;

    cell1.appendChild(t1);

    var cell2 = row.insertCell(2);
    var t2 = document.createElement("input");
    t2.id = "txttyp" + index;
    t2.onclick = function () {
        //var p = document.getElementById("terms_slider");
        //if (p.className.valueOf() == "Slider") {
        //    p.className = "Slider2";
        //    var x = document.getElementById("slider_item");
        //    var m = document.getElementById("Image8");
        //    x.className = "onmng";
        //    m.className = "hide";
        //    var mm = document.createElement("IMG");
        //    mm.setAttribute("src", "image/images.jpg");
        //    mm.setAttribute("width", "20");
        //    mm.setAttribute("height", "20");
        //    mm.style.cssText = 'position:absolute;top: 30px;left:30px;width:20px;height:20px;';
        //    p.appendChild(mm);
        //    mm.onclick = function () {

        //        var p = document.getElementById("terms_slider");
        //        p.className = "Slider";
        //        var xm = document.getElementById("slider_item");
        //        xm.className = "hide";
        //        t2.value = document.getElementById('TextBox1').value;
        //        t3.value = document.getElementById('TextBox2').value;
        //        document.getElementById('TextBox1').value = "";
        //        document.getElementById('TextBox2').value = "";
        //        t8.value = document.getElementById('txt_Nationality').value;
        //        t9.value = document.getElementById('txt_punishmant').value;
        //        t10.value = document.getElementById('txt_leagal_subject').value;
        //        document.getElementById('txt_Nationality').value = "";
        //        document.getElementById('txt_punishmant').value = "";
        //        document.getElementById('txt_leagal_subject').value = "";
        //        document.getElementById('TextBox1').value = "";
        //        document.getElementById('TextBox2').value = "";
        //        mm.className = "hide";
        //    };
        //    document.getElementById('TextBox1').value = t2.value;
        //    document.getElementById('TextBox2').value = t3.value;
        //    document.getElementById('txt_Nationality').value = t8.value;
        //    document.getElementById('txt_punishmant').value = t9.value;
        //    document.getElementById('txt_leagal_subject').value = t10.value;
        //}
    };
    cell2.appendChild(t2);

    var cell3 = row.insertCell(3);
    var t3 = document.createElement("input");
    t3.id = "txtadd" + index;
    cell3.appendChild(t3);

    var cell4 = row.insertCell(4);

    var iDiv2 = document.createElement('div');
    iDiv2.prepend('اضافة');
    iDiv2.id = 'I' + index;
    iDiv2.className = 'insert1';
    cell4.appendChild(iDiv2);
    

    var cell5 = row.insertCell(5);

    var iDiv3 = document.createElement('div');
    iDiv3.prepend('تعديل');
    iDiv3.id = 'U' + index;
    iDiv3.className = 'update1';
    cell5.appendChild(iDiv3);
    

    var cell6 = row.insertCell(6);
    var t6 = document.createElement("input");
    t6.className = "hide";
    t6.id = "txtid" + index;

    cell6.appendChild(t6);

    var cell7 = row.insertCell(7);
    var t7 = document.createElement("input");
    t7.id = "add_text" + index;
    t7.className = "hide";
    cell7.appendChild(t7);

    var cell8 = row.insertCell(8);
    var t8 = document.createElement("input");
    t8.id = "txt_Nationality" + index;
    t8.className = "hide";
    cell7.appendChild(t8);


    var cell9 = row.insertCell(9);
    var t9 = document.createElement("input");
    t9.id = "txt_punishmant" + index;
    t9.className = "hide";
    cell7.appendChild(t9);

    var cell10 = row.insertCell(10);
    var t10 = document.createElement("input");
    t10.id = "txt_leagal_subject" + index;
    t10.className = "hide";
    cell7.appendChild(t10);

    index++;

}

function Function_dynamic(id1, tx, tx2, tx3, tx4, tx5, tx6) {

    var id = document.getElementById('txt_id').value;
    var court = document.getElementById('txt_court_id').value;

    var table = document.getElementById("terms");
    var row = table.insertRow(table.rows.length);
    var id11 = document.getElementById("row");

    var cell0 = row.insertCell(0);
    var iDiv = document.createElement('div');
    iDiv.id = 'D' + index;
    /****************************************/
    var t_id_item = "txtid" + index;
    var name = "txtName" + index;
    var type = "txttyp" + index;
    //var address = "txtadd" + index;
    var nat = "txt_Nationality" + index;
    var pun = "txt_punishmant" + index;
    var sub = "txt_leagal_subject" + index;
    /******************************************/
    iDiv.className = 'hide';
    iDiv.onclick = function () {
        var iii = t_id_item;
        var t_id = document.getElementById(iii).value;
        //  alert(table.rows.length);

        if (document.getElementById(iii).value.toString() != "") {
            document.getElementById('hf_MyValue').value += "";
        }

        table.deleteRow(row.rowIndex);

    };
    cell0.appendChild(iDiv);

    var cell1 = row.insertCell(1);
    var t1 = document.createElement("input");
    t1.id = "txtName" + index;
    t1.style = "border-radius:3px; text-align:center;padding:5% 0;width:80%";
    t1.border = "none";
    t1.readOnly = "true";
    cell1.appendChild(t1);
    t1.value = tx;

    var cell2 = row.insertCell(2);
    var t2 = document.createElement("input");
    t2.id = "txttyp" + index;
    t2.style = "border-radius:3px; text-align:center;padding:5% 0;width:80%";
    t2.border = "none";
    t2.readOnly = "true";
    cell2.appendChild(t2);
    t2.value = tx2;
    t2.onclick = function () {
        //var p = document.getElementById("terms_slider");
        //if (p.className.valueOf() == "Slider") {
        //    p.className = "Slider2";
        //    var x = document.getElementById("slider_item");
        //    var m = document.getElementById("Image8");
        //    x.className = "onmng";
        //    m.className = "hide";
        //    var mm = document.createElement("IMG");
        //    mm.setAttribute("src", "image/images.jpg");
        //    mm.setAttribute("width", "20");
        //    mm.setAttribute("height", "20");
        //    mm.style.cssText = 'position:absolute;top: 30px;left:30px;width:20px;height:20px;';
        //    p.appendChild(mm);
        //    mm.onclick = function () {

        //        ////var p = document.getElementById("terms_slider");
        //        ////p.className = "Slider";
        //        ////var xm = document.getElementById("slider_item");
        //        ////xm.className = "hide";
        //        ////t2.value = document.getElementById('TextBox1').value;
        //        ////t3.value = document.getElementById('TextBox2').value;
        //        ////document.getElementById('TextBox1').value = "";
        //        ////document.getElementById('TextBox2').value = "";
        //        ////t8.value = document.getElementById('txt_Nationality').value;
        //        ////t9.value = document.getElementById('txt_punishmant').value;
        //        ////t10.value = document.getElementById('txt_leagal_subject').value;
        //        ////document.getElementById('txt_Nationality').value = "";
        //        ////document.getElementById('txt_punishmant').value = "";
        //        ////document.getElementById('txt_leagal_subject').value = "";
        //        ////document.getElementById('TextBox1').value = "";
        //        ////document.getElementById('TextBox2').value = "";
        //        ////mm.className = "hide";

        //    };
        //    document.getElementById('TextBox1').value = t2.value;
        //    document.getElementById('TextBox2').value = t3.value;
        //    document.getElementById('txt_Nationality').value = t8.value;
        //    document.getElementById('txt_punishmant').value = t9.value;
        //    document.getElementById('txt_leagal_subject').value = t10.value;

        //}
    };

    //var cell3 = row.insertCell(3);
    //var t3 = document.createElement("input");
    //t3.id = "txtadd" + index;
    //t3.style = "border-radius:3px; text-align:center;padding:5% 0";
    //t3.border = "none";
    //t3.readOnly = "true";
    //cell3.appendChild(t3);
    //t3.value = tx3;

    var cell4 = row.insertCell(4);

    var iDiv2 = document.createElement('div');
    iDiv2.prepend('اضافة');
    iDiv2.id = 'I' + index;
    //iDiv2.className = 'insert1';
    iDiv2.className = 'hide';
    cell4.appendChild(iDiv2);
    

    var cell5 = row.insertCell(5);

    var iDiv3 = document.createElement('div');
    iDiv3.prepend('تعديل');
    iDiv3.id = 'U' + index;
    iDiv3.className = 'hide';
    cell5.appendChild(iDiv3);

    var cell6 = row.insertCell(6);
    var t6 = document.createElement("input");
    t6.className = "hide";
    t6.id = "txtid" + index;
    cell6.appendChild(t6);
    t6.value = id1;

    var cell7 = row.insertCell(7);
    var t7 = document.createElement("input");
    t7.id = "add_text" + index;
    t7.className = "hide";
    cell7.appendChild(t7);

    var cell8 = row.insertCell(8);
    var t8 = document.createElement("input");
    t8.id = "txt_Nationality" + index;
    t8.className = "hide";
    cell7.appendChild(t8);
    t8.value = tx4;

    var cell9 = row.insertCell(9);
    var t9 = document.createElement("input");
    t9.id = "txt_punishmant" + index;
    t9.className = "hide";
    cell7.appendChild(t9);
    t9.value = tx5;

    var cell10 = row.insertCell(10);
    var t10 = document.createElement("input");
    t10.id = "txt_leagal_subject" + index;
    t10.className = "hide";
    cell7.appendChild(t10);
    t10.value = tx6;

    index++;
}























var index2 = 1;
function myFunction2_dynamic(judge_id, judge_name, judge_date) {

    var id = document.getElementById('txt_id').value;
    var court = document.getElementById('txt_court_id').value;

    var table = document.getElementById("judge");
    var row = table.insertRow(table.rows.length);
    var id11 = document.getElementById("row");

    var cell0 = row.insertCell(0);
    var iDiv = document.createElement('div');
    iDiv.id = 'D' + index2;
    /****************************************/
    var j_id = "judge_id_txt" + index2;
    var j_name = "judge_name_txt" + index2;
    var j_date = "judge_date_txt" + index2;
    /******************************************/
    iDiv.className = 'delete1';
    cell0.appendChild(iDiv);

    var cell1 = row.insertCell(1);
    //    var t1 = document.createElement("input");
    //    t1.id = "judge_name_txt" + index2;
    //    t1.value = judge_name;
    //    cell1.appendChild(t1);
    var list1 = document.createElement("select");
    var dd = document.getElementById("judge_name_txt0");
    for (var i = 0; i < dd.length; i++) {
        var option = document.createElement("option");
        option.text = dd[i].text;
        option.value = dd[i].value;
        list1.appendChild(option);
    }
    list1.id = "judge_name_txt" + index2;
    list1.className = 'list_class';
    list1.style = "border-radius:3px; text-align:center;padding:5% 0";
    list1.border = "none";
    list1.readOnly = "true";
    list1.value = judge_id;
    cell1.appendChild(list1);

    var cell2 = row.insertCell(2);
    var t2 = document.createElement("input");
    t2.id = "judge_date_txt" + index2;
    t2.style = "border-radius:3px; text-align:center;padding:5% 0";
    t2.border = "none";
    t2.readOnly = "true";
    t2.value = judge_date;
    cell2.appendChild(t2);



    var cell3 = row.insertCell(3);

    var iDiv2 = document.createElement('div');
    iDiv2.prepend('اضافة');
    iDiv2.id = 'I' + index2;
    // iDiv2.className = 'insert1';
    iDiv2.className = 'disable';
    cell3.appendChild(iDiv2);
    //    iDiv2.onclick = function () {
    //        
    //            iDiv2.className = 'disable';
    //            iDiv2.onclick = function () { }
    //        }
    //    };


    var cell4 = row.insertCell(4);

    var iDiv3 = document.createElement('div');
    iDiv3.prepend('تعديل');
    iDiv3.id = 'U' + index2;
    iDiv3.className = 'update1';
    cell4.appendChild(iDiv3);


    var cell5 = row.insertCell(5);
    var t3 = document.createElement("input");
    t3.id = "judge_id_txt" + index2;
    // t3.value = judge_id;
    t3.value = judge_name;
    t3.className = "hide";
    cell5.appendChild(t3);

    var cell6 = row.insertCell(6);
    var t6 = document.createElement("input");
    t6.id = "judgeAdd_txt" + index2;
    t6.className = "hide";
    cell6.appendChild(t6);


    index2++;

}


function myFunction2() {

    var id = document.getElementById('txt_id').value;
    var court = document.getElementById('txt_court_id').value;

    var table = document.getElementById("judge");
    var row = table.insertRow(table.rows.length);
    var id11 = document.getElementById("row");

    var cell0 = row.insertCell(0);
    var iDiv = document.createElement('div');
    iDiv.id = 'D' + index2;
    /****************************************/
    var j_id = "judge_id_txt" + index2;// شامر بي النيم اللي هو الايدي مال الجدول
    var j_name = "judge_name_txt" + index2;
    var j_date = "judge_date_txt" + index2;
    /******************************************/
    iDiv.className = 'delete1';
    iDiv.onclick = function () {
        document.getElementById('JudgeAdd_lable').value = "";
        t6.value = "";
        var i = 1;
        for (i = 2; i < table.rows.length; i++) {
            var res = "";
            var sttt = document.getElementById("judge").rows[i].cells.item(6).innerHTML;
            sttt = sttt.slice(sttt.indexOf('"') + 1);
            res = sttt.substr(0, sttt.indexOf('"'));
            var sum = document.getElementById(res).value;
            document.getElementById('JudgeAdd_lable').value += sum;
        }

        document.getElementById('judge_lable').value += document.getElementById('JudgeAdd_lable').value;
        document.getElementById('JudgeAdd_lable').value = "";
        table.deleteRow(row.rowIndex);

    };
    cell0.appendChild(iDiv);

    var cell1 = row.insertCell(1);
    //    var t1 = document.createElement("input");
    //    t1.id = "judge_name_txt" + index2;
    //    cell1.appendChild(t1);
    var list1 = document.createElement("select");
    var dd = document.getElementById("judge_name_txt0");
    for (var i = 0; i < dd.length; i++) {
        var option = document.createElement("option");
        option.text = dd[i].text;
        option.value = dd[i].value;
        list1.appendChild(option);
    }
    list1.id = "judge_name_txt" + index2;
    list1.className = 'list_class';
    // list1.value = meetting_time;
    cell1.appendChild(list1);

    var cell2 = row.insertCell(2);
    var t2 = document.createElement("input");
    t2.id = "judge_date_txt" + index2;
    cell2.appendChild(t2);



    var cell3 = row.insertCell(3);

    var iDiv2 = document.createElement('div');
    iDiv2.prepend('اضافة');
    iDiv2.id = 'I' + index2;
    iDiv2.className = 'insert1';
    cell3.appendChild(iDiv2);


    var cell4 = row.insertCell(4);

    var iDiv3 = document.createElement('div');
    iDiv3.prepend('تعديل');
    iDiv3.id = 'U' + index2;
    iDiv3.className = 'update1';
    cell4.appendChild(iDiv3);


    var cell5 = row.insertCell(5);
    var t3 = document.createElement("input");
    t3.id = "judge_id_txt" + index2;
    t3.className = "hide";
    cell5.appendChild(t3);

    var cell6 = row.insertCell(6);
    var t6 = document.createElement("input");
    t6.id = "judgeAdd_txt" + index2;
    //t2.value = judge_date;
    t6.className = "hide";
    cell6.appendChild(t6);


    index2++;

}




var index3 = 1;
function myFunction3() {

    var id = document.getElementById('txt_id').value;
    var court = document.getElementById('txt_court_id').value;

    var table = document.getElementById("meeting");
    var row = table.insertRow(table.rows.length);
    var id11 = document.getElementById("row");


    var cell0 = row.insertCell(0);
    var iDiv = document.createElement('div');
    iDiv.id = 'D' + index3;
    /****************************************/
    var m_id = "met_id" + index3;
    var m_date = "met_date" + index3;
    var m_time = "met_time" + index3;
    /******************************************/
    iDiv.className = 'delete1';
    iDiv.onclick = function () {
        document.getElementById('meetingAdd_lable').value = "";
        t6.value = "";
        var i = 1;
        for (i = 2; i < table.rows.length; i++) {
            var res = "";
            var sttt = document.getElementById("meeting").rows[i].cells.item(6).innerHTML;
            sttt = sttt.slice(sttt.indexOf('"') + 1);
            res = sttt.substr(0, sttt.indexOf('"'));
            var sum = document.getElementById(res).value;
            document.getElementById('meetingAdd_lable').value += sum;
        }

        document.getElementById('meeting_lable').value += document.getElementById('meetingAdd_lable').value;
        document.getElementById('meetingAdd_lable').value = "";
        table.deleteRow(row.rowIndex);

    };
    cell0.appendChild(iDiv);

    var cell1 = row.insertCell(1);
    var t1 = document.createElement("input");
    t1.id = "met_date" + index3;

    cell1.appendChild(t1);

    var cell2 = row.insertCell(2);
    //    var t2 = document.createElement("input");
    //    t2.id = "met_time" + index3;
    //    cell2.appendChild(t2);
    var list1 = document.createElement("select");
    var dd = document.getElementById("met_time0");
    for (var i = 0; i < dd.length; i++) {
        var option = document.createElement("option");
        option.text = dd[i].text;
        option.value = dd[i].value;
        list1.appendChild(option);
    }
    list1.id = "met_time" + index3;
    list1.className = 'list_class';
    // list1.value = meetting_time;
    cell2.appendChild(list1);

    var cell3 = row.insertCell(3);

    var iDiv2 = document.createElement('div');
    iDiv2.prepend('اضافة');
    iDiv2.id = 'I' + index3;
    iDiv2.className = 'insert1';
    cell3.appendChild(iDiv2);



    var cell4 = row.insertCell(4);

    var iDiv3 = document.createElement('div');
    iDiv3.prepend('تعديل');
    iDiv3.id = 'U' + index3;
    iDiv3.className = 'update1';
    cell4.appendChild(iDiv3);



    var cell5 = row.insertCell(5);
    var t5 = document.createElement("input");
    t5.id = "met_id" + index3;
    t5.className = "hide";
    cell5.appendChild(t5);

    var cell6 = row.insertCell(6);
    var t6 = document.createElement("input");
    t6.id = "metAdd_txt" + index3;
    t6.className = "hide";
    cell6.appendChild(t6);

    index3++;
}



function myFunction3_dynamic(meetting_id, meetting_date, meetting_time) {

    var id = document.getElementById('txt_id').value;
    var court = document.getElementById('txt_court_id').value;

    var table = document.getElementById("meeting");
    var row = table.insertRow(table.rows.length);
    var id11 = document.getElementById("row");

    var cell0 = row.insertCell(0);
    var iDiv = document.createElement('div');
    iDiv.id = 'D' + index3;
    /****************************************/
    var m_id = "met_id" + index3;
    var m_date = "met_date" + index3;
    var m_time = "met_time" + index3;
    /******************************************/
    iDiv.className = 'delete1';
    cell0.appendChild(iDiv);

    var cell1 = row.insertCell(1);
    var t1 = document.createElement("input");
    t1.id = "met_date" + index3;
    t1.value = meetting_date;

    cell1.appendChild(t1);

    var cell2 = row.insertCell(2);
    //    var t2 = document.createElement("input");
    //    t2.id = "met_time" + index3;
    //    t2.value = meetting_time;
    //  cell2.appendChild(t2);
    var list1 = document.createElement("select");
    var dd = document.getElementById("met_time0");
    for (var i = 0; i < dd.length; i++) {
        var option = document.createElement("option");
        option.text = dd[i].text;
        option.value = dd[i].value;
        list1.appendChild(option);
    }
    list1.id = "met_time" + index3;
    list1.className = 'list_class';
    list1.value = meetting_time;
    cell2.appendChild(list1);

    var cell3 = row.insertCell(3);

    var iDiv2 = document.createElement('div');
    iDiv2.prepend('اضافة');
    iDiv2.id = 'I' + index3;
    //  iDiv2.className = 'insert1';
    iDiv2.className = 'disable';
    cell3.appendChild(iDiv2);

    var cell4 = row.insertCell(4);

    var iDiv3 = document.createElement('div');
    iDiv3.prepend('تعديل');
    iDiv3.id = 'U' + index3;
    iDiv3.className = 'update1';
    cell4.appendChild(iDiv3);
    

    var cell5 = row.insertCell(5);
    var t5 = document.createElement("input");
    t5.id = "met_id" + index3;
    t5.value = meetting_id;
    t5.className = "hide";
    cell5.appendChild(t5);

    var cell6 = row.insertCell(6);
    var t6 = document.createElement("input");
    t6.id = "metAdd_txt" + index3;
    t6.className = "hide";
    cell6.appendChild(t6);

    index3++;
}



var index4 = 1;
function myFunction5() {

    var id = document.getElementById('txt_id').value;
    var court = document.getElementById('txt_court_id').value;

    var table = document.getElementById("logtbl");
    var row = table.insertRow(table.rows.length);
    var id11 = document.getElementById("row");

    var cell0 = row.insertCell(0);
    var iDiv = document.createElement('div');
    iDiv.id = 'D' + index4;
    /****************************************/
    var log_prc_id = "log_h" + index4;
    var log_court_id = "log_k" + index4;
    var log_img = "log_j" + index4;
    var log_case_no = "log_a" + index4;
    var log_src = "log_b" + index4;
    var log_des = "log_e" + index4;
    var log_send_no = "log_c" + index4;
    var log_send_date = "log_d" + index4;
    var log_decision = "txt_d" + index4;
    var log_decision_date = "txt_dd" + index4;
    /******************************************/

    iDiv.className = 'delete1';
    iDiv.onclick = function () {
        document.getElementById('logAdd_lable').value = "";
        t12.value = "";
        var i = 1;
        for (i = 2; i < table.rows.length; i++) {
            var res = "";
            var sttt = document.getElementById("logtbl").rows[i].cells.item(12).innerHTML;
            sttt = sttt.slice(sttt.indexOf('"') + 1);
            res = sttt.substr(0, sttt.indexOf('"'));
            var sum = document.getElementById(res).value;
            document.getElementById('logAdd_lable').value += sum;
        }

        document.getElementById('log_lable').value += document.getElementById('logAdd_lable').value;
        document.getElementById('logAdd_lable').value = "";
        //document.getElementById('linkimg').value = "";
        //document.getElementById('linkimgcourt').value = "";
        table.deleteRow(row.rowIndex);
    };
    cell0.appendChild(iDiv);

    var cell1 = row.insertCell(1);
    var t1 = document.createElement("input");
    t1.id = "log_a" + index4;
    t1.className = 'txtboxlogtbl';
    cell1.appendChild(t1);

    var cell2 = row.insertCell(2);
    var list1 = document.createElement("select");
    var dd = document.getElementById("log_b0");
    for (var i = 0; i < dd.length; i++) {
        var option = document.createElement("option");
        option.text = dd[i].text;
        option.value = dd[i].value;
        list1.appendChild(option);
    }
    list1.id = "log_b" + index4;
    list1.className = 'list_class';
    cell2.appendChild(list1);
    cell2.title = document.getElementById(list1.id).options[document.getElementById(list1.id).selectedIndex].text;

    var cell3 = row.insertCell(3);
    var t3 = document.createElement("input");
    t3.id = "log_c" + index4;
    t3.className = 'txtboxlogtbl';
    cell3.appendChild(t3);

    var cell4 = row.insertCell(4);
    var t4 = document.createElement("input");
    t4.id = "log_d" + index4;
    t4.className = 'txtboxlogtbl';
    cell4.appendChild(t4);

    var cell5 = row.insertCell(5);
    var list2 = document.createElement("select");
    var dd2 = document.getElementById("log_b0");
    for (var i = 0; i < dd2.length; i++) {
        var option = document.createElement("option");
        option.text = dd2[i].text;
        option.value = dd2[i].value;
        list2.appendChild(option);
    }
    list2.id = "log_e" + index4;
    list2.className = 'list_class';
    cell5.appendChild(list2);
    cell5.title = document.getElementById(list2.id).options[document.getElementById(list2.id).selectedIndex].text;

    var cell6 = row.insertCell(6);
    var t6 = document.createElement("input");
    t6.id = "txt_d" + index4;
    t6.className = 'txtboxlogtbl';
    t6.onclick = function () {
        var p = document.getElementById("Slider_Div");
        if (p.className.valueOf() == "Slider") {
            p.className = "Slider2";
            var x = document.getElementById("mng_item");
            var m = document.getElementById("Image6");
            x.className = "onmng";
            m.className = "hide";
            var mm = document.createElement("IMG");
            mm.setAttribute("src", "image/images.jpg");
            mm.setAttribute("width", "20");
            mm.setAttribute("height", "20");
            mm.style.cssText = 'position:absolute;top: 30px;left:30px;width:20px;height:20px;';
            p.appendChild(mm);
            mm.onclick = function () {

                var p = document.getElementById("Slider_Div");
                p.className = "Slider";
                var xm = document.getElementById("mng_item");
                xm.className = "hide";
                t6.value = document.getElementById('txt_disc').value;
                t7.value = document.getElementById('txt_disc_date').value;
                var zzz = document.getElementById('CheckBox2').checked;
                if (zzz == true) {
                    t15.value = '1';
                }
                else {
                    t15.value = '0';
                }
                document.getElementById('txt_disc').value = "";
                document.getElementById('txt_disc_date').value = "";
                mm.className = "hide";

            };
            document.getElementById('txt_disc').value = t6.value;
            document.getElementById('txt_disc_date').value = t7.value;
            if (t15.value == '1')
                document.getElementById('CheckBox2').checked = true;
            else
                document.getElementById('CheckBox2').checked = false;
        }
    };
    cell6.appendChild(t6);

    var cell7 = row.insertCell(7);
    var t7 = document.createElement("input");
    t7.id = "txt_dd" + index4;
    t7.className = 'txtboxlogtbl';
    cell7.appendChild(t7);

    var cell8 = row.insertCell(8);
    var iDiv2 = document.createElement('div');
    iDiv2.prepend('اضافة');
    iDiv2.id = 'I' + index4;
    iDiv2.className = 'insert1';
    cell8.appendChild(iDiv2);

    var cell9 = row.insertCell(9);

    var iDiv3 = document.createElement('div');
    iDiv3.prepend('تعديل');
    iDiv3.id = 'U' + index4;
    iDiv3.className = 'update1';
    cell9.appendChild(iDiv3);

    var cell10 = row.insertCell(10);
    var t10 = document.createElement("INPUT");
    t10.setAttribute("type", "checkbox");
    t10.id = "checkbox1" + index4;
    cell10.appendChild(t10);
    t10.onclick = function () {

        var x = document.getElementById(t10.id).checked;
        if (true) {
           // document.getElementById('linkimg').value = t11.value;
           // document.getElementById('linkimgcourt').value = t14.value;

            //document.getElementById("checkbox1").checked = false;
            //for (var i = 1; i <= index4; i++) {
            //    document.getElementById("checkbox1" + i).checked = false;
            //    document.getElementById(t10.id).checked = true;
            //}



        }
        else {

           // document.getElementById('linkimg').value = "";
           // document.getElementById('linkimgcourt').value = "";

        }
    };

    var cell11 = row.insertCell(11);
    var t11 = document.createElement("input");
    t11.id = "log_h" + index4;
    // t11.className = 'txtboxlogtbl'; hide
    t11.className = 'hide';
    cell11.appendChild(t11);

    var cell12 = row.insertCell(12);
    var t12 = document.createElement("input");
    t12.id = "log_i" + index4;
    //t12.className = 'txtboxlogtbl';
    t12.className = 'hide';
    cell12.appendChild(t12);

    var cell13 = row.insertCell(13);
    var t13 = document.createElement("input");
    t13.id = "log_j" + index4;
    // t13.className = 'txtboxlogtbl';
    t13.className = 'hide';
    cell13.appendChild(t13);

    var cell14 = row.insertCell(14);
    var t14 = document.createElement("input");
    t14.id = "log_k" + index4;
    //t14.className = 'txtboxlogtbl';
    t14.className = 'hide';
    cell14.appendChild(t14);

    var cell15 = row.insertCell(15);
    var t15 = document.createElement("input");
    t15.id = "log_l" + index4;
    // t14.className = 'txtboxlogtbl';
    t15.className = 'hide';
    t15.value = "0";
    cell15.appendChild(t15);

    index4++;

}


function myFunction5_dynamic(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11) {

    var id = document.getElementById('txt_id').value;
    var court = document.getElementById('txt_court_id').value;

    var table = document.getElementById("logtbl");
    var row = table.insertRow(table.rows.length);
    var id11 = document.getElementById("row");
        
    var cell0 = row.insertCell(0);
    var iDiv = document.createElement('div');
    iDiv.id = 'D' + index4;
    /****************************************/
    var log_prc_id = "log_h" + index4;
    var log_court_id = "log_k" + index4;
    var log_img = "log_j" + index4;
    var log_case_no = "log_a" + index4;
    var log_src = "log_b" + index4;
    var log_des = "log_e" + index4;
    var log_send_no = "log_c" + index4;
    var log_send_date = "log_d" + index4;
    var log_decision = "txt_d" + index4;
    var log_decision_date = "txt_dd" + index4;
    /******************************************/
    iDiv.className = 'delete1';
    cell0.appendChild(iDiv);

    var cell1 = row.insertCell(1);
    var t1 = document.createElement("input");
    t1.id = "log_a" + index4;
    t1.style = "border-radius:3px;width:auto;margin-top:15%; text-align:center;padding:5% 0";
    t1.border = "none";
    t1.readOnly = "true";
    t1.className = 'txtboxlogtbl';
    t1.value = v2;
    cell1.appendChild(t1);

    var cell2 = row.insertCell(2);
    var list1 = document.createElement("select");
    var dd = document.getElementById("log_b0");
    for (var i = 0; i < dd.length; i++) {
        var option = document.createElement("option");
        option.text = dd[i].text;
        option.value = dd[i].value;
        list1.appendChild(option);
    }
    list1.id = "log_b" + index4;
    list1.className = 'hide';
    list1.value = v3;
    list1.style = "border-radius:3px;text-align:center;padding:5% 0";
    list1.border = "none";
    list1.readOnly = "true";
    cell2.appendChild(list1);
    cell2.title = document.getElementById(list1.id).options[document.getElementById(list1.id).selectedIndex].text;
    var log_b = document.createElement("textarea");
    log_b.id = "log_b1" + index4;
    log_b.className = 'txtboxlogtbl';
    log_b.style = "border-radius:3px;width:100%;margin-top:15%; text-align:center;padding:5% 0";
    log_b.border = "none";
    log_b.value = document.getElementById(list1.id).options[document.getElementById(list1.id).selectedIndex].text;;
    cell2.appendChild(log_b);


    var cell3 = row.insertCell(3);
    var t3 = document.createElement("input");
    t3.id = "log_c" + index4;
    t3.className = 'txtboxlogtbl';
    t3.style = "border-radius:3px; text-align:center;margin-top:15%;padding:5% 0";
    t3.border = "none";
    t3.readOnly = "true";
    t3.value = v4;
    cell3.appendChild(t3);

    var cell4 = row.insertCell(4);
    var t4 = document.createElement("input");
    t4.id = "log_d" + index4;
    t4.className = 'txtboxlogtbl';
    t4.style = "border-radius:3px; text-align:center;margin-top:15%;padding:5% 0";
    t4.border = "none";
    t4.readOnly = "true";
    t4.value = v5;
    cell4.appendChild(t4);

    var cell5 = row.insertCell(5);
    var list2 = document.createElement("select");
    var dd2 = document.getElementById("log_b0");
    for (var i = 0; i < dd2.length; i++) {
        var option = document.createElement("option");
        option.text = dd2[i].text;
        option.value = dd2[i].value;
        list2.appendChild(option);
    }
    list2.id = "log_e" + index4;
    list2.className = 'hide';
    list2.style = "border-radius:3px; text-align:center;padding:5% 0";
    list2.border = "none";
    list2.readOnly = "true";
    list2.value = v6;
    cell5.appendChild(list2);
    cell5.title = document.getElementById(list2.id).options[document.getElementById(list2.id).selectedIndex].text;
    var log_e = document.createElement("textarea");
    log_e.id = "log_e1" + index4;
    log_e.className = 'txtboxlogtbl';
    log_e.style = "border-radius:3px;width:100%;margin-top:15%; text-align:center;padding:5% 0";
    log_e.border = "none";
    log_e.value = document.getElementById(list2.id).options[document.getElementById(list2.id).selectedIndex].text;
    cell5.appendChild(log_e);



    var cell6 = row.insertCell(6);
    var t6 = document.createElement("input");
    t6.id = "txt_d" + index4;
    t6.className = 'txtboxlogtbl';
    t6.style = "border-radius:3px;margin-top:15%; text-align:center;padding:5% 0";
    t6.border = "none";
    t6.readOnly = "true";
    t6.value = v7;

    cell6.appendChild(t6);

    var cell7 = row.insertCell(7);
    var t7 = document.createElement("input");
    t7.id = "txt_dd" + index4;
    t7.className = 'txtboxlogtbl';
    t7.style = "border-radius:3px;margin-top:15%; text-align:center;padding:5% 0";
    t7.border = "none";
    t7.readOnly = "true";
    t7.value = v8;
    cell7.appendChild(t7);

    var cell8 = row.insertCell(8);
    var cell9 = row.insertCell(9);

    //var iDiv3 = document.createElement('div');
    //iDiv3.prepend('تعديل');
    //iDiv3.id = 'U' + index4;
    //iDiv3.className = 'update1';
    //cell9.appendChild(iDiv3);
    //iDiv3.onclick = function () {

    //    var user_id = document.getElementById('user_id').value;

    //    //        if (document.getElementById(log_img).value.toString() == "")
    //    //            var img_id = 0;
    //    //        else
    //    //            img_id = document.getElementById(log_img).value;

    //    if (document.getElementById(log_prc_id).value.toString() != "") {
    //        //  alert("ok");
    //        //  document.getElementById('log_lable').value += "UPDATE [dbo].[log_tbl] set [src_case_no]='" + document.getElementById(log_case_no).value + "' ,[src_court]=" + list1.options[list1.selectedIndex].value + ",[send_no]='" + document.getElementById(log_send_no).value + "',[send_date]=convert(date,'" + document.getElementById(log_send_date).value + "',103),[des_court] =" + list2.options[list2.selectedIndex].value + ",[decision]='" + document.getElementById(log_decision).value + "',[decision_date] =convert(date,'" + document.getElementById(log_decision_date).value + "',103),[img_id] =" + img_id + ",[proc_date] = GETDATE()  WHERE [ID]=" + id + " and [court_id]=" + court + " and [proc_id]=" + document.getElementById(log_prc_id).value + ";";
    //        document.getElementById('log_lable').value += "UPDATE [dbo].[log_tbl] set [src_case_no]='" + document.getElementById(log_case_no).value + "' ,[src_court]=" + list1.options[list1.selectedIndex].value + ",[send_no]='" + document.getElementById(log_send_no).value + "',[send_date]=convert(date,'" + document.getElementById(log_send_date).value + "',103),[des_court] =" + list2.options[list2.selectedIndex].value + ",[decision]='" + document.getElementById(log_decision).value + "',[decision_date] =convert(date,'" + document.getElementById(log_decision_date).value + "',103),[img_id] =" + user_id + ",[proc_date] = GETDATE()" + ",[dec_yes_no]=" + t15.value + " WHERE [ID]=" + id + " and [court_id]=" + court + " and [proc_id]=" + document.getElementById(log_prc_id).value + ";";
    //        //  document.getElementById('log_lable').value += "sefhsielfhsilfhilsfilhsilhs";
    //        //  alert(document.getElementById('log_lable').value.toString());
    //        iDiv3.className = 'disable';
    //        iDiv3.onclick = function () { }
    //    }
    //};

    var cell10 = row.insertCell(10);
    //var t10 = document.createElement("INPUT");
    //t10.setAttribute("type", "checkbox");
    //t10.id = "checkbox1" + index4;
    //cell10.appendChild(t10);
    //t10.onclick = function () {

    //    var x = document.getElementById(t10.id).checked;
    //    if (x == true) {
    //        document.getElementById('linkimg').value = t11.value;
    //        document.getElementById('linkimgcourt').value = t14.value;
    //        document.getElementById("checkbox1").checked = false;
    //        for (var i = 1; i <= index4; i++) {
    //            document.getElementById("checkbox1" + i).checked = false;
    //            document.getElementById(t10.id).checked = true;
    //        }



    //    }
    //    else {

    //        document.getElementById('linkimg').value = "";
    //        document.getElementById('linkimgcourt').value = "";

    //    }
    //};

    var cell11 = row.insertCell(11);
    var t11 = document.createElement("input");
    t11.id = "log_h" + index4;
    //t11.className = 'txtboxlogtbl';
    t11.value = v1;
    t11.className = 'hide';
    cell11.appendChild(t11);

    var cell12 = row.insertCell(12);
    var t12 = document.createElement("input");
    t12.id = "log_i" + index4;
    // t12.className = 'txtboxlogtbl';
    t12.className = 'hide';
    cell12.appendChild(t12);

    var cell13 = row.insertCell(13);
    var t13 = document.createElement("input");
    t13.id = "log_j" + index4;
    // t13.className = 'txtboxlogtbl';
    t13.value = v9; /////img_id
    t13.className = 'hide';
    cell13.appendChild(t13);

    var cell14 = row.insertCell(14);
    var t14 = document.createElement("input");
    t14.id = "log_k" + index4;
    // t14.className = 'txtboxlogtbl';
    t14.value = v10; ///court_id
    t14.className = 'hide';
    cell14.appendChild(t14);

    var cell15 = row.insertCell(15);
    var t15 = document.createElement("input");
    t15.id = "log_l" + index4;
    t15.value = v11;
    // t14.className = 'txtboxlogtbl';
    t15.className = 'hide';
    // t15.value = "0";
    cell15.appendChild(t15);

    index4++;

}



function foc() {

    document.getElementById('user').focus();
    var p = document.getElementById("user");
    p.className = "txtboxlogin2";
    var p2 = document.getElementById("pass");
    p2.className = "txtboxlogin2";
}





function isis() {

    var list1 = document.createElement("select");
    //var arr;
    var dd = document.getElementById("app_court");
    for (var i = 0; i < dd.length; i++) {
        var option = document.createElement("option");
        option.text = dd[i].text;
        option.value = dd[i].value;
        list1.appendChild(option);
    }


}




function new_basic() {
    var obj = document.getElementById('txt_id').value;

    if (obj.toString() != "") {
        if (document.getElementById('txt_court').value != document.getElementById('txt_court_id').value) {
            document.getElementById('txt_court').value = document.getElementById('txt_court_id').value;
            document.getElementById('txt_basic_no').value = "";
            document.getElementById('txt_key').value = "";
            document.getElementById('txt_year').value = "";
            document.getElementById('txt_date').value = "";
            document.getElementById('txt_type').value = "";
            document.getElementById('txt_status').value = "";
            document.getElementById('txt_wared_date').value = "";
            var p = document.getElementById('Div1');
            p.className = "insert1";
        }
    }
    else {
        document.getElementById('txt_court').value = document.getElementById('txt_court_id').value;
        document.getElementById('txt_basic_no').value = "";
        document.getElementById('txt_key').value = "";
        document.getElementById('txt_year').value = "";
        document.getElementById('txt_date').value = "";
        document.getElementById('txt_type').value = "";
        document.getElementById('txt_status').value = "";
        document.getElementById('txt_wared_date').value = "";
        var p = document.getElementById('Div1');
        p.className = "insert1";
    }
}


function Sliding() {

    var p = document.getElementById("Slider_Div");
    if (p.className.valueOf() == "Slider") {
        p.className = "Slider2";
        var x = document.getElementById("mng_item");
        x.className = "onmng";
        var m = document.getElementById("Image6");
        m.className = "onmng";
        m.setAttribute("width", "20");
        m.setAttribute("height", "20");
        m.style.cssText = 'position:absolute;top: 30px;left:30px;width:20px;height:20px;';
        x.className = "onmng";
        document.getElementById('txt_disc').value = document.getElementById('txt_d0').value;
        document.getElementById('txt_disc_date').value = document.getElementById('txt_dd0').value;
        // var xx = document.getElementById("CheckBox2").checked;
        var xx = document.getElementById('log_l0').value
        if (xx == '1') {
            document.getElementById("checkbox2").checked = true;
        }
        else {
            document.getElementById("checkbox2").checked = false;
        }
    }

    else {
        p.className = "Slider";
        var x = document.getElementById("mng_item");
        x.className = "hide";

        document.getElementById('txt_d0').value = document.getElementById('txt_disc').value;
        document.getElementById('txt_dd0').value = document.getElementById('txt_disc_date').value;
        var xx = document.getElementById("CheckBox2").checked;
        if (xx == true)
            document.getElementById('log_l0').value = '1';
        else
            document.getElementById('log_l0').value = '0';

        document.getElementById('txt_disc').value = "";
        document.getElementById('txt_disc_date').value = "";

    }
}


function Sliding_terms() {

    //var p = document.getElementById("terms_slider");
    //if (p.className.valueOf() == "Slider") {
    //    p.className = "Slider2";
    //    var x = document.getElementById("slider_item");
    //    x.className = "onmng";
    //    var m = document.getElementById("Image8");
    //    m.className = "onmng";
    //    m.setAttribute("width", "20");
    //    m.setAttribute("height", "20");
    //    m.style.cssText = 'position:absolute;top: 30px;left:30px;width:20px;height:20px;';
    //    x.className = "onmng";
    //    document.getElementById('TextBox1').value = document.getElementById('txttyp0').value;
    //    document.getElementById('TextBox2').value = document.getElementById('txtadd0').value;
    //    document.getElementById('txt_Nationality').value = document.getElementById('txt_Nationality0').value;
    //    document.getElementById('txt_punishmant').value = document.getElementById('txt_punishmant0').value;
    //    document.getElementById('txt_leagal_subject').value = document.getElementById('txt_leagal_subject0').value;


    //}

    //else {
    //    p.className = "Slider";
    //    var x = document.getElementById("slider_item");
    //    x.className = "hide";

    //    document.getElementById('txttyp0').value = document.getElementById('TextBox1').value;
    //    document.getElementById('txtadd0').value = document.getElementById('TextBox2').value;
    //    document.getElementById('txt_Nationality0').value = document.getElementById('txt_Nationality').value;
    //    document.getElementById('txt_punishmant0').value = document.getElementById('txt_punishmant').value;
    //    document.getElementById('txt_leagal_subject0').value = document.getElementById('txt_leagal_subject').value;
    //    document.getElementById('TextBox1').value = "";
    //    document.getElementById('TextBox2').value = "";
    //    document.getElementById('txt_Nationality').value = "";
    //    document.getElementById('txt_punishmant').value = "";
    //    document.getElementById('txt_leagal_subject').value = "";

    //}
}
function ChDIV_r(s, dv) {
    var btn = document.getElementById(s);
    btn.className = "tab_click";

    var p = document.getElementById(dv);

    if (dv == "basic_info") {
        p.className = "";
        document.getElementById("search").className = "hide";
        document.getElementById("tab2").className = "tab_btn";

    }
    else if (dv == "search") {
        p.className = "";
        document.getElementById("basic_info").className = "hide";
        document.getElementById("tab1").className = "tab_btn";

    }
}



