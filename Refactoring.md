# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

First thing that I did was move the variables outside the function, so we don't need to instantiate every time
Followed by failing fast the code when no event is passed, then, when we don't have a partitionKey passed, generate a new one and return, since the 
following validations are not needed.
But if we have an partition key and this one is bigger than 256 in length, we generate a new one and return, otherwise return the current one.
With that approach, we can remove those variables reassignments, leaving the code more legible, besides splitting the key generator in a function, to not repeat
the code inside the block and nested conditions.