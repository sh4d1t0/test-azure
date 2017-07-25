import {getFormat} from "./formats";

export const getCSV = (list = [], headers = [], title = "reporte") => {

    let downloadLink,
        line = [],
        str = "",
        uri;

    headers.map(h => {

        if (!h.ignore) {

            line.push(h.label);

        }

    });

    str += line.join(",");
    str += "\r\n";

    list.map(l => {

        line = [];
        headers.map(header => {

            if (!header.ignore) {

                let text = l[header.key];

                if (typeof l[header.key] !== "undefined") {

                    if (typeof header.type !== "undefined") {

                        text = getFormat({"type": header.type, "value": text});

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
    downloadLink.download = `${title}.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

};
