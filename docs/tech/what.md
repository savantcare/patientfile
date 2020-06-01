## Q1) What is needed to write a new component?

For the model component Recommendations the following files are needed:

Total loc: 991 

## Client side

### Layer 1

**HTML/CSS/JS (127 loc)** -> [/components/composition-layer1/RecommendationsCard.vue](https://github.com/savantcare/patientfile/blob/master/vue-client/src/components/composition-layer1/RecommendationsCard.vue) -> This has the presentation layer (html), styling layer (css), JS to change the state. This file is compiled into seperate html js and css by [vue-cli](https://cli.vuejs.org/)

### Layer 2
1. **Add (123 loc)**  [/components/composition-layer2/recommendation/AddRecommendation.vue](https://github.com/savantcare/patientfile/blob/master/vue-client/src/components/composition-layer2/recommendation/AddRecommendation.vue)

2. **Multi change (86 loc)**  [/components/composition-layer2/recommendation/MultiChangeRecommendation.vue](https://github.com/savantcare/patientfile/blob/master/vue-client/src/components/composition-layer2/recommendation/MultiChangeRecommendation.vue)

3. **Recommendation history (56 loc)**  [/components/composition-layer2/recommendation/RecommendationHistoryItem.vue](https://github.com/savantcare/patientfile/blob/master/vue-client/src/components/composition-layer2/recommendation/RecommendationHistoryItem.vue)


### Common between layer 1 and layer 2

**Local State (267 loc)** -> [/store/modules/recommendation.js](https://github.com/savantcare/patientfile/blob/master/vue-client/src/store/modules/recommendation.js) -> State of this component. Functions to mutate state. Socket functions to change state.

## Server side

1. **Connection details (27 loc)** -> [/models/database/recommendation.database.js](https://github.com/savantcare/patientfile/blob/master/node-server/models/database/recommendation.database.js)

2. **Sql structure (41 loc)** -> [/models/recommendation.model.js](https://github.com/savantcare/patientfile/blob/master/node-server/models/recommendation.model.js)          

3. **Routes (174 loc)** and emit socket messages -> [/routes/recommendation.route.js](https://github.com/savantcare/patientfile/blob/master/node-server/routes/recommendation.route.js) 


## Q2) What code-formatter is used?
vetur


## Q3) What is the migration plan?
We get rec and rem component to work completely in the new architecture. Once they are cerifited then 10 developers are given the responsibility of delivered 5 components each week.

Within 2 weeks /p2 will get released once the architecture is finalized

## Q4) What is the ideal component on which other components are based?
Recommendation.

## Q5) What tags are used in code?

 * Todo:
 * Question:
 * Fix:

To find files with Fix tag: 

patientfile> grep -ir -n --exclude-dir={node_modules,.git} ' Fix:' ./

## Q6) What is the code review process?
https://www.youtube.com/watch?v=8fx-EaOUK2E