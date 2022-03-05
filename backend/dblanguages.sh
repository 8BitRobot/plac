#!/bin/bash


language_list=( "C++" "Java" "Python" "Visual Basic" "Javascript" "PHP" "Assembly language" "SQL" "Swift" "MATLAB" "Pascal" "Ruby" "Bash" "Lisp" "Objective-C" "Perl" "Groovy" )

for item in "${language_list[@]}"
do
    echo "$item"
    mongo --eval "db.libraries.insertOne({ name: '${item}' })"
done