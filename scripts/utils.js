var utils = (function(utils) {
    "use strict";

    // work around slightly older Firefox (<23) not having requestAnimationFrame
    window.requestAnimationFrame = window.requestAnimationFrame ||
                                   window.mozRequestAnimationFrame;

    var pad = utils.pad = function(value) {
        var num = parseInt(value, 10);
        return num < 10 ? "0" + num : num.toString();
    };

    var formatTimeDelta = utils.formatTimeDelta = function(delta) {
        var prefix = "";
        if (delta < 0) {
            delta = -delta;
            prefix = "Starting in ";
        }

        var minutesLeft = parseInt(delta / 60, 10);
        var secondsLeft = delta - parseInt(delta / 60, 10) * 60;
        return prefix + minutesLeft + ":" + utils.pad(secondsLeft);
    };

    var formatTime = utils.formatTime = function(date) {
        return date.getHours() + ":" + pad(date.getMinutes(), 2);
    };

    var simpleTableCell = utils.simpleTableCell = function(tr, textContent) {
        var td = document.createElement("td");
        td.textContent = textContent;
        tr.appendChild(td);
        return td;
    };

    var removeAllChildren = utils.removeAllChildren = function(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    return utils;
}(utils || {}));
