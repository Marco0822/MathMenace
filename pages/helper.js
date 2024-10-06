//given a number (e.g. 3), make a list of 20 numbers where 3 items are "1".

function generateBooleanArray(n) {
    // Ensure n is not greater than 20
    if (n > 20) {
        n = 20;
    }

    // Create an array of 20 booleans initialized to false
    const booleans = new Array(20).fill(false);

    // Randomly set n booleans to true
    let count = 0;
    while (count < n) {
        const randomIndex = Math.floor(Math.random() * 20);
        if (!booleans[randomIndex]) {
            booleans[randomIndex] = true;
            count++;
        }
    }

    return booleans;
}

// Example usage
console.log(generateBooleanArray(3));   // Output: e.g. [true, false, false, true, false, ..., false]
console.log(generateBooleanArray(25));  // Output: e.g. [true, true, false, false, true, ..., false]