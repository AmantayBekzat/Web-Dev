let str = "Hello";

str.test = 5; // (*)

alert(str.test); // TypeError: Cannot create property 'test' on string 'Hello'