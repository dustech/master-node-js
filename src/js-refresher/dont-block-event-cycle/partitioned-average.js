function asyncAvg(n, avgCB) {
    // Save ongoing sum in JS closure.
    let sum = 0;
    function help(i, cb) {
        sum += i;
        if (i === n) {
            cb(sum);
            return;
        }

        // "Asynchronous recursion".
        // Schedule next operation asynchronously.
        setImmediate(help.bind(null, i + 1, cb));
    }

    // Start the helper, with CB to call avgCB.
    help(1, function (sum) {
        const avg = sum / n;
        avgCB(avg);
    });
}

const n = 10;

asyncAvg(n, function (avg) {
    console.log('avg of 1-n: ' + avg);
});