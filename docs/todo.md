1. KB Interaction with the cards in layer 1 - right side.

2. Cardheader.vue

    1. Dx is not using CardHeader.vue
    2. In Rex card -> the spanner is not coming at the right location.
    
    So card header component needs to be able to display the settings icon and choose columns.

3. The search box component needs to search a list. Currently there is a if-else. Since there are 44 components. And each componet  has approx 3 actions associated. 
   So user can type:
      1. rex
      2. rex add
      3. rex multichange
      4. rex pdf
      5. rex hdr

4. Show panels on left side of layer 1

5. make F work in card header.

6. Animation
   1. recs/dx card header menu should have a slide in effect.
   2. When I give the command the card should come from the bottom since that is the chat interface people are used to. Currently the card comes from the top.

7. Should single tab data table and multi tab data table components be 2 different components.

8. rex needs to save data in the correct DB and table.

9. Opening a patient file without a patient should redirect to login page.

10. Cts to load for DA and D should come from DB. @raj -> what is the table name for this?

11. The sequence of Cts to load should also come from DB. 

12. reminderID field has no data when a new reminder is entered.

13. Code repeated between components.
   1. DB  
   2. KB traverse

14. Search 
   1. Highlight the search term in each row of the result.
   2. Press enter to select highlighted row.
   3. "rex " to execute the first command in the card header.

15. Offline refresh needs to work

16. Style ID does not make sense

17. Code refactor

   1. https://github.com/savantcare/patientfile/blob/62d857092560bb2770611fd9cbef4012adbca00d/vue-client/src/store/modules/recommendation.js#L181 section for "Server connection error" is missing. Why not call discontinueRecommendation() in a for loop from inside multidiscontinueRecommendation (@jana)

18. This is a health app. Time travel (rollback) needs to work (@raj)