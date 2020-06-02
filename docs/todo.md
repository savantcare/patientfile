1. The search box component needs to search a list. Currently there is a if-else. Since there are 44 components. And each componet has n number of actions associated with them. 
   So user can type:
      1. rex
      2. rex add
      3. rex multichange
      4. rex pdf
      5. rex hdr

2. Save the selected columns in local storage so that next load the selected columns come based on doctors selection.

3. dataTable the tabs hard coded and not coming from json. This makes the system inflexible. The JSON that is returned makes no difference between yours and others.

4. make F work in card header.

5. Dx is not using CardHeader.vue

6. Animation
   1. recs/dx card header menu should have a slide in effect.
   2. When I give the command the card should come from the bottom since that is the chat interface people are used to. Currently the card comes from the top.

7. The correct DB to use is: DB_SC_Recommendation_CT_V20

8. Use temporal DB concept to show the change history for a recommendation that has been changed 

9. Show discontinued rex's from the D shortcut in the header.

10. Give me a page where I can create a new patient and choose from a list of patients whole patient file I want to open.

11. When I open a patient file it shows me all rex no matter what is the patient ID.

12. Should single tab data table and multi tab data table components be 2 different components.

11. On dragging an API needs to be fired that updates the priority in DB.

12. Opening a patient file without a patient should redirect to login page.

13. Cts to load for DA and D should come from DB. @raj -> what is the table name for this?

14. The sequence of Cts to load should also come from DB. 

15. Code repeated between components.
   1. DB  
   2. KB traverse

16. Search 
   1. Highlight the search term in each row of the result.
   2. Press enter to select highlighted row.
   3. "rex " to execute the first command in the card header.

17. Offline refresh needs to work

18. Code refactor

   1. https://github.com/savantcare/patientfile/blob/62d857092560bb2770611fd9cbef4012adbca00d/vue-client/src/store/modules/recommendation.js#L181 section for "Server connection error" is missing. Why not call discontinueRecommendation() in a for loop from inside multiDiscontinueRecommendations (@jana)