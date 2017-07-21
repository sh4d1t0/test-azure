"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCSV = undefined;

var _formats = require("./formats");

var getCSV = exports.getCSV = function getCSV() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "reporte";


    var downloadLink = void 0,
        line = [],
        str = "",
        uri = void 0;

    headers.map(function (h) {

        if (!h.ignore) {

            line.push(h.label);
        }
    });

    str += line.join(",");
    str += "\r\n";

    list.map(function (l) {

        line = [];
        headers.map(function (header) {

            if (!header.ignore) {

                var text = l[header.key];

                if (typeof l[header.key] !== "undefined") {

                    if (typeof header.type !== "undefined") {

                        text = (0, _formats.getFormat)({ "type": header.type, "value": text });

                        if (header.type === "currency") {

                            text = text.replace(",", "");
                            text = text.replace("$", "");
                        }
                    }
                } else {

                    text = "";
                }

                line.push(text);
            }
        });

        str += line.join(",");
        str += "\r\n";
    });

    uri = "data:text/csv;charset=utf-8," + encodeURIComponent(str);

    downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = title + ".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};