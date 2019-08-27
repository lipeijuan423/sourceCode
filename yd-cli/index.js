const json2ts = require("json2ts");
const yidengdata = {
    yideng: "老袁",
    data: {
        age: 30
    }
}
const jsonContent = JSON.stringify(yidengdata);
let result = json2ts.convert(jsonContent);
console.log(result);