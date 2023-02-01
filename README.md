# Tic-tac-toe
A tic-tac-toe micro project to incrementally practice React development.

See it live [here](https://pedro-psb.github.io/react--tic-tac-toe)

![image](https://user-images.githubusercontent.com/7907864/216142879-41595749-8ef8-4bb2-bdc0-f35b6dfd200f.png)


## Setup
To install, test and run on your machine:

```bash
git clone https://github.com/pedro-psb/react--tic-tac-toe.git
cd react--tic-tac-toe

npm install
npm test
npm start
```

## Approach

The main goal of the project is to work out react development. In each version/iteration, I shall implement new features to explore some concepts or tools.

### v0.1
#### Features
- Winning row highlighting
- Message display with squashed identical subsequent messages (like `message (2)`)

#### Development considerations
- Using Context
	- It avoided some prop drilling although, at this complexity level, it was not a must.
- JS OOP (for the game engine)
	- Main reason for using OOP was to make testing easier. RTL enforces not testing implementation and rather testing whether the rendered output is right. Although this is good for testing components, it is not very practical for debugging logic. Testing the object and asserting directly to its data seemed more convenient for me.
- Testing with Jest/RTL (Components and Logic)
	- Dealing with JS testing from the first time, I liked the interactive test runner, the filtering options, and the definition of the test as a string `rather_than_in_a_long_method_name()`
	- I liked how RTL tries to enforce good testing practices for react and HTML accessibility. Made me have a better look at roles and accessibility attributes.
	- Jest seems to lack some proper test isolation out of the box. Eg, assigning an instance to a const in `beforeEach()` will not provide a fresh instance for each test. Sure, the workaround to get this working is simple, but it was a bit disappointing.
 - Mockup visual testing
	 - I was thinking of learning Storybook or something as it vaguely seemed to aid in developing the components' structure/visuals in isolation. Instead, just creating a `MockupComponent` and rendering them multiple times with different props was a very good method and allowed me to see most of the component's expected states at once.

### v0.2
#### Wishlist
- Keyboard support with arrows/vim keybindings

### General wishlist
- migrate to typescript
- support for rounds and scores.
- extended board size and winning patterns
- multiplayer support
