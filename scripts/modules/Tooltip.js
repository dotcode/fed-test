/*  JS for Tooltip Module
	Author: Andre Silva - andre1050@gmail.com
 	Last update: 13.01.2014
	*/

var com = com || {};
com.nature = com.nature || {};

(function ($) {
	$(document).ready(function () {

		// Register the Tooltip module in the existing namespace
		com.nature.Tooltip = (function () {


			// Public: module configuration
			var defaultConfig = {
				moduleHook: ".js-mod-tooltip",
				moduleClass: "nature-tooltip"
			};


			// Private: add new tooltip for the trigger element
			var addTooltip = function (trigger) {
				var triggerText = trigger.text();
				// Keep width, height and coordinates of the trigger element to use later
				var triggerCoords = {
					width: trigger.outerWidth(),
					height: trigger.outerHeight(),
					top: trigger.offset().top,
					left: trigger.offset().left
				};
				var tooltip = createTooltip(triggerText);
				appendTooltip(tooltip, triggerCoords);
			};

			
			// Private: create new tooltip element
			var createTooltip = function (content) {
				var tooltip = $("<div />").addClass(defaultConfig.moduleClass);
				tooltip.text(content);
				return tooltip;
			};


			// Private: append tooltip to the DOM
			var appendTooltip = function (tooltip, triggerCoords) {
				$("body").append(tooltip);
				placeTooltip(triggerCoords);
			};


			// Private: place tooltip next to the trigger in the DOM
			var placeTooltip = function (triggerCoords) {
				// Get tooltip as a DOM element to have access to $.width() and $.height()
				var tooltip = $("." + defaultConfig.moduleClass);
				var tooltipSize = {
					width: tooltip.outerWidth(), // includes padding/border
					height: tooltip.outerHeight() // includes padding/border
				};
				var computedOffset = computeOffset(tooltipSize, triggerCoords);
				tooltip.css("top", computedOffset.top).css("left", computedOffset.left);
			};


			// Private: compute new offset for the tooltip element
			var computeOffset = function (tooltipSize, triggerCoords) {
				// The offset for the tooltip will be computed based on its width/height
				// and the coordinates of the trigger element
				var computedOffset = {
					top: triggerCoords.top - tooltipSize.height - 5,
					left: (triggerCoords.left + triggerCoords.width/2) - (tooltipSize.width/2)
				};
				return computedOffset;
			};


			// Private: remove tooltip from the DOM
			var removeTooltip = function () {
				$("." + defaultConfig.moduleClass).remove();
			}


			// Private: bind callbacks to HOVER and OUT events in the Hooks
			var bindEvents = function () {
				$(defaultConfig.moduleHook).hover(function () {
					// On Mouse Hover: add tooltip to the DOM
					var trigger = $(this);
					addTooltip(trigger);
				}, function () {
					// On Mouse Out: remove tooltip from the DOM
					removeTooltip();
				});
			};


			// INITIALISE MODULE
			var init = (function () {

				// Bind callbacks to the trigger elements
				bindEvents();

			})();


			// Export configuration object
			return {
				defaultConfig: defaultConfig
			};

		})();
	});
}(jQuery));