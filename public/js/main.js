(function(window) {
	var delay, cardTpl, currentCard, destroyDelay,
		events = 'mouseenter.card mouseleave.card',
		selector = 'a[href*="/user/"]:not(.mentions-card-img-container a)';

	$(document).ready(function() {
		window.ajaxify.loadTemplate('mentions/card', function(tpl) {
			cardTpl = tpl;

			$(window).on('action:ajaxify.end', function() {
				$('.container').off(events, selector).on(events, selector, function(e){
					var target = $(e.currentTarget);
					if (target.children('img')) {
						target.children('img').tooltip('destroy');
					}
					if (e.type === "mouseenter" && !target.is(currentCard)) {
						delay = setTimeout(function() {
							createCard(target, target.attr('href').match(/\/user\/.+/)[0]);
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
		if (currentCard) {
			destroyCard(currentCard);
		}

		var api = '/api' + url;
		$.get(api, function(result) {
			result.name = result.fullname || result.username;
			switch (result.status) {
				case 'online':
					result.statusTitle = 'Online';
					break;
				case 'away':
					result.statusTitle = 'Away';
					break;
				case 'dnd':
					result.statusTitle = 'Do not Disturb';
					break;
				case 'offline':
					result.statusTitle = 'Offline';
					break;
				default:
					result.statusTitle = 'Offline';
					break
			}

			var html = window.templates.parse(cardTpl, result);

			target.popover({
				html: true,
				content: html,
				placement: 'top',
				trigger: 'manual',
				container: 'body'
			}).popover('show');

			$('.mentions-card-stats li').tooltip();

			utils.makeNumbersHumanReadable($('.mentions-card-stats li span'));

			$('.mentions-card-chat').off('click.card').on('click.card', function(e) {
				var card = $(e.currentTarget).parents('.mentions-card');
				app.openChat(card.data('username'), card.data('uid'));
				return false;
			});
			currentCard = target;
		});
	}

	app.createUserTooltips = function() {
		//so metal
	}
})(window);
