#!/bin/bash

printf "== Copying 3 files from recommendation component "
printf "." && cp ../vue-client/src/components/patient/Recommendations/db/recommendation.database.js ./models/database/  
printf "." && cp ../vue-client/src/components/patient/Recommendations/db/recommendation.model.js ./models/
printf "." && cp ../vue-client/src/components/patient/Recommendations/db/recommendation.route.js ./routes/ 
echo " Done"