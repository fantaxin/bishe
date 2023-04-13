console.log("000");

let res = [];
console.log(res.toString());

let flag = 0b1000101101101;
let val = 1;
let i = 0;
do {
    if (flag & 1) {
        res.push((val << i));
    }
    flag = flag >> 1;
    i++;
} while (flag > 0)

console.log(res.toString());
