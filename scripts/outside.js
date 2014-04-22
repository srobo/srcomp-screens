var outside = (function(outside) {
    "use strict";

    var status = function() {
        var page = undefined;
        var indexPosition = undefined;
        var indexCount = undefined;

        return {
            "init": function() {
                page = document.querySelector("#status-page");
                indexPosition = document.querySelector("#status-index span:first-child");
                indexCount = document.querySelector("#status-index span:last-child");
            },
            "setPage": function(s) {
                page.textContent = s;
            },
            "setIndexPosition": function(i) {
                indexPosition.textContent = i;
            },
            "setIndexCount": function(i) {
                indexCount.textContent = i;
            }
        };
    }();

    var pages = function() {
        var pages = undefined;
        var currentIndex = 0;
        var currentPage = undefined;

        var loadPages = function() {
            var pages = document.querySelectorAll(".page");
            for (var i = 0; i < pages.length; i++) {
                pages[i].hidden = true;
            }

            return pages;
        };

        var nextPage = function() {
            currentPage.hidden = true;
            currentIndex++;
            if (currentIndex >= pages.length) {
                currentIndex = 0;
            }

            currentPage = pages[currentIndex];
            currentPage.hidden = false;

            status.setPage(currentPage.dataset.name);
            status.setIndexPosition(currentIndex + 1);  // 1-index for the user
        };

        return {
            "init": function() {
                pages = loadPages();
                currentIndex = -1;
                currentPage = pages[0];

                status.setIndexCount(pages.length);

                nextPage();
                setInterval(nextPage, 1 * 1000);
            }
        };
    }();

    outside.init = function() {
        status.init();
        pages.init();

        srobo.init(function() {

        });
    };

    return outside;
}(outside || {}));
