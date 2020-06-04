Done - need to demo:
====================
1. On dragging an API needs to be fired that updates the priority in DB. How to maintain the priority in DB is explained in Q13 of howto https://savantcare.github.io/tech/howto.html#q13


Todo:
=====
1. KB interaction
   1. Multi select using KB

2. Search 
   1. Highlight the search term in each row of the result. For e.g. https://vuetifyjs.com/en/components/autocompletes/

3. Show discontinued rex's inside a tab in the 2nd layer from the X shortcut in the header. (See history of discontinued rex)

4. Cts to load for DA and D should come from DB.

5. Animation
    1. When I give the command the card should come from the bottom since that is the chat interface people are used to. Currently the card comes from the top. Reference: See how skype works.
    2. remove the movement of data rows and cards on hover.

6. The correct DB to use is: DB_SC_Recommendation_CT_V20. It uses the concept of temporal database. For concept read: https://mariadb.com/kb/en/temporal-data-tables/

7. Use temporal DB concept to show the change history for a recommendation that has been changed 
    1. When I go to the tabDialog to chagne a recommendation below that show the change history for that recommendation.
    2. The multichange slider needs a page number component at the bottom
    3. Regression: Multi change Ct does not show history.

-- Discussed with Alexey till here.

8. Table appointment -> apptUUID, patientUUID, dateAndTimeOfAppt, timeOfApptLock
Generate slider in header based on timeOfApptLock and on dragging the slider show the correct data in the components inside stateOnSelectedTimeSplitArea

Store addendums in the DB
apptUUID, componentUUID, AddendumText, changedByUUID, changedOn, changedFromIPAddress

9. The left needs to look like: https://www.techrepublic.com/blog/web-designer/how-to-get-the-ruled-paper-background-effect-with-css3/

10. Size limitation of Doctors laptop
    1. There is wasted column space in data row table.
    2. Too much space being wasted in Ct Name and then yours and others.

11. Only 1 doctor gets to choose columns and not other doctors.
   1. The column names are not user friendly.

12. When I am logged in and I go to /login/ the page does not know that I am already logged in.

13. How does the system know what are health and what are other components?

14. Dx is not using CardHeader.vue

15. Should single tab data table and multi tab data table components be 2 different components.

16. Code repeated between components.
   1. DB  
   2. KB traverse

17. Code refactor

   1. https://github.com/savantcare/patientfile/blob/62d857092560bb2770611fd9cbef4012adbca00d/vue-client/src/store/modules/recommendation.js#L181 section for "Server connection error" is missing. Why not call discontinueRecommendation() in a for loop from inside multiDiscontinueRecommendations (@jana)


Milestone 5:
============

1. Give me a page where I can create a new patient 

2. Give me a page where I can choose from a list of patients whose patient file I want to open.
   1. Opening a patient file without a valid patient IDn should redirect to search page.

3. 20 components of production quality.











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

