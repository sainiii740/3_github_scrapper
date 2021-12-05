let fs = require("fs");
// const { stringify } = require("querystring");
let content = fs.readFileSync("abc.json");
if ((content + "") == "") {
    let arr = [];
    let obj = {
        name: "himanshu",
        age: 22
    };
    arr.push(obj);
    let contentoffile = JSON.stringify(arr);
    fs.writeFileSync("abc.json", contentoffile);
}
else{
    
    let arr=JSON.parse(content);
    let obj = {
        name: "don't be fool",
        age: 22
    };
    arr.push(obj);
    let contentoffile = JSON.stringify(arr);
    fs.writeFileSync("abc.json", contentoffile);

}



