//given a number (e.g. 3), make a list of size `size` where `n` items are "true".

export function generateBooleanArray(n, size) {
    // Ensure n is not greater than size
    if (n > size) {
        n = size;
    }

    // Create an array of `size` booleans initialized to false
    const booleans = new Array(size).fill(false);

    // Randomly set n booleans to true
    let count = 0;
    while (count < n) {
        const randomIndex = Math.floor(Math.random() * size);
        if (!booleans[randomIndex]) {
            booleans[randomIndex] = true;
            count++;
        }
    }

    return booleans;
}

// Example usage
// console.log(generateBooleanArray(3, 20));   // Output: e.g. [true, false, false, true, false, ..., false]
// console.log(generateBooleanArray(25, 20));  // Output: e.g. [true, true, false, false, true, ..., false]