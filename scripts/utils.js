var utils = (function(utils) {
    "use strict";

    utils.pad = function(value) {
        var num = parseInt(value, 10);
        return num < 10 ? "0" + num : num.toString();
    };

    utils.formatTimeDelta = function(delta) {
        var prefix = "";
        if (delta < 0) {
            delta = -delta;
            prefix = "Starting in ";
        }

        var minutesLeft = parseInt(delta / 60, 10);
        var secondsLeft = delta - parseInt(delta / 60, 10) * 60;
        return prefix + minutesLeft + ":" + utils.pad(secondsLeft);
    };

    return utils;
}(utils || {}));
