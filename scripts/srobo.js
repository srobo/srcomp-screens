var srobo = (function(srobo) {
    "use strict";

    srobo.competition = (function() {
        var apiRoot = "";
        var detectCompApiRoot = function(callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/comp-api/state");

            xhr.addEventListener("load", function(e) {
                if (e.target.status === 200) {
                    callback("/comp-api");
                } else {
                    callback("");
                }
            });

            xhr.addEventListener("error", function(e) {
                callback("");
            });

            xhr.send();
        };

        var get = function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", apiRoot + url);
            xhr.responseType = "json";

            xhr.addEventListener("load", function(e) {
                callback(e.target.response);
            });

            xhr.send();
        };

        return {
            "init": function(callback) {
                detectCompApiRoot(function(root) {
                    apiRoot = root;
                    console.log("Detected Competition API root as:", apiRoot);
                    callback();
                });
            },
            "arenas": get.bind(undefined, "/arenas"),
            "corner": function(index, callback) {
                get("/corner/" + index, callback);
            },
            "matches": function(arena, numbers, callback) {
                if (callback === undefined) {
                    callback = numbers;
                    numbers = undefined;
                }

                var url = "/matches/" + arena;
                if (numbers) {
                    url += "?numbers=" + numbers;
                }

                get(url, callback);
            }
        };
    }());

    srobo.init = function(callback) {
        console.log("Initialising SR…");
        srobo.competition.init(callback);
    };

    return srobo;
}(srobo || {}));
