#!/bin/bash

# How tom export the env variables
# export DB_PASS="ja"


# Ref: https://stackoverflow.com/questions/51654041/loop-through-all-files-in-a-directory-and-subdirectories-using-bash
for file in $(find . -type f -name "drop*.sql" -print)
do
    echo "== executing create DB $i";
    mysql -u $DB_USER --password=$DB_PASS < $file 
done


for file in $(find . -type f -name "create*.sql" -print)
do
    echo "== executing create DB $i";
    mysql -u $DB_USER --password=$DB_PASS < $file 
done


for file in $(find . -mindepth 3 -type f -name "structure*.sql" -print)
do
    echo "Executing the file $file"
    mysql -u $DB_USER --password=$DB_PASS < $file 
done


for file in $(find . -mindepth 3 -type f -name "testdata*.sql" -print)
do
    echo "Executing the file $file"
    mysql -u $DB_USER --password=$DB_PASS < $file 
done
