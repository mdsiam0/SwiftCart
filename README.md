# 1) What is the difference between null and undefined?

 undefined: This is a type that indicates a variable has been declared but has not yet been assigned a value.
 
 null: This is an assignment value that represents the intentional absence of any object value.

# 2) What is the use of the map() function in JavaScript? How is it different from forEach()?

map(): Iterates through an array and returns a new array containing the results of calling a function on every element.
forEach(): Executes a provided function once for each array element but returns undefined.

# 3) What is the difference between == and ===?

== Loose Equality: Checks for value equality only. It performs Type Coercion, meaning it converts the variables to a common type before comparing.

=== Strict Equality: Checks for both value and type equality. No type conversion occurs.

# 4) What is the significance of async/await in fetching API data?

async/await is used to handle asynchronous operations more effectively.

# 5) Explain the concept of Scope in JavaScript (Global, Function, Block).

Scope determines where variables are accessible within your code.

Global Scope: Variables declared outside of any function or block are in the global scope and can be accessed from anywhere in the script.

Function Scope: Variables declared inside a function (using var, let, or const) are only accessible within that specific function.

Block Scope: Variables declared with let or const inside a block (like an if statement or a for loop) are only accessible within that block {}.
