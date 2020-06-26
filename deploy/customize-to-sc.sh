#!/bin/bash

FILE=/etc/gt-releases
if test -f "$FILE"; then
    echo "$FILE exists."
    read -r dateOfCustomization<$FILE
    echo $dateOfCustomization

    minDate=$(date -d 2020-07-18 +%s)
    customizeDate=$(date -d $dateOfCustomization)
    
    if [ "$$dateOfCustomization" > "$minDate" ];
    then
	break
    else
	echo "Run customize-ubuntu-server to update this servers security";
	exit
    fi  

    
else
    echo "Run customize-ubuntu-server before this"
    exit
fi    


mkdir /gt/sc-prog-repos

cd /gt/sc-prog-repos/

git clone https://github.com/savantcare/patientfile.git

# Step: Sart mysql-server
apt install -y docker
docker run -p "80:80" -p "3306:3306" -v ${PWD}/app:/app mattrayner/lamp:latest-1804 
# confirm that this loads phpmyadmin http://138.68.233.185/phpmyadmin/index.php

# Enter the admin password inside db.config

# Step: Start node-server
apt install -y npm
cd node-server
npm install
npm start
