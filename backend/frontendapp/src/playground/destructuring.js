// PART 1: OBJECT DESTRUCTURING

const person = {
    name: "Willis",
    age: 27,
    location: {
        city: "Calgary",
        temp: 20
    }
};

// const name = person.name;
// const age = person.age;

// ES6 destructuring syntax - equivalent to the two lines above.
// Looks for properties of the object on the RHS.
// Can also provide a default if not included in the object.
const { name: firstName = "Anonymous", age } = person;
console.log(`${firstName} is ${age}.`);

// if (person.location.city && person.location.temp) {
//     console.log(`It's ${person.location.temp} in ${person.location.city}`);
// }

const { city, temp: temperature } = person.location; // Can also destructor off of a nested object.  Much more readable than the lines above.  Can also rename the property.
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}`);
}

const book = {
    title: "Ego is the Enemy",
    author: "Ryan Holiday",
    publisher: {
        name: "Penguin"
    }
};

const { name: publisherName = "Self-Published" } = book.publisher;

console.log(publisherName);

// PART 2: ARRAY DESTRUCTURING

const address = ["12424 Lake Christina Road", "Calgary", "AB", "T2J2R8"];
// const [street, city, state, zip] = address; // Array Destructuring syntax - ordered list of named variables (as they appear in the array in the RHS)

const [, city, state = "New York"] = address; // Array Destructuring syntax - can leave out variables we don't want using commas.  Can also set a default item.

console.log(`You are in ${city} ${state}.`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [itemName, , medPrice] = item;

console.log(`A medium ${itemName} costs ${medPrice}`);
