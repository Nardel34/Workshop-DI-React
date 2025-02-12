git add $1
git add $2
git commit -m "[release] $3 $4"
git push origin main
git tag $3_$4
git push origin $3_$4
