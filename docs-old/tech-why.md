


### Q8) How are the components structured?

#### Option1:

<RecommendationsCard>

<CardHeader Prop{Title=Recommendation}>
</CardHeader>

<DataTable Prop{row1:(a,b),row2:(c,d)}>
</DataTable>

</RecommendationsCard>

#### Option2:

<GenericCard Prop{Title=Recommendation, row1:(a,b),row2:(c,d)} >

</GenericCard>

Why is Option 1 better:

Theory: RecommendationsCard is using libraries and in option 2 RecommendationsCard is using a framework. Ref: https://www.programcreek.com/2011/09/what-is-the-difference-between-a-java-library-and-a-framework/

Practical:
1. Under option 1 I can decide not to use the cardHeader sub component and write my own card header in some cases like "Date of birth component"


### Q9) How to do theming for the app while each component maintains its own scoped local context style?

https://vuedose.tips/tips/theming-using-custom-properties-in-vuejs-components/

https://medium.com/maestral-solutions/coloring-your-app-implementing-live-theming-with-vue-js-and-styled-components-29e428900394

https://bootstrap-vue.org/docs/reference/theming

### Q10) How is the state of patient on a historical date generated?

#### Architecture 1

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

#### Architecture 2

The first query is:
select * from recommendationsTable where patientID=1;
This returns JSON C

Now all queries about the state of recommendation are made on the client side.

Advantages of architecture 2:
1. Less number of queries to server.

Dis-Advantages of architecture 2:
1. How to run sql query over a JSON on the browser client side. Use https://vuex-orm.org/ with https://github.com/vuex-orm/plugin-axios and https://github.com/vuex-orm/plugin-soft-delete (bring discontinued to industry standard by calling it soft delete)


### Q12) Why use an auto doc generator?

 Decided not to use storybook since want something where the code is auto parsed.

 So for vue client side code decided to use [vue-styleguidist](https://github.com/vue-styleguidist/vue-styleguidist)
 Ref: https://www.youtube.com/watch?v=ryyAiUYvfY8

Click here for [steps to run the doc generator](/#/Getting-started/tech-how)