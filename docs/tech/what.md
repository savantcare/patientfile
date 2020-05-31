## Q1) What code-formatter is used?
vetur


## Q2) What is the migration plan?
We get rec and rem component to work completely in the new architecture. Once they are cerifited then 10 developers are given the responsibility of delivered 5 components each week.

Within 2 weeks /p2 will get released once the architecture is finalized

## Q3) What is the ideal component on which other components are based?
Recommendation.

## Q4) What is needed to write a new component?

For the model component RecommendationsCard the following files needed to be created:

## Client side
1. **HTML/CSS/JS** -> [vue-client/src/components/composition-layer1/RecommendationsCard.vue](https://github.com/savantcare/patientfile/blob/master/vue-client/src/components/composition-layer1/RecommendationsCard.vue) -> This has the presentation layer (html), styling layer (css), JS to change the state. This file is compiled into seperate html js and css by vue-cli
2. **Local State** -> [vue-client/store/modules/recommendation.js](https://github.com/savantcare/patientfile/blob/master/vue-client/src/store/modules/recommendation.js) -> State of this component. Functions to mutate state. Socket functions to change state.

## Server side
1. **Connection details** -> [node-server/models/database/recommendation.database.js](https://github.com/savantcare/patientfile/blob/master/node-server/models/database/recommendation.database.js)
2. **Sql structure** -> [node-server/models/recommendation.model.js](https://github.com/savantcare/patientfile/blob/master/node-server/models/recommendation.model.js)          
3. **Routes** and emit socket messages -> [node-server/routes/recommendation.route.js](https://github.com/savantcare/patientfile/blob/master/node-server/routes/recommendation.route.js) 

## Q5) What tags are used in code?

 * Todo:
 * Question:
 * Fix:

To find files with Fix tag: 

patientfile> grep -ir -n --exclude-dir={node_modules,.git} ' Fix:' ./

## Q6) What is the code review process?
https://www.youtube.com/watch?v=8fx-EaOUK2E
