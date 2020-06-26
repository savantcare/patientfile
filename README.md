![Patient file](./docs/ui/images/patient-file.png)

Docuemntation: https://savantcare.github.io/

Code documentation is in: /styleguidist/

Goal: When looking at a region of code I do not need to have expereince with other code

Short forms in code:

1. appt -> Appointment
2. ar -> Array
3. fn -> Function
4. ct -> Component
5. ob -> Object
6. v -> Variable

Naming Goals:

1. When I look at variable, array, function, object, component the name should tell me what it is
2. Short names
3. How are the different function types distinguished?
   apiGetAge -> This is api function
   cfGetAge -> This is computed function
   wfGetAge -> This is a watch function
   mfGetAge -> This is method function
   fnGetAge -> This is a non categorized function
4. How are different variable types distinguished?
   vsAge -> This is variable of type string
   vnAge -> This is variable of type int
   vbAge -> This is variable of type bool
