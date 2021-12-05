let request=require("request");
let cheerio=require("cheerio");
let path=require('path');
let url="https:\github.com\topics\go";
request(url,cb);
function cb(err,response,html)
{
    if(err)
    {
        console.log("err found");
    }
    else{
        let parsehtml=cheerio.load(html);
        let linksarr=parsehtml(".f3.color-fg-muted.text-normal.lh-condensed");
        let repos=[];
        for(let i=0;i<8;i++)
        {
            let link=parsehtml(linksarr[i]).find("a")[1];
            //to get href firstly we have to reach that element exactly;
            link=parsehtml(link).attr("href");
            let full_link=path.join("https://github.com/topics/raspberry-pi",link);
            repos.push(full_link);

        }
        for(let i=0;i<8;i++)
        {
            console.log(repos[i]);
        }
    

    }
}