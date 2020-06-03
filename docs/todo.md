1. KB interaction
   1. Multi select using KB

2. Search 
   1. Highlight the search term in each row of the result. For e.g. https://vuetifyjs.com/en/components/autocompletes/
   2. In searchCommmandList for each command the action needs to be stored in the 2nd column of the list.

3. On dragging an API needs to be fired that updates the priority in DB. How to maintain the priority in DB is explained in Q13 of howto https://savantcare.github.io/tech/howto.html#q13

4. Opening a patient file without a patient should redirect to login page.

5. Show discontinued rex's inside a tab in the 2nd layer from the D shortcut in the header.

6. Cts to load for DA and D should come from DB.

7. The sequence of Cts to load should also come from DB. 

8. Give me a page where I can create a new patient 

9. Give me a page where I can choose from a list of patients whose patient file I want to open.

10. Animation
   1. recs/dx card header menu should have a slide in effect. The illusion we want to create for the user is that the "Action menu" was on the side of the card and it just arrived when the user asked for the action menu to come. Reference example is "Try it" when I go to https://element.eleme.io/#/en-US/component/layout
   2. When I give the command the card should come from the bottom since that is the chat interface people are used to. Currently the card comes from the top. Reference: See how skype works.

11. The correct DB to use is: DB_SC_Recommendation_CT_V20. It uses the concept of temporal database. For concept read: https://mariadb.com/kb/en/temporal-data-tables/

12. Use temporal DB concept to show the change history for a recommendation that has been changed 

-- Discussed with Alexey till here.

13. Dx is not using CardHeader.vue

14. Should single tab data table and multi tab data table components be 2 different components.

15. Code repeated between components.
   1. DB  
   2. KB traverse

16. Offline refresh needs to work

17. Code refactor

   1. https://github.com/savantcare/patientfile/blob/62d857092560bb2770611fd9cbef4012adbca00d/vue-client/src/store/modules/recommendation.js#L181 section for "Server connection error" is missing. Why not call discontinueRecommendation() in a for loop from inside multiDiscontinueRecommendations (@jana)


Dr. Parikh meeting on 2nd June:
===============================
1. sort
2. when there is only 1 col it wastes a lot of space.
3. default sort is priority and inside that updated at
4. col headers needs user friendly names
5. on multi select the data row options still come
6. new tab behavior is not ok
7. How to make a card as reviewed on?
8. "Created on" date -> shows computer time -> need to appyly a transform.
9. no need for hospitalization / self harm / rename bodyMeasurement to Vitals.


10. On the left for a previous date:

A. All card header and data row actions are hiden. In the card header only 1 option comes and it is called "Addendum"
(System only allows user to add a addendum. The addendum can be added to any componenet.)

B. It looks like paper. 
  e.g. Make the blue print black. So we know it is uneditable. If the note is for current time then it should look editable and it should update.

Take ideas of look from https://css-tricks.com/how-to-create-a-notebook-design-with-css/

C. For prev date => On left side when there is no data then it should not take space.

11. The header should make it clear that left side is for current time.

