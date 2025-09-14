(function($) {
    'use strict';
    function AysChatGPTChatBoxPublic(element, options){
        this.el = element;
        this.$el = $(element);
        this.ajaxAction = 'ays_chatgpt_admin_ajax';

		this.globalSettings = JSON.parse(atob(window.AysChatGPTChatSettings));

		// DEFINE PREFIXES
        this.CHATGPT_ASSISTANT_CLASS_PREFIX   = 'ays-chatgpt-assistant';
        this.CHATGPT_ASSISTANT_ID_PREFIX      = 'ays-chatgpt-assistant';
        this.CHATGPT_ASSISTANT_NAME_PREFIX    = 'ays_chatgpt_assistant';
        this.CHATGPT_ASSISTANT_OPTIONS_PREFIX = 'chatgpt_assistant_';
        this.dbOptions = undefined;
		// Chat prompt defaults
		this.chatConversation = [];
		// Text For old models
		this.promptFirstM = 'Converse as if you are an AI assistant. ';
		this.promptSecondM = 'Answer the question as truthfully as possible. ';		
		// Text For new models
		this.messageFirstM = '';
		// OpenAI settings
		this.REQUEST_URL = "";
		this.API_MAIN_URL = "https://api.openai.com/v1";
		this.API_COMPLETIONS_URL = "/completions";
		this.API_CHAT_COMPLETIONS_URL = "/chat/completions";

		this.requestCount = 0;
		this.tokenCount = 0;

        this.init();

        return this;
    }

    AysChatGPTChatBoxPublic.prototype.init = function() {
        var _this = this;
		_this.$el.show();
        _this.setEvents();

    };

	// Set events
    AysChatGPTChatBoxPublic.prototype.setEvents = function(e){
		var _this = this;
		_this.setDbOptions();		
		_this.setUpPromptParametrs();
		_this.setUpRequestParametrs();
		_this.makeResizableDiv(".ays-assistant-chatbox .ays-assistant-chatbox-main-container");

		var promptEl = _this.$el.find('#ays-assistant-chatbox-prompt');
		autosize(promptEl);

		var clickTrigger = _this.dbOptions.iconTexOpenOnClick 
							?  ''
							: ':not(.ays-assistant-chatbox-closed-view-text)';

		_this.$el.find('.ays-assistant-chatbox-closed-view').one('click', function () {
			if(_this.dbOptions.chatGreetingMessage){
				_this.setGreetingMessage();
			}

			if (_this.dbOptions.iconTextShowOnce) {
				_this.$el.find('.ays-assistant-chatbox-closed-view-text').remove();
			}
		});

		_this.$el.find('.ays-assistant-chatbox-icon-text-close-button').on('click', function () {
			_this.$el.find('.ays-assistant-chatbox-closed-view-text').remove();
			return false;
		});

		_this.$el.find('.ays-assistant-chatbox-closed-view-text').on('click', function () {
			if (!_this.dbOptions.iconTexOpenOnClick) {
				return false;
			}
		});

		_this.$el.find('.ays-assistant-chatbox-closed-view'+clickTrigger).on('click', function () {
			$(this).hide();
			var container = _this.$el.find('.ays-assistant-chatbox-main-container');
			var bg = _this.$el.find('.ays-assistant-chatbox-maximized-bg');
			if (container.hasClass('ays-assistant-chatbox-main-container-maximized-view')) {
				bg.show();
				$('body').addClass('ays-assistant-chatbox-disabled-scroll-body');
			}
			container.show();
			_this.$el.find('.ays-assistant-chatbox-prompt-input').focus();
		});

		_this.$el.on('click', '.ays-assistant-chatbox-close-bttn' ,function () {
			var container = $(this).parents('.ays-assistant-chatbox-main-container');
			var bg = _this.$el.find('.ays-assistant-chatbox-maximized-bg');
			if (container.hasClass('ays-assistant-chatbox-main-container-maximized-view')) {
				bg.hide();
				$('body').removeClass('ays-assistant-chatbox-disabled-scroll-body');
			}
			container.hide();
			_this.$el.find('.ays-assistant-chatbox-closed-view').show();
		});

		_this.$el.on('click', '.ays-assistant-chatbox-end-bttn' ,function () {
			var modal = _this.$el.find('.ays-assistant-chatbox-main-chat-modal');
			modal.find('.ays-assistant-chatbox-main-chat-modal-body-image').append('<img src="'+_this.globalSettings.translations.endChat.modalIcon+'">');
			modal.find('.ays-assistant-chatbox-main-chat-modal-body-text').append(_this.globalSettings.translations.endChat.warningMsg);
			modal.find('.ays-assistant-chatbox-main-chat-modal-footer-button').append('<button data-modal-action="confirm">'+_this.globalSettings.translations.endChat.buttonMsg+'</button>');
			modal.css('display', 'flex');
			_this.$el.find('.ays-assistant-chatbox-more-menu').hide();

			modal.on('click', function (e) {
				if ($(e.target).attr('data-modal-action') === 'confirm') {
					window.speechSynthesis.cancel();
					
					_this.$el.find('.ays-assistant-chatbox-messages-box').find('.ays-assistant-chatbox-ai-message-box').remove();
					_this.$el.find('.ays-assistant-chatbox-messages-box').find('.ays-assistant-chatbox-user-message-box').remove();
					_this.$el.find('.ays-assistant-chatbox-rate-chat-row').css('display', 'flex');

					if (_this.dbOptions.chatGreetingMessage) {
						_this.setGreetingMessage();
					}
		
					_this.chatConversation = [];

					modal.hide('fast');
					modal.find('.ays-assistant-chatbox-main-chat-modal-body-image').empty();
					modal.find('.ays-assistant-chatbox-main-chat-modal-body-text').empty();
					modal.find('.ays-assistant-chatbox-main-chat-modal-footer-button').empty();

					var container = $(this).parents('.ays-assistant-chatbox-main-container');
					var bg = _this.$el.find('.ays-assistant-chatbox-maximized-bg');
					var resizeButton = _this.$el.find('.ays-assistant-chatbox-resize-bttn');
					var src = resizeButton.attr('src');
					if (container.hasClass('ays-assistant-chatbox-main-container-maximized-view')) {
						resizeButton.attr('src', src.replace('minimize', 'maximize'));
						resizeButton.attr('alt', "Maximize");
						container.removeClass('ays-assistant-chatbox-main-container-maximized-view');
						bg.hide();
						$('body').removeClass('ays-assistant-chatbox-disabled-scroll-body');
					}
					container.hide();
					_this.$el.find('.ays-assistant-chatbox-closed-view').show();
				} else if ($(e.target).attr('data-modal-action') === 'close') {
					modal.hide('fast');
					modal.find('.ays-assistant-chatbox-main-chat-modal-body-image').empty();
					modal.find('.ays-assistant-chatbox-main-chat-modal-body-text').empty();
					modal.find('.ays-assistant-chatbox-main-chat-modal-footer-button').empty();
				}
			})
		});

		_this.$el.find('.ays-assistant-chatbox-resize-bttn').on('click', function () {
			var container = $(this).parents('.ays-assistant-chatbox-main-container');
			var bg = _this.$el.find('.ays-assistant-chatbox-maximized-bg');
			var src = $(this).attr('src');
			if (!container.hasClass('ays-assistant-chatbox-main-container-maximized-view')) {
				$(this).attr('src', src.replace('maximize', 'minimize'));
				$(this).attr('alt', "Minimize");
				container.addClass('ays-assistant-chatbox-main-container-maximized-view');
				bg.show();
				$('body').addClass('ays-assistant-chatbox-disabled-scroll-body');
			} else {
				$(this).attr('src', src.replace('minimize', 'maximize'));
				$(this).attr('alt', "Maximize");
				container.removeClass('ays-assistant-chatbox-main-container-maximized-view');
				bg.hide();
				$('body').removeClass('ays-assistant-chatbox-disabled-scroll-body');
			}
		});
	
		$(document).on('mouseup', function(e) {
			var container = _this.$el.find('.ays-assistant-chatbox-main-container');
			if (container.hasClass('ays-assistant-chatbox-main-container-maximized-view') && container.css('display') !== 'none') {
				if (!container.is(e.target) && container.has(e.target).length === 0) {
					_this.$el.find('.ays-assistant-chatbox-resize-bttn').trigger("click");
				}
			}
		});

		_this.$el.find('.ays-assistant-chatbox-prompt-input').on('input', function () {
			var sendBttn = _this.$el.find('.ays-assistant-chatbox-send-button');
			if ($(this).val().trim() != "") {
				sendBttn.prop('disabled', false);
			} else {
				sendBttn.prop('disabled', true);
			}
		});

		_this.$el.find('.ays-assistant-chatbox-regenerate-response-button').on('click', function () {
			var prompt = _this.$el.find('.ays-assistant-chatbox-user-message-box:last').text();
			_this.$el.find('.ays-assistant-chatbox-prompt-input').val(prompt);
			_this.$el.find('.ays-assistant-chatbox-send-button').trigger('click', true);
		});

		_this.$el.find('.ays-assistant-chatbox-send-button').on('click', function (event, noUserMessage) {
			// var key = _this.dbOptions.chatAK;
			var prompt = _this.$el.find('.ays-assistant-chatbox-prompt-input').val();
			var loader = _this.$el.find('.ays-assistant-chatbox-loading-box');
			var sendBttn = _this.$el.find('.ays-assistant-chatbox-send-button');

			if (noUserMessage === undefined) {
				var userProfilePicture = '';
				if (_this.dbOptions.chatboxTheme == 'chatgpt') {
					userProfilePicture = '<div class="ays-assistant-chatbox-chatgpt-theme-user-icon">' + _this.dbOptions.userProfilePicture + '</div>';
				}

				var userMessage = $("<div>", {"class": "ays-assistant-chatbox-user-message-box"}).html(userProfilePicture + wrapCodeAndHtmlTags(prompt));

				_this.$el.find('.ays-assistant-chatbox-messages-box').append(userMessage).scrollTop(_this.$el.find('.ays-assistant-chatbox-messages-box')[0].scrollHeight);
				promptEl.css("height" , "54px");
			}
			var scrolledHeight = _this.$el.find('.ays-assistant-chatbox-messages-box')[0].scrollHeight;
			var elementHeight = Math.round(_this.$el.find('.ays-assistant-chatbox-messages-box').outerHeight());
			loader.css('bottom', (10 + elementHeight - scrolledHeight));
			_this.$el.find('.ays-assistant-chatbox-prompt-input').val('');

			// var index = key.indexOf("chgafr");
			// if (index !== -1) {
			// 	var readyK = key.substring(0, index);
			// }
			
			if (_this.dbOptions.enableRequestLimitations) {
				_this.requestCount++;
			}
			// if (_this.checkSession()) {
				if (prompt.trim() != '') {
					loader.show();
					if (_this.dbOptions.chatboxTheme == 'chatgpt') {
						_this.$el.find('.ays-assistant-chatbox-messages-box').scrollTop(scrolledHeight + 50);
					}
	
					sendBttn.prop('disabled', true);

					var sendData = {
						requestUrl : _this.REQUEST_URL,
						// apiKey : readyK,
						prompt : prompt,
						chatConversation : _this.chatConversation,
						url: _this.globalSettings.ajaxUrl,
						nonce: _this.globalSettings.nonce,
					}

					makeRequest(sendData , _this.dbOptions, true)
					.then(data => {
						_this.gettingResponse(data.data);
					});
					
				}
			// }
		});
		
		_this.$el.on('click', '.ays-assistant-chatbox-ai-message-copy', function(){
			var thisButton = $(this);
			var text = thisButton.parents(".ays-assistant-chatbox-ai-message-box").find('span.ays-assistant-chatbox-ai-response-message').text();
			var thisButton = $(this);
			_this.copyResponse(text);
			$(this).attr('title', 'Copied!');

			var copyIcon = $(this).html();
			$(this).html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#636a84"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>');
			setTimeout(function() {
				thisButton.html(copyIcon);
			}, 700);
		});

		_this.$el.on('mouseover', '.ays-assistant-chatbox-ai-message-copy', function(){
			$(this).attr('title', 'Click to Copy');
		});

		if (_this.dbOptions.chatAutoOpening && _this.dbOptions.chatAutoOpeningMobile) {
			setTimeout(() => {
				_this.$el.find('.ays-assistant-chatbox-closed-view').trigger('click');
			}, _this.dbOptions.chatAutoOpeningDelay);
		} else if (_this.dbOptions.chatAutoOpening) {
			if (window.innerWidth >= 768) {
				setTimeout(() => {
					_this.$el.find('.ays-assistant-chatbox-closed-view').trigger('click');
				}, _this.dbOptions.chatAutoOpeningDelay);
			}
		} else if (_this.dbOptions.chatAutoOpeningMobile) {
			if (window.innerWidth < 768) {
				setTimeout(() => {
					_this.$el.find('.ays-assistant-chatbox-closed-view').trigger('click');
				}, _this.dbOptions.chatAutoOpeningDelay);
			}
		}

		if (_this.dbOptions.iconTextScrollOpen > 0) {
			window.onscroll = function() {
				if (window.scrollY >= _this.dbOptions.iconTextScrollOpen) {
					if (_this.dbOptions.iconTextOpenDelay > 0) {
						setTimeout(() => {
							_this.$el.find('.ays-assistant-chatbox-closed-view-text').show();
						}, _this.dbOptions.iconTextOpenDelay);
					} else {
						_this.$el.find('.ays-assistant-chatbox-closed-view-text').show();
					}
				}
			};
		} else if(_this.dbOptions.iconTextOpenDelay > 0){
			setTimeout(() => {
				_this.$el.find('.ays-assistant-chatbox-closed-view-text').show();
			}, _this.dbOptions.iconTextOpenDelay);
		} else {
			_this.$el.find('.ays-assistant-chatbox-closed-view-text').show();
		}

		_this.$el.on('click', '.ays-assistant-chatbox-rate-chat-like, .ays-assistant-chatbox-rate-chat-dislike', function (e) {
			_this.feedbackEvents($(this));
		});

		$(document).on('keypress', function (e) {
			if (e.which == 13 && !e.shiftKey) {
				var target = $(e.target);
				if (target.hasClass('ays-assistant-chatbox-prompt-input')) {
					var chatBotMainBoxOpened = !_this.$el.find(".ays-assistant-chatbox-main-container").is(':hidden');
					if(chatBotMainBoxOpened){
						var prompt = _this.$el.find('.ays-assistant-chatbox-prompt-input');
						if (prompt.length > 0) {
							if ($(prompt).val().trim() != '' &&  $(prompt).is(":focus")) {
								var button = _this.$el.find('.ays-assistant-chatbox-send-button');
								if ( !button.prop('disabled') ) {
									e.preventDefault();
									button.trigger("click");
								}
							}
						}
					}
				} else if (target.hasClass('ays-assistant-chatbox-rate-chat-comment')) {
					var button = _this.$el.find('.ays-assistant-chatbox-rate-chat-submit');
					if ( !button.prop('disabled') ) {
						e.preventDefault();
						button.trigger("click");
					}
				}
			}
		});
    }

	AysChatGPTChatBoxPublic.prototype.gettingResponse = function (data) {
		var _this = this;
		var loader = _this.$el.find('.ays-assistant-chatbox-loading-box');
		var scrolledHeight = _this.$el.find('.ays-assistant-chatbox-messages-box')[0].scrollHeight;
		var elementHeight = Math.round(_this.$el.find('.ays-assistant-chatbox-messages-box').outerHeight());

		loader.hide();

		if (_this.dbOptions.enableRequestLimitations && typeof data?.usage?.total_tokens === 'number') {
			_this.tokenCount += data.usage.total_tokens;
		}
		if (!_this.checkSession()) {
			return;
		}

		var checkError = (typeof data.error == "object" ) ? false : true;
		if(checkError){
			var sanitizedText = '';
			var chatBotIcon = '';
			if (_this.dbOptions.chatboxTheme == 'chatgpt') {
				chatBotIcon = '<div class="ays-assistant-chatbox-chatgpt-theme-ai-icon"><img src="' + _this.dbOptions.chatIcon + '"></div>';
			}

			switch(_this.dbOptions.chatModel){
				case 'gpt-3.5-turbo':
				case 'gpt-3.5-turbo-16k':
				case 'gpt-4':
					sanitizedText = wrapCodeAndHtmlTags(data.choices[0].message.content);
					_this.chatConversation.push(data.choices[0].message);
					var response = "<span class='ays-assistant-chatbox-ai-response-message'>" + (sanitizedText.replace(/^\n+/, '')) + "</span>";
					break;
				default:
					sanitizedText = wrapCodeAndHtmlTags(data.choices[0].text);
					_this.chatConversation.push("Chatbot: " + data.choices[0].text.replace(/^[^:]+:\s*/, '').replace(/^\n+/, ''));
					var response = "<span class='ays-assistant-chatbox-ai-response-message'>" + (sanitizedText.replace(/^[^:]+:\s*/, '').replace(/^\n+/, '')) + "</span>";
					break;
			}
			var buttons = getAIButtons(_this.dbOptions);
			var aiMessage = $("<div>", {"class": "ays-assistant-chatbox-ai-message-box"}).html(chatBotIcon + response + buttons);
			
			_this.$el.find('.ays-assistant-chatbox-messages-box').append(aiMessage).scrollTop(_this.$el.find('.ays-assistant-chatbox-messages-box')[0].scrollHeight);

			this.$el.find('.ays-assistant-chatbox-regenerate-response-button').prop('disabled', false);
		}
		else{
			var errorMessage = '';
			if(data.error.type == "insufficient_quota"){
				errorMessage = " <a href='https://platform.openai.com/account/usage'> https://platform.openai.com/account/usage </a>";
			}
			_this.$el.find('.ays-assistant-chatbox-messages-box').append($("<div>", {"class": "ays-assistant-chatbox-error-message-box"}).html(data.error.message + errorMessage)).scrollTop(_this.$el.find('.ays-assistant-chatbox-messages-box')[0].scrollHeight);
		}

		scrolledHeight = _this.$el.find('.ays-assistant-chatbox-messages-box')[0].scrollHeight;
		elementHeight = Math.round(_this.$el.find('.ays-assistant-chatbox-messages-box').outerHeight());
		loader.css('bottom', (10 + elementHeight - scrolledHeight));
	}

	AysChatGPTChatBoxPublic.prototype.copyResponse = function (text) {
		var _this = this;
		var el = jQuery('<textarea>').appendTo('body').val(text).select();
		document.execCommand('copy');
		el.remove();
	}

	AysChatGPTChatBoxPublic.prototype.setDbOptions = function () {
		var _this = this;
		var chatAutoOpening = _this.globalSettings.chatAutoOpening ? true : false;
		var chatAutoOpeningDelay = _this.globalSettings.chatAutoOpeningDelay ? +_this.globalSettings.chatAutoOpeningDelay : 0;
		var chatAutoOpeningMobile = _this.globalSettings.chatAutoOpeningMobile ? true : false;
		var chatRegenerateResponse = _this.globalSettings.chatRegenerateResponse ? true : false;
		// var chatAK          = _this.globalSettings.translations.ka ? atob(_this.globalSettings.translations.ka) : '';
		var chatTemperature = _this.globalSettings.chatTemprature ? +_this.globalSettings.chatTemprature : 0.7;
		var chatTopP        = _this.globalSettings.chatTopP ? +_this.globalSettings.chatTopP : 1;
		var chatMaxTokents  = _this.globalSettings.chatMaxTokents ? +_this.globalSettings.chatMaxTokents : 1500;

		var chatFrequencyPenalty = _this.globalSettings.chatFrequencyPenalty ? +_this.globalSettings.chatFrequencyPenalty : 0.01;
		var chatPresencePenalty  = _this.globalSettings.chatPresencePenalty ? +_this.globalSettings.chatPresencePenalty : 0.01;

		var chatBestOf = _this.globalSettings.chatBestOf ? +_this.globalSettings.chatBestOf : 1;

		var chatContext = _this.globalSettings.chatContext !== '' ? _this.globalSettings.chatContext : '';
		
		var chatProfession = _this.globalSettings.chatProfession ? _this.globalSettings.chatProfession : '';

		var chatTone = _this.globalSettings.chatTone ? _this.globalSettings.chatTone : '';

		var chatLanguage = _this.globalSettings.chatLanguage ? _this.globalSettings.chatLanguage : '';

		var chatName = _this.globalSettings.chatName ? _this.globalSettings.chatName : '';
		
		var chatModel = _this.globalSettings.chatModel ? _this.globalSettings.chatModel : 'gpt-3.5-turbo-16k';

		var postId = _this.globalSettings.postId ? _this.globalSettings.postId : 0;

		var chatboxPosition = _this.globalSettings.chatboxPosition;
		var chatGreetingMessage = _this.globalSettings.chatGreetingMessage;

		var enableRequestLimitations = _this.globalSettings.enableRequestLimitations;
		var requestLimitationsLimit = _this.globalSettings.requestLimitationsLimit
		var requestLimitationsInterval = _this.globalSettings.requestLimitationsInterval;
		var tokenGuestLimitationsLimit = _this.globalSettings.tokenGuestLimitationsLimit
		var tokenGuestLimitationsInterval = _this.globalSettings.tokenGuestLimitationsInterval;
		var tokenLoginLimitationsLimit = _this.globalSettings.tokenLoginLimitationsLimit
		var tokenLoginLimitationsInterval = _this.globalSettings.tokenLoginLimitationsInterval;

		var rateChatLikeOptions = _this.globalSettings.rateChatOptions.like ? _this.globalSettings.rateChatOptions.like : [];
		var rateChatDislikeOptions = _this.globalSettings.rateChatOptions.dislike ? _this.globalSettings.rateChatOptions.dislike : [];
		var rateChatImages = _this.globalSettings.rateChatOptions.images ? _this.globalSettings.rateChatOptions.images : [];

		var chatboxTheme = _this.globalSettings.chatboxTheme ? _this.globalSettings.chatboxTheme : 'default';
		var chatIcon = _this.globalSettings.chatIcon;
		var userProfilePicture = atob(_this.globalSettings.userProfilePicture);
		var isUserLoggedIn = _this.globalSettings.isUserLoggedIn;

		var iconTextOpenDelay = _this.globalSettings.iconTextOpenDelay ? +_this.globalSettings.iconTextOpenDelay : 0;
		var iconTextScrollOpen = _this.globalSettings.iconTextScrollOpen ? +_this.globalSettings.iconTextScrollOpen : 0;
		var iconTextShowOnce = _this.globalSettings.iconTextShowOnce ? true : false;
		var iconTexOpenOnClick = _this.globalSettings.iconTexOpenOnClick ? true : false;

		if (enableRequestLimitations) {
			if (getCookie('wp-ays-cgpta-wndw-count') !== undefined) {
				_this.requestCount = +getCookie('wp-ays-cgpta-wndw-count');
			}
			if (getCookie('wp-ays-cgpta-wndw-tcount') !== undefined) {
				_this.tokenCount = +getCookie('wp-ays-cgpta-wndw-tcount');
			}
		}

		_this.dbOptions = {
			chatAutoOpening : chatAutoOpening,
			chatAutoOpeningDelay : chatAutoOpeningDelay,
			chatAutoOpeningMobile : chatAutoOpeningMobile,
			chatRegenerateResponse : chatRegenerateResponse,
			chatTemperature : chatTemperature,
			chatTopP : chatTopP,
			chatMaxTokents  : chatMaxTokents,
			chatFrequencyPenalty : chatFrequencyPenalty,
			chatPresencePenalty  : chatPresencePenalty,
			chatModel  : chatModel,
			chatBestOf : chatBestOf,
			chatContext : chatContext,
			chatProfession : chatProfession,
			chatTone : chatTone,
			chatLanguage : chatLanguage,
			chatName : chatName,
			chatboxPosition: chatboxPosition,
			chatGreetingMessage : chatGreetingMessage,
			// chatAK : chatAK,
			enableRequestLimitations : enableRequestLimitations,
			requestLimitationsLimit : requestLimitationsLimit,
			requestLimitationsInterval : requestLimitationsInterval,
			tokenGuestLimitationsLimit : tokenGuestLimitationsLimit,
			tokenGuestLimitationsInterval : tokenGuestLimitationsInterval,
			tokenLoginLimitationsLimit : tokenLoginLimitationsLimit,
			tokenLoginLimitationsInterval : tokenLoginLimitationsInterval,
			chatboxTheme : chatboxTheme,
			chatIcon : chatIcon,
			userProfilePicture : userProfilePicture,
			postId : postId,
			rateChat: {
				like : rateChatLikeOptions,
				dislike : rateChatDislikeOptions,
				images : rateChatImages,
			},
			iconTextOpenDelay: iconTextOpenDelay,
			iconTextScrollOpen: iconTextScrollOpen,
			iconTextShowOnce: iconTextShowOnce,
			iconTexOpenOnClick: iconTexOpenOnClick,
			isUserLoggedIn: isUserLoggedIn,
		}
	}

	AysChatGPTChatBoxPublic.prototype.setUpRequestParametrs = function () {
		var _this = this;
		switch(_this.dbOptions.chatModel){
			case 'gpt-3.5-turbo':
			case 'gpt-3.5-turbo-16k':
			case 'gpt-4':
				_this.messageFirstM = {role: 'system', content: _this.promptFirstM + _this.promptSecondM};
				_this.chatConversation.push(_this.messageFirstM);
				_this.REQUEST_URL = _this.API_MAIN_URL + _this.API_CHAT_COMPLETIONS_URL;
				break;
			default:
				_this.chatConversation.push(_this.promptFirstM , _this.promptSecondM);
				_this.REQUEST_URL = _this.API_MAIN_URL + _this.API_COMPLETIONS_URL;
				break;
		}
	}

	AysChatGPTChatBoxPublic.prototype.setUpPromptParametrs = function () {
		var _this = this;
		var professionFirstText = 'Act as: ';
		var toneFirstText = 'Tone: ';
		var languageText = 'Language: ';
		var nameText = 'Name: ';
		var finalText = '';

		if (_this.dbOptions.chatContext != '') {
			_this.promptSecondM = _this.dbOptions.chatContext;
			_this.promptFirstM = '';
		}

		if(_this.dbOptions.chatProfession){
			professionFirstText += _this.dbOptions.chatProfession;
			finalText += professionFirstText;
		}

		if(_this.dbOptions.chatTone && _this.dbOptions.chatTone != 'none'){
			if(finalText){
				finalText += '. ';
			}
			var capitalizedTone = _this.dbOptions.chatTone.charAt(0).toUpperCase() + _this.dbOptions.chatTone.slice(1)
			toneFirstText += capitalizedTone;
			finalText += toneFirstText;
		}

		if(_this.dbOptions.chatLanguage){
			if(finalText){
				finalText += '. ';
			}
			var coutries = getCountries();
			languageText += coutries[_this.dbOptions.chatLanguage];
			finalText += languageText;
		}
		
		if(_this.dbOptions.chatName){
			nameText += _this.dbOptions.chatName;
			_this.promptFirstM = "Your name is " + _this.dbOptions.chatName + ". " + this.promptFirstM;
		}
		
		if(finalText){
			finalText += '. ';
			_this.promptSecondM += finalText;
		}
	}

	AysChatGPTChatBoxPublic.prototype.setGreetingMessage = function () {
		var _this = this;
		var buttons = getAIButtons(_this.dbOptions);
		var aIGMessage = "<span class='ays-assistant-chatbox-ai-response-message'>"+_this.globalSettings.chatGreetingMessageText + "</span>";
		var chatBotIcon = '';

		if (_this.dbOptions.chatboxTheme == 'chatgpt') {
			chatBotIcon = '<div class="ays-assistant-chatbox-chatgpt-theme-ai-icon"><img src="' + _this.dbOptions.chatIcon + '"></div>';
		}

		var aiGreetingMessage = $("<div>", {"class": "ays-assistant-chatbox-ai-message-box"}).html(chatBotIcon + aIGMessage + buttons);

		_this.$el.find('.ays-assistant-chatbox-messages-box').append(aiGreetingMessage);
	}
	
	AysChatGPTChatBoxPublic.prototype.makeResizableDiv = function(el) {
		var _this  = this;
		var element = $(document).find(el);
		var resizer = element.find('.ays-assistant-chatbox-header-row');
		var minimum_width    = 320;
		var minimum_height   = 430;
		var original_width   = 0;
		var original_height  = 0;
		var original_mouse_x = 0;
		var original_mouse_y = 0;
		
		if (resizer.length > 0) {
		  resizer.on('mousedown', function(e) {
			e.preventDefault();
			original_width = parseFloat(element.css('width'));
			original_height = parseFloat(element.css('height'));
			original_mouse_x = e.pageX;
			original_mouse_y = e.pageY;
			$(window).on('mousemove', function(e){
				var dataObj = {
					element: element,
					original_width: original_width,
					original_height: original_height, 
					original_mouse_x: original_mouse_x,
					original_mouse_y:original_mouse_y ,
					minimum_width: minimum_width,
					minimum_height: minimum_height,
				}
				_this.startResize(e , dataObj);
			});
			$(window).on('mouseup', function(){
				_this.stopResize();
			});
		  });
		}		
	}

	AysChatGPTChatBoxPublic.prototype.startResize = function(e , dataObj) {
		var _this = this;
		if (!dataObj.element.hasClass('ays-assistant-chatbox-main-container-maximized-view')) {
			if (_this.globalSettings.chatboxPosition !== 'right') {
				var width = dataObj.original_width + (e.pageX - dataObj.original_mouse_x);
				var height = dataObj.original_height - (e.pageY - dataObj.original_mouse_y);
				var maximum_width = $(window).innerWidth() - 50;
				var maximum_height = $(window).innerHeight() - 50;
				
				if (width < maximum_width && height < maximum_height) {
					if (width > dataObj.minimum_width) {
						dataObj.element.css('width', width + 'px');
					}
					if (height > dataObj.minimum_height) {
						dataObj.element.css('height', height + 'px');
					}
				}
			} else {
				var width = dataObj.original_width - (e.pageX - dataObj.original_mouse_x);
				var height = dataObj.original_height - (e.pageY - dataObj.original_mouse_y);
				var maximum_width = $(window).innerWidth() - 50;
				var maximum_height = $(window).innerHeight() - 50;
				
				if (width < maximum_width && height < maximum_height) {
					if (width > dataObj.minimum_width) {
						dataObj.element.css('width', width + 'px');
					}
					if (height > dataObj.minimum_height) {
						dataObj.element.css('height', height + 'px');
					}
				}
			}
		}
	}

	AysChatGPTChatBoxPublic.prototype.stopResize = function () {
		$(window).off('mousemove');
	}

	AysChatGPTChatBoxPublic.prototype.feedbackEvents = function ($this) {
		var _this = this;

		var action = $this.attr('data-action');
		var htmlOptions = _this.dbOptions.rateChat[action];
		
		var modal = _this.$el.find('.ays-assistant-chatbox-main-chat-modal');
		modal.find('.ays-assistant-chatbox-main-chat-modal-body').css('margin-top', '-20px')
		modal.find('.ays-assistant-chatbox-main-chat-modal-body-image').append('<img src="'+_this.dbOptions.rateChat.images[action]+'">').addClass('ays-assistant-chatbox-main-chat-modal-body-image-rate-chat');
		var readyContent = '<span class="ays-assistant-chatbox-rate-chat-text">'+htmlOptions.text+'</span>';
		if (htmlOptions.action == 'feedback') {
			readyContent += '<textarea class="ays-assistant-chatbox-rate-chat-comment"></textarea>';
			readyContent += '<button class="ays-assistant-chatbox-rate-chat-submit" data-modal-action="submit">'+_this.globalSettings.translations.leaveComment+'</button>';
		}
		modal.find('.ays-assistant-chatbox-main-chat-modal-body-text').append(readyContent);
		modal.css('display', 'flex');

		modal.on('click', function (e) {
			if ($(e.target).attr('data-modal-action') === 'submit') {
				var textarea = $(e.target).prev('textarea.ays-assistant-chatbox-rate-chat-comment');
				var feedback = textarea.length > 0 ? textarea.val() : '';
				
				if (feedback.trim() != '') {
					$.ajax({
						url: _this.globalSettings.ajaxUrl,
						method: 'post',
						dataType: 'json',
						data: {
							action: _this.ajaxAction,
							function: 'ays_chatgpt_save_feedback',
							feedback_data: JSON.stringify({
								post_id: _this.dbOptions.postId,
								user_name: '',
								user_email: '',
								source: 'public',
								type: 'chatbot',
								feedback: feedback,
								feedback_action: action,
							}),
						},
						success: function (response) {
							_this.$el.find('.ays-assistant-chatbox-rate-chat-row').hide();
						},
						error: function (error) {
							console.log(error);
						}
					});
				}

				modal.hide('fast');
				modal.find('.ays-assistant-chatbox-main-chat-modal-body-image').removeClass('ays-assistant-chatbox-main-chat-modal-body-image-rate-chat');
				modal.find('.ays-assistant-chatbox-main-chat-modal-body').css('margin-top', '');
				modal.find('.ays-assistant-chatbox-main-chat-modal-body-image').empty();
				modal.find('.ays-assistant-chatbox-main-chat-modal-body-text').empty();
			} else if ($(e.target).attr('data-modal-action') === 'close') {
				modal.hide('fast');
				modal.find('.ays-assistant-chatbox-main-chat-modal-body-image').removeClass('ays-assistant-chatbox-main-chat-modal-body-image-rate-chat');
				modal.find('.ays-assistant-chatbox-main-chat-modal-body').css('margin-top', '');
				modal.find('.ays-assistant-chatbox-main-chat-modal-body-image').empty();
				modal.find('.ays-assistant-chatbox-main-chat-modal-body-text').empty();
			}
		});
	}

	AysChatGPTChatBoxPublic.prototype.checkSession = function () {
		var _this = this;

		if (_this.dbOptions.enableRequestLimitations) {

			var limit = +_this.dbOptions.requestLimitationsLimit;
			var interval = _this.dbOptions.requestLimitationsInterval;
			var timeInSeconds = _this.calculateIntervalInSeconds(interval);

			var tokenLimit = !_this.dbOptions.isUserLoggedIn ? +_this.dbOptions.tokenGuestLimitationsLimit : +_this.dbOptions.tokenLoginLimitationsLimit;
			var tokenInterval = !_this.dbOptions.isUserLoggedIn ? _this.dbOptions.tokenGuestLimitationsInterval : _this.dbOptions.tokenLoginLimitationsInterval;
			var tokenTimeInSeconds = _this.calculateIntervalInSeconds(tokenInterval);

			if (limit > 0 && timeInSeconds > 1) {
				if (getCookie('wp-ays-cgpta-wndw-count') === undefined) {
					_this.requestCount = 1;
					var expiryDate = new Date();
					expiryDate.setSeconds(expiryDate.getSeconds() + timeInSeconds);
					setCookie('wp-ays-cgpta-wndw-count-start', expiryDate.toUTCString(), {'expires': expiryDate.toUTCString()});
					
					setCookie('wp-ays-cgpta-wndw-count', _this.requestCount, {'expires': expiryDate.toUTCString()});
				} else {
					if (+getCookie('wp-ays-cgpta-wndw-count') < limit) {
						var expires = getCookie('wp-ays-cgpta-wndw-count-start');

						setCookie('wp-ays-cgpta-wndw-count', _this.requestCount, {'expires': expires});
					} else {
						_this.$el.find('.ays-assistant-chatbox-messages-box').append($("<div>", {"class": "ays-assistant-chatbox-error-message-box"}).html(_this.globalSettings.translations.requestLimitReached[interval])).scrollTop(_this.$el.find('.ays-assistant-chatbox-messages-box')[0].scrollHeight);
						
						return false;
					}
				}
			}

			if (tokenLimit > 0 && tokenTimeInSeconds > 1) {
				if (getCookie('wp-ays-cgpta-wndw-tcount') === undefined) {
					// _this.tokenCount = 0;
					var expiryDate = new Date();
					expiryDate.setSeconds(expiryDate.getSeconds() + tokenTimeInSeconds);
					setCookie('wp-ays-cgpta-wndw-tcount-start', expiryDate.toUTCString(), {'expires': expiryDate.toUTCString()});
					
					setCookie('wp-ays-cgpta-wndw-tcount', _this.tokenCount, {'expires': expiryDate.toUTCString()});
				} else {
					if (+getCookie('wp-ays-cgpta-wndw-tcount') < tokenLimit) {
						var expires = getCookie('wp-ays-cgpta-wndw-tcount-start');

						setCookie('wp-ays-cgpta-wndw-tcount', _this.tokenCount, {'expires': expires});
					} else {
						_this.$el.find('.ays-assistant-chatbox-messages-box').append($("<div>", {"class": "ays-assistant-chatbox-error-message-box"}).html(_this.globalSettings.translations.tokenLimitReached[tokenInterval])).scrollTop(_this.$el.find('.ays-assistant-chatbox-messages-box')[0].scrollHeight);
						
						return false;
					}
				}
			}
		} else {
			if (getCookie('wp-ays-cgpta-wndw-count') !== undefined) {
				deleteCookie('wp-ays-cgpta-wndw-count');
			}
			if (getCookie('wp-ays-cgpta-wndw-count-start') !== undefined) {
				deleteCookie('wp-ays-cgpta-wndw-count-start');
			}
			if (getCookie('wp-ays-cgpta-wndw-tcount') !== undefined) {
				deleteCookie('wp-ays-cgpta-wndw-tcount');
			}
			if (getCookie('wp-ays-cgpta-wndw-tcount-start') !== undefined) {
				deleteCookie('wp-ays-cgpta-wndw-tcount-start');
			}
		}

		return true;
	}

	AysChatGPTChatBoxPublic.prototype.calculateIntervalInSeconds = function (interval) {
		var timeInSeconds = 1;
		
		switch (interval) {
			case 'hour':
				timeInSeconds = 60 * 60;
				break;
			case 'day':
				timeInSeconds = 24 * 60 * 60;
				break;
			case 'week':
				timeInSeconds = 7 * 24 * 60 * 60;
				break;
			case 'month':
				timeInSeconds = 30 * 7 * 24 * 60 * 60;
				break;
			default:
				break;
		}

		return timeInSeconds;
	}

	$.fn.AysChatGPTChatBoxPublicMain = function(options) {       
		if (!$.data(this, 'AysChatGPTChatBoxPublicMain')) {
			$.data(this, 'AysChatGPTChatBoxPublicMain', new AysChatGPTChatBoxPublic(this, options));
		} else {
			try {
				$(this).data('AysChatGPTChatBoxPublicMain').init();
			} catch (err) {
				console.error('AysChatGPTChatBoxPublicMain has not initiated properly');
			}
		}        
    };

})(jQuery);