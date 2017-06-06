export const getCSV = (list, headers, title = "reporte") => {

    let downloadLink,
        line = [],
        str = "",
        uri;

    headers.map(h => {

        line.push(h.label);

    });

    str += line.join(",");
    str += "\r\n";

    list.map(l => {

        line = [];

        for (let index in l) {

            if (l.hasOwnProperty(index)) {

                line.push(l[index]);

            }

        }

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
