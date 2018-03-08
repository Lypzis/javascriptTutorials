var per = require('./script2');
var per2 = interopRequireDefault(per);

function interopRequireDefault(obj){
    return obj && obj.__esmodule ? obj : { default: obj };
}

console.log(per.default.name);