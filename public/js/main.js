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
		//Listen for events on body, we don't have to re-add on every ajaxify
		$(document.body).off(events, selector).on(events, selector, function(e) {
			var target = $(e.currentTarget),
				href = regex.exec(target.attr('href'));

			//Check if it's a valid link
			if (href && (!utils.invalidLatinChars.test(href[2]) && !utils.invalidUnicodeChars.test(href[2]))) {
				if (target.children('img')) {
					//Destroy tooltips added by NodeBB
					target.children('img').tooltip('destroy');
				}

				if (e.type === "mouseenter" && !target.is(currentCard)) {
					//If it's a mouseenter event, set a timeout to create a new card
					delay = setTimeout(function() {
						createCard(target, href[1]);
					}, 500);
					targetCard = target;
				} else {
					//Otherwise add some handlers for destroying a card
					if (target.is(currentCard)) {
						destroyDelay = setTimeout(function() {
							destroyCard(target);
						}, 500);

						target.data('bs.popover')['$tip'].off(events).on(events, function(e) {
							if (e.type === "mouseenter") {
								clearTimeout(destroyDelay);
							} else {
								destroyDelay = setTimeout(function() {
									destroyCard(target);
								}, 500);
							}
						});
					}

					//Also clear the timeout for creating a new card
					clearTimeout(delay);
					targetCard = null;
				}
			}
		});

		$(window).on('action:ajaxify.start', function() {
			if (delay) {
				clearTimeout(delay);
				delay = 0;
			}

			//Destroy any cards before ajaxifying
			if (currentCard) {
				destroyCard(currentCard);
			}

			targetCard = null;
		});
	});

	function destroyCard(target) {
		target.popover('destroy');
		currentCard = null;
	}

	function createCard(target, url) {
		var api = '/api' + url;
		$.ajax({
			url: api,
			success: function(result) {
				result.name = result.fullname || result.username;
				app.parseAndTranslate('cards/profile', result, function(html) {
					//If target is not the currentCard and if the target is the targetCard
					if (!target.is(currentCard) && target.is(targetCard)) {
						//If there's an existing card, destroy it
						if (currentCard) {
							destroyCard(currentCard);
						}

						// Bind chat button
						html.find('[component="account/chat"]').on('click', function() {
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

						//Create card
						target.popover({
							html: true,
							content: html,
							placement: calculatePopoverPosition(target),
							trigger: 'manual',
							container: 'body'
						}).popover('show').data('bs.popover')['$tip'].css('z-index', 1000000);

						$('.profile-card .timeago').timeago();
						$('.card-fab button').dropdown();
						utils.makeNumbersHumanReadable($('.profile-card .human-readable-number'));

						$('html').off(exitEvent).on(exitEvent, function() {
							if (currentCard) {
								destroyCard(currentCard);
							}
						});

						$('.profile-card').off(exitEvent).on(exitEvent, function(e) {
							e.stopPropagation();
						});

						currentCard = target;
					}
				});
			},
			cache: false
		});
	}

	app.createUserTooltips = function() {
		//override with empty function because we don't want this function to execute
		//so metal
	};

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

})(window);
