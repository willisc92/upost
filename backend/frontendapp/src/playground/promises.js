const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("This is my resolved data");
        // reject('Something went wrong');
    }, 5000);
});

// Promise can only be either resolved or rejected.

console.log("before");

// Promise handler

promise
    .then((data) => {
        console.log("1", data);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("This is my other promise");
            }, 5000);
        });
    })
    .then((str) => {
        console.log("does this run?", str);
    })
    .catch((error) => {
        console.log("Error:", error);
    });

// Use 'then' to do something when the promise is resolved.
// Use catch to do something for when the promie is rejected.
// In both cases, enter a callback function.
// Promises can also be chained together - returning data can be accessed in the next promise.

console.log("after");
