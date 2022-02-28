#!/bin/bash
for (( i=0 ; i <= 100; ++i ))
do
	mongo --eval 'db.test2.insertOne({name:"Alex"})'>/dev/null
done