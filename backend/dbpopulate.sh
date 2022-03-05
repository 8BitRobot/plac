#!/bin/bash

# if (!req.body.hasOwnProperty("rating") || !req.body.hasOwnProperty("summary") || !req.body.hasOwnProperty("description") || !req.body.hasOwnProperty("link") || !req.body.hasOwnProperty("name"))

for (( i=0 ; i <= 100; ++i ))
do
	mongo --eval 'db.test2.insertOne({name:"Alex"})'>/dev/null
done
