(function(window) {
	var delay, cardTpl, currentCard, destroyDelay;
	$(document).ready(function() {
		window.ajaxify.loadTemplate('mentions/card', function(tpl) {
			cardTpl = tpl;

			$(window).on('action:ajaxify.end', function() {
				$('.container').off("mouseenter.card mouseleave.card", ".plugin-mentions-a").on("mouseenter.card mouseleave.card", ".plugin-mentions-a", function(e){
					var target = $(e.currentTarget);
					if (e.type === "mouseenter" && !target.is(currentCard)) {
						delay = setTimeout(function() {
							createCard(target, target.attr('href'));
						}, 500);
					} else {
						if (target.is(currentCard)) {
							destroyDelay = setTimeout(function() {
								destroyCard(target);
							}, 500);
							target.next('.popover').off("mouseenter.card mouseleave.card").on("mouseenter.card mouseleave.card", function(e) {
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
				placement: "top",
				trigger: "manual"
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
})(window);
