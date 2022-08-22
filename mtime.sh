#!/bin/sh

git ls-tree -r --name-only HEAD src/pages/article | while read filename; do

touch -d "$(git log -1 --format="%ai" -- $filename)" $filename

done
