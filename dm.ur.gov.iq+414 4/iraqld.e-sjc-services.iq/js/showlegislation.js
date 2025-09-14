//$(document).load(function () {
//    $(".MsoTableGrid *").each(function () {
//        $(this).removeAttr('style');
//        $(this).removeAttr('width');
//        $(this).removeAttr('height');
//    })
//})
$(document).ready(function () {

    var IsLoading = false;
    var IsFinshed = false;
    var PageSize = 10;
    var PageNumber = 1;
    $('.image-link').on('click', function () { showimage($(this).attr('image-path')) })
    document.getElementById('activearticle')?.scrollIntoView({ behavior: 'smooth' });

    $('input').on('keydown', function (e) {
        if (e.key === 'Enter') {
            return false;
        }
    });
    //print law functionality
    $('#printbtn').on('click', function () {
        var strContent = "<html><head><style>" +
            "body { text-align: right; direction: rtl; margin: 1cm;  font-size: 20px; }" +  // Adjusted width to be 100%
            ".content {page-break-before: auto; page-break-inside: auto;}" +
            "html, body { height: 100%; margin: 5px; padding: 0; }" + // Ensure full document height is used
            "div, p, span { page-break-inside: auto; }" +
            "@media print {" +
            "body { font-size: 16px; margin: 0;}" +  // Reduce font size to fit more content if necessary
            ".panel-title,.verdict-to-article-attached-panel { display: none;}" +
            ".article-allocation,.article-title {break-inside: avoid;break-after:avoid}" +
            ".article-content{break-before: avoid}" +
            "}" +
            "</style></head><body>";

        var mainDiv = document.getElementById('legislationDiv');
        var WinPrint = window.open('', '', 'left=300px,top=50px,width=800,height=800,toolbar=0,scrollbars=1,status=0');

        strContent = strContent + mainDiv.innerHTML;
        strContent = strContent + "</body></html>";
        WinPrint.document.write(strContent);
        WinPrint.document.title = "قاعدة التشريعات العراقيه";
        WinPrint.document.close();
        WinPrint.onload = function () {
            WinPrint.history.replaceState({}, document.title,"")
            WinPrint.print();
        };
        return false;
    });
    // Store original articles for filtering
    var originalArticles = articles;
    var filteredArticles;
    // Search functionality
    $('#articlesearchtext').on('input', function () {
        var searchText = $(this).val().trim(); // Trim whitespace
        if (isArabicText(searchText)) {
            var filteredArticles = originalArticles.filter(function (article) {
                return article.articleTitle_1.includes(searchText) ||
                    article.articleTitle_2.includes(searchText) ||
                    article.articleTitle_3.includes(searchText) ||
                    article.articleTitle_4.includes(searchText) ||
                    article.articleText.includes(searchText) ||
                    article.articleCodeTxt.includes(searchText);
            });

            // Update the displayed articles
            displayArticles(filteredArticles, searchText);
        }
        else {
            if (searchText.length > 2) {
                alert('قم بادخال عبارة البحث باللغة العربيه');
                $('#articlesearchtext').val('');
            }
        }
        return false;
    });


    // When the user clicks the "فلترة" (filter) button
    $('#filterbutton').on('click', function () {
        // Get the IDs of all selected checkboxes
        var selectedArticleIds = [];

        $('#materialsModal .form-check-input:checked').each(function () {
            var articleId = $(this).attr('id').split('_')[1]; // Get article ID from checkbox ID
            selectedArticleIds.push(parseInt(articleId)); // Store the article ID
        });
        // Filter the articles based on selected IDs
        filteredArticles = originalArticles.filter(function (article) {
            return selectedArticleIds.includes(article.articleID);
        });
        displayArticles2(filteredArticles);
    });

    // When the user clicks the "الغاء" (discard filter) button
    $('#discardfilterbutton').on('click', function () {
        // Uncheck all checkboxes
        $('#materialsModal .form-check-input').prop('checked', false);

        // Restore original articles list
        displayArticles2(originalArticles);
    })
    function fillarticles() {
        if (activearticle.id != 0) {
            IsFinshed = true;
        }
        if (!IsLoading && !IsFinshed) {
            IsLoading = true;
            PageNumber = 1 + PageNumber;
            $('#loader').addClass('loader').removeClass('visually-hidden');
            $.ajax({
                url: '/Legislations/GetArticles',
                method: 'Get',
                data: { bookid: $('#lawbookid').val(), pagesize: PageSize, pagenumber: PageNumber },
                success: function (data) {
                    $('#loader').removeClass('loader').addClass('visually-hidden');
                    IsLoading = false;
                    if (data.length < 1) {
                        IsFinshed = true;
                    }
                    spreadArticles(data)
                    $(data).each(function (i, item) {
                        $('#articles-popup').append('<div class="form-check" > <input type="checkbox" class="form-check-input" id="articleCheck_' + item.articleID + '"><label class="form-check-label" for="articleCheck_' + item.articleID + '">' + (isArabicTNumber(item.articleCodeTxt) ? "المادة    " : "") + '' + item.articleCodeTxt + '</label></div>')
                        originalArticles.push(item);
                    })
                    $('#countspan').html(originalArticles.length)
                    fillarticles();
                },
                error: function () {
                    IsLoading = false;
                    $('#loader').removeClass('loader').addClass('visually-hidden');
                    alert('لقد حصل خطا اثناء جلب باقي المواد المرتبطه بالتشريع')
                }
            })
          // 
        }
    }
    fillarticles();
})
function getarticles(lawbookId, PageSize, PageNumber, IsLoading) {

}
function displayArticles2(articlesToDisplay) {
    $('.article-card').remove(); // Clear existing articles
    // call spread articles function 
    spreadArticles(articlesToDisplay)
}
function spreadArticles(articles) {
    articles.forEach(function (article) {
        var subjecttitle = '';
        var articletext = '';
        if ((article.articleTitle_1 ?? "").length > 1 || (article.articleTitle_2 ?? "").length > 1 || (article.articleTitle_3 ?? "").length > 1 || (article.articleTitle_4 ?? "").length > 1) {
            subjecttitle = '<div class="card article-allocation"><div class="card-header text-center main-header "><h5 class="card-title text-center">' + article.articleTitle_1 + '</h5><h5 class="card-title text-center">' + article.articleTitle_2 + ' </h5><h5 class="card-title text-center">' + article.articleTitle_3 + ' </h5><h5 class="card-title text-center">' + article.articleTitle_4 + '</h5></div></div>'
        }

        var attachedverducts = '';
        if (article.isHaveAttachedVerdict == 1) {
            attachedverducts = '<a class="card-link1" href = "/Legislations/searchverdicts?articleid=' + article.articleID + '" > الاحكام المرتبطة بالمادة</a >'
        }

        if (activearticle.sc == article.articlesc) {
            articletext = '<div id="activearticle" class="card bg-info border border-3 border-warning" ><div class="card-body"><div class="row article-title"><div class="col-6"><h5 class="card-title color1">' + ((containsArabicNumbers(article.articleCodeTxt) ? "المادة    " : "") + article.articleCodeTxt) + '</h5></div><div class="col-6 text-start verdict-to-article-attached-panel">' + attachedverducts + '</div></div><p id="activearticle" class="m-0 color1 article-content">' + article.articleText + '</p></div></div>'
        }
        else {
            articletext = '<div class="card py-0 bg-info-subtle " ><div class="card-body"><div class="row article-title"><div class="col-6"><h5 class="card-title color1">' + ((containsArabicNumbers(article.articleCodeTxt) ? "المادة    " : "") + article.articleCodeTxt) + '</h5></div ><div class="col-6 text-start verdict-to-article-attached-panel">' + attachedverducts + '</div></div><p class=" color1   article-content">' + article.articleText + '</p></div></div> '
        }

        var cardHtml = '<div class="col-12 article-card">' + subjecttitle + '' + articletext + '</div>'
        // Append the generated HTML to the container
        $('.article-card-container').append(cardHtml);

    });
    document.getElementById('activearticle')?.scrollIntoView({ behavior: 'smooth' });
}
function displayArticles(articlesToDisplay, searchText) {
    $('.article-card').remove(); // Clear existing articles
    articlesToDisplay.forEach(function (article) {
        // Create your article card HTML here

        var subjecttitle = '';
        var articletext = '';
        if ((article.articleTitle_1 ?? "").length > 1 || (article.articleTitle_2 ?? "").length > 1 || (article.articleTitle_3 ?? "").length > 1 || (article.articleTitle_4 ?? "").length > 1) {
            subjecttitle = '<div class="card article-allocation"><div class="card-header text-center main-header "><h5 class="card-title text-center">' + article.articleTitle_1 + '</h5><h5 class="card-title text-center">' + article.articleTitle_2 + ' </h5><h5 class="card-title text-center">' + article.articleTitle_3 + '</h5><h5 class="card-title text-center">' + article.articleTitle_4 + '</h5></div></div>'
        }

        var attachedverducts = '';
        if (article.isHaveAttachedVerdict == 1) {
            attachedverducts = '<a class="card-link1" href = "/Legislations/searchverdicts?articleid=' + article.articleID + '" > الاحكام المرتبطة بالمادة</a >'
        }

        if (activearticle.sc == article.articlesc) {
            articletext = '<div id="activearticle" class="card bg-info border border-3 border-warning" ><div class="card-body"><div class="row article-title"><div class="col-6"><h5 class="card-title color1">' + ((containsArabicNumbers(article.articleCodeTxt) ? "المادة    " : "") + article.articleCodeTxt) + '</h5></div><div class="col-6 text-start verdict-to-article-attached-panel">' + attachedverducts + '</div></div><p id="activearticle" class="color1 article-content">' + article.articleText + '</p></div></div>'
        }
        else {
            articletext = '<div class="card py-0 bg-info-subtle " ><div class="card-body"><div class="row article-title"><div class="col-6"><h5 class="card-title color1">' + ((containsArabicNumbers(article.articleCodeTxt) ? "المادة    " : "") + article.articleCodeTxt) + '</h5></div><div class="col-6 text-start verdict-to-article-attached-panel">' + attachedverducts + '</div></div><p class=" color1 article-content">' + article.articleText + '</p></div></div> '
        }

        var cardHtml = '<div class="col-12 article-card">' + subjecttitle + '' + articletext + '</div>'
        $('.article-card-container').append(highlightText(searchText, cardHtml)); // Append new articles to the display
    });
}
function showimage(pdfUrl) {
    // Link to the PDF file
    $.ajax({
        url: pdfUrl,
        method: 'GET',
        xhrFields: {
            responseType: 'blob' // Ensure we get a blob response
        },
        success: function (data) {
            var url = URL.createObjectURL(data);
            window.open(url, '_blank');
        },
        error: function () {
            alert('حدث خطأ اثناء طلب الصورة');
        }
    });
}
function highlightText(text, innerHTML) {
    var index = innerHTML.indexOf(text);
    while (index >= 0) {
        innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + text + "</span>" + innerHTML.substring(index + text.length);
        index = innerHTML.indexOf(text, index + 1 + '<span class="highlight">'.length);
    }
    return innerHTML;
}
function isArabicText(inputText) {
    // Arabic characters and Arabic-Indic numerals Unicode ranges
    const arabicPattern = /[\u0600-\u06FF\u0660-\u0669]/;

    // Test the input text
    return arabicPattern.test(inputText);
}
function isArabicTNumber(inputText) {
    // Arabic characters and Arabic-Indic numerals Unicode ranges
    const arabicPattern = /[\u0660-\u0669]/;

    // Test the input text
    return arabicPattern.test(inputText);
}
function containsArabicNumbers(text) {
    const arabicNumberRegex = /[\u0660-\u0669]/;
    return arabicNumberRegex.test(text);
}
