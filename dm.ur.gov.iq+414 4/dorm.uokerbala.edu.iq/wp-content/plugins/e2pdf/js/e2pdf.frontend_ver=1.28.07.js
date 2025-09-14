var e2pdfViewer = {
    updateViewArea: function (pdfIframe, listener) {
        if (pdfIframe.hasClass('e2pdf-pages-loaded') && pdfIframe.hasClass('e2pdf-responsive')) {
            var pdfIframeContents = pdfIframe.contents();
            var viewerHeight = parseInt(pdfIframeContents.find('#viewer').outerHeight());
            if (pdfIframe.hasClass('e2pdf-responsive-page')) {
                viewerHeight = parseInt(pdfIframeContents.find('#viewer .page').first().outerHeight());
            }
            var viewerContainerTop = parseInt(pdfIframeContents.find('#viewerContainer').offset().top);
            pdfIframe.innerHeight(viewerHeight + viewerContainerTop + 2);
            if (!pdfIframe.hasClass('e2pdf-responsive-page')) {
                pdfIframeContents.find('#viewerContainer').scrollTop(0);
            }
        }
        if (listener == 'pagesloaded') {
            var pdfIframeContents = pdfIframe.contents();
            pdfIframeContents.find('#viewerContainer').scrollTop(0);
        }
    },
    viewSinglePageSwitch: function (pdfIframe, page) {
        if (pdfIframe.hasClass('e2pdf-single-page-mode') && pdfIframe.hasClass('e2pdf-responsive')) {
            var page = parseInt(page);
            if (page) {
                var pdfIframeContents = pdfIframe.contents();
                pdfIframeContents.find('.page').not('.page[data-page-number="' + page + '"]').css({'position': 'absolute', 'visibility': 'hidden', 'z-index': '-1'});
                pdfIframeContents.find('.page[data-page-number="' + page + '"]').css({'position': 'relative', 'visibility': '', 'z-index': ''});
            }
        }
    },
    iframeLoad: function (iframe) {
        var pdfIframe = jQuery(iframe);
        if (!pdfIframe.hasClass('e2pdf-preload')) {
            var pdfIframeContents = pdfIframe.contents();
            pdfIframe.addClass('e2pdf-view-loaded');
            pdfIframeContents.find('html').addClass('e2pdf-view-loaded');
            if (iframe.contentWindow && iframe.contentWindow.PDFViewerApplication) {
                var PDFViewerApplication = iframe.contentWindow.PDFViewerApplication;
                if (pdfIframe.attr('cursor')) {
                    PDFViewerApplication.pdfCursorTools.switchTool(parseInt(pdfIframe.attr('cursor')));
                }
                if (iframe.contentWindow.PDFViewerApplicationOptions) {
                    if (pdfIframe.attr('resolution')) {
                        iframe.contentWindow.PDFViewerApplicationOptions.set('printResolution', parseInt(pdfIframe.attr('resolution')));
                    }
                    if (pdfIframe.attr('scroll')) {
                        iframe.contentWindow.PDFViewerApplicationOptions.set('scrollModeOnLoad', parseInt(pdfIframe.attr('scroll')));
                    }
                    if (pdfIframe.attr('spread')) {
                        iframe.contentWindow.PDFViewerApplicationOptions.set('spreadModeOnLoad', parseInt(pdfIframe.attr('spread')));
                    }
                }
                PDFViewerApplication.initializedPromise.then(function () {
                    PDFViewerApplication.eventBus.on('pagesloaded', function (event) {
                        pdfIframe.addClass('e2pdf-pages-loaded');
                        pdfIframeContents.find('html').addClass('e2pdf-pages-loaded');
                        e2pdfViewer.viewSinglePageSwitch(pdfIframe, 1);
                        e2pdfViewer.updateViewArea(pdfIframe, 'pagesloaded');
                    });
                    PDFViewerApplication.eventBus.on('pagechanging', function (event) {
                        if (event && event.pageNumber) {
                            e2pdfViewer.viewSinglePageSwitch(pdfIframe, event.pageNumber);
                            e2pdfViewer.updateViewArea(pdfIframe, 'pagechanging');
                        }
                    });
                    var title = document.title;
                    PDFViewerApplication.eventBus.on('beforeprint', function (event) {
                        if (PDFViewerApplication.printService) {
                            var pdfTitle;
                            var metadataTitle = PDFViewerApplication.metadata && PDFViewerApplication.metadata.get("dc:title");
                            if (metadataTitle) {
                                if (metadataTitle !== "Untitled" && !/[\uFFF0-\uFFFF]/g.test(metadataTitle)) {
                                    pdfTitle = metadataTitle;
                                }
                            }
                            if (pdfTitle) {
                                document.title = pdfTitle;
                            } else if (PDFViewerApplication.contentDispositionFilename) {
                                document.title = PDFViewerApplication.contentDispositionFilename;
                            }
                        }
                    });
                    PDFViewerApplication.eventBus.on('afterprint', function (event) {
                        document.title = title;
                    });
                    var listeners = [
                        'scalechanging',
                        'scalechanged',
                        'rotationchanging',
                        'updateviewarea',
                        'scrollmodechanged',
                        'spreadmodechanged',
                        'pagechanging',
                        'zoomin',
                        'zoomout',
                        'zoomreset',
                        'nextpage',
                        'previouspage'
                    ];
                    listeners.forEach(function (listener) {
                        PDFViewerApplication.eventBus.on(listener, function (event) {
                            e2pdfViewer.updateViewArea(pdfIframe, listener);
                        });
                    });
                });
            } else {
                pdfIframeContents[0].addEventListener('pagesloaded', function (event) {
                    pdfIframe.addClass('e2pdf-pages-loaded');
                    pdfIframeContents.find('html').addClass('e2pdf-pages-loaded');
                    e2pdfViewer.viewSinglePageSwitch(pdfIframe, 1);
                    e2pdfViewer.updateViewArea(pdfIframe, 'pagesloaded');
                });
                pdfIframeContents[0].addEventListener('pagechanging', function (event) {
                    if (event && event.detail && event.detail.pageNumber) {
                        e2pdfViewer.viewSinglePageSwitch(pdfIframe, event.detail.pageNumber);
                        e2pdfViewer.updateViewArea(pdfIframe, 'pagechanging');
                    }
                });
                var listeners = [
                    'scalechanging',
                    'scalechanged',
                    'rotationchanging',
                    'updateviewarea',
                    'scrollmodechanged',
                    'spreadmodechanged',
                    'pagechanging',
                    'zoomin',
                    'zoomout',
                    'zoomreset',
                    'nextpage',
                    'previouspage'
                ];
                listeners.forEach(function (listener) {
                    pdfIframeContents[0].addEventListener(listener, function (event) {
                        e2pdfViewer.updateViewArea(pdfIframe, listener);
                    });
                });
            }
        }
    },
    imageLoad: function (image) {
        var img = jQuery(image);
        var preload = img.attr('preload');
        if (preload) {
            img.removeClass('e2pdf-preload')
            img.removeAttr('preload');
            img.attr('src', preload);
        }
    },
    print: {
        browser: {
            isFirefox: function () {
                return typeof InstallTrigger !== 'undefined';
            },
            isIE: function () {
                return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode;
            },
            isEdge: function () {
                return !e2pdfViewer.print.browser.isIE() && !!window.StyleMedia;
            }
        },
        iframeSupport: function () {
            if (navigator.userAgent.indexOf('Mobile') !== -1) {
                return false;
            }
            return true;
        },
        pdf: function (blobURL) {
            var iframe = document.createElement('iframe');
            if (e2pdfViewer.print.iframeSupport()) {
                if (e2pdfViewer.print.browser.isFirefox()) {
                    iframe.setAttribute('style', 'width: 1px; height: 100px; position: fixed; left: 0; top: 0; opacity: 0; border-width: 0; margin: 0; padding: 0');
                } else {
                    iframe.setAttribute('style', 'visibility: hidden; height: 0; width: 0; position: absolute; border: 0');
                }
                iframe.onload = function () {
                    try {
                        iframe.focus();
                        if (e2pdfViewer.print.browser.isEdge() || e2pdfViewer.print.browser.isIE()) {
                            try {
                                iframe.contentWindow.document.execCommand('print', false, null);
                            } catch (e) {
                                iframe.contentWindow.print();
                            }
                        } else {
                            iframe.contentWindow.print();
                        }
                    } catch (error) {

                    } finally {
                        if (e2pdfViewer.print.browser.isFirefox()) {
                            iframe.style.visibility = 'hidden';
                            iframe.style.left = '-1px';
                        }

                    }
                };
                iframe.setAttribute('src', blobURL);
                document.getElementsByTagName('body')[0].appendChild(iframe);
            }
        }
    }

};
jQuery(document).ready(function () {
    jQuery(document).on('click', 'a.e2pdf-download-loader', function (e) {
        var link = jQuery(this);
        if (!link.hasClass('e2pdf-download-ready')) {
            e.preventDefault();
        }
        var linkURL = link.attr('href');
        if (!link.hasClass('e2pdf-download-progress')) {
            link.addClass('e2pdf-download-progress');
            fetch(link.attr('href'), {
                method: 'GET',
                headers: {
                    'X-E2PDF-REQUEST': 'true'
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.blob().then((blob) => {
                        const blobURL = URL.createObjectURL(blob);
                        link.attr('href', blobURL).addClass('e2pdf-download-ready');
                        link[0].click();
                        link.attr('href', linkURL).removeClass('e2pdf-download-ready e2pdf-download-progress');
                    });
                } else {
                    var errorMessage = 'Something went wrong!';
                    return resp.json().then((json) => {
                        if (json && json.redirect_url) {
                            link.attr('href', linkURL).removeClass('e2pdf-download-ready e2pdf-download-progress');
                            window.location.href = json.redirect_url;
                        } else {
                            if (json && json.error) {
                                errorMessage = json.error;
                            }
                            throw new Error(errorMessage);
                        }
                    }).catch(() => {
                        throw new Error(errorMessage);
                    });
                }
            }).catch((error) => {
                link.attr('href', linkURL).removeClass('e2pdf-download-ready e2pdf-download-progress');
                alert(error.message || 'Something went wrong!');
            });
        }
    });
    jQuery(document).on('click', 'a.e2pdf-print-pdf', function (e) {
        var link = jQuery(this);
        e.preventDefault();
        if (!link.hasClass('e2pdf-download-ready')) {
            e.preventDefault();
        }
        var linkURL = link.attr('href');
        if (!link.hasClass('e2pdf-download-progress')) {
            link.addClass('e2pdf-download-progress');
            fetch(link.attr('href'), {
                method: 'GET',
                headers: {
                    'X-E2PDF-REQUEST': 'true'
                }
            }).then(resp => {
                if (resp.ok) {
                    resp.blob().then((blob) => {
                        const blobURL = URL.createObjectURL(new Blob([blob], {type: 'application/pdf'}));
                        e2pdfViewer.print.pdf(blobURL);
                        link.addClass('e2pdf-download-ready');
                        link.removeClass('e2pdf-download-ready e2pdf-download-progress');
                    });
                } else {
                    var errorMessage = 'Something went wrong!';
                    return resp.json().then((json) => {
                        if (json && json.redirect_url) {
                            link.attr('href', linkURL).removeClass('e2pdf-download-ready e2pdf-download-progress');
                            window.location.href = json.redirect_url;
                        } else {
                            if (json && json.error) {
                                errorMessage = json.error;
                            }
                            throw new Error(errorMessage);
                        }
                    }).catch(() => {
                        throw new Error(errorMessage);
                    });
                }
            }).catch((error) => {
                link.attr('href', linkURL).removeClass('e2pdf-download-ready e2pdf-download-progress');
                alert(error.message || 'Something went wrong!');
            });
        }
    });
    if (jQuery('.e2pdf-download.e2pdf-auto').not('.e2pdf-iframe-download').length > 0) {
        jQuery('.e2pdf-download.e2pdf-auto').not('.e2pdf-iframe-download').each(function () {
            if (jQuery(this).hasClass('e2pdf-print-pdf') || jQuery(this).hasClass('e2pdf-download-loader')) {
                jQuery(this).click();
            } else if (jQuery(this).hasClass('e2pdf-inline')) {
                window.open(jQuery(this).attr('href'), '_blank');
            } else {
                location.href = jQuery(this).attr('href');
            }
        });
    }
    jQuery('.modal').on('show.bs.modal', function () {
        var modal = jQuery(this);
        modal.find('iframe.e2pdf-preload').each(function () {
            jQuery(this).removeClass('e2pdf-preload').attr('src', jQuery(this).attr('preload'));
        });
    });
    var wpcf = document.querySelector('.wpcf7');
    if (wpcf !== null) {
        wpcf.addEventListener('wpcf7mailsent', function (event) {
            var message = event.detail.apiResponse.message;
            if (message && (message.includes('e2pdf-view') || message.includes('e2pdf-download'))) {
                if (jQuery('.wpcf7-response-output').length > 0) {
                    if (window.MutationObserver) {
                        new MutationObserver((mutationsList, observer) => {
                            for (var mutation of mutationsList) {
                                observer.disconnect();
                                jQuery('.wpcf7-response-output').html(jQuery('.wpcf7-response-output').text());
                            }
                        }).observe(jQuery('.wpcf7-response-output')[0], {attributes: false, childList: true, characterData: false});
                    } else {
                        setTimeout(function () {
                            jQuery('.wpcf7-response-output').html(jQuery('.wpcf7-response-output').text());
                        }, 500);
                    }
                }
            }
        }, false);
    }
});