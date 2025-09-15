jQuery( function( $ ) {

	var body = $( document.body ),
		caty = $( '.codevz-search-category' );

	// Header search custom category selection list.
	body.on( 'click', '.codevz-search-category > strong', function() {

		caty.find( '> div' ).slideToggle( 'fast' );

	}).on( 'click', '.codevz-search-category li', function() {

		var $this = $( this );

		$this.addClass( 'codevz-active' ).siblings().removeClass( 'codevz-active' );

		caty.find( '> div' ).slideUp( 'fast' );

		caty.find( '> strong span' ).html( $this.text() );

		caty.find( '> input' ).val( $this.attr( 'data-cat' ) ).trigger( 'change' );

	}).on( 'click', '.codevz-search-trending a', function() {

		$( '[name="s"]' ).val( $( this ).text() ).trigger( 'change' ).closest( 'form' ).submit();

	});

	// Header search forms.
	if ( $( '.outer_search' ).length ) {

		// non-required hidden fields for submit form.
		var hidden = $( '.outer_search input[type="hidden"]' ).not( 'input[name="post_type"],input[name="prcat"],input[name="lang"]' );

		// Add disabled attr to hidden inputs.
		hidden.attr( 'disabled', 'disabled' );

		// Input changes.
		body.on( 'keyup', '.cz_ajax_search [name="s"]', function( e, time ) {

			clearTimeout( time );

			var form    = $( this ).parent(),
				results = form.next( '.ajax_search_results' ),
				icon 	= $( 'button i', form ),
				org 	= 'fa ' + icon.data( 'xtra-icon' ),
				iLoader = 'fa fa-superpowers fa-pulse';

			// Check input length.
			if ( $( this ).val().length < 3 ) {
				$( '.ajax_search_results' ).slideUp( 'fast' );
				icon.removeClass( iLoader ).addClass( org );
				return;
			} else {
				icon.removeClass( org ).addClass( iLoader );
			}

			// Temporary enable for AJAX.
			hidden.removeAttr( 'disabled' );

			// Send request
			time = setTimeout(
				function() {
					$.ajax({
						type: "GET",
						url: body.data( 'ajax' ) || ajaxurl,
						dataType: 'html',
						data: "action=codevz_ajax_search&" + form.serialize(),
						success: function( data ) {
							results.html( data ).slideDown( 'fast' );
							icon.removeClass( iLoader ).addClass( org );
							hidden.attr( 'disabled', 'disabled' );
						},
						error: function( xhr, status, error ) {
							results.html( '<b class="ajax_search_error">' + error + '</b>' ).slideDown( 'fast' );
							icon.removeClass( iLoader ).addClass( org );
							hidden.attr( 'disabled', 'disabled' );
							console.log( xhr, status, error );
						}
					});

					// Plugins compatibility.
					var searchUrl = window.location.href.split('?')[0] + '?s=' + encodeURIComponent( form.find( '[name="s"]' ).val() );
					$.ajax({
						type: "GET",
						url: searchUrl,
						success: function( data ) {}
					});
				},
				2500
			);

		// Search icon
		}).on( 'click', '.search_with_icon', function( e ) {

			e.stopPropagation();

		}).on( 'click', '.search_with_icon [name="s"]', function() {

			if ( $( this ).val() ) {
				$( '.ajax_search_results' ).slideDown( 'fast' );
			}

		// Search dropdown.
		}).on( 'click', '.search_style_icon_dropdown .xtra-search-icon', function() {

			var x 		= $( this ),
				outer 	= x.parent().find('.outer_search'),
				row_h 	= x.closest('.row').height(),
				clr 	= x.closest('.clr');

			if ( outer.is( ':visible' ) ) {
				outer.fadeOut( 'fast' );
			} else {
				outer.fadeIn( 'fast' ).find('input').trigger( 'focus' );
			}

		// Auto x-position search in header.
		}).on( 'mouseenter', '.search_style_icon_dropdown', function() {

			var x 			= $( this ),
				iconX 		= x.find( '.xtra-search-icon' ),
				iconWidth 	= iconX.outerWidth(),
				dropdown  	= x.find( '.outer_search' );

			if ( ( $( window ).width() / 2 ) > ( x.offset().left + 100 ) ) {

				x.addClass( 'inview_right' );

				var iconMl = parseFloat( iconX.css( 'marginLeft' ) );

				if ( body.hasClass( 'rtl' ) ) {
					dropdown.css( 'left', ( ( iconWidth / 2 ) - 38 + iconMl ) );
				} else {
					dropdown.css( 'left', -( ( iconWidth / 2 ) - 36 + iconMl ) );
				}

			} else {

				dropdown.css( 'right', ( ( iconWidth / 2 ) - 36 + parseFloat( iconX.css( 'marginRight' ) ) ) );

			}

		// Search fullscreen.
		}).on( 'click', '.search_style_icon_full .xtra-search-icon', function( e ) {

			var x = $( this );

			x.parent().find( '.outer_search' ).fadeIn( 'fast' ).find( 'input' ).trigger( 'focus' );

			$( window ).on( 'resize.search', function() {

				var t = $( this ),
					w = t.width(),
					h = t.height(),
					s = t.find('.outer_search .search');

				s.css({
					'top': h / 4 - s.height() / 2,
					'left': w / 2 - s.width() / 2
				});

			});

			x.parent().find( '.xtra-close-icon' ).toggleClass( 'hide' ).off().on( 'click', function( e ) {
				$( this ).addClass( 'hide' ).parent().find('.outer_search').fadeOut( 'fast' );
			});

		}).on( 'click', function( e ) {

			if ( $( e.target ).closest( '.outer_search .search' ).length ) {
				return;
			}

			body.find( '.ajax_search_results' ).fadeOut( 'fast' );
			body.find( '.search_style_icon_dropdown, .search_style_icon_full' ).find( '.outer_search' ).fadeOut( 'fast' );
			body.find( '.search_style_icon_full .xtra-close-icon' ).addClass( 'hide' );

			caty.find( '> div' ).slideUp( 'fast' );

		});

	}

});