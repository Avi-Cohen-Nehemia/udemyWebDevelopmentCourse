// solution using for loop
// let average = (nums) => {
//     let current = 0;
//     let result;
//     for (let i = 0; i < nums.length; i += 1) {
//         current += nums[i];
//     }
//     result = Math.round(current / nums.length);
//     console.log(result);
// }

// solution using reducer
let average = (nums) => {
    let result = nums.reduce((acc, currentVal) => {
        return acc += currentVal
    }, 0);

    result = Math.round(result / nums.length)
    console.log(result);
}

//should return 94
var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

// should return 68
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2);