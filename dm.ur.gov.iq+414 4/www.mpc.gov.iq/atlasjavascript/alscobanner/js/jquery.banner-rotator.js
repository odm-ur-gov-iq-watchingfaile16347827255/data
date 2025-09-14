/**
 * jQuery Banner Rotator v4.1.2
 * Copyright (c) 2015 Allan Ma (http://codecanyon.net/user/webtako)
 */
(function($) {
	var PRESETS = {};

	(function() {
		var empty = [''],
			xDirs = ['left', 'right'],
			yDirs = ['up', 'down'],
			order = ['downLeft', 'upRight', 'downRight', 'upLeft', 'spiralIn', 'spiralOut', 'zigZagDown', 'zigZagUp', 'zigZagRight', 'zigZagLeft'];
		
		$.each(['none', 'column', 'row', 'grid'], function(i, val) {
			PRESETS[val] = [];
		});

		addPresets(PRESETS.none, ['cover', 'flip', 'push', 'rotate'], xDirs.concat(yDirs), empty);
		addPresets(PRESETS.none, ['fade', 'zoom'], empty, empty);
		
		addPresets(PRESETS.column, ['fade', 'zoom'], empty, xDirs);
		addPresets(PRESETS.column, ['push', 'rotate'], yDirs, xDirs);
		$.each(xDirs, function(i, val) {
			addPresets(PRESETS.column, ['cover', 'flip', 'move'], [val], [val]);
		});
		
		addPresets(PRESETS.row, ['fade', 'zoom'], empty, yDirs);
		addPresets(PRESETS.row, ['push', 'rotate'], xDirs, yDirs);
		$.each(yDirs, function(i, val) {
			addPresets(PRESETS.row, ['cover', 'flip', 'move'], [val], [val]);
		});

		addPresets(PRESETS.grid, ['expand', 'fade', 'zoom'], empty, order);
		addPresets(PRESETS.grid, ['cover', 'flip', 'move', 'push'], ['random'], order);
	}());

	var IS_TOUCH = 'ontouchstart' in window,
		ANDROID2 = isAndroid(2.9),
		CHROME = isChrome();
	
	var CUBIC_BEZIER = {
		'linear':			'linear',
		'':					'ease',
		'swing':			'ease',
		'ease':           	'ease',
       	'ease-in':        	'ease-in',
       	'ease-out':       	'ease-out',
       	'ease-in-out':    	'ease-in-out',
		'easeInQuad':		'cubic-bezier(.55,.085,.68,.53)',
		'easeOutQuad':		'cubic-bezier(.25,.46,.45,.94)',
		'easeInOutQuad':	'cubic-bezier(.455,.03,.515,.955)',
		'easeInCubic':		'cubic-bezier(.55,.055,.675,.19)',
		'easeOutCubic':		'cubic-bezier(.215,.61,.355,1)',
		'easeInOutCubic':	'cubic-bezier(.645,.045,.355,1)',
		'easeInQuart':		'cubic-bezier(.895,.03,.685,.22)',
		'easeOutQuart':		'cubic-bezier(.165,.84,.44,1)',
		'easeInOutQuart':	'cubic-bezier(.77,0,.175,1)',
		'easeInQuint':		'cubic-bezier(.755,.05,.855,.06)',
		'easeOutQuint':		'cubic-bezier(.23,1,.32,1)',
		'easeInOutQuint':	'cubic-bezier(.86,0,.07,1)',
		'easeInSine':		'cubic-bezier(.47,0,.745,.715)',
		'easeOutSine':		'cubic-bezier(.39,.575,.565,1)',
		'easeInOutSine':	'cubic-bezier(.445,.05,.55,.95)',
		'easeInExpo':		'cubic-bezier(.95,.05,.795,.035)',
		'easeOutExpo':		'cubic-bezier(.19,1,.22,1)',
		'easeInOutExpo':	'cubic-bezier(1,0,0,1)',
		'easeInCirc':		'cubic-bezier(.6,.04,.98,.335)',
		'easeOutCirc':		'cubic-bezier(.075,.82,.165,1)',
		'easeInOutCirc':	'cubic-bezier(.785,.135,.15,.86)',
		'easeInBack':		'cubic-bezier(.60,-.28,.735,.045)',
		'easeOutBack':		'cubic-bezier(.175,.885,.32,1.275)',
		'easeInOutBack':	'cubic-bezier(.68,-.55,.265,1.55)'
	};
		
	var SIDES,
		OPPOSITE_SIDE = {top:'bottom', left:'right'},
		OPPOSITE_LAYER = {
			zoomIn:'zoomOut',
			flipDown:'flipUp',
			flipRight:'flipLeft',
			moveDown:'moveUp',
			moveRight:'moveLeft',
			spinInRight:'spinOutLeft',
			spinInLeft:'spinOutRight'
		};

	(function() {
		$.each(OPPOSITE_LAYER, function(key, val) {
			OPPOSITE_LAYER[val] = key;
		});

		$.each(OPPOSITE_SIDE, function(key, val) {
			OPPOSITE_SIDE[val] = key;
		});

		SIDES = getKeys(OPPOSITE_SIDE);
	}());

	var SUPPORT = {},
		PREFIX,
		PREFIXES,
		CSS_TRANSITION_END,
		CSS_ANIMATION_END;
	
	(function() {
		$.each(['transform', 'transition', 'transformStyle', 'animation', 'backgroundSize', 'pointerEvents'], function(i, val) {
			styleSupport(val);
		});
		
		SUPPORT.transform3d = propertySupport(SUPPORT.transform, 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)');
		SUPPORT.preserve3d = propertySupport(SUPPORT.transformStyle, 'preserve-3d');
		SUPPORT.cssFilter = filterSupport();

		switch(SUPPORT.transition) {
			case 'WebkitTransition':
				CSS_TRANSITION_END = 'webkitTransitionEnd';
				break;
			case 'OTransition':
				CSS_TRANSITION_END = 'otransitionend';
				break;
			default:
				CSS_TRANSITION_END = 'transitionend';
		}

		switch(SUPPORT.animation) {
			case 'WebkitAnimation':
				CSS_ANIMATION_END = 'webkitAnimationEnd';
				break;
			case 'OAnimation':
				CSS_ANIMATION_END = 'oanimationend';
				break;
			default:
				CSS_ANIMATION_END = 'animationend';
		}

		if (SUPPORT.animation && /^(Moz|Webkit|O)/.test(SUPPORT.animation)) {
			PREFIX = '-' + SUPPORT.animation.replace('Animation', '').toLowerCase() + '-';
			PREFIXES = [PREFIX];
		}
		else {
			PREFIX = '';
			PREFIXES = ['-moz-', '-ms-', '-webkit-'];
		}
	}());
	
	var FROM_KEYFRAME = '0% { ' + getTransformProperty('translateZ(0px)') + ' } ',
		TO_KEYFRAME = '10' + FROM_KEYFRAME;

	(function() {
		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		cancelAnimationFrame  = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || $.noop;

	   	if (!requestAnimationFrame) {
	        requestAnimationFrame = function(callback, element) {
	           	callback.call(null);
	        };
	 	} 	
 	}());

	//Timer Class
	function Timer(context, opts) {
		if (this instanceof Timer) {
			if (context) {
				this._running = false;
				this._complete = true;
				this._$timer = $('<div/>').appendTo(context._$screen).addTransitionClass('br-element-transition');
				
				if ($.isFunction(opts.click)) {
					this._$timer.css({cursor:'pointer'}).on('click', opts.click);
				}

				this.addOnHover(context._$outmost, context._namespace);
			}
		}
		else {
			return new Timer();
		}
	}

	Timer.prototype = {
		constructor: Timer,

		start: function() {
			this._running = true;
			this._complete = false;
			this._$timer.addClass('br-on');
			this.wake();
		},

		stop: function() {
			this._running = false;
			this._complete = true;
			this._$timer.removeClass('br-on');
		},

		pause: function() {
			this._running = false;
			this.sleep();
		},

		wake: function() {
			this._$timer.removeClass('br-timer-sleep');
		},

		sleep: function() {
			if (!this._running) {
				this._$timer.addClass('br-timer-sleep');
			}
		},

		addOnHover: function($parent, namespace) {
			$parent.on('mouseenter' + namespace, $.proxy(function() { this.wake(); }, this))
				   .on('mouseleave' + namespace, $.proxy(function() { this.sleep(); }, this));
		}
	};

	//Bar Timer Class
	BarTimer.prototype = new Timer();
	BarTimer.prototype.constructor = BarTimer;

	function BarTimer(context, opts) {
		if (this instanceof BarTimer) {
			Timer.call(this, context, opts);
			this._$bar = $('<div/>');
			this._$timer.addClass('br-bar-timer').addClass(/bottom/i.test(opts.position) ? 'br-bottom' : 'br-top').append(this._$bar);
		}
		else {
			return new BarTimer(context, opts);
		}
	}

	BarTimer.prototype.start = function(delay) {
		if (this._complete) {
			this._delay = delay;
		}

		this._startTime = $.now();
		this._$bar.transition({width:'101%'}, delay, 'linear');
		Timer.prototype.start.call(this);
	};

	BarTimer.prototype.stop = function() {
		this._elapsed = 0;
		this._$bar.stopTransition(true).width(0);

		Timer.prototype.stop.call(this);
	};

	BarTimer.prototype.pause = function() {
		this._$bar.stopTransition(true);
		this._elapsed += ($.now() - this._startTime);
		this._$bar.width((this._elapsed/this._delay * 101) + '%');
		
		Timer.prototype.pause.call(this);
	};
	
	//Pie Timer Class
	PieTimer.prototype = new Timer();
	PieTimer.prototype.constructor = PieTimer;

	function PieTimer(context, opts) {
		if (this instanceof PieTimer) {
			Timer.call(this, context, opts);
			var css = {},
				positions = opts.position.split(' ', 2);
			
			css[getEnum(positions[0], ['left', 'right'], 'right')] = 0;
			css[getEnum(positions[1], ['top', 'bottom'], 'top')] = 0;

			this._$spinner = $('<div/>', {'class':'br-spinner', html:'<div/>'});
			this._$fill = $('<div/>', {'class':'br-pie-fill', html:'<div/>'});
			this._$mask = $('<div/>', {'class':'br-pie-mask'});
			this._$el = this._$spinner.add(this._$fill).add(this._$mask);
			this._$timer.addClass('br-pie-timer').css(css).append(this._$el);
		}
		else {
			return new PieTimer(context, opts);
		}
	}
	
	PieTimer.prototype.start = function(delay) {
		if (this._complete) {
			this._delay = delay;
		}
		
		this._startTime = $.now();
		this._$spinner.transition({transform:'rotate(360deg)'}, delay, 'linear');
		if (this._elapsed < this._delay/2) {
			var props = {duration:0, easing:'linear', delay:this._delay/2 - this._elapsed};
			this._$fill.transition({opacity:1}, props);
			this._$mask.transition({opacity:0}, props);
		}

		Timer.prototype.start.call(this);
	};
	
	PieTimer.prototype.stop = function() {
		this._elapsed = 0;
		this._$el.stopTransition(true);
		this._$fill.css({opacity:0});
		this._$mask.css({opacity:1});
		this._$spinner.css({transform:'rotate(0)'});

		Timer.prototype.stop.call(this);
	};

	PieTimer.prototype.pause = function() {
		this._$el.stopTransition(true);
		this._elapsed += ($.now() - this._startTime);
		
		var degree = (this._elapsed/this._delay * 360);
		this._$spinner.css({transform:'rotate(' + degree + 'deg)'});
		if (this._elapsed < this._delay/2) {
			this._$fill.css({opacity:0});
			this._$mask.css({opacity:1});
		}

		Timer.prototype.pause.call(this);
	};
	
	//Effect Class
	function Effect(context) {
		if (this instanceof Effect) {
			if (context) {
				this._timeout = null;
				this._requestId = null;
				this._context = context;
				this._$container = $('<div/>', {'class':'br-effects'}).appendTo(this._context._$screen);
				this._transform = this._context._transform;
				this._support3d = SUPPORT.transform3d && SUPPORT.preserve3d && this._context._cssTransition;
			}
		}
		else {
			return new Effect(context);
		}
	}
	
	Effect.prototype = {
		constructor: Effect,

		//create elements
		createElements: function() {
			var total = this._rows * this._columns,
				inner = this._is3D ? Effect.CUBOID : Effect.PLANE,
				content = '';
			
			while (total--) {
				content += '<div class="br-effect">' + inner + '</div>';
			}
			this._$container.toggleClass('br-2d', !this._is3D).html(content);
			this._$el = this._$container.children();
			
			if (this._shapeColor) {
				this._$el.find('>.br-shape').children().css({backgroundColor:this._shapeColor});
			}
		},

		//set elements
		initElements: function() {
			var $curr = this.getCurrImage(),
				currTop = $curr.position().top,
				currLeft = $curr.position().left,
				$prev = this.getPrevImage(),
				prevTop, 
				prevLeft;

			if ($prev) {
				prevTop = $prev.position().top;
				prevLeft = $prev.position().left;
			}

			this.addImage();
			var availHeight = this._$container.height();
			for (var i = 0; i < this._rows; i++) {
				var availWidth = this._$container.width(),
					height = Math.min(this._height, availHeight);
				availHeight -= height;
				for (var j = 0; j < this._columns; j++) {
					var width = Math.min(this._width, availWidth),
						top = i * this._height,
						left = j * this._width,
						$el = this._$el.eq(i * this._columns + j),
						$shape = $($el[0].firstChild);
						
					$el.css({top:top, left:left, width:width, height:height});
					$shape.find('>.br-prev-side>img').css({left:(prevLeft - left), top:(prevTop - top)}).end()
						  .find('>.br-active-side>img').css({left:(currLeft - left), top:(currTop - top)});
					
					if (this._is3D) {
						this.setCuboid($shape, width, height, $el.data('depth'));
					}

					availWidth -= width;
				}
			}

			this._$el.css({visibility:'visible'});

			if (this._hideItems) {
				this._context._$items.css({visibility:'hidden'});
			}
		},

		//clear elements
		clear: function() {
			clearTimeout(this._timeout);
			cancelAnimationFrame(this._requestId);
			this._$container.empty();
			this._progress = false;
		},

		//get type
		getType: function() {
			if (1 < this._rows) {
				if (1 < this._columns) {
					return Effect.GRID;
				}
				else {
					return Effect.ROW;
				}
			}
			else if (1 < this._columns) {
				return Effect.COLUMN;
			}

			return 'none';
		},

		//init order
		initOrder: function() {
			if (0 > $.inArray(this._order, Effect.ORDERS)) {
				this._order = 'right';
			}

			if (this._context._backward && this._autoReverse) {
				this._order = this.getOpposite(this._order);
			}
		},

		//init direction
		initDirection: function() {
			if (0 > $.inArray(this._direction, ['up', 'down', 'left', 'right', 'random'])) {
				this._direction = 'right';
			}

			if (this._context._backward && this._autoReverse) {
				this._direction = this.getOpposite(this._direction);
			}
		},

		//get opposite
		getOpposite: function(val) {
			if (val in Effect.OPPOSITE) {
				return Effect.OPPOSITE[val];
			}
			return val;
		},

		//get current image
		getCurrImage: function() {
			if (this._context._$currItem) {
				return this._context._$currItem.find('>img.br-img');
			}
		},

		//get previous image
		getPrevImage: function() {
			if (this._context._$prevItem) {
				return this._context._$prevItem.find('>img.br-img');
			}
		},

		//add element's image
		addImage: function() {
			$.each({'>.br-active-side': this.getCurrImage(), '>.br-prev-side': this.getPrevImage()}, 
				$.proxy(function(selector, $img) {
					if ($img && $img.length) {
						var rect = $img[0].getBoundingClientRect(),
							width = rect.width || $img.width(),
							height = rect.height || $img.height(),
							$newImg = $('<img/>', {src:$img.attr('src'), alt:'', css:{width:width, height:height}});
						this._$el.find('>.br-shape').find(selector).html($newImg);
					}
				}, this));
		},

		//set cuboid
		setCuboid: function($cuboid, width, height, depth) {
			var widthZ  = 'translateZ(' + (width/2)  + 'px)',
				heightZ = 'translateZ(' + (height/2) + 'px)',
				depthZ  = 'translateZ(' + (depth/2)  + 'px)',
				left = (width - depth)/2,
				top = (height - depth)/2,
				invert = $cuboid.find('>.br-face-back').hasClass('br-inverted') ? 'rotate(180deg) ' : '';
			
			$cuboid.find('>.br-face-front').css({transform:depthZ}).end()
				   .find('>.br-face-back').css({transform:'rotateY(180deg) ' + invert + depthZ}).end()
				   .find('>.br-face-left').css({width:depth, left:left, transform:'rotateY(-90deg) ' + widthZ}).end()
				   .find('>.br-face-right').css({width:depth, left:left, transform:'rotateY(90deg) ' + widthZ}).end()
				   .find('>.br-face-top').css({height:depth, top:top, transform:'rotateX(90deg) ' + heightZ}).end()
				   .find('>.br-face-bottom').css({height:depth, top:top, transform:'rotateX(-90deg) ' + heightZ});
		},

		//update keyframes
		updateKeyframes: function() {
			var sheet = this._context._sheet,
				index = this._context._activeIndex,
				size, arr, pct,
				offset = 0;
			
			if ($.isNumeric(this._depth)) {
				size = this._depth;
				arr = [0, 1, 0];
				pct = ['0%', '50%', '100%'];
			}
			else {
				if ('flip' === this._effect) {
					size = ('up' === this._direction || 'down' === this._direction ? this._height : this._width)/2;
					arr = Effect.SINES;
					pct = Effect.FLIP_PCT;
				}
				else {
					size = this._$el.data('depth')/2;
					offset = size;
					size /= Math.cos(degreesToRadians(45));
					arr = Effect.COSINES;
					pct = Effect.ROTATE_PCT;
				}
			}

			var length = arr.length,
				rule = '@' + PREFIX + 'keyframes ' + ('br-' + this._context._uid + '-' + index) + ' { ';

			for (var i = 0; i < length; i++) {
				var val = (arr[i] * size);
				rule += (pct[i] + ' { ' + getTransformProperty('translateZ(' + Math.min(0, offset - val) + 'px)') + ' } ');
			}
			rule += '} ';
			
			try {
				sheet.deleteRule(index);
				sheet.insertRule(rule, index);
			}
			catch (err) {
			}
		},

		//animate elements
		animate: function(elArray, duration, easing) {
			if (this._is3D) {
				this.updateKeyframes();
					
				if (this._shapeShading) {
					var shadeDuration = ('flip' === this._effect ? duration/2 : duration);
					this._$el.find('>.br-shape>.br-prev-side').each(function() {
						$('<div/>', {'class':'br-shading'}).animation('br-shade-in', 
							{duration:shadeDuration, easing:easing, playState:'paused', complete:function(e) {
								e.stopPropagation();
							}}).appendTo($(this));
					});
				}
			}

			var props = {duration:duration, easing:easing};
			this._requestId = requestAnimationFrame($.proxy(function() {
				this.animateElement(elArray, props);
			}, this));
		},

		//animate active element
		animateElement: function(elArray, options) {
			var $el = $(elArray.shift()),
				selector = $el.data('selector'),
				$active = (selector ? $el.find(selector) : $el),
				promises = [],
				isLast = !elArray.length;
			
			if (this._is3D) {
				var opts = $.extend({}, options);
				if (isLast) {
					var d2 = $.Deferred();
					promises.push(d2.promise());
					opts.complete = function() { 
						d2.resolve(); 
					};
				}
				$el.animation('br-' + this._context._uid + '-' + this._context._activeIndex, opts)
				   .find('>.br-shape>.br-prev-side>.br-shading').css({animationPlayState:'running'});
			}

			if (isLast) {
				var d1 = $.Deferred();
				promises.push(d1.promise());
				options.complete = function() { 
					d1.resolve(); 
				};
				
				$.when.apply(null, promises).always($.proxy(function() {
					this._context.activateItem(false);
					this._$container.empty();
					this._progress = false;
				}, this));
			}
			
			$active.transition($el.data('to'), options);
			
			if (!isLast) {
				this._timeout = setTimeout($.proxy(function() {
					this._requestId = requestAnimationFrame($.proxy(function() {
						this.animateElement(elArray, options);
					}, this));
				}, this), this._interval);
			}
		},

		getPromises: function() {
			var promises = [];
			this.getCurrImage().add(this.getPrevImage()).each(function(n, el) {
				var $el = $(el);
				if ($el && $el.length) {
					var $img = $el.clone(),
						img = $img[0];

					if (typeof img.readyState !== 'undefined') {
						if ('complete' === img.readyState) {
							return false;
						}
					}
					else if (img.complete) {
						return false;
					}

					var deferred = $.Deferred();
					promises.push(deferred.promise());
					$img.brHandleImage($img.attr('src'), { 
						complete: function() {
							deferred.resolve();
						},
						error: function() { 
							deferred.reject(); 
						}
					});
				}
			});

			return promises;
		},

		inProgress: function() {
			return this._progress;
		},

		//get ordered element array
		getElementArray: function() {
			var elements;
			switch (this._order) {
				case 'up':
				case 'down':
				case 'left':
				case 'right':
					elements = this.getDirectionalArray(this._order);
					break;
				case 'upLeft':
				case 'upRight':
				case 'downLeft':
				case 'downRight':
					elements = this.getDiagonalArray(this._order);
					break;
				case 'spiralIn':
				case 'spiralOut':
					elements = this.getSpiralArray();
					break;
				case 'zigZagUp':
				case 'zigZagDown':
				case 'zigZagLeft':
				case 'zigZagRight':
					elements = this.getZigZagArray(this._order);
					break;
				case 'random':
					elements  = this._$el.toArray();
					shuffleArray(elements);
					break;
				default:
					elements  = this._$el.toArray();
			}

			if (this._isReverse) {
				elements.reverse();
			}
			
			return elements;
		},

		setFn: function(fn, dir) {
			var setter = 'set' + capitalize(fn), 
				name = setter + capitalize(dir);

			if (!$.isFunction(this[name])) {
				name = setter + capitalize(this._direction);
			}
			return name;
		},

		setAlternate: function(fn) {
			this[this.setFn(fn, this._direction)](this._$el.filter(':even'));
			this[this.setFn(fn, this.getOpposite(this._direction))](this._$el.filter(':odd'));
		},

		setRandomDirection: function($el, fn, directions) {
			if (!directions) {
				directions = ['up', 'down', 'left', 'right'];
			}
			
			$el.each(function() {
				$(this).data({dir:getRandomItem(directions)}); 
			});
			
			$.each(directions, $.proxy(function(i, dir) {
				var $items = $el.filter(function() { 
					return $(this).data('dir') === dir;
				});
				this[this.setFn(fn, dir)]($items);
			}, this));
		},

		//cover helper
		setCoverDown: function($el) {
			this.setPush($el, 'hidden', 'Y', true);
		},
	
		setCoverUp: function($el) {
			this.setPush($el, 'hidden', 'Y', false);
		},

		setCoverRight: function($el) {
			this.setPush($el, 'hidden', 'X', true);
		},

		setCoverLeft: function($el) {
			this.setPush($el, 'hidden', 'X', false);
		},

		setCoverRandom: function($el) {
			this.setRandomDirection($el, 'cover');
		},

		//push helper
		setPushDown: function($el) {
			this.setPush($el, 'visible', 'Y', true);
		},
	
		setPushUp: function($el) {
			this.setPush($el, 'visible', 'Y', false);
		},

		setPushRight: function($el) {
			this.setPush($el, 'visible', 'X', true);
		},

		setPushLeft: function($el) {
			this.setPush($el, 'visible', 'X', false);
		},

		setPushRandom: function($el) {
			this.setRandomDirection($el, 'push');
		},

		setPush: function($el, visibility, axis, fwd) {
			var active  = 'front', 
				prev = 'back',
				dim = ('Y' === axis ? 'height' : 'width'),
				from, to;
				
			if (this._transform) {
				var translate = 'translate' + axis;
				from = {transform:translate + '(-50%)'};
				to = {transform:translate + '(0)'};
			}
			else {
				var pos = ('Y' === axis ? 'top' : 'left');
				from = {};
				to = {};
				from[pos] = -this['_' + dim];
				to[pos] = 0;
			}

			if (!fwd) {
				var temp = from;
				from = to;
				to = temp;

				temp = prev;
				prev = active;
				active = temp;
			}

			$el.data({to:to}).find('>.br-shape').addClass('br-extend-' + dim).css(from)
				.find('>.br-' + active).addClass('br-active-side').end()
				.find('>.br-' + prev).addClass('br-prev-side').css('visibility', visibility);
		},

		//move helper
		setMoveDown: function($el) {
			this.setMove($el, 'Y', -this._$container.height());
		},

		setMoveUp: function($el) {
			this.setMove($el, 'Y', this._$container.height());
		},

		setMoveRight: function($el) {
			this.setMove($el, 'X', -this._$container.width());
		},

		setMoveLeft: function($el) {
			this.setMove($el, 'X', this._$container.width());
		},

		setMoveRandom: function($el) {
			this.setRandomDirection($el, 'move');
		},

		setMove: function($el, axis, dist) {
			var from, to;
			if (this._transform) {
				var translate = 'translate' + axis;
				from = {transform:translate + '(' + dist + 'px)'};
				to = {transform:translate + '(0)'};
			}
			else {
				if ('Y' === axis) {
					from = {marginTop:dist};
					to = {marginTop:0};
				}
				else {
					from = {marginLeft:dist};
					to = {marginLeft:0};
				}
			}

			$el.data({to:to}).css(from).find('>.br-shape')
			   .find('>.br-front').addClass('br-active-side').end()
			   .find('>.br-back').hide();
		},

		//rotate helper fns
		setRotateDown: function($el) {
			this.setRotate($el, 'X', false);
		},

		setRotateUp: function($el) {
			this.setRotate($el, 'X', true);
		},

		setRotateRight: function($el) {
			this.setRotate($el, 'Y', true);
		},

		setRotateLeft: function($el) {
			this.setRotate($el, 'Y', false);
		},

		setRotateRandom: function($el) {
			this.setRandomDirection($el, 'rotate', ['up', 'down']);
		},

		setRotate: function($el, axis, positive) {
			var transform = 'translateZ(' + (-$el.data('depth')/2) + 'px) rotate' + axis,
				sign, side;

			if (positive) {
				sign = '';
				side = (axis === 'X' ? 'bottom' : 'left');
			}
			else {
				sign = '-';
				side = (axis === 'X' ? 'top' : 'right');
			}

			$el.data({to:{transform:transform + '(' + sign + '90deg)'}})
			 	.find('>.br-shape').css({transform:transform + '(0deg)'})
				.find('>.br-face-' + side).addClass('br-active-side').end()
				.find('>.br-face-front').addClass('br-prev-side');
		},

		//flip helper fns
		setFlipDown: function($el) {
			this.setFlip($el, 'X', false);
		},

		setFlipUp: function($el) {
			this.setFlip($el, 'X', true);
		},

		setFlipRight: function($el) {
			this.setFlip($el, 'Y', true);
		},

		setFlipLeft: function($el) {
			this.setFlip($el, 'Y', false);
		},

		setFlipRandom: function($el) {
			this.setRandomDirection($el, 'flip');
		},

		setFlip: function($el, axis, positive) {
			var transform = 'translateZ(' + (-$el.data('depth')/2) + 'px) rotate' + axis,
				sign = positive ? '' : '-';
			
			$el.data({to:{transform:transform + '(' + sign + '180deg)'}})
				.find('>.br-shape').css({transform:transform + '(0deg)'})
				.find('>.br-face-front').addClass('br-prev-side').end()
				.find('>.br-face-back').addClass('br-active-side').toggleClass('br-inverted', axis === 'X');
		},
		
		//fade effect
		fade: function() {
			var selector = '>.br-shape';
			this._$el.data({selector:selector, to:{opacity:1}})
					 .find(selector).css({opacity:0})
					 .find('>.br-front').addClass('br-active-side').end()
					 .find('>.br-back').hide();
		},

		//zoom effect
		zoom: function() {
			var front = 'br-active-side', 
				back = 'br-prev-side',
				from = {opacity:1, transform:'scale(1)'},
				to = {opacity:0, transform:'scale(2)'};

			if ('out' === this._direction) {
				var temp = from;
				from = to;
				to = temp;

				temp = front;
				front = back;
				back = temp;
			}
			
			this._$el.data({selector:'>.br-shape>.br-back', to:to})
					.find('>.br-shape').addClass('br-stack')
					.find('>.br-front').addClass(front).end()
					.find('>.br-back').addClass(back).css(from);
		},

		//expand effect
		expand: function() {
			var selector = '>.br-shape',
				from, to;
			
			if (this._transform) {
				from = {transform:'scale(0)'};
				to = {transform:'scale(1)'};
			}
			else {
				from = {width:0, height:0};
				to = {width:this._width, height:this._height};
			}
			
			this._$el.data({selector:selector, to:to})
					 .find(selector).css(from)
					 .find('>.br-front').addClass('br-active-side').end()
					 .find('>.br-back').hide();
		},
		
		//push effect
		push: function() {
			if (this._alternate) {
				this.setAlternate('push');
			}
			else {
				this[this.setFn('push', this._direction)](this._$el);
			}
			
			this._$el.data({selector:'>.br-shape'});
		},

		//cover transition
		cover: function() {
			if (this._alternate) {
				this.setAlternate('cover');
			}
			else {
				this[this.setFn('cover', this._direction)](this._$el);
			}
			
			this._$el.data({selector:'>.br-shape'});
		},

		//slide transition
		slide: function() {
			this._autoReverse = true;
			this._direction = this.getOpposite(this._direction);
			
			if (this._alternate) {
				this.setAlternate('push');
			}
			else {
				this[this.setFn('push', this._direction)](this._$el);
			}

			this._$el.data({selector:'>.br-shape'});
		},

		//move transition
		move: function() {
			this._isReverse = !this._isReverse;
			this[this.setFn('move', this._direction)](this._$el);
		},
		
		//flip transition
		flip: function() {
			this._$el.data({selector:'>.br-shape', depth:this._shapeDepth});
			if (this._alternate) {
				this.setAlternate('flip');
			}
			else {
				this[this.setFn('flip', this._direction)](this._$el);
			}
		},

		//rotate transition
		rotate: function() {
			this._$el.data({selector:'>.br-shape', depth:('left' === this._direction || 'right' === this._direction ? this._width : this._height)});
			if (this._alternate) {
				this.setAlternate('rotate');
			}
			else {
				this[this.setFn('rotate', this._direction)](this._$el);
			}
		},

		start: function(opts) {
			this._progress = true;

			$.each(Effect.DATA, $.proxy(function(i, val) {
				this['_' + val] = opts[val];
			}, this));
						
			this._columns = getPosInt(this._columns, 1);
			this._rows = getPosInt(this._rows, 1);
			this._width = Math.ceil(this._$container.width()/this._columns);
			this._height = Math.ceil(this._$container.height()/this._rows);
			
			if ('random' === this._effect) {
				this.setRandomEffect();
			}

			this._is3D = -1 < $.inArray(this._effect, ['flip', 'rotate']);
			if (this._is3D && !this._support3d) {
				this._effect = 'push';
				this._is3D = false;
			}

			this._interval = getNonNegInt(this._interval, 0);
			this._shapeDepth = getNonNegInt(this._shapeDepth, 0);
			this.initDirection();
			this.initOrder();
			this._isReverse = -1 < $.inArray(this._order, Effect.REVERSE);
			this._hideItems = -1 < $.inArray(this._effect, ['flip', 'push', 'rotate', 'slide', 'zoom']);

			this.createElements();
			this[this._effect]();
			this.initElements();

			var arr = this.getElementArray(),
				duration = getNonNegInt(opts.duration, $.fn.bannerRotator.defaults.duration),
				easing = opts.easing;

			this.animate(arr, duration, easing);
		},

		setRandomEffect: function() {
			var type = this.getType(),
				preset = getRandomItem(PRESETS[type]);
			
			$.each(['effect', 'direction', 'order'], $.proxy(function(i, val) {
				this['_' + val] = preset[val];
			}, this));
		},

		//get diagonal array
		getDiagonalArray: function(order) {
			var elArray = [],
				start = 0, 
				end = (this._rows - 1) + (this._columns - 1) + 1,
				flip = ('downLeft' === order || 'upRight' === order);

			while (start != end) {
				i = Math.min(this._rows - 1, start);
				while(i >= 0) {
					if (flip) {
						j = (this._columns - 1) - Math.abs(i - start);
						if (j < 0) {
							break;
						}
					}
					else {
						j = Math.abs(i - start);
						if (j >= this._columns) {
							break;
						}
					}

					elArray.push(this._$el.eq(i * this._columns + j));
					i--;
				}
				start++;
			}
			
			return elArray;
		},

		//get zig-zag array
		getZigZagArray: function(order) {
			var i = 0, 
				j = 0, 
				fwd = true,
				elArray = [],
				total = this._$el.length,
				count;
			
			if ('zigZagUp' === order || 'zigZagDown' === order) {
				for (count = 0; count < total; count++) {
					elArray[count] = this._$el.eq(i * this._columns + j);
					
					if (fwd) { 
						j++;
					}
					else {
						j--;
					}
						
					if (j == this._columns || j < 0) {
						fwd = !fwd;
						j = (fwd ? 0 : this._columns - 1);
						i++;
					}
				}
			}
			else {
				for (count = 0; count < total; count++) {
					elArray[count] = this._$el.eq(i * this._columns + j);
					
					if (fwd) { 
						i++;
					}
					else {
						i--;
					}
					
					if (i == this._rows || i < 0) {
						fwd = !fwd;
						i = (fwd ? 0 : this._rows - 1);
						j++;
					}
				}
			}
			
			return elArray;
		},
		
		//get directional array
		getDirectionalArray: function(order) {
			var elArray;
			if ('right' === order || 'left' === order) {
				elArray = [];
				for (var j = 0; j < this._columns; j++) {
					for (var i = 0; i < this._rows; i++) {
						elArray.push(this._$el.eq(i * this._columns + j));
					}
				}
			}
			else {
				elArray = this._$el.toArray();
			}
			
			return elArray;
		},
		
		//get spiral array
		getSpiralArray: function() {
			var i = 0, 
				j = 0,
				rowCount = this._rows - 1,
				colCount = this._columns - 1,
				dir = 0,
				limit = colCount,
				elArray = [];
			
			while (rowCount >= 0 && colCount >=0) {
				var count = 0; 
				while(true) { 
					elArray.push(this._$el.eq(i * this._columns + j));
					if ((++count) > limit) {
						break;
					}
					switch(dir) {
						case 0:
							j++;
							break;
						case 1:
							i++;
							break;
						case 2:
							j--;
							break;
						case 3:
							i--;
							break;
					}
				} 
				switch(dir) {
					case 0:
						dir = 1;
						limit = (--rowCount);
						i++;
						break;
					case 1:
						dir = 2;
						limit = (--colCount);
						j--;
						break;
					case 2:
						dir = 3;
						limit = (--rowCount);
						i--;
						break;
					case 3:
						dir = 0;
						limit = (--colCount);
						j++;
						break;
				}
			}
				
			return elArray;
		}
	};

	Effect.DATA = ['effect', 'columns', 'rows', 'interval', 'direction', 'order', 'alternate', 'autoReverse', 'depth', 'shapeColor', 'shapeShading', 'shapeDepth'];

	Effect.CUBOID= '<div class="br-cuboid br-shape">\
						<div class="br-face-front"></div>\
			    		<div class="br-face-back"></div>\
						<div class="br-face-left"></div>\
						<div class="br-face-right"></div>\
						<div class="br-face-top"></div>\
						<div class="br-face-bottom"></div>\
					</div>';

	Effect.PLANE = '<div class="br-plane br-shape">\
						<div class="br-front"></div>\
						<div class="br-back"></div>\
					</div>';

	Effect.COLUMN = 'column';

	Effect.ROW = 'row';
	
	Effect.GRID = 'grid';

    Effect.EFFECTS = ['cover', 'expand', 'fade', 'flip', 'move', 'push', 'rotate', 'slide', 'zoom'];
    
    Effect.OPPOSITE = {
		down:'up',
		right:'left',
		downLeft:'upRight',
		downRight:'upLeft',
		spiralIn:'spiralOut',
		zigZagDown:'zigZagUp',
		zigZagRight:'zigZagLeft'
	};

	(function() {
		Effect.REVERSE = [];
		$.each(Effect.OPPOSITE, function(key, val) {
			Effect.OPPOSITE[val] = key;
			Effect.REVERSE.push(val);
		});

		Effect.ORDERS = getKeys(Effect.OPPOSITE);
		Effect.ORDERS.push('random');
	}());

	(function() {
		Effect.SINES = [];
		Effect.FLIP_PCT = [];
		var num = 20,
			radian = Math.PI,
			step = radian/num;
		
		for (var i = 0; i <= num; i++) {
			Effect.FLIP_PCT[i] = Math.round(i/num * 100) + '%';
			Effect.SINES[i] = roundTo(Math.sin(radian), 5);
			radian -= step;
		}
	}());

	(function() {
		Effect.COSINES = [];
		Effect.ROTATE_PCT = [];
		var num = 45,
			radian = degreesToRadians(45),
			step = radian/(num/2);
		
		for (var i = 0; i <= num; i++) {
			Effect.ROTATE_PCT[i] = Math.round(i/num * 100) + '%';
			Effect.COSINES[i] = roundTo(Math.cos(radian), 5);
			radian -= step;
			if (0 >= radian) {
				step = -step;
			}
		}
	}());
		
	//KBurns Class
	function KBurns($img, effect, opts) {
		if (this instanceof KBurns) {
			this._$img = $img;
			this._effect = effect;
			this._options = {};

			if (SUPPORT.animation && !isNone(this._effect)) {
				opts = opts || {};
				
				if (/^random/.test(this._effect)) {
					this._effect = this.getRandom();
				}
				else {
					this._effect = camelToDash(this._effect);
				}
				
				if (this._effect in KBurns.REVERSES) {
					this._effect = KBurns.REVERSES[this._effect];
					opts.direction = 'reverse';
				}
				
				this._effect = 'br-' + this._effect;
				this._options = {
					duration:getNonNegInt(opts.duration, 5000),
					easing:getValue(opts.easing, 'linear'), 
					playState:'paused',
					direction:opts.direction
				};

				this.set();
			}
		}
		else {
			return new KBurns($img, effect, opts);
		}
	}

	(function() {
		KBurns.PAN = ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right'];
		
		KBurns.ZOOMIN = ['zoom-in'];
		
		KBurns.ZOOMOUT = ['zoom-out'];

		$.each(KBurns.PAN, function(i, val) {
			KBurns.PAN[i] = 'pan-' + val;
			KBurns.ZOOMIN.push('zoom-in-' + val);
			KBurns.ZOOMOUT.push('zoom-out-' + val);
		});

		KBurns.ZOOM = KBurns.ZOOMIN.concat(KBurns.ZOOMOUT);
		
		KBurns.EFFECTS = KBurns.PAN.concat(KBurns.ZOOM);
		
		KBurns.REVERSES = {
			'pan-left':'pan-right',
			'pan-up':'pan-down',
			'pan-up-left':'pan-down-right', 
			'pan-up-right':'pan-down-left',
			'zoom-out':'zoom-in',
			'zoom-out-left':'zoom-in-right',
			'zoom-out-right':'zoom-in-left',
			'zoom-out-up':'zoom-in-down',
			'zoom-out-down':'zoom-in-up',
			'zoom-out-up-left':'zoom-in-down-right',
			'zoom-out-up-right':'zoom-in-down-left',
			'zoom-out-down-left':'zoom-in-up-right',
			'zoom-out-down-right':'zoom-in-up-left'
		};
	}());

	KBurns.prototype = {
		constructor: KBurns,

		set: function() {
			this._$img.stopAnimation(true).animation(this._effect, this._options);
		},

		start: function() {
			this._$img.css({animationPlayState:'running'});
		},

		stop: function() {
			this._$img.css({animationPlayState:'paused'});
		},

		restart: function() {
			this.set();
			this.start();
		},

		getRandom: function() {
			var name = this._effect.substring('random'.length).toUpperCase(),
				effects = KBurns[name];
			
			if (!$.isArray(effects)) {
				effects = KBurns.EFFECTS;
			}

			return getRandomItem(effects);
		}
	};

	//Banner Rotator Class
	function Rotator(el, opts) {
		if (this instanceof Rotator) {
			this._uid = Rotator.uid++;
			this._options = opts;
			this._stageWidth = this._options.width;
			this._stageHeight = this._options.height;
			this._rotate = this._options.autoPlay;

			this._cssTransition = (SUPPORT.transition && !ANDROID2 ? this._options.cssTransition : false);
			this._transform = SUPPORT.transform && this._cssTransition;
				
			if (!this._cssTransition) {
				$.fn.transition = $.fn.animate;
				$.fn.stopTransition = $.fn.stop;
			}

			this._timeout = null;
			this._tooltipId = null;
			this._layerIds = [];
			this._requestIds = [];
			this._interact = false;
			this._delay = 0;
			this._$rotator = $(el);
			this._$outmost = this._$rotator;
			this._namespace = '.' + Rotator.PLUGIN + '.' + this._uid;
			this._isWhite = this._$rotator.hasClass('white');
			this._hasShadow = this._$rotator.hasClass('shadow');
			this._html = this._$rotator.html();
			this._style = this._$rotator.attr('style');

			this.init();
		}
		else {
			return new Rotator(el, opts);
		}
	}
	
	Rotator.uid = 0;

	Rotator.PLUGIN = 'rotator';

	Rotator.EVENTS = ['create', 'first', 'last', 'prev', 'next', 'play', 'pause', 'change', 'changed', 'load'];

	Rotator.ANIMATE_SPEED = 500;

	Rotator.prototype = {
		constructor: Rotator,
		
		//init banner rotator
		init: function() {
			this._$rotator.attr('tabindex', -1).toggleClass('br-no-touch', !IS_TOUCH);
			if (!this._$rotator.hasClass('banner-rotator')) {
				this._$rotator.addClass('banner-rotator');
			}
			
			this._$list = this._$rotator.find('>ul');
			if (!this._$list.hasClass('slides')) {
				this._$list.addClass('slides');
			}
			
			if (this._options.shuffle) {
				shuffleElements(this._$list);
			}
			this._$items = this._$list.children().addClass('br-item');
			this._numItems = this._$items.length;
			
			if ('random' === this._options.startIndex) {
				this._activeIndex = Math.floor(Math.random() * this._numItems);
			}
			else {
				var index = getNonNegInt(this._options.startIndex, 0);
				this._activeIndex = withinRange(index, 0, this._numItems - 1) ? index : 0;
			}
			
			//init components
			this.createStyle();
			this.initOuterButtons();
			this.initStage();
			this.initItems();
			this.initNavThumbs();
			this.initCPanel();
			
			if (this._options.hideControl) {
				this._$controls = this._$screen.find('>.br-nav-wrapper').add(this._$rotator.find('>.br-cpanel-wrapper'));
				if (this._$outmost.hasClass('br-outer-navs')) {
					this._$controls = this._$controls.add(this._$outmost.children(':not(.banner-rotator, .br-wrapper)'));
				}
				this._$controls.addTransitionClass('br-opacity-transition');
			}

			if (this._options.responsive) {
				this.resize();
				$(window).on('resize' + this._namespace, debounce($.proxy(this.resize, this), 50));
			}
			else {
				var $outer = this._$rotator.css({width:this._stageWidth, height:this._stageHeight});
				$.each(['.br-wrapper', '.br-outer-navs'], function(i, selector) {
					var $el = $outer.parent(selector);
					if ($el.length) {
						$el.css({width:$outer.outerWidth(true), height:$outer.outerHeight(true)});
						$outer = $el;
					}
				});
			}

			if (this._options.mousewheel) {
				this._$rotator.on('mousewheel' + this._namespace + ' DOMMouseScroll' + this._namespace, $.proxy(this.mousescroll, this));
			}
				
			if (this._options.keyboard) {
				this._$rotator.on('keydown' + this._namespace, $.proxy(this.keyControl, this));
			}
			
			if (IS_TOUCH) {
				if (!isNone(this._options.swipe)) {
					if ('reverse' === this._options.swipeDirection) {
						this.swipeFwd = this.prevSlide;
						this.swipeBack = this.nextSlide;
					}
					else {
						this.swipeFwd = this.nextSlide;
						this.swipeBack = this.prevSlide;
					}
					this._$rotator.on('touchstart' + this._namespace, $.proxy(this.touchStart, this));
				}
			}
			else if (this._options.pauseOnHover) {
				this._$outmost.on('mouseenter' + this._namespace, $.proxy(this.pause, this))
							  .on('mouseleave' + this._namespace, $.proxy(this.play, this));
			}
			
			if (this._options.playOnce) {
				this._$rotator.on('rotatorLast', $.proxy(this.pause, this));
			}

			this.triggerEvent('create');
			
			if (this._options.preload) {
				this.setPreload();
			}
			else {
				this.loadNextImage(this._$items.toArray());
				this.loadSlide();
			}
		},
		
		setPreload: function() {
			this._$preloader.hide();
					
			var $hidden = this._$rotator.children();
			if (this._$outmost.hasClass('br-outer-navs')) {
				$hidden = $hidden.add(this._$outmost.children(':not(.banner-rotator, .br-wrapper)'));
			}
			$hidden.addClass('br-hidden');

			var $overlay = $('<div/>', {'class':'br-load-screen'}).appendTo(this._$rotator);
			this._$progressBar = $('<div/>', {'class':'br-progress-bar', html:'<div/>'}).appendTo($overlay);

			this.loadNextImage(this._$items.toArray(), function() {
				setTimeout($.proxy(function() {
					$hidden.removeClass('br-hidden');
					$overlay.fadeOut(Rotator.ANIMATE_SPEED, function() {
						$(this).remove();
					});
					this.loadSlide();
				}, this), 600);
			});
		},

		//init stage
		initStage: function() {
			this._$screen = this._$list.wrap('<div class="br-screen"></div>').parent();
			this._$stage = this._$screen.wrap('<div class="br-stage"></div>').parent();
			
			if (this._options.backgroundColor) {
				this._$stage.css({backgroundColor:this._options.backgroundColor});
			}
			this.createBorder();
			
			//init screen
			this._effects = new Effect(this);
			this._$screen.append('<div class="br-preloader"></div><div class="br-links"></div><div class="br-layers"></div>');
			this._$preloader = this._$screen.find('>.br-preloader');
			this._$linkWrapper = this._$screen.find('>.br-links');
			this._$layerWrapper = this._$screen.find('>.br-layers');
			if (this._options.pauseOnInteraction) {
				this._$linkWrapper.on('click' + this._namespace, '>a', $.proxy(this.pause, this));
			}

			//init timer
			if (!isNone(this._options.timer)) {
				var settings = {position:this._options.timerPosition, click:$.proxy(this.togglePlay, this)};
				if ('bar' === this._options.timer) {
					this._timer = new BarTimer(this, settings);
				}
				else if ('pie' === this._options.timer && SUPPORT.animation && this._transform) {
					this._timer = new PieTimer(this, settings);
				}
			}
			
			//init side buttons and thumbs
  this.initSideButtons();
		},
		
		//create border
		createBorder: function() {
			//set border options
			$.each(['width', 'style', 'color', 'radius'], $.proxy(function(i, name) {
				name = 'border' + capitalize(name);
				var	opt = this._options[name];
				if (!isEmptyStr(opt)) {
					this._$rotator.css(name, opt);
				}
			}, this));
			
   
   
   //down border

		},
		
		//create border wrapper
		createBorderWrapper: function() {
			var $wrapper = $('<div/>', {'class':'br-wrapper'}).brCopyBorder(this._$rotator);
			this._$rotator.css({border:'none', borderRadius:0}).removeClass('br-flat-shadow').wrap($wrapper);
			$wrapper = this._$rotator.parent();

			if ($wrapper.brHasBorder()) {
				$wrapper.toggleClass('br-flat-shadow', this._hasShadow).css({overflow:'hidden'});
			}
			else if (this._hasShadow && 'horizontal' === this._orientation && 'bottom' === this._cpPosition.y) {
				this._$rotator.find('>.br-3d-shadow').remove();
				this._$extPanel.addClass('br-flat-shadow');
			}
		},
		
		//init items
		initItems: function() {
			var effects = ['effect', 'duration', 'easing', 'delay'],
				kenBurns = ['kbEffect', 'kbDuration', 'kbEasing'],
				props = ['columns', 'rows', 'interval', 'direction', 'order', 'alternate', 'autoReverse', 
						 'depth', 'shapeColor', 'shapeShading', 'shapeDepth',
						 'imagePosition'].concat(effects).concat(kenBurns);
			
			this._$items.each($.proxy(function(n, el) {
				var $item = $(el).data('ready', false),
					$img = $item.children('img').first(),
					$link = $item.children('a').first();

				if ($link.length && $link.find('>img').length) {
					if (!$img.length || $link.index() < $img.index()) {
						$item.data({link:$link.attr('href'), target:$link.attr('target')});
						$img = $link.find('>img').unwrap();
					}
				}
				
				$img.addClass('br-img').data('src', $img.data('src') || $img.attr('src'));
				$.each(['thumb', 'nav-thumb'], function(i, val) {
					$img.data(val, $img.data(val) || $img.data('src'));
				});

				//set tooltip
				if ('image' === this._options.tooltip) {
					$img.data('tooltip', $img.data('tooltip') || $img.data('thumb'));
					$item.prepend($('<img/>', {alt:'', 'class':'tooltip', src:$img.data('tooltip')}));
				}
				else if ('text' === this._options.tooltip) {
					$item.data({tooltip:$item.find('>.tooltip').html() || $img.attr('title')});
				}
				
				//add link
				if ($item.data('link')) {
					$('<a/>', {id:'br-link-' + n, 'class':'br-link', href:$item.data('link'), target:$item.data('target')}).appendTo(this._$linkWrapper);
				}
				
				//set data
				$item.brMapShorthand('transition', effects).brMapShorthand('ken-burns', kenBurns);
				$.each(props, $.proxy(function(i, val) {
					$item.data(val, getValue($item.data(val), this._options[val]));
				}, this));
				
				$item.data({easing:getEasing($item.data('easing'), this._cssTransition), kbEasing:getEasing($item.data('kbEasing'), true)});

				this.initLayer($item);

				this.injectKeyframes($item);
			}, this));
	
			//init layers
			this._$layers = this._$layerWrapper.find('.br-layer');
			if (this._options.layerOnHover) {
				this.addOnHover(this._$layerWrapper, 'br-transparent');
			}
		},
		
		//create style head tag
		createStyle: function() {
			var css = document.createElement('style');
			css.type = 'text/css';
			document.getElementsByTagName('head')[0].appendChild(css);
			this._sheet = css.sheet || css.styleSheet;
		},

		//inject item's keyframes
		injectKeyframes: function($item) {
			try {
				var depth = $.isNumeric($item.data('depth')) ? -Math.abs($item.data('depth')) : 0,
					rules = this._sheet.rules || this._sheet.cssRules;

				this._sheet.insertRule('@' + PREFIX + 'keyframes ' + ('br-' + this._uid + '-' + $item.index()) + ' { ' +
											FROM_KEYFRAME + 
											'50% { ' + getTransformProperty('translateZ(' + depth + 'px)') + ' } ' + 
											TO_KEYFRAME + 
									   '} ', rules.length);
			}
			catch (err) {
			}
		},

		//init control panel
		initCPanel: function() {
			this._$cpanel = $('<div/>', {'class':'br-cpanel'});
			this._cpPosition = getPosition(this._options.cpanelPosition);

			if ('vertical' === this._options.cpanelOrientation) {
				this._orientation = 'vertical';
				if ('center' === this._cpPosition.x) {
					this._cpPosition.x = 'left';
				}
			}
			else {
				this._orientation = 'horizontal';
				if ('center' === this._cpPosition.y) {
					this._cpPosition.y = 'bottom';
				}
			}
			
			this._$cpanel.addClass('br-' + this._orientation);

			if (this._options.cpanelOutside) {
				this._$cpanel.prependTo(this._$rotator);
			}
			else {
				this._$cpanel.appendTo(this._$rotator);
			}
			
			if (this._options.groupButtons && 'bullet' !== this._options.thumbnails) {
				var size = ('vertical' === this._orientation ? 'Width' : 'Height');
				this._$cpanel.addClass('br-button-group');
				this._options['thumb' + size] = this._options['button' + size] = Math.max(this._options['thumb' + size], this._options['button' + size]);
			}

			this.initThumbnails();
			this.initButtons();
			
			var $el = this._$cpanel.children();
			if ($el.length) {
				this._$cpWrapper = this._$cpanel.wrap('<div class="br-cpanel-wrapper"></div>').parent();
				this.initButtonGroup();

				if ('vertical' === this._orientation) {
					this._$cpanel.data({pos:'top', coord:'y', dim:'height', outerDim:'outerHeight'});

					//set size
					var maxWidth = Math.max.apply(null, $el.map(function() { return $(this).outerWidth(true); }).get());
					$el.each(function() {
						$(this).css({left:(maxWidth - $(this).outerWidth(true))/2});
					});
					this._$cpanel.css({width:maxWidth});
					
					//check offset
					this.setNavOffset();
				}
				else {
					this._$cpanel.data({pos:'left', coord:'x', dim:'width', outerDim:'outerWidth'});

					//set size
					var maxHeight = Math.max.apply(null, $el.map(function() { return $(this).outerHeight(true); }).get());
					this._$cpanel.css({height:maxHeight});
				}
				
				var data = this._$cpanel.data(),
					dim = data.dim,
					outerDim = data.outerDim;

				//position control panel
				if ('center' === this._cpPosition[data.coord]) {
					this._$cpWrapper.css(data.pos, '50%');
					this._$cpanel.css(data.pos, -this._$cpanel[outerDim](true)/2);
				}
				else {
					this._$cpWrapper.css(this._cpPosition[data.coord], 0);
				}

				//set inner or outer
				if (this._options.cpanelOutside) {
					this['setOuter' + capitalize(this._orientation) + 'CPanel']();
				}
				else {
					this.setInnerCPanel();
				}

				//check overflow
				if (!isNone(this._options.thumbnails)) {
					this._buttonSize = $el.not('.br-thumbnails')['brTotal' + capitalize(dim)](true);
					this._cpanelMargin = this._$cpanel[outerDim](true) - this._$cpanel[dim]();
					
					if (this._options.responsive) {
						this._$rotator.on('resizeCPanel' + this._namespace, $.proxy(this.resizeCPanel, this));
						this.addThumbScroll();
					}
					else if (this._$cpanel[outerDim](true) > this['_stage' + capitalize(dim)]) {
						this.resizeCPanel();
						this.addThumbScroll();
					}
				}
			}
			else {
				this._$cpanel.remove();
			}
		},
		
		setNavOffset: function() {
			var margin = this._$cpWrapper.width(),
				direction = ('left' === this._cpPosition.x ? 'prev' : 'next'),
				selector = '>.br-' + direction + '-wrapper';

			if (this._$outmost.hasClass('br-outer-navs')) {
				this._$outmost.find(selector).css(this._cpPosition.x, '+=' + margin);
			}
			else if ('large' === this._options.navButtons && !this._options.cpanelOutside) {
				var $container = this._$screen.find('>.br-nav-wrapper'),
					prop = {};
				prop['margin-' + this._cpPosition.x] = '+=' + margin;
				if ($container.find(selector).length) {
					$container.find(selector).find('>.br-nav-thumb').css(prop).data({margin:margin}).end()
							  .width($container.find(selector).children().brTotalWidth(true));
				}
				else {
					$container.find('>.br-side-' + direction).css(prop);
				}
				
			}
		},

		//init button group
		initButtonGroup: function() {
			var $first = this._$cpanel.children().first(),
				$last = this._$cpanel.children().last();

			if ($first.hasClass('br-thumbnails')) {
				$first = $first.find('>ul').children().first();
			}
			$first.addClass('br-first-item');

			if ($last.hasClass('br-thumbnails')) {
				$last = $last.find('>ul').children().last();
			}
			$last.addClass('br-last-item');
		},

		//set inner cpanel
		setInnerCPanel: function() {
			this._$cpWrapper.css(this._cpPosition['vertical' === this._orientation ? 'x' : 'y'], 0);
			
			if (this._options.cpanelOnHover) {
				this.addOnHover(this._$cpanel, 'br-transparent');
			}
		},

		//create outer cpanel background
		createCPanelBg: function() {
			this._$extPanel = this._$cpWrapper.wrap('<div class="br-ext-cp"></div>').parent();
			this._$extPanel.toggleClass('white', this._isWhite || this._$rotator.hasClass('white-cpanel'));
			
			if (SUPPORT.transform3d && SUPPORT.preserve3d) {
				var $face = $('<div/>').toggleClass('white', this._$extPanel.hasClass('white'));
				$('<div/>', {
					'class':'br-stage-bg',
					html:$('<div/>').append($face)
				}).prependTo(this._$stage);
				
				if ('vertical' === this._orientation) {
					$face.addClass('br-face-' + this._cpPosition.x);
					if (this._options.responsive) {
						this._$rotator.on('resizeCPanel' + this._namespace, function() {
							$face.width($face.height());
						});
					}
					else {
						$face.width(this._stageHeight);
					}
				}
				else {
					$face.addClass('br-face-' + this._cpPosition.y);
				}
			}
		},

		//set outer horizontal cpanel
		setOuterHorizontalCPanel: function() {
			var pos = this._cpPosition.y,
				size = this._$cpWrapper.height();

			this.createCPanelBg();
			this._$stage.css('padding-' + pos, getNonNegInt(this._options.cpanelGap, 0));
			this._$rotator.css('margin-' + pos, size).css({overflow:'visible'});
			this._$extPanel.css({left:0, width:'100%', height:size}).css(pos, -size);
			this.createBorderWrapper();
		},
		
		//set outer vertical cpanel
		setOuterVerticalCPanel: function() {
			var pos = this._cpPosition.x,
				size = this._$cpWrapper.width();

			this.createCPanelBg();
			this._$rotator.css('margin-' + pos, size).css({overflow:'visible'});
			this._$extPanel.css({top:0, width:size, height:'100%'}).css(pos, -size);
			this.createBorderWrapper();
		},
		
		//init buttons
		initButtons: function() {
			var $playButton, $prevButton, $nextButton;

			//init play button
			if (this._options.playButton) {
				$playButton = $('<div/>', {
					'class':'br-play-button',
					title:this._rotate ? this._options.pauseText : this._options.playText,
					html:'<div/>'
				}).toggleClass('br-pause', this._rotate)
				.on('click' + this._namespace, $.proxy(this.togglePlay, this))
				.appendTo(this._$cpanel);
			}
			
			//init navigation buttons
			if (true === this._options.navButtons || 'small' === this._options.navButtons) {
				$prevButton = $('<div/>', {
					'class':'br-prev-button',
					title:this._options.prevText,
					html:'<div/>'
				}).toggleClass('br-up', 'vertical' === this._orientation)
				.on('click' + this._namespace, $.proxy(this.prevSlide, this));

				$nextButton = $('<div/>', {
					'class':'br-next-button',
					title:this._options.nextText,
					html:'<div/>'
				}).toggleClass('br-down', 'vertical' === this._orientation)
				.on('click' + this._namespace, $.proxy(this.nextSlide, this));

				if ($playButton) {
					$playButton.before($prevButton).after($nextButton);
				}
				else {
					this._$cpanel.prepend($prevButton).append($nextButton);
				}
			}
			
			this._$cpanel.children(':not(.br-thumbnails)')
						.css({width:this._options.buttonWidth, height:this._options.buttonHeight, margin:this._options.buttonMargin})
						.toggleClass('white', this._isWhite || this._$rotator.hasClass('white-button'))
						.addTransitionClass('br-color-transition');
		},
		
		//init side buttons
		initSideButtons: function() {
			if ('large' === this._options.navButtons) {
				var $wrapper = $('<div/>', {'class':'br-nav-wrapper'}).appendTo(this._$screen);

				var $prevButton = $('<div/>', {
					'class':'br-side-prev',
					title:this._options.prevText,
					html:'<div/>'
				}).on('click' + this._namespace, $.proxy(this.prevSlide, this));

				var $nextButton = $('<div/>', {
					'class':'br-side-next',
					title:this._options.nextText,
					html:'<div/>'
				}).on('click' + this._namespace, $.proxy(this.nextSlide, this));

				var $buttons = $prevButton.add($nextButton).appendTo($wrapper).find('>div').addTransitionClass('br-element-transition');

				if (this._options.navButtonsOnHover) {
					this.addOnHover($buttons, 'br-shrink');
				}
			}
		},

		//init outer buttons
		initOuterButtons: function() {
			if (-1 < $.inArray(this._options.navButtons, ['outside', 'outer'])) {
				this._$outmost = this._$rotator.wrap('<div class="br-outer-navs"></div>').parent();
				
				var $prevNav = $('<div/>', {
					'class':'br-outer-prev',
					title:this._options.prevText,
					html:'<div/>'
				}).on('click' + this._namespace, $.proxy(this.prevSlide, this)).appendTo(this._$outmost);

				var $nextNav = $('<div/>', {
					'class':'br-outer-next',
					title:this._options.nextText,
					html:'<div/>'
				}).on('click' + this._namespace, $.proxy(this.nextSlide, this)).appendTo(this._$outmost);

				var margin = getNonNegInt(this._options.sideButtonMargin, 0);
				if (0 < margin) {
					$prevNav.css({paddingRight:margin}).css({left:-$prevNav.outerWidth()}).find('>div').css({marginLeft:'-=' + margin/2});
					$nextNav.css({paddingLeft:margin}).css({right:-$nextNav.outerWidth()}).find('>div').css({marginLeft:'+=' + margin/2});
				}

				if (this._options.navButtonsOnHover) {
					this.addOnHover($prevNav.add($nextNav), 'br-shrink');
				}
			}
		},

		//init nav thumbs
		initNavThumbs: function() {
			if (!IS_TOUCH && this._options.navThumbs && -1 < $.inArray(this._options.navButtons, ['large', 'outside', 'outer'])) {
				var $prevNav, $nextNav,
					$prevWrapper = $('<div/>', {'class':'br-prev-wrapper', data:{pos:'left'}}),
					$nextWrapper = $('<div/>', {'class':'br-next-wrapper', data:{pos:'right'}});
				
				//init wrappers
				if ('large' === this._options.navButtons) {
					$prevWrapper = this._$screen.find('>.br-nav-wrapper>.br-side-prev').wrap($prevWrapper).parent();
					$nextWrapper = this._$screen.find('>.br-nav-wrapper>.br-side-next').wrap($nextWrapper).parent();
				}
				else {
					$prevNav = this._$outmost.find('>.br-outer-prev').data({wrapper:$prevWrapper});
					$nextNav = this._$outmost.find('>.br-outer-next').data({wrapper:$nextWrapper});
					$prevNav.add($nextNav).each($.proxy(function(n, el) {
						var $wrapper = $(el).data('wrapper'),
							pos = $wrapper.data('pos');
						$wrapper.insertAfter($(el)).css(pos, '+=' + parseInt(this._$rotator.css('border-' + pos + '-width'), 10));
					}, this));
				}
				
				//init thumbs
				var $prevThumb = $('<div/>', {'class':'br-nav-thumb'}).on('click' + this._namespace, $.proxy(this.prevSlide, this)).prependTo($prevWrapper),
					$nextThumb = $('<div/>', {'class':'br-nav-thumb'}).on('click' + this._namespace, $.proxy(this.nextSlide, this)).appendTo($nextWrapper),
					content = '';
				
				this._$items.each(function(n, el) {
					var src = $(el).find('>img.br-img').data('nav-thumb');
					if (SUPPORT.backgroundSize) {
						content += '<div data-src="' + src + '"></div>';
					}
					else {
						content += '<img data-src="' + src + '"/>';
					}
				});
				$prevThumb.add($nextThumb).html(content);
	
				var $wrappers = $prevWrapper.add($nextWrapper);
				$wrappers.each($.proxy(function(n, el) {
					var $thumb = $(el).find('>.br-nav-thumb').css({width:this._options.navThumbWidth, height:this._options.navThumbHeight}),
						$imgs = $thumb.children().addTransitionClass('br-opacity-transition');
					
					$(el).height($thumb.outerHeight(true)).css({marginTop:-$(el).outerHeight()/2, width:$(el).children().brTotalWidth(true)});
					this.loadNextThumb($imgs.toArray(), false);
				}, this)).toggleClass('white', this._isWhite || this._$rotator.hasClass('white-nav-thumb'));
					
				//bind event handlers
				if ('large' === this._options.navButtons) {
					$wrappers.each($.proxy(function(n, el) {
						var $thumb = $(el).find('>.br-nav-thumb').addClass('br-transparent').addTransitionClass('br-opacity-transition'),
							pos = $(el).data('pos');
						
						$(el).css(pos, -$thumb.outerWidth(true))
							 .on('mouseenter' + this._namespace, {pos:pos}, $.proxy(this.showNavWrapper, this))
							 .on('mouseleave' + this._namespace, {pos:pos}, this.hideNavWrapper);
					}, this));
				}
				else {
					$wrappers.addClass('br-shrink').addTransitionClass('br-all-transition')
						  	.on('mouseenter' + this._namespace, function() { $(this).addClass('br-hover-on'); })
						  	.on('mouseleave' + this._namespace, function() { $(this).removeClass('br-hover-on').addClass('br-shrink'); });

					$prevNav.add($nextNav).on('mouseenter' + this._namespace, $.proxy(this.showNavThumb, this))
										  .on('mouseleave' + this._namespace, this.hideNavThumb);
				}

				this._$rotator.on('updateNavThumbs' + this._namespace, $.proxy(function() {
					var $prevItem = this._$currItem.brPrev(),
						$nextItem = this._$currItem.brNext(),
						$prevImg = $prevThumb.children().eq($prevItem.index()),
						$nextImg = $nextThumb.children().eq($nextItem.index());
					
					this.loadNavThumb($prevImg);
					this.loadNavThumb($nextImg);
					
					if (CHROME) {
						$prevWrapper.data('thumb-kb', new KBurns($prevImg, $prevItem.data('kb-effect')));
						if ($prevWrapper.add($prevNav).hasClass('br-hover-on')) {
							this.startNavKB($prevWrapper);
						}
						
						$nextWrapper.data('thumb-kb', new KBurns($nextImg, $nextItem.data('kb-effect')));
						if ($nextWrapper.add($nextNav).hasClass('br-hover-on')) {
							this.startNavKB($nextWrapper);
						}
					}
				}, this));
			}
		},
		
		loadNavThumb: function($img) {
			$img.siblings().addBack().css({opacity:0});
			$img.reflow().css({opacity:1});
		},

		showNavWrapper: function(e) {
			var $wrapper = $(e.currentTarget),
				prop = {};
			prop[e.data.pos] = 0;

			$wrapper.animate(prop, {duration:Rotator.ANIMATE_SPEED, queue:false,
				complete:function() {
					$(this).find('>.br-nav-thumb').removeClass('br-transparent');
				}
			}).addClass('br-hover-on');
			this.startNavKB($wrapper);
		},
			
		hideNavWrapper: function(e) {
			var $wrapper = $(e.currentTarget),
				$thumb = $wrapper.find('>.br-nav-thumb'),
				margin = $thumb.data('margin') || 0,
				prop = {};
			prop[e.data.pos] = -$thumb.outerWidth(true) + margin;

			$wrapper.stop(true, true).animate(prop, {duration:Rotator.ANIMATE_SPEED, queue:false}).removeClass('br-hover-on');
			$thumb.addClass('br-transparent');
		},

		showNavThumb: function(e) {
			var $nav = $(e.currentTarget).addClass('br-hover-on'),
				$wrapper = $nav.data('wrapper').removeClass('br-shrink');
			
			this.startNavKB($wrapper);
		},

		hideNavThumb: function(e) {
			var $nav = $(e.currentTarget).removeClass('br-hover-on'),
				$wrapper = $nav.data('wrapper');

			setTimeout(function() {
				if (!$wrapper.hasClass('br-hover-on')) {
					$wrapper.addClass('br-shrink');
				}
			}, 100);
		},

		startNavKB: function($wrapper) {
			var kBurns = $wrapper.data('thumb-kb');
			if (kBurns) {
				kBurns.restart();
			}
		},

		//init thumbnails
		initThumbnails: function() {
			if (!isNone(this._options.thumbnails)) {
				this._$thumbPanel = $('<div/>', {'class':'br-thumbnails'}).prependTo(this._$cpanel);
				this._$thumbList = $('<ul/>').prependTo(this._$thumbPanel);
				
				for (var i = 0; i < this._numItems; i++) {
					var $li = $('<li/>');
					switch(this._options.thumbnails) {
						case 'number':
							$li.html(i + 1);
							break;
						case 'text':
							$li.html(this._$items.eq(i).find('>img.br-img').attr('title'));
							break;
						case 'image':
							var $img = (SUPPORT.backgroundSize ? $('<div/>') : $('<img/>', {alt:''}));
							$img.data({src:this._$items.eq(i).find('>img.br-img').data('thumb')})
								.addTransitionClass('br-opacity-transition').wrap('<div class="br-img-wrapper"></div>');
							$li.addClass('br-img-thumb').prepend($img.parent());
							break;
						case 'bullet':
							$li.addClass('br-bullet');
							break;
					}
					this._$thumbList.append($li);
				}
				this._$thumbs = this._$thumbList.children();
				this._$thumbs.toggleClass('white', this._isWhite || this._$rotator.hasClass('white-thumb'))
							 .addTransitionClass('br-color-transition')
							 .on((this._options.selectOnHover ? 'mouseenter' : 'click') + this._namespace, $.proxy(this.selectSlide, this));

				if ('bullet' !== this._options.thumbnails) {
					if ('image' === this._options.thumbnails) {
						var $wrappers = this._$thumbs.children();
						$wrappers.css({width:this._options.thumbWidth - ($wrappers.outerWidth(true) - $wrappers.width()), height:this._options.thumbHeight - ($wrappers.outerHeight(true) - $wrappers.height())});
						this.loadNextThumb($wrappers.children().toArray(), true);
					}
					this._$thumbs.css({width:this._options.thumbWidth, height:this._options.thumbHeight, margin:this._options.thumbMargin, lineHeight:this._options.thumbHeight + 'px'});
				}
				
				this._$thumbList.css('vertical' === this._orientation ? {width:this._$thumbs.outerWidth(true)} : {height:this._$thumbs.outerHeight(true)});
				
				this._$rotator.on('rotatorChange', $.proxy(function() {
					this._$thumbs.eq(this._activeIndex).addClass('br-active').siblings().removeClass('br-active');
				}, this));

				this.initTooltip();
			}
		},
		
		//init layer
		initLayer: function($item) {
			var	$layers = $item.children(':not(.tooltip, img.br-img)').addClass('br-layer'),
				$bin = $('<div/>', {
					id:'br-layers-' + $item.index(),
					'class':'br-layer-bin',
					html:$layers
				}).appendTo(this._$layerWrapper);

			$layers.each($.proxy(function(n, el) {
				var $el = $(el),
					metric = {};

				if ('auto' === el.style.width && 'auto' === el.style.height) {
					$el.css('white-space', 'nowrap');
				}
				
				$.each(SIDES, $.proxy(function(i, side) {
					var pos = el.style[side];
					if ($.isNumeric(parseInt(pos, 10))) {
						if (!isPercent(pos)) {
							var dim = (-1 < $.inArray(side, ['top', 'bottom']) ? this._stageHeight : this._stageWidth);
							$el.css(side, (getInt(pos, 0)/dim * 100) + '%');
						}
						$el.css(OPPOSITE_SIDE[side], 'auto');
					}
					metric['padding-' + side] = getInt($el.css('padding-' + side), 0);
					metric['border-' + side + '-width'] = getInt($el.css('border-' + side + '-width'), 0);
				}, this));

				metric.width = $.isNumeric(parseInt(el.style.width, 10)) ? $el.width() : 'auto';
				metric.height = $.isNumeric(parseInt(el.style.height, 10)) ? $el.height() : 'auto';
				$.each(['fontSize', 'lineHeight', 'letterSpacing'], function(i, prop) {
					metric[prop] = parseInt($el.css(prop), 10);
				});

				$el.data({opacity:getFloat($el.css('opacity'), 1), metric:metric});
				$.each(['', 'Out'], $.proxy(function(i, dir) {
					var props = ['effect' + dir, 'duration' + dir, 'easing' + dir, 'delay' + dir];
					$el.brMapShorthand('transition' + dir, props);
					$.each(props, $.proxy(function(j, prop) {
						$el.data(prop, getValue($el.data(prop), this._options['layer' + capitalize(prop)]));
					}, this));
					$el.data('easing' + dir, getEasing($el.data('easing' + dir), this._cssTransition));
				}, this));
			}, this));
		},

		//init tooltip
		initTooltip: function() {
			if (!IS_TOUCH && !isNone(this._options.tooltip)) {
				var $inner = $('<div/>', {
					'class':'br-tooltip-inner',
					css:{width:this._options.tooltipWidth, height:this._options.tooltipHeight}
				});

				this._$tooltip = $('<div/>', {
					'class':'br-tooltip br-tooltip-' + OPPOSITE_SIDE[this._cpPosition['vertical' === this._orientation ? 'x' : 'y']],
					html:$inner.add('<div class="br-tail"/>')
				}).toggleClass('white', this._isWhite || this._$rotator.hasClass('white-tooltip')).prependTo($('body'));
				
				if ('image' === this._options.tooltip) {
					this._$items.each($.proxy(function(n, el) {
						var $thumb = this._$thumbs.eq(n),
							$img = $(el).find('>img.tooltip');

						if ($img.length && $img.attr('src')) {
							var $content = $img.clone().removeClass().addClass('br-transparent').appendTo($inner);
							$img.brHandleImage($img.attr('src'), {
								complete: $.proxy(function() {
									$img.brFill(this._options.tooltipWidth, this._options.tooltipHeight);
									$content.css({top:$img.css('top'), left:$img.css('left'), width:$img.width(), height:$img.height()})
											.removeClass('br-transparent');
									$img.remove();
									if (CHROME) {
										$thumb.data('tooltip-kb', new KBurns($content, $(el).data('kb-effect')));
									}
								}, this)
							});

							$thumb.on('mouseenter' + this._namespace, $.proxy(function(e) {
								this._$tooltip.stop(true, true);
								$content.show().siblings().hide();
								this.displayTooltip($(e.currentTarget));
							}, this)).on('mouseleave' + this._namespace, $.proxy(this.hideTooltip, this));
						}
					}, this));
				}
				else {
					this._$items.each($.proxy(function(n, el) {
						var caption = $(el).data('tooltip');
						if (!isEmptyStr(caption)) {
							this._$thumbs.eq(n).on('mouseenter' + this._namespace, $.proxy(function(e) {
								this._$tooltip.stop(true, true);
								$inner.html(caption);
								this.displayTooltip($(e.currentTarget));
							}, this)).on('mouseleave' + this._namespace, $.proxy(this.hideTooltip, this));
						}
					}, this));
				}
				
				if (!SUPPORT.pointerEvents && document.elementFromPoint) {
					this._$tooltip.on('mouseleave' + this._namespace, $.proxy(function(e) {
						if (!$(document.elementFromPoint(e.clientX, e.clientY)).closest('.banner-rotator').is(this._$rotator)) {
							this._$outmost.trigger('mouseleave' + this._namespace);
						}
					}, this));
				}
			}
		},
		
		//display tooltip
		displayTooltip: function($thumb) {
			var $base = (this._options.cpanelOutside ? this._$extPanel : $thumb),
				top, left;
			
			if ('vertical' === this._orientation) {
				left = $base.offset().left;
				if ('left' === this._cpPosition.x) {
					left += $base.width();
				}
				else {
					left -= this._$tooltip.outerWidth();
				}
				top = $thumb.offset().top - (this._$tooltip.height() - $thumb.height())/2;
			}
			else {
				top = $base.offset().top;
				if ('top' === this._cpPosition.y) {
					top += $base.height();
				}
				else {
					top -= this._$tooltip.outerHeight();
				}
				left = $thumb.offset().left - (this._$tooltip.width() - $thumb.width())/2;
			}
			
			this._tooltipId = setTimeout($.proxy(function() {
				this._$tooltip.css({opacity:0, top:top, left:left}).show().animate({opacity:1}, Rotator.ANIMATE_SPEED, 
					function() {
						var kBurns = $thumb.data('tooltip-kb');
						if (kBurns) {
							kBurns.start();
						}
					});
			}, this), this._options.tooltipDelay);
		},
		
		//hide tooltip
		hideTooltip: function(e) {
			clearTimeout(this._tooltipId);
			if (this._$tooltip) {
				this._$tooltip.stop(true).fadeOut(Rotator.ANIMATE_SPEED);
			}
		},
		
		//navigate to
		navigateTo: function(interact, fn, args) {
			this._interact = interact;
			if (this._interact && this._options.pauseOnInteraction) {
				this.pause();
			}
			
			if (!this._effects.inProgress()) {
				if (this._options.layerOutSync) {
					this.deferredLoad(fn, args);
				}
				else {
					fn.apply(this, args);
				}
			}
		},

		//select slide
		selectSlide: function(e) {
			var index = (typeof e === 'number' ? parseInt(e, 10) : $(e.currentTarget).index());
			if (withinRange(index, 0, this._numItems - 1) && index !== this._activeIndex) {
				this.navigateTo(true, this.select, [index]);
			}
		},
		
		select: function(index) {
			this._backward = index < this._activeIndex;
			this._activeIndex = index;
			this.loadSlide();
		},
		
		//to previous slide
		prevSlide: function() {
			this.navigateTo(true, this.prev, [true]);
		},
		
		prev: function(triggerEvent) {
			this._backward = true;
			this._activeIndex = (0 < this._activeIndex ? (this._activeIndex - 1) : (this._numItems - 1));
			if (triggerEvent) {
				this.triggerEvent('prev', {index:this._activeIndex});
			}
			this.loadSlide();
		},
		
		//to next slide
		nextSlide: function() {
			this.navigateTo(true, this.next, [true]);
		},
		
		next: function(triggerEvent) {
			this._backward = false;
			this._activeIndex = (this._numItems - 1 > this._activeIndex ? (this._activeIndex + 1) : 0);
			if (triggerEvent) {
				this.triggerEvent('next', {index:this._activeIndex});
			}
			this.loadSlide();
		},
		
		//rotate slide
		rotateSlide: function() {
			this.navigateTo(false, this.next, [false]);
		},
		
		//toggle play
		togglePlay: function() {
			if (this._rotate) {
				this.pause();
			}
			else {
				this.play();
			}
		},
		
		//play
		play: function() {
			if (!this._rotate) {
				this._rotate = true;
				this._$cpanel.find('>.br-play-button').addClass('br-pause').attr({title:this._options.pauseText});
				if (!this._effects.inProgress()) {
					this.resumeTimer();
				}
				this.triggerEvent('play', {index:this._activeIndex, delay:this._delay});
			}
		},
	
		//pause
		pause: function() {
			if (this._rotate) {
				this._rotate = false;
				this._$cpanel.find('>.br-play-button').removeClass('br-pause').attr({title:this._options.playText});
				if (!this._effects.inProgress()) {
					this.pauseTimer();
				}
				this.triggerEvent('pause', {index:this._activeIndex, delay:this._delay});
			}
		},
		
		//display layers
		displayLayers: function() {
			this.stopLayers(true);
			this._layerIds = [];
			this._requestIds = [];
			
			var $wrapper = this._$layerWrapper.find('>#br-layers-' + this._$currItem.index());
			$wrapper.addClass('br-active-layers').siblings().removeClass('br-active-layers');
			$wrapper.children().each($.proxy(function(n, el) {
				var $layer = $(el),
					delay = getNonNegInt($layer.data('delay'), 0);

				this._layerIds.push(setTimeout($.proxy(function() {
					var id = requestAnimationFrame($.proxy(function() {
						$layer.css({opacity:$layer.data('opacity'), margin:0, transform:'none'}).show();
						this.animateLayer($layer, false);
						this.queueLayerOut($layer);
					}, this));
					this._requestIds.push(id);
				}, this), delay));
			}, this));
		},
		
		//hide layer
		hideLayer: function($layer) {
			$layer.stopTransition(true, true).stopAnimation(true, true);
			this.animateLayer($layer, true);
			$layer.data('promise', $layer.promise());
		},

		//animate layer
		animateLayer: function($layer, out) {
			var data = $layer.data(),
				dir = (out ? 'Out' : ''),
				effect = data['effect' + dir],
				opts = {duration:parseInt(data['duration' + dir], 10), easing:data['easing' + dir], complete:$.noop};

			if (/^slide/.test(effect)) {
				opts.direction = effect.substring('slide'.length).toLowerCase();
				opts.mode = (out ? 'hide' : 'show');
				opts.transform = this._transform;
				$layer.brSlideEffect(opts);
				return;
			}

			if (out) {
				if (effect in OPPOSITE_LAYER) {
					effect = OPPOSITE_LAYER[effect];
				}
				
				opts.complete = function() {
					$layer.hide();
				};
			}
			
			if (/^(blur|flip|spin|zoom)/.test(effect) && SUPPORT.animation && this._transform) {
				var animationName = 'br-layer-' + camelToDash(effect);
				if (out) {
					animationName += '-out';
				}
				$layer.animation(animationName, opts);
			}
			else {
				var props;
				if (/^(move|shift)/.test(effect)) {
					var match = effect.match(/^(move|shift)/);
					props = this['get' + capitalize(match[0]) + 'Props']($layer, effect.substring(match[0].length).toLowerCase());
				}
				else if ('none' === effect) {
					opts.complete.call(this);
					return;
				}
				else {
					props = {
						from:{opacity:0},
						to:{opacity:data.opacity}
					};
				}

				if (out) {
					props = {from:props.to, to:props.from};
				}

				$layer.css(props.from).transition(props.to, opts);
			}
		},

		queueLayerOut: function($layer) {
			var delay = getNonNegInt($layer.data('delayOut'), 0);
			if (0 < delay) {
				$layer.promise().done($.proxy(function() {
					this._layerIds.push(setTimeout($.proxy(function() { 
						this.hideLayer($layer);
					}, this), delay));
				}, this));
			}
		},

		//stop layers
		stopLayers: function(stop) {
			while(this._layerIds.length) {
				clearTimeout(this._layerIds.pop());
			}

			while(this._requestIds.length) {
				cancelAnimationFrame(this._requestIds.pop());
			}

			if (stop) {
				this._$layers.stopTransition(true, true).stopAnimation(true, true);
			}
		},
		
		//clear layers
		clearAllLayers: function(transition) {
			this.stopLayers(true);
			var $layers = this._$layers.filter(':visible');
			if (transition) {
				$layers.each($.proxy(function(n, el) { 
					this.hideLayer($(el));
				}, this));
			}
			else {
				$layers.hide();
			}
		},
		
		//get move property
		getMoveProps: function($el, direction) {
			var isHorizontal = ('left' === direction || 'right' === direction),
				dim = isHorizontal ? 'outerWidth' : 'outerHeight',
				fwd = ('right' === direction || 'down' === direction),
				from = {},
				to = {},
				pos, translate, side;
			
			if (this._transform) {
				if (isHorizontal) {
					pos = $el.position().left;
					translate = 'translateX';
				}
				else {
					pos = $el.position().top;
					translate = 'translateY';
				}
			}
			else {
				side = (isHorizontal ? 'right' : 'bottom');
				if ($.isNumeric(parseInt($el[0].style[side], 10))) {
					fwd = !fwd;
				}
				else {
					side = OPPOSITE_SIDE[side];
				}
				pos = Math.round(parseFloat($el[0].style[side])/100 * this._$screen[dim]());
			}
			
			var offset = (fwd ? -(pos + $el[dim]() + 1) : (this._$screen[dim]() - pos) + 1);
			if (this._transform) {
				from.transform = translate + '(' + offset + 'px)';
				to.transform = translate + '(0px)';
			}
			else {
				from['margin-' + side] = offset;
				to['margin-' + side] = 0;
			}
			return {from:from, to:to};
		},

		//get shift property
		getShiftProps: function($el, direction) {
			var isHorizontal = ('left' === direction || 'right' === direction),
				inverse = ('right' === direction || 'down' === direction ? -1 : 1),
				from = {opacity:0},
				to = {opacity:1};
			
			if (this._transform) {
				var translate = 'translate' + (isHorizontal ? 'X' : 'Y');
				from.transform = translate + '(' + (inverse * 100) + '%)';
				to.transform = translate + '(0)';
			}
			else {
				var side, dim;
				if (isHorizontal) {
					side = 'right';
					dim = 'outerWidth';
				}
				else {
					side = 'bottom';
					dim = 'outerHeight';
				}
				
				if ($.isNumeric(parseInt($el[0].style[side], 10))) {
					inverse *= -1;
				}
				else {
					side = OPPOSITE_SIDE[side];
				}

				from['margin-' + side] = inverse * $el[dim]();
				to['margin-' + side] = 0;
			}
			return {from:from, to:to};
		},

		//deferred load
		deferredLoad: function(fn, args) {
			if (!this._promise || 'pending' !== this._promise.state()) {
				this._$items.find('>img.br-img').off('load.display');
				this.resetTimer();
				this.stopLayers(false);
				
				var $layers = this._$layers.filter(':visible');
				if ($layers.length) {
					var promises = [],
						max = 0;

					$layers.each($.proxy(function(n, el) {
						var promise = $(el).data('promise');
						if (!promise || 'pending' !== promise.state()) {
							this.hideLayer($(el));
						}
						promises.push($(el).data('promise'));
						max = Math.max(max, $(el).data('duration-out'));
					}, this)).removeData('promise');

					this._promise = $.when.apply(null, promises)
									  	.always($.proxy(function() { 
											fn.apply(this, args);
										}, this));

					setTimeout(function() {
						$layers.dequeue();
					}, max + 100);
				}
				else {
					fn.apply(this, args);
				}
			}
		},
		
		//load current slide
		loadSlide: function() {
			this._$items.find('>img.br-img').off('load.display');
			this.resetTimer();

			this._effects.clear();
			this._$linkWrapper.children().hide();
			this.clearAllLayers(true);

			//trigger events
			var params = {index:this._activeIndex};
			this.triggerEvent('change', params);
			if (0 === this._activeIndex) {
				this.triggerEvent('first', params);
			}
			if (this._numItems - 1 === this._activeIndex) {
				this.triggerEvent('last', params);
			}

			//load content
			var $item = this._$items.eq(this._activeIndex);
			if ($item.data('ready')) {
				this.displayContent($item);
			}
			else {
				this._$preloader.show();
				var $img = $item.find('>img.br-img');
				$img.brHandleImage($img.data('src'), {
					namespace:'display',
					complete:$.proxy(function() {
						if (!$item.data('ready')) {
							this.processImage($item);
						}
						this.displayContent($item);
					}, this)
				});
			}
		},
		
		//display current content
		displayContent: function($item) {
			this._$preloader.hide();
					
			this._$prevItem = this._$currItem;
			this._$currItem = $item;
			var data = this._$currItem.data();
			
			//update nav thumbs
			this._$rotator.trigger('updateNavThumbs' + this._namespace);

			//control sync
			if (this._options.hideControl) {
				this._$controls.addClass('br-transparent');
				this.hideTooltip();
			}

			//display layers
			if (!this._options.layerSync) {
				this.displayLayers();
			}
			
			//set ken burns
			if (CHROME || !IS_TOUCH) {
				this._kBurns = new KBurns(this._$currItem.find('>img.br-img'), data.kbEffect, {duration:getPosInt(data.kbDuration, data.delay), easing:data.kbEasing});
			}

			//activate
			var effectOff = (!this._options.effectOnInteraction && this._interact) || (!this._options.effectOnStart && !this._$prevItem);
			if (effectOff || (0 > $.inArray(data.effect, Effect.EFFECTS) && 'random' !== data.effect)) {
				this.activateItem(false);
			}
			else {
				this._effects.start(data);
			}
		},
		
		//activate current item
		activateItem: function(isResize) {
			if (!isResize) {
				this.triggerEvent('changed', {index:this._activeIndex});
			}

			this._$currItem.css({visibility:'visible'}).siblings().css({visibility:'hidden'});
			this._$linkWrapper.children('a#br-link-' + this._$currItem.index()).show();

			if (isResize || this._options.layerSync) {
				this.displayLayers();
			}
			
			if (this._options.hideControl) {
				this._$controls.removeClass('br-transparent');
			}
			
			this.startTimer();
		},
		
		//load next image
		loadNextImage: function(items, complete) {
			if (items.length) {
				this.loadImage($(items.shift())).always($.proxy(function() {
					if (this._$progressBar) {
						this._$progressBar.children().width((this._numItems - items.length)/this._numItems * 100 + '%');
					}
					this.loadNextImage(items, complete);
				}, this));
			}
			else if ($.isFunction(complete)) {
				complete.call(this);
			}
		},

		//load image
		loadImage: function($item) {
			var deferred = $.Deferred(),
				$img = $item.find('>img.br-img');
			
			$img.brHandleImage($img.data('src'), {
				complete: $.proxy(function() {
					if (!$item.data('ready')) {
						this.processImage($item);
					}
					deferred.resolve();
				}, this),
				error: function() { 
					deferred.reject();
				}
			});

			return deferred.promise();
		},
		
		//load next thumb
		loadNextThumb: function(thumbs, fadeIn) {
			if (thumbs.length) {
				this.loadThumb($(thumbs.shift()), fadeIn).always($.proxy(function() {
					this.loadNextThumb(thumbs, fadeIn);
				}, this));
			}
		},

		//load thumb
		loadThumb: function($thumb, fadeIn) {
			var deferred = $.Deferred(),
				$img = ($thumb.is('img') ? $thumb : $('<img/>'));
			
			$img.brHandleImage($thumb.data('src'), {
				complete: function() {
					if ($thumb.is('img')) {
						$thumb.brFill($thumb.parent().width(), $thumb.parent().height());
					}
					else {
						$thumb.css({backgroundImage:'url(' + $thumb.data('src') + ')'});
					}

					if (fadeIn) {
						$thumb.css({opacity:1});
					}
					deferred.resolve();
				},
				error: function() { 
					deferred.reject();
				}
			});

			return deferred.promise();
		},

		//process image
		processImage: function($item) {
			$item.data('ready', true);
			var $img = $item.find('>img.br-img'),
				position = $item.data('imagePosition'),
				arr = (position + '').split(' ', 2);
				
			if (2 === arr.length) {
				$.each(['left', 'top'], function(i, val) {
					var pos = arr[i];
					if ($.isNumeric(parseInt(pos, 10))) {
						$img.css(val, $.isNumeric(pos) ? parseInt(pos, 10) : pos);
					}
				});
			}
			else if (-1 < $.inArray(position, ['fill', 'fit', 'stretch', 'center'])) {
				var fn = 'br' + capitalize(position);
				if ($.isFunction($img[fn])) {
					$img[fn](this._stageWidth, this._stageHeight);
				}
			}
			
			if (this._options.responsive) {
				var ratio = this._$stage.width()/this._stageWidth,
					props = {top:parseInt($img.css('top'), 10), left:parseInt($img.css('left'), 10), width:$img.width(), height:$img.height()};
				
				$img.data('metric', props);
				$.each(props, function(name, val) {
					$img.css(name, Math.round(ratio * val));
				});
			}
			
			this.triggerEvent('load', {index:$item.index()});
		},
		
		//start timer
		startTimer: function() {
			this._delay = getPosInt(this._$currItem.data('delay'), $.fn.bannerRotator.defaults.delay);
			this.resumeTimer();
		},
		
		//resume timer
		resumeTimer: function() {
			if (this._rotate && 0 < this._delay) {
				this._start = $.now();
				this._timeout = setTimeout($.proxy(this.rotateSlide, this), this._delay);
				
				if (this._kBurns) {
					this._kBurns.start();
				}

				if (this._timer) {
					this._timer.start(this._delay);
				}
			}
		},
		
		//reset timer
		resetTimer: function(isResize) {
			this._delay = 0;
			clearTimeout(this._timeout);

			if (this._kBurns) {
				this._kBurns[isResize ? 'set' : 'stop']();
			}

			if (this._timer) {
				this._timer.stop();
			}
		},
		
		//pause timer
		pauseTimer: function() {
			if (this._start) {
				this._delay -= ($.now() - this._start);
			}
			clearTimeout(this._timeout);

			if (this._kBurns) {
				this._kBurns.stop();
			}
			
			if (this._timer) {
				this._timer.pause();
			}
		},
		
		//add mouseenter & mouseleave handlers
		addOnHover: function($el, hide) {
			if (!IS_TOUCH) {
				$el.addClass(hide).addTransitionClass('br-all-transition');
				this._$outmost.on('mouseenter' + this._namespace, function() { 
								$el.removeClass(hide); 
							})
							.on('mouseleave' + this._namespace, $.proxy(function(e) { 
								if (!this.onTooltip(e)) {
									$el.addClass(hide);
								}
							}, this));
			}
		},
		
		//add thumb scrolling
		addThumbScroll: function() {
			this._$rotator.on('rotatorChange', $.proxy(this.syncThumbs, this));
			if (!IS_TOUCH) {
				var easing = getEasing('easeOutCirc', false),
					data = this._$cpanel.data(),
					pos = data.pos,
					dim = data.dim,
					pagePos = 'page' + capitalize(data.coord);

				this._$thumbPanel.on('mouseenter' + this._namespace, function() {
										$(this).addClass('br-hover-on');
									})
									.on('mouseleave' + this._namespace, function() {
										$(this).removeClass('br-hover-on');
									})
									.on('mousemove' + this._namespace, $.proxy(function(e) {
										var pct = (e[pagePos] - this._$thumbPanel.offset()[pos])/this._$thumbPanel[dim]();
											prop = {};
										prop[pos] = this._$thumbPanel.data('range') * pct;
										this._$thumbList.animate(prop, {duration:Rotator.ANIMATE_SPEED, easing:easing, queue:false});
									}, this));
			}
		},
		
		//sync thumb position
		syncThumbs: function() {
			if (!this._$thumbPanel.hasClass('br-hover-on')) {
				var data = this._$cpanel.data(),
					thumb = this._$thumbs.eq(this._activeIndex).offset()[data.pos],
					panel = this._$thumbPanel.offset()[data.pos],
					prop = {};
				
				if (thumb < panel) {
					prop[data.pos] = -this._activeIndex * this._$thumbs[data.outerDim](true);
				}
				else if (thumb + this._$thumbs[data.dim]() > panel + this._$thumbPanel[data.dim]()) {
					prop[data.pos] = (this._numItems - 1 - this._activeIndex) * this._$thumbs[data.outerDim](true) + this._$thumbPanel.data('range');
				}

				if (!$.isEmptyObject(prop)) {
					this._$thumbList.animate(prop, {duration:Rotator.ANIMATE_SPEED, queue:false});
				}
			}
		},
		
		//resize cpanel
		resizeCPanel: function() {
			var data = this._$cpanel.data(),
				pos = data.pos,
				dim = data.dim;

			this._$thumbPanel.css(dim, Math.min(this._$screen[dim]() - this._cpanelMargin - this._buttonSize, this._$thumbList[dim]()))
							 .data({range:this._$thumbPanel[dim]() - this._$thumbList[dim]()});
			this._$thumbList.stop().css(pos, Math.max(this._$thumbPanel.data('range'), this._$thumbList.position()[pos]));
			this._$rotator.find('>.br-ext-cp').css(dim, this._$screen[dim]());

			if ('center' === this._cpPosition[data.coord]) {
				this._$cpanel.css(pos, -this._$cpanel[data.outerDim](true)/2);
			}
		},
		
		//touch start
		touchStart: function(e) {
			this._swipeMove = 0;
			if (1 === e.originalEvent.touches.length) {
				this._swipeStart = new Date();
				this._startX = e.originalEvent.touches[0].pageX;
				this._startY = e.originalEvent.touches[0].pageY;
				this._$rotator.on('touchmove' + this._namespace, $.proxy(this.touchMove, this))
							  .one('touchend' + this._namespace, $.proxy(this.touchEnd, this));
			}
		},
		
		//touch move
		touchMove: function(e) {
			var xDist = this._startX - e.originalEvent.touches[0].pageX,
				yDist = this._startY - e.originalEvent.touches[0].pageY;
				
			if ('vertical' === this._options.swipe) {
				this._swipeMove = yDist;
				this._isSwipe = Math.abs(this._swipeMove) > Math.abs(xDist);
			}
			else {
				this._swipeMove = xDist;
				this._isSwipe = Math.abs(this._swipeMove) > Math.abs(yDist);
			}
			
			if (this._isSwipe) {
				e.preventDefault();
			}
		},
		
		//touch end
		touchEnd: function(e) {
			this._$rotator.off('touchmove' + this._namespace);
			
			if (this._isSwipe) {
				if (Math.abs(this._swipeMove) > 50) {
					if (this._swipeMove < 0) {
						this.swipeBack();
					}
					else {
						this.swipeFwd();
					}
				}
			}
		},
		
		//mousewheel scroll
		mousescroll: function(e) {
			e.preventDefault();
			var delta = (e.originalEvent.wheelDelta ?  e.originalEvent.wheelDelta : -e.originalEvent.detail);
			if (0 < delta) {
				this.prevSlide();
			}
			else {
				this.nextSlide();
			}
		},
		
		//keydown
		keyControl: function(e) {
			switch(e.which) {
				case 35:
					this.selectSlide(this._numItems - 1);
					break;
				case 36:
					this.selectSlide(0);
					break;
				case 37:
					this.prevSlide();
					break;
				case 39:
					this.nextSlide();
					break;
				case 32:
					this.togglePlay();
					break;
				default:
					return;
			}
			e.preventDefault();
		},

		//resize
		resize: function() {
			if ($(window).width() !== this._winWidth) {
				//reset
				this._winWidth = $(window).width();
				this.resetTimer(true);
				this.clearAllLayers(false);
				this._effects.clear();
				
				//resize stage
				var ratio = this._$stage.width()/this._stageWidth;
				this._$stage.css({height:Math.round(ratio * this._stageHeight)});
				this._$screen.css({width:this._$stage.width(), height:this._$stage.height()});
				
				//resize images
				this._$items.each(function(n, item) {
					if ($(item).data('ready')) {
						var $img = $(item).find('>img.br-img');
						$.each($img.data('metric'), function(name, val) {
							$img.css(name, Math.round(ratio * val));
						});
					}
				});
				
				//resize layers
				this._$layers.each(function(n, layer) {
					$.each($(layer).data('metric'), function(name, val) {
						if ($.isNumeric(val)) {
							$(layer).css(name, Math.ceil(ratio * val) + 'px');
						}
					});
				});
				
				//resize cpanel
				this._$rotator.trigger('resizeCPanel' + this._namespace);

				//display current
				if (this._$currItem && this._$currItem.data('ready')) {
					this.activateItem(true);
				}
			}
		},
		
		//check on tooltip
		onTooltip: function(e) {
			if (!SUPPORT.pointerEvents && document.elementFromPoint) {
				return $(document.elementFromPoint(e.clientX, e.clientY)).closest('.br-tooltip').is(this._$tooltip);
			}
			return false;
		},

		//trigger event
		triggerEvent: function(name, data) {
			name = capitalize(name);
			data = data || {};

			this._$rotator.trigger(Rotator.PLUGIN + name, data);

			var callback = this._options['on' + name];
			if ($.isFunction(callback)) {
				callback.call(this, data);
			}
		},

		//get option value
		getOption: function(name) {
			if (typeof name === 'string') {
				return this._options[name];
			}
			return this._options;
		},

		//destroy rotator
		destroy: function() {
			this.resetTimer();
			this.stopLayers(true);
			this._effects.clear();

			$(window).add($(document)).off(this._namespace);
			this._$rotator.find('*').addBack().off(this._namespace).removeData();
			
			$.each(Rotator.EVENTS, $.proxy(function(i, name) {
				this._$rotator.off(Rotator.PLUGIN + capitalize(name));
			}, this));

			//restore elements
			if (this._$tooltip) {
				this._$tooltip.remove();
			}

			$.each(['.br-wrapper', '.br-outer-navs'], $.proxy(function(i, selector) {
				if (this._$rotator.parent(selector).length) {
					this._$rotator.parent(selector).children(':not(.banner-rotator)').remove();
					this._$rotator.unwrap();
				}
			}, this));

			this._$rotator.html(this._html).attr({style:this._style}).removeClass('br-flat-shadow br-no-touch');
		}
	};
	
	//shuffle elements
	function shuffleElements($el) {
		var items = $el.children().toArray();
		shuffleArray(items);
		$el.append(items);
	}

	//get position
	function getPosition(val) {
		var props = {},
			arr = val.split(' ', 2);
		
		if (2 !== arr.length) {
			arr = camelToDash(val).split('-');
		}

		props.x = getEnum(arr[0], ['left', 'center', 'right'], 'left');
		props.y = getEnum(arr[1], ['top', 'center', 'bottom'], 'bottom');

		return props;
	}

	//get valid easing
	function getEasing(easing, css) {
		if (css) {
			if (!(easing in CUBIC_BEZIER)) {
				return 'ease';
			}
		}
		else if (!(easing in $.easing)) {
			return 'swing';
		}
		return easing;
	}

	//get random array element
	function getRandomItem(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	//test number within range
	function withinRange(val, min, max) {
		return ($.isNumeric(val) && min <= val && val <= max);
	}

	//test for none
	function isNone(val) {
		return (typeof val === 'undefined' || false === val || 'none' === val);
	}

	//check if empty string
	function isEmptyStr(val) {
		return (typeof val === 'undefined' || '' === $.trim(val));
	}

	//get integer
	function getInt(val, defaultVal) {
		val = parseInt(val, 10);
		return ($.isNumeric(val) ? val : defaultVal);
	}
	
	//get positive integer
	function getPosInt(val, defaultVal) {
		val = parseInt(val, 10);
		return ($.isNumeric(val) && 0 < val ? val : defaultVal);
	}

	//get non-negative integer
	function getNonNegInt(val, defaultVal) {
		val = parseInt(val, 10);
		return ($.isNumeric(val) && 0 <= val ? val : defaultVal);
	}
	
	//get float
	function getFloat(val, defaultVal) {
		val = parseFloat(val);
		return ($.isNumeric(val) ? val : defaultVal);
	}
	
	//get value
	function getValue(val, defaultVal) {
		return (typeof val !== 'undefined' ? val : defaultVal);
	}
	
	//get enum value
	function getEnum(val, list, defaultVal) {
		return (-1 < $.inArray(val, list) ? val : defaultVal);
	}

	//check for percent
	function isPercent(val) {
		val += '';
		var last = val.length - 1;
		return '%' === val.charAt(last) && $.isNumeric(val.substring(0, last));
	}
	
	//round to
	function roundTo(val, digits) {
		var num = Math.pow(10, digits);
		return Math.round(val * num)/num;
	}

	//check for image file
	function isImage(val) {
		return /[^\s]+\.(bmp|gif|jpg|jpeg|png|tiff)$/i.test(val);
	}

	//check style property support
	function styleSupport(prop) {
		var el = document.createElement('div'),
			style = el.style,
			supported = false;
	
		if (prop in style) {
			supported = prop;
		}
		else {
			var capProp = capitalize(prop),
				prefixes = ['Moz', 'Webkit', 'O', 'ms'];
			
			for (var i = 0; i < prefixes.length; i++) {
				var prefixProp = prefixes[i] + capProp;
				if (prefixProp in style) {
					supported = prefixProp;
					break;
				}
			}
		}
		
		el = null;
		SUPPORT[prop] = supported;
		return supported;
	}
	
	//is android check
	function isAndroid(version) {
		var android = 'android',
			ua = navigator.userAgent.toLowerCase(),
			index = ua.indexOf(android);
		
		return (-1 < index && (typeof version === 'undefined' || parseFloat(ua.substring(index + android.length)) <= version));
	}
	
	//is chrome check
	function isChrome() {
		return /Chrome|CriOS/.test(navigator.userAgent);
	}

	//convert camel case to dash
	function camelToDash(str) {
		return (str + '').replace(/([A-Za-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	//convert dash to camel case
	function dashToCamel(str) {
		return (str + '').replace(/([A-Za-z])(-)([A-Za-z])/g, function(match, p1, p2, p3) {
			return (p1 + p3.toUpperCase());
		});
	}

	//check css property support
	function propertySupport(prop, val) {
		if (false === prop) {
			return false;
		}

		var dashProp = camelToDash(prop).replace(/^(moz-|webkit-|o-|ms-)/, '-$1'),
    		el = document.createElement('div'),
    		support;
    	
   		el.style[dashProp] = val;
    	support = -1 < (el.style[dashProp] + '').indexOf(val);
    	el = null;
   		
   		return support;
	}

	//check css filter support
	function filterSupport() {
		var el = document.createElement('div'),
			prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    		cssText = prefixes.join('filter:blur(2px); ');

    	el.style.cssText = cssText;
    	return !!el.style.length && (document.documentMode === undefined || document.documentMode > 9);
	}

	//shuffle array
	function shuffleArray(arr) {
		var i = arr.length;
		while(0 < --i) {
			var ri = Math.floor(Math.random() * (i + 1)),
				temp = arr[i];
			arr[i] = arr[ri];
			arr[ri] = temp;
		}
	}
	
	//capitalize string
	function capitalize(str) {
		str += '';
		return str.charAt(0).toUpperCase() + str.substring(1);
	}

	//convert degrees to radians
	function degreesToRadians(degrees) {
		return (degrees * Math.PI/180);
	}

	//get transform property
	function getTransformProperty(transform) {
		return PREFIXES.concat(['', '']).join('transform:' + transform + ';');
	}

	//debounce
	function debounce(fn, wait, immediate) {
		var timeout;
		return function() {
			var context = this, 
				args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) {
					fn.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) {
				fn.apply(context, args);
			}
		};
	}

	//get object keys
	function getKeys(obj) {
		return $.map(obj, function(val, key) {
			return key;
		});
	}

	//add effect presets
	function addPresets(presets, effects, directions, orders) {
		$.each(effects, function(i, effect) {
			$.each(directions, function(j, direction) {
				$.each(orders, function(k, order) {
					presets.push({effect:effect, direction:direction, order:order});
				});
			});
		});
	}

	//create wrapper
	function createWrapper($el) {
		var size = {width:$el.width(), height:$el.height()},
		$wrapper = $('<div/>', {
			'class':'br-effect-wrapper',
			css:{
				position:$el.css('position'),
				'float':$el.css('float'),
				width:$el.outerWidth(true),
				height:$el.outerHeight(true),
				'z-index':$el.css('z-index'),
				top:$el[0].style.top,
				left:$el[0].style.left,
				bottom:$el[0].style.bottom,
				right:$el[0].style.right
			}
		});
		
		$el.wrap($wrapper).css({
			display:'block',
			position:'relative',
			top:0,
			bottom:'auto',
			left:0,
			right:'auto'
		}).css(size);
	}
		
	//remove wrapper
	function removeWrapper($el) {
		if ($el.parent().hasClass('br-effect-wrapper')) {
			$el.unwrap();
		}
	}
		
	//save element style
	function saveStyle($el, props) {
		$.each(props, function(i, val) {
			$el.data('style-' + val, $el[0].style[val]);
		});
	}
		
	//restore element style
	function restoreStyle($el, props) {
		$.each(props, function(i, val) {
			var style = $el.data('style-' + val);
			$el.css(val, (typeof style === 'undefined' ? '' : style));
		});
	}

	//slide effect
	$.fn.brSlideEffect = function(opts) {
		var props = ['display', 'position', 'top', 'left', 'bottom', 'right', 'width', 'height'],
			isHorizontal = 'left' === opts.direction || 'right' === opts.direction,
			inverse = ('right' === opts.direction || 'down' === opts.direction ? -1 : 1),
			hide = 'hide' === opts.mode;
		
		return this.each(function() {
			var $el = $(this),
				from = {},
				to = {};
			
			if (opts.transform) {
				var translate = 'translate' + (isHorizontal ? 'X' : 'Y'),
					begin = inverse * 100,
					end = 0;
				
				if (hide) {
					end = -begin;
					begin = 0;
				}

				from.transform = translate + '(' + begin + '%)';
				to.transform = translate + '(' + end   + '%)';
			}
			else {
				var pos, dist;
				if (isHorizontal) {
					pos = 'left';
					dist = $el.outerWidth(true);
				}
				else {
					pos = 'top';
					dist = $el.outerHeight(true);
				}

				from[pos] = inverse * dist;
				to[pos] = 0;
				
				if (hide) {
					to[pos] = -from[pos];
					from[pos] = 0;
				}
			}

			saveStyle($el, props);
			createWrapper($el);

			$el.css(from).transition(to, opts.duration, opts.easing, function() {
				restoreStyle($el, props);
				if (hide) {
					$el.hide();
				}
				removeWrapper($el);
			});
		});
	};

	$.each(['width', 'height'], function(i, val) {
		var natural = 'natural' + capitalize(val); 
		$.fn[natural] = function() {
			var el = this[0],
				size;

			if (typeof el[natural] !== 'undefined') {
				size = el[natural];
			}
			else {
				var img = document.createElement('img');
				img.src = this.attr('src');
				size = img[val];
			}
			return size;
		};
	});

	//center content to viewpoint
	$.fn.brCenter = function(winWidth, winHeight) {
		return this.each(function() {
			$(this).css({top:(winHeight - $(this).naturalHeight())/2, left:(winWidth - $(this).naturalWidth())/2});
		});
	};
	
	//fill (cover) content to viewpoint
	$.fn.brFill = function(winWidth, winHeight) {
		return this.each(function() {
			var imgRatio = $(this).naturalWidth()/$(this).naturalHeight(),
				winRatio = winWidth/winHeight;
			
			if (imgRatio < winRatio) {
				$(this).css({width:winWidth, height:winWidth / imgRatio});
			}
			else {
				$(this).css({width:winHeight * imgRatio, height:winHeight});
			}
			$(this).css({top:(winHeight - $(this).height())/2, left:(winWidth - $(this).width())/2});
		});
	};

	//fit (contain) content to viewpoint
	$.fn.brFit = function(winWidth, winHeight) {
		return this.each(function() {
			var imgRatio = $(this).naturalWidth()/$(this).naturalHeight(),
				winRatio = winWidth/winHeight;
			
			if (imgRatio < winRatio) {
				$(this).css({width:winHeight * imgRatio, height:winHeight});
			}
			else {
				$(this).css({width:winWidth, height:winWidth / imgRatio});
			}
			$(this).css({top:(winHeight - $(this).height())/2, left:(winWidth - $(this).width())/2});
		});
	};

	//stretch content to viewpoint
	$.fn.brStretch = function(winWidth, winHeight) {
		return this.each(function() {
			$(this).css({top:0, left:0, width:winWidth, height:winHeight});
		});
	};

	//map shorthand data
	$.fn.brMapShorthand = function(key, props) {
		return this.each(function() {
			var val = $(this).data(key);
			if (!isEmptyStr(val)) {
				var values = val.split(' ');
				for (var i = 0; i < values.length && i < props.length; i++) {
					$(this).data(props[i], values[i]);
				}
			}
		});
	};

	//get total width of elements
	$.fn.brTotalWidth = function(includeMargin) {
		var width = 0;
		this.each(function() {
			width += $(this).outerWidth(includeMargin);
		});
		return width;
	};

	//get total height of elements
	$.fn.brTotalHeight = function(includeMargin) {
		var height = 0;
		this.each(function() {
			height += $(this).outerHeight(includeMargin);
		});
		return height;
	};
		
	//bind image handler
	$.fn.brHandleImage = function(src, settings) {
		var complete = $.isFunction(settings.complete) ? settings.complete : $.noop, 
			error = $.isFunction(settings.error) ? settings.error : $.noop,
			loadEvent = 'load';
			
		if (!isEmptyStr(settings.namespace)) {
			loadEvent += '.' + settings.namespace;
		}

		return this.each(function(n, img) {
			var $img = $(img);
			if ($img.is('img')) {
				$img.attr('src', '').one(loadEvent, complete).error(error).attr('src', src);
				if (typeof img.readyState !== 'undefined') {
					if ('complete' === img.readyState) {
						$img.trigger('load');
					}
				}
				else if (img.complete) {
					$img.trigger('load');
				}
			}
		});
	};

	$.fn.brPrev = function(selector) {
    	selector = selector || '';
	    return this.prev(selector).length ? this.prev(selector) : this.siblings(selector).addBack(selector).last();
	};

	$.fn.brNext = function(selector) {
    	selector = selector || '';
	    return this.next(selector).length ? this.next(selector) : this.siblings(selector).addBack(selector).first();
	};

	//check for border
	$.fn.brHasBorder = function() {
		for (var i = 0; i < SIDES.length; i++) {
			if (0 < parseInt($(this).css('border-' + SIDES[i] + '-width'), 10)) {
				return true;
			}
		}
		return false;
	};

	//copy border
	$.fn.brCopyBorder = function($el) {
		var props = ['width', 'style', 'color'],
			corners = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'];
		
		return this.each(function() {
			for (var i = 0; i < SIDES.length; i++) {
				for (var j = 0; j < props.length; j++) {
					var name = 'border-' + SIDES[i] + '-' + props[j];
					$(this).css(name, $el.css(name));
				}
			}
			
			for (var k = 0; k < corners.length; k++) {
				var radius = 'border' + corners[k] + 'Radius';
				$(this).css(radius, $el.css(radius));
			}
		});
	};

	//animation
	$.fn.animation = function() {
		var name = arguments[0], duration, easing, 
			direction, playState, fillMode,
			complete, always;

		if (typeof arguments[1] === 'object') {
			var opts = arguments[1];
			duration = opts.duration;
			easing = opts.easing;
			direction = opts.direction;
			playState = opts.playState;
			fillMode = opts.fillMode;
			complete = opts.complete;
			always = opts.always;
		}
		else {
			duration = arguments[1];
			easing = arguments[2];
			complete = arguments[3];
		}
		duration = getValue(duration, 400);
		easing = getValue(easing, 'ease');
		direction = getValue(direction, 'normal');
		playState = getValue(playState, 'running');
		fillMode = getValue(fillMode, 'forwards');
		
		var timingFn = (easing in CUBIC_BEZIER ? CUBIC_BEZIER[easing] : easing),
			props = {animationName:name, animationDuration:duration + 'ms', animationTimingFunction:timingFn, animationDirection:direction, animationPlayState:playState, animationFillMode:fillMode};

		return this.each(function() {
			var $el = $(this);
			$el.queue(function(){
				if ($.isFunction(complete)) {
					$el.one(CSS_ANIMATION_END, complete);
				}
				
				if ($.isFunction(always)) {
					$el.one(CSS_ANIMATION_END + '.always', always);
				}
				
				$el.one(CSS_ANIMATION_END, function() {
					$el.dequeue();
				});
				
				$el.reflow().css(props);
			});
		});
	};

	//stop animation
	$.fn.stopAnimation = function(clearQueue, jumpToEnd) {
		return this.each(function() {
			var $el = $(this);
			if (clearQueue) {
				$el.clearQueue();
			}
			
			clearTimeout($el.data('timeout'));
			
			if (jumpToEnd) {
				$el.trigger(CSS_ANIMATION_END);
			}
			else {
				$el.trigger(CSS_ANIMATION_END + '.always').off(CSS_ANIMATION_END);
			}
			
			$el.css({animation:'none'}).dequeue();
		});
	};

	//transition
	$.fn.transition = function() {
		var props = arguments[0],
			duration, easing, delay, 
			complete, always;
		
		if (typeof arguments[1] === 'object') {
			var opts = arguments[1];
			duration = opts.duration;
			easing = opts.easing;
			delay = opts.delay;
			complete = opts.complete;
			always = opts.always;
		}
		else {
			duration = arguments[1];
			easing = arguments[2];
			complete = arguments[3];
		}
		duration = getValue(duration, 400);
		easing = getValue(easing, 'ease');
		delay = getValue(delay, 0);
		props.transition = 'all ' + duration + 'ms ' + CUBIC_BEZIER[easing] + ' ' + delay + 'ms';

		return this.each(function() {
			var $el = $(this);
			$el.queue(function() {
				if ($.isFunction(complete)) {
					$el.one(CSS_TRANSITION_END, complete);
				}
				
				if ($.isFunction(always)) {
					$el.one(CSS_TRANSITION_END + '.always', always);
				}
				
				$el.one(CSS_TRANSITION_END, function() { 
					$el.dequeue();
				});
				
				$el.forceEnd(CSS_TRANSITION_END, duration).reflow().css(props);
			});
		});
	};
	
	//stop transition
	$.fn.stopTransition = function(clearQueue, jumpToEnd) {
		return this.each(function() {
			var $el = $(this);
			if (clearQueue) {
				$el.clearQueue();
			}
			
			clearTimeout($el.data('timeout'));
			
			if (jumpToEnd) {
				$el.trigger(CSS_TRANSITION_END);
			}
			else {
				$el.trigger(CSS_TRANSITION_END + '.always').off(CSS_TRANSITION_END);
			}
			
			$el.css({transition:'none', transitionDuration:'0s'}).dequeue();
		});
	};
	
	//force reflow
	$.fn.reflow = function() {
		return this.each(function() {
			var reflow = this.offsetWidth;
		});
	};
	
	//force transition end
	$.fn.forceEnd = function(endEvent, duration) {
		return this.each(function() {
			var $el = $(this),
				called = false;
			
			$el.one(endEvent, function() { 
				called = true; 
			}).data('timeout', setTimeout(function() {
				if (!called) {
					$el.trigger(endEvent);
				}
			}, duration + 50));
		});
	};
	
	//add transition class
	$.fn.addTransitionClass = function(className) {
		return this.each(function() {
			if (SUPPORT.transition && !ANDROID2) {
				$(this).reflow().addClass(className);
			}
		});
	};
	
	var METHODS = {
  		play:'play',
  		pause:'pause',
		togglePlay:'togglePlay',
		prev:'prevSlide',
		next:'nextSlide',
		to:'selectSlide',
		option:'getOption',
		destroy:'destroy'
 	};
		
	$.fn.bannerRotator = function() {
		var args = arguments,
			params = args[0];
		
		if (params in METHODS) {
			var method = METHODS[params],
				val;

			this.each(function(n, el) {
				var instance = $(el).data(Rotator.PLUGIN); 
				if (instance) {
					val = instance[method].apply(instance, Array.prototype.slice.call(args, 1));
					if (typeof val !== 'undefined') {
						return false;
					}
				}
			});
			
			return (typeof val !== 'undefined' ? val : this);
		}
		else if (typeof params === 'object' || !params) {
			return this.each(function(n, el) {
				var opts = $.extend(true, {}, $.fn.bannerRotator.defaults, params),
					o = ($.metadata ? $.extend({}, opts, $.metadata.get(this)) : opts);

				$(el).data(Rotator.PLUGIN, new Rotator(el, o));
			});
		}
	};

	$.fn.bannerRotator.defaults = {
		responsive:true,
		width:1000,
		height:400,
		thumbWidth:32,
		thumbHeight:32,
		thumbMargin:3,
		buttonWidth:32,
		buttonHeight:32,
		buttonMargin:3,
		sideButtonMargin:0,
		tooltipWidth:'auto',
		tooltipHeight:'auto',
		navThumbWidth:100,
		navThumbHeight:75,
		autoPlay:true,
		delay:6000,
		startIndex:0,
		pauseOnHover:false,
		pauseOnInteraction:false,
		playOnce:false,
		timer:'pie',
		timerPosition:'right top',
		cssTransition:true,
		effect:'fade',
		duration:800,
		easing:'',
		effectOnStart:true,
		columns:1,
		rows:1,
		interval:100,
		alternate:false,
		autoReverse:true,
		depth:0,
		shapeShading:true,
		shapeDepth:0,
		kbEffect:'none',
		kbDuration:'auto',
		kbEasing:'linear',
		cpanelPosition:'left bottom',
		cpanelOrientation:'horizontal',
		cpanelOutside:false,
		cpanelOnHover:false,
		thumbnails:'number',
		selectOnHover:false,
		tooltip:'text',
		tooltipDelay:0,
		navButtons:'small',
		navButtonsOnHover:false,
		navThumbs:false,
		playButton:true,
		groupButtons:false,
		cpanelGap:0,
		hideControl:false,
		effectOnInteraction:true,
		layerEffect:'fade',
		layerDuration:500,
		layerEasing:'',
		layerDelay:0,
		layerEffectOut:'fade',
		layerDurationOut:500,
		layerEasingOut:'',
		layerDelayOut:0,
		layerSync:true,
		layerOutSync:true,
		layerOnHover:false,
		imagePosition:'fill',
		preload:false,
		shuffle:false,
		keyboard:false,
		mousewheel:false,
		swipe:'horizontal',
		swipeDirection:'normal',
		playText:'play',
		pauseText:'pause',
		prevText:'previous',
		nextText:'next'
	};
})(jQuery);
