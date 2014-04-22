var outside = (function(outside) {
    "use strict";

    var status = function() {
        var container = undefined;
        var page = undefined;
        var indexPosition = undefined;
        var indexCount = undefined;

        return {
            "init": function() {
                container = document.querySelector("#status");
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
            },
            "setProgress": function(v) {
                container.style.backgroundSize = (v * 100) + "% 100%";
            }
        };
    }();

    var pages = function() {
        var pages = undefined;
        var currentIndex = undefined;
        var currentPage = undefined;
        var currentProgress = undefined;

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

        var updateProgress = function(d) {
            currentProgress += d;
            if (currentProgress >= 1) {
                currentProgress = 0;
                nextPage();
            }

            status.setProgress(currentProgress);
        };

        return {
            "init": function() {
                pages = loadPages();
                currentIndex = -1;
                currentPage = pages[0];
                currentProgress = 0;

                status.setIndexCount(pages.length);

                nextPage();
                setInterval(updateProgress.bind(null, 0.003), 50);
            }
        };
    }();

    var scoresPage = function() {
        var table = undefined;

        var update = function() {
            srobo.competition.scores("league", function(scores) {
                var tbody = document.createElement("tbody");

                var i = 0;
                var tr = document.createElement("tr");
                for (var tla in scores["game_points"]) {
                    var score = scores["game_points"][tla];

                    var td0 = document.createElement("th");
                    td0.textContent = tla;
                    td0.style.paddingLeft = "32px";
                    tr.appendChild(td0);
                    var td1 = document.createElement("td");
                    td1.textContent = score;
                    td1.style.paddingRight = "32px";
                    tr.appendChild(td1);

                    i++;
                    if (i > 5) {
                        tbody.appendChild(tr);
                        tr = document.createElement("tr");
                        i = 0;
                    }
                }

                tbody.appendChild(tr);
                table.replaceChild(tbody, table.querySelector("tbody"));
            });
        };

        return {
            "init": function() {
                table = document.querySelector("#pages-scores table");

                update();
                setInterval(update, 30 * 1000);
            }
        };
    }();

    var leaderboardPage = function() {
        var table = undefined;
        var teams = undefined;

        var update = function() {
            srobo.competition.scores("league", function(scores) {
                var rows = [];
                for (var tla in scores["game_points"]) {
                    rows.push([tla, scores["game_points"][tla]]);
                }

                rows.sort(function(a, b) {
                    return b[1] - a[1];
                });

                var tbody = document.createElement("tbody");
                rows.forEach(function(row, i) {
                    if (i >= 10) {
                        return;
                    }

                    var tr = document.createElement("tr");
                    var td0 = document.createElement("td");
                    td0.textContent = row[0];
                    tr.appendChild(td0);
                    var td1 = document.createElement("td");
                    td1.textContent = teams[row[0]];
                    tr.appendChild(td1);
                    var td2 = document.createElement("td");
                    td2.textContent = row[1];
                    tr.appendChild(td2);
                    tbody.appendChild(tr);
                });

                table.replaceChild(tbody, table.querySelector("tbody"));
            });
        };

        return {
            "init": function() {
                table = document.querySelector("#pages-leaderboard table");

                srobo.competition.teams(function(teamsDef) {
                    teams = teamsDef["teams"];
                    update();
                    setInterval(update, 30 * 1000);
                });
            }
        };
    }();

    outside.init = function() {
        status.init();
        pages.init();

        srobo.init(function() {
            scoresPage.init();
            leaderboardPage.init();
        });
    };

    return outside;
}(outside || {}));
