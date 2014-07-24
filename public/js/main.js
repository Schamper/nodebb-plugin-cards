(function(window) {
	var delay, cardTpl, targetCard, currentCard, destroyDelay,
		events = 'mouseenter.card mouseleave.card',
		exitEvent = 'click.card',
		selector = 'a[href*="/user/"]:not(.profile-card-img-container a)',
		exitSelector = 'body:not(".profile-card")',
		regex = /(\/user\/([^/]+))(?:\/$|$)/;

	$(document).ready(function() {
		//Preload the card template
		window.ajaxify.loadTemplate('cards/profile', function(tpl) {
			cardTpl = tpl;

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
				var html = window.templates.parse(cardTpl, result);

				translator.translate(html, function(translated) {
					//If target is not the currentCard and if the target is the targetCard
					if (!target.is(currentCard) && target.is(targetCard)) {
						//If there's an existing card, destroy it
						if (currentCard) {
							destroyCard(currentCard);
						}

						//Create card
						target.popover({
							html: true,
							content: translated,
							placement: 'top',
							trigger: 'manual',
							container: 'body'
						}).popover('show');

						$('.profile-card-stats li').tooltip();

						utils.makeNumbersHumanReadable($('.profile-card-stats li span'));

						$('.profile-card-chat').off('click.card').on('click.card', function(e) {
							var card = $(e.currentTarget).parents('.profile-card');
							app.openChat(card.data('username'), card.data('uid'));
							return false;
						});

						currentCard = target;

						$('html').off(exitEvent).on(exitEvent, function() {
							if (currentCard) {
								destroyCard(currentCard);
							}
						});

						$('.profile-card').off(exitEvent).on(exitEvent, function(e) {
							e.stopPropagation();
						});
					}
				});
			},
			cache: false
		});
	}

	app.createUserTooltips = function() {
		//override with empty function because we don't want this function to execute
		//so metal
	}
})(window);
