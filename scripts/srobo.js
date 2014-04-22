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

        var corner = function(index, callback) {
            get("/corner/" + index, callback);
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
            "corner": corner,
            "corners": function(arena, callback) {
                // for forward-compatibility
                if (callback === undefined) {
                    callback = arena;
                    arena = "A";
                }

                // TODO: query arena
                corner(0, function(c0) {
                    corner(1, function(c1) {
                        corner(2, function(c2) {
                            corner(3, function(c3) {
                                callback([c0, c1, c2, c3]);
                            });
                        });
                    });
                });
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
            },
            "scores": function(type, callback) {
                get("/scores/" + type, callback);
            }
        };
    }());

    srobo.init = function(callback) {
        console.log("Initialising SR…");
        srobo.competition.init(callback);
    };

    return srobo;
}(srobo || {}));
