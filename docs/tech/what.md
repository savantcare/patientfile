## Q1) What code-formatter is used?
vetur


## What is the migration plan?
We get rec and rem component to work completely in the new architecture. Once they are cerifited then 10 developers are given the responsibility of delivered 5 components each week.

Within 2 weeks /p2 will get released once the architecture is finalized

## What is the ideal component on which other components are based?
Recommendation.

## What is needed to write a new component?

For the model component RecommendationsCard the following files needed to be created:

## Client side
1. vue-client/src/components/RecommendationsCard.vue file    -> This has the presentation layer (html), styling layer (css), JS to change the state. This file is compiled into seperate html js and css by vue-cli
2. vue-client/store/modules/recommendation.js               -> Vue state of this component. Mutation functions to state. Socket functions to change state.

## Server side
1. node-server/models/database/recommendation.database.js   -> Sequalize connection details
2. node-server/models/recommendation.model.js               -> Sequalize sql structure of this component
3. node-server/routes/recommendation.route.js               -> Routes of this component and emit socket messages

**Todo** 

How to keep these files in a seperate repo. How to run them independently.
Possible solution:
1. https://github.com/teambit/bit


## What tags are used in code?

 * Todo
 * Question
 * Fix

To find files with Fix tag: 

patientfile> grep -ir -n --exclude-dir={node_modules,.git} ' Fix' ./

## What is the code review process?
https://www.youtube.com/watch?v=8fx-EaOUK2E
