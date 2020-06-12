Introdution
===========

MSE component has 14 child components.

Mood/Affect                                               
Appearance                                                
Attitude                                                  
Cognition                                                 
Constitutional                                            
Eye Contact                                               
Impulse Control                                           
Insight                                                   
Judgement                                                 
Perception                                                
Psychomotor                                               
Speech                                                    
Thought Content                                           
Thought Process                                           
Neurologicalal                                            


Appearence sub component
------------------------

Normal (Short code)                
Good grooming and hygiene,         
No apparent distress,              
Well-developed, well-nourished,    
Appears stated age,                
Appears younger than stated age,   
Appears older than stated age,     
Obese,                             
Thin or cachectic,                 
Disheveled, unkempt,               
Malodorous,                        
Other    


Attitude sub component
----------------------

Cognition sub component
-----------------------

Consitutional sub component
---------------------------



Layer 1 card
============

                       ┌────────────────────────────────┐                           
                       │      Mental status exam        │                           
                       │                                │                           
                       │  Layer 1 card - Current state  │                           
                       └────────────────────────────────┘                           
┌─┬─────────────────────┬────────────────────────────────────────┬─────┬───────────┐
│ │ Mental status exam  │                                        │  C  │           │
│ └─────────────────────┘                                        └─────┘           │
├──────────────────┬───────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ │                                                               │
│ │  Appearence  │ │        ┌───────────────┬─┬────────────┬───┐                   │
│ └──────────────┘ │        │               │ │   Dates    │   │                   │
│ ┌──────────────┐ │        │               │ └────────────┘   │                   │
│ │   Attitude   │ │        │               │                  │                   │
│ └──────────────┘ │        │               │   │   │    │   │ │                   │
│ ┌──────────────┐ │        │               │   │   │    │   │ │                   │
│ │Psychomotor   │ │        │               │   │   │    │   │ │                   │
│ └──────────────┘ │        │               │   │   │    │   │ │                   │
│ ┌──────────────┐ │        │┌────────────┐ │   │   │    │   │ │                   │
│ │ Eye contact  │ │        ││  Dropdown  │ │   │   │    │   │ │                   │
│ └──────────────┘ │        ││  choices   │ │   │   │    │   │ │                   │
│    │             │        │└────────────┘ │   │   │    │   │ │                   │
│    │             │        │               │   │   │    │   │ │                   │
│    │             │        │               │   │   │    │   │ │                   │
│    │             │        │               │   │   │    │   │ │                   │
│    │             │        │               │   │   │    │   │ │                   │
│    │             │        │               │   │   │    │   │ │                   │
│    │             │        │               │   │   │    │   │ │                   │
│    │             │        │               │   │   │    │   │ │                   │
│    │             │        │               │   │   │    │   │ │                   │
│    │             │        └───────────────┴───┴───┴────┴───┴─┘                   │
│    │             │    e.g. of graph see image in same folder                     │
│    │             │                                                               │
└────┼─────────────┴───────────────────────────────────────────────────────────────┘
     │                                                                              
     │            ┌─────────────────────────────────────────┐                       
     │            │  C -> get 2nd layer tab to submit form  │                       
     ▼            └─────────────────────────────────────────┘                       
┌──────────┐                                                                        
│ 14 tabs  │                                                                        
└──────────┘                                                                        
                                                                                    
                                                                                    
                           ┌────────────────────────────────┐                       
                           │      Mental status exam        │                       
                           │                                │                       
                           │   Layer 1 card - multiState    │                       
                           └────────────────────────────────┘                       
┌─┬─────────────────────┬────────────────────────────────────────┬─────┬───────────┐
│ │ Mental status exam  │                                        │  C  │           │
│ └─────────────────────┘                                        └─────┘           │
├──────────────────┬───────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ │   ┌─────────────────────────┐                                 │
│ │  Appearence  │ │   │ Comma seperated values  │                                 │
│ └──────────────┘ │   └─────────────────────────┘                                 │
├──────────────────┼───────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ │    ┌─────────────────────────┐                                │
│ │   Attitude   │ │    │ Comma seperated values  │                                │
│ └──────────────┘ │    └─────────────────────────┘                                │
├──────────────────┼───────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ │    ┌─────────────────────────┐                                │
│ │Psychomotor   │ │    │ Comma seperated values  │                                │
│ └──────────────┘ │    └─────────────────────────┘                                │
├──────────────────┼───────────────────────────────────────────────────────────────┤
│                  │                                                               │
│ ┌──────────────┐ │    ┌─────────────────────────┐                                │
│ │ Eye contact  │ │    │ Comma seperated values  │                                │
│ └──────────────┘ │    └─────────────────────────┘                                │
│         │        │                                                               │
│         │        │                                                               │
└─────────┼────────┴───────────────────────────────────────────────────────────────┘
          │                                                                         
          │                                                                         
          ▼                                                                         
     ┌──────────┐                                                                   
     │ 14 rows  │                                                                   
     └──────────┘                                                                   




Layer 2 in tab:
================

    +----------------------------------------------------------------+   
    |                                                                |
    |  Mental status exam                                            |
    +----------------------------------------------------------------+    +---------------------------------------+
    |                  +--------------------------------+            |    |                                       |
+----> Appearance      | Normal (Short code)            | <---------------+  This is a multi-select box.          |
|   |                  | Good grooming and hygiene,     |            |    |  It will show latest selected data.   |
|   |                  | No apparent distress,          |            |    |  If user wish to alter selected data, |
|   |                  | Well-de^eloped, well-nourished,|            |    |  he can click and edit on it.         |
|   |                  +--------------------------------+            |    |                                       |
|   |                                                                |    |                                       |
|   | +-----------------------------------------------------------+  |    |  This perticular box is showing that  |
|   |                                                                |    |  "Appearance" of the patient is:      |
|   |                  +--------------------------------+            |    |  "Normal", "Good grooming and hygiene |
+----> Attitude        | Normal (Short code)            |            |    |  , "No apparent distress",            |
|   |                  | Pleasant and cooperative       |            |    |  "Well developed, well-nourished"     |
|   |                  |                                |            |    |                                       |
|   |                  +--------------------------------+            |    |                                       |
|   |                                                                |    |          
|   | +-----------------------------------------------------------+  |    |            
|   |                                                                |    |       
|   |                  +--------------------------------+            |    |                      
+----> Cognition       |                                |            |    |                 
|   |                  |                                |            |    |        
|   |                  +--------------------------------+            |    |              
|   |                                                                |    |    
|   | +-----------------------------------------------------------+  |    |                



Notes:
======
1. Data is sent to server only when submit is clicked. Half saved form just live on the client. There is only one submit for all the 14 components combined.

2. Options of each multi select are hard coded in the vue file

3. In multi select which options are auto selected when the user chooses normal -> Is hardcoded in vue file

4. What data to load when the web page is refreshed or the <Mental-status-exam></Mental-status-exam> component is loaded
    Option 1: There are non-subnmitted data on the client. In this case load the non-sumbitted data
    Option 2: Load with the latest data in the server. Because most times doctors change only 1 or 2 options. 

5. Which select component to use element.io vs vue-multiselect.js
                                        vue-multiselect.js         element.io
  Can search to find option                  Yes                      Yes
  on one drop down select multiple           Yes                      Yes 
  Use tagging concept to make other        Maybe                       No
  Option group to make normal feature       Yes                        No 