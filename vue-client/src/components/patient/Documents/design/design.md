 Introduction                                                                                    
 ===============                                                                                 
 Patients can have many documents, organising those is an issue.                                 
 For that we are using the concept of folders which is nothing but logically grouping of         
 documents.                                                                                      
                                                                                                 
 We are also maintaining several labels. eg. 'Lab Results', 'Legal paperwork' etc.               
 At the time of creating a folder we are labelling that folder with these labels for better      
 organising.                                                                                     
                                                                                                 
 For example, one can create a folder named 'Folder 1' which contains 'Medical Records' type     
 documents. So in layer 1 card, there will be a section/folder titled: 'Folder 1 (Medical        
 Records)' under which uploaded documents can be seen.                                           
                                                                                                 
 Folder names are user defined and labels are pre-defined.                                       
 Following are the list of labels:                                                               
 ----------------------------------                                                              
 Other,                                                                                          
 Cures report,                                                                                   
 Lab Results,                                                                                    
 Lab Order,                                                                                      
 Disability Paperwork,                                                                           
 Legal Paperwork (Subpoena etc),
                                                                
 Official Letters,                                                                               
 ROI (External & Internal),                                                                      
 Medical Records,                                                                                
 Prior Auth (Request & Approval),                                                                
 Policy                                                                                          
                                                                                                 
                                                                                                 
                                                                                                 
                                                                                                 
                                                                                                 
 Layer 1 card                                                                                    
 ==================                                                                              
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ ┌──────────┐                                                                      ┌───┐┌───┐  │
│ │Documents │                                                                      │Add││Fax│  │
│ └──────────┘                                                                      └───┘└───┘  │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌┬───────────────────────────────┬──────────────────────────┬────────┬┬────┬┬─────────────┬─┐ │
│ ││Folder 1 (Medical Records)     │                          │Add more││Lock││Remove folder│ │ │
│ │└───────────────────────────────┘                          └────────┘└────┘└─────────────┘ │ │
│ │┌────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│ ││Document name                   Uploaded by            Upload time            Action    │ │ │
│ │└────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│ │┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐┌───────────┐ │ │
│ │ Test report 1.pdf               DA Alex                2nd Jan, 2020        │  Remove   │ │ │
│ │└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘└───────────┘ │ │
│ │┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐┌───────────┐ │ │
│ │ Test report 2.jpg               DA Alex                2nd Jan, 2020        │  Remove   │ │ │
│ │└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘└───────────┘ │ │
│ └───────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                               │
│ ┌┬───────────────────────────────┬───────────────────────────────────────────┬────────────┬─┐ │
│ ││Folder 2 (Other)               │                                           │Add comment │ │ │
│ │└───────────────────────────────┘                                           └────────────┘ │ │
│ │┌────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│ ││Document name                   Uploaded by            Upload time                      │ │ │
│ │└────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│ │┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │ │
│ │ Case history.pdf                Dr. S Parikh           10th Dec, 2019                   │ │ │
│ │└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │ │
│ │┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │ │
│ │ Old prescriptions.jpg           DA Alex                11th Dec, 2019                   │ │ │
│ │└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │ │
│ └───────────────────────────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                                 
                                                                                                 
┌─────────────────────────────────────────────────────────────────────────────────────────┐      
│Notes:                                                                                   │      
│======                                                                                   │      
│A folder can be in 1 of 2 states, saved state and draft state.                           │      
│                                                                                         │      
│Draft state:                                                                             │      
│-----------                                                                              │      
│Initially it will be in draft state and then we can do some actions that aren't allowed  │      
│in saved state. Such as "Add more", "Remove folder" and "Lock" operations. The lock      │      
│operation will change the folder state from draft to saved state and rest of the         │      
│operations are pretty much self-explanatory.                                             │      
│                                                                                         │      
│In above mentioned "Layer 1 card" diagram, folder named "Folder 1 (Medical Records)" are │      
│in draft state. Documents are being displayed row wise.                                  │      
│Clicking on document name will open that document in a popup window.                     │      
│User can remove/delete individual document if the folder isn't in saved or locked status.│      
│                                                                                         │      
│Saved state:                                                                             │      
│------------                                                                             │      
│Saved state or locked state means no further uploading or deleting documents in that     │      
│folder is allowed. In this case only comment can be added.                               │      
│                                                                                         │      
│"Folder 2 (Other)" is an example of locked folder.                                       │      
└─────────────────────────────────────────────────────────────────────────────────────────┘      