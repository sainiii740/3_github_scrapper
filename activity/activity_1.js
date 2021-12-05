let request = require("request");
let cheerio = require("cheerio");
let path = require('path');
let fs = require("fs");
//https://github.com/topics
let url = "https://github.com/topics";
request(url, cb);
let pagelinksarr = [];
let namearr = [];
function cb(err, response, html) {
    if (err) {
        console.log("err found in cb");
    }
    else {
        let parsehtml = cheerio.load(html);
        let linksarr = parsehtml(".no-underline.d-flex.flex-column.flex-justify-center");


        for (let i = 0; i < linksarr.length; i++) {
            let n = parsehtml(linksarr[i]).find(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
            n = parsehtml(n).text();
            namearr.push(n);
            let link = parsehtml(linksarr[i]).attr("href");
            //  let full_link=path.join("https://github.com"+link); err don't know wy
            full_link = "https://github.com" + link;
            pagelinksarr.push(full_link);
        }
        for (let i = 0; i < linksarr.length; i++) {
            console.log("name->", namearr[i], "  link->", pagelinksarr[i]);

        }
        reposfinder(0);

    }
}
let curr;
function reposfinder(n) {
    curr = Number(n);
    if (n == pagelinksarr.length) {
        return;
    }
    request(pagelinksarr[n], cb1);

}
function createdir(dirpath) {
    if (fs.existsSync(dirpath) == false) {
        fs.mkdirSync(dirpath);
    }
}
function createfile(filepath) {
    if (fs.existsSync(filepath) == false) {
        fs.openSync(filepath, "w");
    }
}
function cb1(err, response, html) {
    if (err) {
        console.log("err found in cb1");
    }
    else {
        let parsehtml = cheerio.load(html);
        let linksarr = parsehtml(".tabnav.px-3.mb-0>.tabnav-tabs");
        // console.log("content"+parsehtml(linksarr[0]).html());
        let repos_isues = [];
        // console.log("name-> ", namearr[curr]);
        let dirpath = path.join(__dirname, namearr[curr].trim());
        createdir(dirpath);
        let filepatharr = [];
        for (let i = 0; i < 8; i++) {
            let link = parsehtml(linksarr[i]).find("li")[1];
            link = parsehtml(link).find("a");
            //to get href firstly we have to reach that element exactly;

            link = parsehtml(link).attr("href");
            let filename = link.split("/")[1];
            let filepath = filename.trim();
            filepath = path.join(__dirname, namearr[curr].trim(), filename + ".json");
            filepatharr.push(filepath);
            createfile(filepath);
            // console.log(link);
            // let full_link = path.join("https://github.com/topics", link); err dont kno wy
            let full_link = "https://github.com" + link;

            repos_isues.push(full_link);

        }
        for (let i = 0; i < 8; i++) {
            // console.log(repos_isues[i]);
            extract_issues(repos_isues[i], filepatharr[i]);
        }
        reposfinder(curr + 1);
    }
}

function extract_issues(isu_url, filepath) {
    request(isu_url, isu_cb);
    function isu_cb(err, response, html) {
        
        if (err) {
            console.log("err found in isu_cb");
        }
        else {
            let arr = [];
            let parsehtml = cheerio.load(html);
            let linknnamearr = parsehtml(".flex-auto.min-width-0.p-2.pr-3.pr-md-2>a");
            for (let i = 0; i < linknnamearr.length; i++) {
                let name = parsehtml(linknnamearr[i]).text();
                let link = parsehtml(linknnamearr[i]).attr("href");
                let obj = {
                    Link: "https://github.com" + link,
                    Name: name
                    
                }
                arr.push(obj);
                // console.log(name);
                // console.log(link);

            }
            // console.table(arr);
            // console.log(".............................................");
            let contentoffile = JSON.stringify(arr);
            fs.writeFileSync(filepath, contentoffile);

        }
    }

}