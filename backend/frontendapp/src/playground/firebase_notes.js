import * as firebase from "firebase";

const firebaseConfig = {
    // Take from firebase database config for your app.
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Setup data sub -> Andrew is a SW developer at Amazon
// Change the data and make sure it reprints.

const onValueChange = database.ref().on(
    "value",
    (snapshot) => {
        const val = snapshot.val();
        const template = `${val.name} is a ${val.job.title} at ${val.job.company}`;
        console.log(template);
    },
    (e) => {
        console.log("Error:", e);
    }
);

setTimeout(() => {
    database.ref("job/title").set("Manager");
}, 3500);

setTimeout(() => {
    database.ref("job/company").set("Google");
}, 10500);

// GETTING DATA

const onValueChange = database.ref().on(
    "value",
    (snapshot) => {
        console.log(snapshot.val()); // snapshot.val() is the data.
    },
    (e) => {
        console.log("Error:", e);
    }
); // Second argument to 'on' is the success handler function.  The third is the error handler
// on() returns the function provided in the second argument - save as const to be reused in off() calls.

setTimeout(() => {
    database.ref("age").set(29);
}, 3500);

setTimeout(() => {
    database.ref().off(onValueChange); // Cancel subscriptions on reference.
}, 7000);

setTimeout(() => {
    database.ref("age").set(2830);
}, 10500);

// SETTING DATA

database
    .ref()
    .set({
        name: "Willis Cheung",
        age: 27,
        job: {
            title: "Software Developer",
            company: "Google"
        },
        stressLevel: 6,
        location: {
            city: "Calgary",
            country: "Canada"
        }
    })
    .then(() => {
        console.log("Data is saved!");
    })
    .catch((e) => {
        console.log("This failed", e);
    });

// database.ref().set() returns a promise - we can add a 'then' or 'catch'
// to handle the promise.

//// UPDATING DATA

database.ref().update({
    stressLevel: 9,
    "job/company": "Amazon",
    location: {
        city: "Seattle",
        country: "USA"
    }
});

// REMOVING DATA

database.ref("isSingle").set(null); // equivalent to calling remove (shown below)

database
    .ref("isSingle")
    .remove()
    .then(() => {
        console.log("isSingle removed");
    })
    .catch((e) => {
        console.log("ERROR:", e);
    });

// WORKING WITH ARRAYS

database.ref("notes").push({
    title: "to-do",
    body: "go for a run"
});

database.ref("notes").push({
    title: "Course Topics",
    body: "React native, angular, python"
});

database.ref("notes/-LfLgHKvvcpeSQUAZR0s").update({
    body: "buy food"
});

database.ref("notes/-LfLgHKvvcpeSQUAZR0s").remove();

// Setup "Expenses" with three items (description, note, amount, createdAt)

database.ref("Expenses").push({
    description: "bus",
    note: "",
    amount: 2.5 * 100,
    createdAt: 0
});

database.ref("Expenses").push({
    description: "rent",
    note: "",
    amount: 500 * 100,
    createdAt: 0
});

database.ref("Expenses").push({
    description: "food",
    note: "",
    amount: 200 * 100,
    createdAt: 0
});

// Setting up subscribers for arrays.

// child_removed handler
database.ref("Expenses").on("child_removed", (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_changed handler
database.ref("Expenses").on("child_changed", (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_added handler - gets called for new and exising children.
database.ref("Expenses").on("child_added", (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// Subscribes to all changes
database.ref("Expenses").on(
    "value",
    (snapshot) => {
        const expenses = [];
        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        console.log(expenses);
    },
    (e) => {
        console.log("ERROR:", e);
    }
);

// Using once -> not a subscription (uses promises)
database
    .ref("Expenses")
    .once("value")
    .then((snapshot) => {
        const expenses = [];

        snapshot.forEach((childSnapshot) => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        console.log(expenses);
    });
