1. KB interaction
   1. When I give rex command and use downarrow and press M the focus should be in the right form element.
      The same issue is there when I hit change on a data row.
      Sometimes the focus issue is also there when I try to add a rex.
   2. Multi select using KB
   3. When I multi select recommendations. The only action available to me should be discontinue.
   4. When i add a new rex it cannot be selected by KB to change.
   5. In data row sometimes on change the old data does not come.

2. renderCurrentStateCards(action) will be hard to maintain for 44 components.

3. Search 
   1. Highlight the search term in each row of the result. For e.g. https://vuetifyjs.com/en/components/autocompletes/
   2. The state searchComponentList needs to come out of index.js 
   3. The searchComponentList needs to be renamed to searchCommmandList
   4. In searchCommmandList for each command the action needs to be stored in the 2nd column of the list.

4. Save the selected columns in local storage so that next load the selected columns come based on doctors selection.

5. The JSON that is returned makes no difference between yours and others. Maybe your and others should have 2 different API calls with 2 different JSON being returned.

6. make F work in card header from selectedTime side and CurrentTime side

7. On dragging an API needs to be fired that updates the priority in DB. How to maintain the priority in DB is explained in Q13 of howto https://savantcare.github.io/tech/howto.html#q13

8. Opening a patient file without a patient should redirect to login page.

9. Show discontinued rex's inside a tab in the 2nd layer from the D shortcut in the header.

10. Cts to load for DA and D should come from DB.

11. The sequence of Cts to load should also come from DB. 

12. Give me a page where I can create a new patient 

13. Give me a page where I can choose from a list of patients whose patient file I want to open.

14. Animation
   1. recs/dx card header menu should have a slide in effect. The illusion we want to create for the user is that the "Action menu" was on the side of the card and it just arrived when the user asked for the action menu to come. Reference example is "Try it" when I go to https://element.eleme.io/#/en-US/component/layout
   2. When I give the command the card should come from the bottom since that is the chat interface people are used to. Currently the card comes from the top. Reference: See how skype works.

15. The correct DB to use is: DB_SC_Recommendation_CT_V20. It uses the concept of temporal database. For concept read: https://mariadb.com/kb/en/temporal-data-tables/

16. Use temporal DB concept to show the change history for a recommendation that has been changed 

-- Discussed with Alexey till here.

17. Dx is not using CardHeader.vue

18. Should single tab data table and multi tab data table components be 2 different components.

19. Code repeated between components.
   1. DB  
   2. KB traverse

20. Offline refresh needs to work

21. Code refactor

   1. https://github.com/savantcare/patientfile/blob/62d857092560bb2770611fd9cbef4012adbca00d/vue-client/src/store/modules/recommendation.js#L181 section for "Server connection error" is missing. Why not call discontinueRecommendation() in a for loop from inside multiDiscontinueRecommendations (@jana)