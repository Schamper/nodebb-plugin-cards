(function(window) {
	var delay, cardTpl, currentCard, destroyDelay,
		events = 'mouseenter.card mouseleave.card',
		selector = 'a[href*="/user/"]:not(.profile-card-img-container a)',
		regex = /(\/user\/([^/]+))(?:\/|$)/;

	$(document).ready(function() {
		window.ajaxify.loadTemplate('cards/profile', function(tpl) {
			cardTpl = tpl;

			$(window).on('action:ajaxify.end', function() {
				$('.container').off(events, selector).on(events, selector, function(e){
					var target = $(e.currentTarget),
						href = regex.exec(target.attr('href'));

					if (href && (!utils.invalidLatinChars.test(href[2]) && !utils.invalidUnicodeChars.test(href[2]))) {
						if (target.children('img')) {
							target.children('img').tooltip('destroy');
						}
						if (e.type === "mouseenter" && !target.is(currentCard)) {
							delay = setTimeout(function() {
								createCard(target, href[1]);
							}, 500);
						} else {
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
							clearTimeout(delay);
						}
					}

				});
			});

			$(window).on('action:ajaxify.start', function() {
				if (currentCard) {
					destroyCard(currentCard);
				}
			});
		});
	});

	function destroyCard(target) {
		target.popover('destroy');
		currentCard = null;
	}

	function createCard(target, url) {
		var api = '/api' + url;
		$.get(api, function(result) {
			result.name = result.fullname || result.username;

			translator.translate('[[global:' + result.status + ']]', function(translated) {
				result.statusTitle = translated;

				var html = window.templates.parse(cardTpl, result);

				if (!target.is(currentCard)) {
					if (currentCard) {
						destroyCard(currentCard);
					}

					target.popover({
						html: true,
						content: html,
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
				}
			});
		});
	}

	app.createUserTooltips = function() {
		//so metal
	}
})(window);
