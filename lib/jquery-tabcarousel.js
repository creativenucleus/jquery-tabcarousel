(function( $ ){

	var methods = {};

	
	methods.init = function( options ) {

		options = options || {};
	
		return this.each( function() {

			var $tc_obj = $( this );

			var data = $tc_obj.data( 'tabcarousel' );
			if ( ! data ) {		// Plugin Initialisation
		
				$tc_obj.data( 'tabcarousel', {
					current_tab_id: 0,
					total_tabs: $tc_obj.find( 'ul.jqtc-tabs' ).children( 'li' ).length
				});
			}
			
		// Set up events...
			$tc_obj.on( 'click', '.tc-btn-prev', function() {
			
				var data = $tc_obj.data( 'tabcarousel' );
				if( --data.current_tab_id < 0 ) {
				
					data.current_tab_id = data.total_tabs - 1;
				}
				
				tabs_update( $tc_obj );
			});

			$tc_obj.on( 'click', '.tc-btn-next', function() {
			
				var data = $tc_obj.data( 'tabcarousel' );
				if( ++data.current_tab_id >= data.total_tabs ) {
				
					data.current_tab_id = 0;
				}
				
				tabs_update( $tc_obj );
			});

			var tab_left = options.tab_left || '«';
			var tab_right = options.tab_right || '»';
			
			$ul_nav = $tc_obj.find( 'ul.jqtc-tabs' );
			$ul_nav.before( '<span class="tc-btn tc-btn-prev">' + tab_left + '</span>' );
			$ul_nav.after( '<span class="tc-btn tc-btn-next">' + tab_right + '</span>' );
			
			$ul_nav.css({ margin: 0, padding: 0, display: 'inline-block', width: '60%' });
			$ul_nav.children( '*' ).css({ 'box-sizing': 'border-box' });
			$ul_nav.children( 'li' ).css({ display: 'inline-block', width: '100%', 'text-align': 'center' });
			$tc_obj.find( '.tc-btn' ).css({ display: 'inline-block', width: '20%', 'cursor': 'pointer' });
			$tc_obj.find( '.tc-btn-prev' ).css({ 'text-align': 'left' });
			$tc_obj.find( '.tc-btn-next' ).css({ 'text-align': 'right' });

		// Initial update...
			tabs_update( $tc_obj );
		});
	};

	
	methods.destroy = function() {

	// Unbind data...
		return this.each( function() {

			var $sw_obj = $( this ),
			data = $sw_obj.data( 'tabcarousel' );

			$( window ).unbind( '.tabcarousel' );
			data.tabcarousel.remove();
			$sw_obj.removeData( 'tabcarousel' );
		})
	};
		
	
// Bootstrap local objects
	$.fn.tabcarousel = function( method ) {

		if( methods[ method ] ) {

			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {

			return methods.init.apply( this, arguments );
		} else {

			$.error( 'Method ' +  method + ' does not exist on jQuery.tabcarousel' );
		}    
	};
	
	
	var tabs_update = function( $tc_obj ) {
	
		var data = $tc_obj.data( 'tabcarousel' );
		
	// Show only the matching tab...
		var show_content_id = null;
		$tc_obj.find( 'ul.jqtc-tabs' ).children( 'li' ).each( function( index ) {
	
			if( index == data.current_tab_id ) {
			
				$( this ).show();
				show_content_id = $( this ).children( 'a' ).attr( 'href' );
				if( show_content_id != undefined ) {
				
					show_content_id = show_content_id.replace( /^#/, '' );	// remove #
				}
			} else {
			
				$( this ).hide();
			}
		});
		
	// Show only the matching content...
		$tc_obj.children( '.jqtc-content' ).each( function( index ) {

			var content_id = $( this ).attr( 'id' );
						
			if( content_id != undefined && show_content_id != null && content_id == show_content_id ) {
			
				$( this ).show();
			} else {

				$( this ).hide();
			}
		});
	}
})( jQuery );