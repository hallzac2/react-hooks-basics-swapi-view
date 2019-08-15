# react-hooks-basics-swapi-view
A small app to highlight the differences between class components and function components using hooks.

![React Hooks Spongebob Reference](https://github.com/hallzac2/react-hooks-basics-swapi-view/blob/master/patrick-hooks.png)

### Problems in React
* It’s hard to reuse stateful logic between components.
* Complex components become hard to understand.
* Classes confuse both people and machines.

### Hooks Solve These
* Reuse stateful logic without changing your component hierarchy.
* Split a component into smaller pieces based on what pieces are related.
* Use more of React Features without classes.

### Hooks Conventions
* Only use them in function components.
* Name always start with ’use’.
* Hooks need to be called in the same order for every render because React relies on this. Do not call hooks conditionally!
* Hooks should always be called at the top of our components.

### Other Benefits
* We can write our own custom hooks! This allows us to share small pieces of logic easily.
* React devs probably have access to optimizations in the framework that we don't (Other languages and frameworks do this, Java Streams for example).

### Finally...
* Classes are still supported for the foreseeable future.
* Hooks work side by side with existing code.
* Hooks are the future of React.

### References
* https://reactjs.org/docs/hooks-intro.html
* https://reactjs.org/docs/hooks-reference.html
* https://reactjs.org/docs/hooks-rules.html
* https://reactjs.org/docs/hooks-custom.html
* https://frontarm.com/james-k-nelson/react-hooks-intuition/
