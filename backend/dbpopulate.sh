#!/bin/bash

mongo --eval 'db.reviews.insertOne({username:"ArvinDing", name:"Java", rating: 1, summary:"Java is an inferior language!", description:"Java is slower than my grandpa and has really confusing syntax.", link:"https://github.com/ArvinDing/competitive"})'
mongo --eval 'db.reviews.insertOne({username:"8BitRobot", name:"Python", rating: 4, summary:"Python is a solid language!", description:"Python scripting is very straighforward, and the language is very easy to pick up.", link:"https://github.com/8BitRobot/AddingInTheCorporateWorld"})'
mongo --eval 'db.reviews.insertOne({username:"Ausca", name:"Bash", rating: 2, summary:"Bashing my head with my computer!", description:"Bash scripting is not intuitive, and makes things a lot more complicated than alternatives.", link:"https://github.com/nvm-sh/nvm"})'
mongo --eval 'db.reviews.insertOne({username:"sivanshc", name:"matplotlib", rating: 5, summary:"Best way to plot data!", description:"Matplotlib is simple and effective: it is easy to learn and offers great data visualization features.", link:"https://github.com/matplotlib/matplotlib"})'
mongo --eval 'db.reviews.insertOne({username:"ArjunKallapur", name:"Lisp", rating: 1, summary:"Too many parentheses!", description:"The amount of parentheses to keep track of hurts my head.", link:"https://github.com/ocaml/caml-mode"})'

mongo --eval 'db.reviews.insertOne({username:"PaulEggert", name:"Bash", rating: 5, summary:"Oldie but a goodie!", description:"Bash is such a fundamental language, it is a must-learn for everyone.", link:"https://github.com/koalaman/shellcheck"})'
