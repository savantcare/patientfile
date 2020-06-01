## Q1) How to run the app locally?

The conventional method is to run the vuejs and node server locally and the mysql DB on a public server.

VueJS talks to Nodejs running on same computer. Nodejs talks to mysql running on public server.

:::: tabs
 
::: tab Commands

```
git clone https://github.com/savantcare/patientfile.git
vue-client> npm install               
vue-client> npm run serve              # starts vue server
node-server> npm install            
node-server> npm run start             # start node server
```
:::
  
::: tab Action


<video width="560" height="240" controls>
  <source src="./images/run-vue-node-local-with-non-local-db.webm" type="video/mp4">
  Your browser does not support the video tag.
</video> 

:::
 
::::

In 3 incognito tabs open:

To access phpmyadmin -> http://138.68.233.185:81/     stanford              : jaidurgama

Login as doctor -> http://localhost:8080/login          user1@gmail.com    : 123

Login as doctor admin assistant -> http://localhost:8080/login          user1@gmail.com    : 123


## Q2) How to start the documentation system?

### App level

#### Prod

:::: tabs
 
::: tab Commands

```
docs> npm run build            // Generate prod files in .vuepress/dist
```

Then send .vuepress/dist to repo -> [https://github.com/savantcare/savantcare.github.io](https://github.com/savantcare/savantcare.github.io)

```
savantcare.github.io> git commit -m "deploy"
savantcare.github.io> git push
```

:::
  
::: tab Action



<video width="560" height="240" controls>
  <source src="./images/deploy-docs-to-server.webm" type="video/mp4">
  Your browser does not support the video tag.
</video> 

:::
 
::::

Then access:
[https://savantcare.github.io/](https://savantcare.github.io/)

#### Dev

To write the docs and see changes with hot reload:

:::: tabs
 
::: tab Command
```
docs> npm run dev
```
:::
  
::: tab Action

![movie](./images/hot-reload-docs.gif)

:::
 
::::

Then access: [http://localhost:8080/](http://localhost:8080/)


### Api Level

```
vue-client> npm run styleguide
```

And then go to:

http://localhost:6060

## Q3) How to create a fresh DB with structure and master data?

```
patientfile/db> docker stop patientfile_mysqld_1
patientfile/db> rm -rf var-lib-mysql
patientfile/db> unzip may-22-2020.zip -d var-lib-mysql
patientfile/db> chmod -R 777 var-lib-mysql
/patientfile> docker-compose -f docker-compose-dev.yml up -d mysqld 
```

## Q4) How to create a new structure and master data?

```
var-lib-mysql> zip may-22-2020.zip * -r
```

## Q5) How to run same component inside  patient file component and also individually?

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

## Q6) How to get started?

A new programmer should be able to write a new componet in 5 mins.

Start visual studio code
make sure vetur VSCode extension is installed.

## Q7) How to see app behavior when DB server connection is lost?
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


## Q8) How to see app behavior when DB server takes 10 seconds for API response?

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

## Q9) How to test the PWA app?
pwa app does not run from localhost. So the following steps needs to be followed:

We can test PWA app by install the following chrome extension:
https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb

## Q10) How to reduce boilerplate code?

Have three types of components? #Todo

1. UI components: Reusable across the whole app. They communicate just by using props and events, not holding any application logic.

2. Layout components: App will have only 1 of these. Like header and footer.

3. Domain components: 

Ref: https://vueschool.io/articles/vuejs-tutorials/structuring-vue-components/

## Q11) How are the components structured?

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

## Q12) How to theme app while each component maintains its own scoped local context style?

https://vuedose.tips/tips/theming-using-custom-properties-in-vuejs-components/

https://medium.com/maestral-solutions/coloring-your-app-implementing-live-theming-with-vue-js-and-styled-components-29e428900394

https://bootstrap-vue.org/docs/reference/theming

## Q13) How is the state of patient on a historical date generated?

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


## Q14) How to start the dev environment?

Step1: Start mysqld

```
patientfile/docker> docker-compose -f maria-10.4-docker-compose.yml up -d
```

To access phpmyadmin:
http://[ip-address]:81/

First time the root password is qwerty

The admin password is given in: 
patientfile/node-server/config/development.json

To enter the docker container:

```
root@server1:/gt/sc-prog-repos/patientfile/docker# docker exec -ti docker_mariadb_1 bash
root@c02b4fc1097e:/# 
```

Ref: https://hackernoon.com/mariadb-phpmyadmin-docker-running-local-database-ok9q36ji

Step2: Start vue-client

```
cd /gt/sc-prog-repos/patientfile/vue-client
npm install
npm run serve
```

Step3: Start node-server

```
cd /gt/sc-prog-repos/patientfile/node-server
npm install
npm run start
```

Then in your browser go to: http://localhost:8080/


## Q15) How to deploy to Heroku?

```
cd vue-client
npm run build
git add .
git commit -m "....."
git push to the Repository
```

Heroku updates the staging server automatically when the master branch is updated

