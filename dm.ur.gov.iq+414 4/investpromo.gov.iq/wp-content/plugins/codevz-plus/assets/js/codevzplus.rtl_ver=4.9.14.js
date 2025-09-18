jQuery(function($) {

	// Convert English numbers to RTL langs.
	function codevzReplaceNumbers(e, m, x) {
		var t = $('html').attr('lang').split("-")[0],
			n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
			r = ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"],
			a = ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"],
			i = {
				"default": {
					en: n,
					ar: r,
					fa: a
				},
				"reverse": {
					ar: r,
					fa: a,
					en: n
				}
			},
			o = i[m || "default"][t] || n;

		$(e).contents().each(function() {
			if (3 === this.nodeType) {
				var nodeValue = this.nodeValue;
				for (var s = 0; s < n.length; s++) {
					nodeValue = nodeValue.replace(new RegExp(n[s], "g"), o[s]);
				}
				this.nodeValue = nodeValue;
			} else if (1 === this.nodeType) {
				var $this = $(this);
				if (!($this.is(x.join(", ")) || $this.closest(x.join(", ")).length > 0)) {
					codevzReplaceNumbers(this, m, x);
				}
			}
		});
	}

	// Selector, reverse mode, exclude.
	codevzReplaceNumbers( 'body', null, ['.cz_ignore_number', '.cz_counter_num', '.progress_bar', '.glider', 'style', 'script', 'link', 'textarea', 'input'] );

});