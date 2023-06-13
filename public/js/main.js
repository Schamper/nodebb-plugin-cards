"use strict";

/* globals app, utils, $ */

(function(window) {
	var delay, targetCard, currentCard,
		events = 'mouseenter.card mouseleave.card',
		exitEvent = 'click.card',
		selector = 'a[href*="/user/"]:not(.profile-card a)',
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
				destroyCard(currentCard, true);
			}

			targetCard = null;
		});
	});

	function onEvent(e) {
		var target = $(e.currentTarget),
			href = regex.exec(target.attr('href'));

		// Check if it's a valid link
		if (href && href[1] && href[2]) {
			// Destroy tooltips added by NodeBB
			if (target.children('img')) {
				target.children('img').tooltip('dispose');
			}

			// If it's a mouseenter event, set a timeout to create a new card
			if (e.type === "mouseenter" && !target.is(currentCard)) {
				delay = createCard(target, href[1]);
				targetCard = target;
			} else {
				// Also clear the timeout for creating a new card
				clearTimeout(delay);
				targetCard = null;
			}
		}
	}

	function toggleFollow($card, type, uid, username) {
		require(['api', 'alerts'], function (api, alerts) {
			api[type === 'follow' ? 'put' : 'del']('/users/' + uid + '/follow', undefined, function (err) {
				if (err) {
					return alerts.error(err);
				}

				$('[component="account/follow"]').toggleClass('hide', type === 'follow');
				$('[component="account/unfollow"]').toggleClass('hide', type === 'unfollow');
				alerts.success('[[global:alert.' + type + ', ' + username + ']]');
			});
		});
	}

	function createCard(target, url) {
		return setTimeout(function() {
			var api = config.relative_path + '/api' + url;
			$.ajax({
				url: api,
				success: function(result) {
					app.parseAndTranslate('cards/profile', result, function(cardHTML) {
						// If target is not the currentCard and if the target is the targetCard
						if (!target.is(currentCard) && target.is(targetCard)) {
							// If there's an existing card, destroy it
							if (currentCard) {
								destroyCard(currentCard, true);
							}

							// Bind chat button
							cardHTML.find('[component="account/chat"]').on('click', function() {
								socket.emit('modules.chats.hasPrivateChat', result.uid, async function (err, roomId) {
									if (err) {
										return app.alertError(err.message);
									}
									const chat = await app.require('chat');
									if (roomId) {
										chat.openChat(roomId);
									} else {
										chat.newChat(result.uid);
									}
								});
								return false;
							});
							// Bind follow and unfollow
							cardHTML.find('[component="account/follow"]').on('click', function(){
								toggleFollow(cardHTML, 'follow', result.uid, result.username);
								return false;
							});
							cardHTML.find('[component="account/unfollow"]').on('click', function(){
								toggleFollow(cardHTML, 'unfollow', result.uid, result.username);
								return false;
							});

							// Create card
							target.popover({
								html: true,
								content: cardHTML,
								placement: calculatePopoverPosition(target),
								trigger: 'manual',
								container: 'body'
							}).popover('show');

							// Bind some other stuff
							$('.profile-card .timeago').timeago();

							utils.makeNumbersHumanReadable($('.profile-card .human-readable-number'));

							// Bind exit events
							$('html').off(exitEvent).on(exitEvent, function() {
								if (currentCard) {
									destroyCard(currentCard, true);
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

	function destroyCard(target, instantly) {
		if (instantly) {
			target.popover('dispose');
			currentCard = null;
		} else {
			return setTimeout(function() {
				target.popover('dispose');
				currentCard = null;
			}, 500);
		}
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
