1. KB interaction
   1. When I give rex command and use downarrow it should go to the card header.
   2. Multi select using KB
   3. When I multi select recommendations. The only action available to me should be discontinue.
   4. When i add a new rex it cannot be selected by KB to change.

2. The search box component needs to search a list. Currently there is a if-else. Since there are 44 components. And each componet has n number of actions associated with them. 
   So user can type:
      1. rex
      2. rex add
      3. rex multichange
      4. rex pdf
      5. rex hdr

3. Search 
   1. Highlight the search term in each row of the result.
   2. There is a concept of industry term for e.g. recommendations in the medical industry is called rex. Diagnosis is called rex. In the search list in the dropdown in bracket need to show industry term.

4. Save the selected columns in local storage so that next load the selected columns come based on doctors selection.

5. The JSON that is returned makes no difference between yours and others. Maybe your and others should have 2 different API calls with 2 different JSON being returned.

6. make F work in card header.

7. On dragging an API needs to be fired that updates the priority in DB. How to maintain the priority in DB is explained in Q13 of howto https://savantcare.github.io/tech/howto.html#q13

8. Opening a patient file without a patient should redirect to login page.

9. Show discontinued rex's inside a tab in the 2nd layer from the D shortcut in the header.

10. Cts to load for DA and D should come from DB. @raj -> what is the table name for this?

11. The sequence of Cts to load should also come from DB. 

12. Dx is not using CardHeader.vue

13. Animation
   1. recs/dx card header menu should have a slide in effect.
   2. When I give the command the card should come from the bottom since that is the chat interface people are used to. Currently the card comes from the top.

14. The correct DB to use is: DB_SC_Recommendation_CT_V20

15. Use temporal DB concept to show the change history for a recommendation that has been changed 

16. Give me a page where I can create a new patient and choose from a list of patients whole patient file I want to open.

17. When I open a patient file it shows me all rex no matter what is the patient ID.

18. Should single tab data table and multi tab data table components be 2 different components.

19. Code repeated between components.
   1. DB  
   2. KB traverse

20. Offline refresh needs to work

21. Code refactor

   1. https://github.com/savantcare/patientfile/blob/62d857092560bb2770611fd9cbef4012adbca00d/vue-client/src/store/modules/recommendation.js#L181 section for "Server connection error" is missing. Why not call discontinueRecommendation() in a for loop from inside multiDiscontinueRecommendations (@jana)