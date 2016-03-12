"use strict";

/* globals app, utils, $ */

(function(window) {
	var delay, targetCard, currentCard, destroyDelay,
		events = 'mouseenter.card mouseleave.card',
		exitEvent = 'click.card',
		selector = 'a[href*="/user/"]:not(.profile-card a)',
		exitSelector = 'body:not(".profile-card")',
		regex = /(\/user\/([^/]+))(?:\/$|$)/;

	$(document).ready(function() {
		// Listen for events on body, we don't have to re-add on every ajaxify
		$(document.body).off(events, selector).on(events, selector, onEvent);

		$(window).on('action:ajaxify.start', function() {
			if (delay) {
				clearTimeout(delay);
				delay = 0;
			}

			// Destroy any cards before ajaxifying
			if (currentCard) {
				destroyCard(currentCard);
			}

			targetCard = null;
		});
	});

	function onEvent(e) {
		var target = $(e.currentTarget),
			href = regex.exec(target.attr('href'));

		// Check if it's a valid link
		if (href && (!utils.invalidLatinChars.test(href[2]) || !utils.invalidUnicodeChars.test(href[2]))) {
			// Destroy tooltips added by NodeBB
			if (target.children('img')) {
				target.children('img').tooltip('destroy');
			}

			// If it's a mouseenter event, set a timeout to create a new card
			if (e.type === "mouseenter" && !target.is(currentCard)) {
				delay = createCard(target, href[1]);
				targetCard = target;
			} else {
				// Otherwise add some handlers for destroying a card
				if (target.is(currentCard)) {
					destroyDelay = destroyCard(target);

					target.data('bs.popover')['$tip'].off(events).on(events, function(e) {
						if (e.type === "mouseenter") {
							clearTimeout(destroyDelay);
						} else {
							destroyDelay = destroyCard(target);
						}
					});
				}

				// Also clear the timeout for creating a new card
				clearTimeout(delay);
				targetCard = null;
			}
		}
	}

	function createCard(target, url) {
		return setTimeout(function() {
			var api = '/api' + url;
			$.ajax({
				url: api,
				success: function(result) {
					app.parseAndTranslate('cards/profile', result, function(cardHTML) {
						// If target is not the currentCard and if the target is the targetCard
						if (!target.is(currentCard) && target.is(targetCard)) {
							// If there's an existing card, destroy it
							if (currentCard) {
								destroyCard(currentCard);
							}

							// Bind chat button
							cardHTML.find('[component="account/chat"]').on('click', function() {
								socket.emit('modules.chats.hasPrivateChat', result.uid, function(err, roomId) {
									if (err) {
										return app.alertError(err.message);
									}
									if (roomId) {
										app.openChat(roomId);
									} else {
										app.newChat(result.uid);
									}
								});
							});

							// Create card
							target.popover({
								html: true,
								content: cardHTML,
								placement: calculatePopoverPosition(target),
								trigger: 'manual',
								container: 'body'
							}).popover('show').data('bs.popover')['$tip'].css('z-index', 1000000);

							// Bind some other stuff
							$('.profile-card .timeago').timeago();
							$('.card-fab button').dropdown();
							utils.makeNumbersHumanReadable($('.profile-card .human-readable-number'));

							// Bind exit events
							$('html').off(exitEvent).on(exitEvent, function() {
								if (currentCard) {
									destroyCard(currentCard);
								}
							});

							// I don't remember what this does
							$('.profile-card').off(exitEvent).on(exitEvent, function(e) {
								e.stopPropagation();
							});

							currentCard = target;
						}
					});
				},
				cache: false
			});
		}, 500);
	}

	function destroyCard(target) {
		return setTimeout(function() {
			target.popover('destroy');
			currentCard = null;
		}, 500);
	}

	function calculatePopoverPosition(target){
		var offset = target.offset();
		var width = $(document).width();
		var height = $(document).height();

		if (offset.left > 300) {
			return 'left';
		}

		if (width - offset.left > 300) {
			return 'right';
		}

		if (offset.top > 400) {
			return 'top';
		}

		if (height - offset.top > 400) {
			return 'bottom';
		}

		return 'right';
	}

	app.createUserTooltips = function() {
		// override with empty function because we don't want this function to execute
		// so metal
	};

})(window);
