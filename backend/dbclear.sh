#!/bin/bash
mongo --eval "db.reviews.remove({})"
mongo --eval "db.libraries.remove({})"
