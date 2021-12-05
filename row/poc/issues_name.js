let request = require("request");
let cheerio = require("cheerio");
let path = require('path');
let url = "https://github.com/tensorflow/tensorflow/issues";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log("err found");
    }
    else {
        let parsehtml = cheerio.load(html);
        let linknnamearr = parsehtml(".flex-auto.min-width-0.p-2.pr-3.pr-md-2>a");
        for (let i = 0; i < linknnamearr.length; i++) {
            let name = parsehtml(linknnamearr[i]).text();
            let link = parsehtml(linknnamearr[i]).attr("href");
            console.log(name);
            console.log(link);
            console.log(".............................................");
        }




    }
}