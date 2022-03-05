#!/bin/bash

# if (!req.body.hasOwnProperty("rating") || !req.body.hasOwnProperty("summary") || !req.body.hasOwnProperty("description") || !req.body.hasOwnProperty("link") || !req.body.hasOwnProperty("name"))


mongo --eval 'db.reviews.insertOne({username:"alexdu25", name:"C++", rating: 5, summary:"C++ is my favorite language!", description:"C++ is really fast and has really cool STL library.", link:"github.com/alexdu25"})'
mongo --eval 'db.reviews.insertOne({username:"ArvinDing", name:"Java", rating: 1, summary:"Java is an inferior language!", description:"Java is slower than my grandpa and has really confusing syntax.", link:"github.com/arvinding"})'
mongo --eval 'db.reviews.insertOne({username:"Ausca", name:"Python", rating: 4, summary:"Python is a solid language!", description:"Python scripting is very straighforward, and the language is very easy to pick up.", link:"github.com/Ausca"})'
mongo --eval 'db.reviews.insertOne({username:"8BitRobot", name:"Bash", rating: 2, summary:"Bashing my head with my computer!", description:"Bash scripting is not intuitive, and makes things a lot more complicated than alternatives.", link:"github.com/8BitRobot"})'
mongo --eval 'db.reviews.insertOne({username:"sivanshc", name:"C", rating: 3, summary:"C see you in the man page!", description:"C gets the work done, but since it is more primitive than C++, expect many syntactical differences.", link:"github.com/sivanshc"})'
mongo --eval 'db.reviews.insertOne({username:"ArjunKallapur", name:"Lisp", rating: 1, summary:"Too many parentheses!", description:"The amount of parentheses to keep track of hurts my head.", link:"github.com/ArjunKallapur"})'
mongo --eval 'db.reviews.insertOne({username:"DavidSmallberg", name:"C++", rating: 5, summary:"Best language for beginners!", description:"It is really fun to teach this language; there is no better language to teach intro CS courses.", link:"github.com/DavidSmallberg"})'
mongo --eval 'db.reviews.insertOne({username:"PaulEggert", name:"Bash", rating: 5, summary:"Oldie but a goodie!", description:"Bash is such a fundamental language, it is a must-learn for everyone.", link:"github.com/PaulEggert"})'

