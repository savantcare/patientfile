## Q1) How to start the documentation system?

vue-client> npm run styleguide

And then go to:

http://localhost:6060

## Q2) How to create a fresh DB with structure and master data?

```static
patientfile/db> docker stop patientfile_mysqld_1
patientfile/db> rm -rf var-lib-mysql
patientfile/db> unzip may-22-2020.zip -d var-lib-mysql
patientfile/db> chmod -R 777 var-lib-mysql
/patientfile> docker-compose -f docker-compose-dev.yml up -d mysqld 
```

## Q3) How to create a new structure and master data?

```static
var-lib-mysql> zip may-22-2020.zip * -r
```

## Q4) How to run same component inside  patient file component and also individually?

### Step 1
A new componet called AddRecommendationTab is created inside: 

/Users/vk-tech/gt/sc-prog-repos/patientfile/vue-client/src/components/composition-layer2/AddRecommendation.vue

### Step 2
Now there is a route defined in vue-client/src/router/index.js: 
  {
    path: '/recommendation',
    name: 'recommendation',
    component: () => import('@/views/Recommendation.vue')
  },

Now when ever someone comes to http://ip-address/recommendation the router sends the user to /views/Recommendation.vue

### Step 3

Inside views/recommendation.vue the component created in step 1 is used. By the following codes:

1. Component is imported: 
import AddRecommendationTab from "@/components/composition-layer2/AddRecommendation";

2. Component is displayed:
```
     <el-tab-pane>
        <span slot="label" style="font-size:22px">Add recommendation</span>
        <AddRecommendationTab />
      </el-tab-pane>
```
The above structure is maintained because:

Components are supposed to be kept in components folder.

Views are supposed to use components but not define components.

### Q5) How to get started?

A new programmer should be able to write a new componet in 5 mins.

Start visual studio code
make sure vetur VSCode extension is installed.



## How to run the app locally?

```bash
git clone https://github.com/savantcare/patientfile.git

/patientfile> docker-compose -f docker-compose-dev.yml up -d
```

Give enough time for npm install to work:

```bash
/patientfile> docker logs patientfile_vue_1 -f
/patientfile> docker logs patientfile_node_1 -f
```

Once the install finishes then:
```
In 3 incognito tabs open
http://localhost:81/phpmyadmin/      admin              : WUy3OsU5BYMM
http://localhost:8080/login          user1@gmail.com    : 123
http://localhost:8080/login          user1@gmail.com    : 123
```

## How to see app behavior when DB server connection is lost?
The mysql server is run from docker (See node-server/README.md)

Use the web app and then 

$ docker stop [container-name-of-mysqld]

Now refresh the web app.

The data will come from localstorage but you will toast message saying:

"Filed to get "component name" data"

This works using try catch examples
1. [For recommendations](file:///gt/sc-prog-repos/patientfile/vue-client/src/store/modules/recommendation.js#221)
1. [For reminder](file:///gt/sc-prog-repos/patientfile/vue-client/src/store/modules/reminder.js#221)

To put the system back:
$ docker start [container-name-of-mysqld]


## How to see app behavior when DB server takes 10 seconds for API response?

### Scenario 1:

Refresh the browser page. The UI wsill show data immediately from local storage using [vuex-persistance.](https://github.com/robinvdvleuten/vuex-persistedstate)

After 10 seconds when API returns a value UI will update.

In this case we saved the doctor 10 seconds.

### Scenario 2:

On the UI discontinue a rex. 

Inside database.json it will not say Discontinue:true UI will continue to show it as discontinued. 

After 10 seconds database.json will show Discontinue:true. 

In this case the app was able to give doctor 10 second faster response.

### Scenario 3:

The web page shows the current list of recommendations

Edit node-server/database.json and change the description of a recommendation.

Reload the page

The web page should show the edited recommendation.

Status: Fail

## How to test the PWA app?
pwa app does not run from localhost. So the following steps needs to be followed:

We can test PWA app by install the following chrome extension:
https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb

## How to start mysqld inside docker?

Read: /docker/readme.md

## Mins of meeting

### 18th May 2020

1. No need to improve current scBrain, laravel and Panel code since after 2 years the app will not remain in angular 1.6 hence it makes sense to write it again in Vue. 

2. UI needs to only use Bootstrap to maintain consistency. No need to bring code into bootstrap since new VUE app will do it.

A. In new VUE app the left and right frame sizes will be adjustable by dragging

B. Use https://phppot.com/css/automatic-column-hiding-using-css-in-responsive-table/ to change the number of columns being displayed based on priority.

C. Use responsive divs so that when right side is made wider the cards can go beside each other. https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_two_columns_responsive

3. When write in VUE first develop the left frame. EMR customizer shows 44 components.

4. RnD needs to be done on how the panel and frame can remain seperate apps and still share vuex. Since the current angular app has many advantages of being 2 seperate app running as 1. 

Whole world runs app in one frame. Hence decided to stick with conventional wisdom.

5. RnD needs to be done on each component to be in its own repo. Why? So that when recommendation component code needs to be sent to prod it does not need other git repos to be updated.

How to do it?
https://github.com/teambit/bit 11K stars tutorial: https://codeburst.io/how-to-share-reusable-vue-components-between-a-c36bc775418d 


6. I should be able to run the complete app just with one repo. So during development I have a simpler environment to develop the app.

In Vue there is a system to choose which components to load. That will be used. Postponed for time being.

7. Current development rule

Bug fixes or new feature requested by doctor -> Existing angular app 

Remaining developer resources will be given to VUE app.


## Q7) How to reduce boilerplate code?

Have three types of components? #Todo

1. UI components: Reusable across the whole app. They communicate just by using props and events, not holding any application logic.

2. Layout components: App will have only 1 of these. Like header and footer.

3. Domain components: 

Ref: https://vueschool.io/articles/vuejs-tutorials/structuring-vue-components/

## Q8) How are the components structured?

### Option1: A library implementation

```
<RecommendationsCard>

<CardHeader Prop{Title=Recommendation}>
</CardHeader>

<DataTable Prop{row1:(a,b),row2:(c,d)}>
</DataTable>

</RecommendationsCard>
```

### Option2: A framework implementation

```
<GenericCard Prop{Title=Recommendation, row1:(a,b),row2:(c,d)} >

</GenericCard>
```
Why is Option 1 better:

Theory: RecommendationsCard is using libraries and in option 2 RecommendationsCard is using a framework. Ref: https://www.programcreek.com/2011/09/what-is-the-difference-between-a-java-library-and-a-framework/

Practical:
1. Under option 1 I can decide not to use the cardHeader sub component and write my own card header in some cases like "Date of birth component"

## Q9) How to theme app while each component maintains its own scoped local context style?

https://vuedose.tips/tips/theming-using-custom-properties-in-vuejs-components/

https://medium.com/maestral-solutions/coloring-your-app-implementing-live-theming-with-vue-js-and-styled-components-29e428900394

https://bootstrap-vue.org/docs/reference/theming

## Q10) How is the state of patient on a historical date generated?

### Architecture 1

Suppose doctor wants the state of the paitent on 15th Jan 2020:

The query is:
select * from recommendationsTable where patientID=1 and createdBy < "15th Jan 2020" and ( discontinuedDate > "15th Jan 2020" or discontinuedDate == NULL)
This returns JSON A


Suppose doctor wants the state of the paitent on 10th Mar 2020:
The query is:
select * from recommendationsTable where patientID=1 and createdBy < "10th Mar 2020" and ( discontinuedDate > "10th Mar 2020" or discontinuedDate == NULL)
This returns JSON B

Suppose the doctor wants to know the state of the patient on 9th March 2020:
This requires the same API as above.

Dis-Advantages of architecture 1:
1. Too many sql queries. But the data center is big and there are read only copies of MYSQL running from RAM ready to serve these queries. It is better to offload the complexity to the hardware instead of software. Wisdom says it is better to have expensive hardware and simple software.

### Architecture 2

The first query is:
select * from recommendationsTable where patientID=1;
This returns JSON C

Now all queries about the state of recommendation are made on the client side.

Advantages of architecture 2:
1. Less number of queries to server.

Dis-Advantages of architecture 2:
1. How to run sql query over a JSON on the browser client side. Use https://vuex-orm.org/ with https://github.com/vuex-orm/plugin-axios and https://github.com/vuex-orm/plugin-soft-delete (bring discontinued to industry standard by calling it soft delete)

