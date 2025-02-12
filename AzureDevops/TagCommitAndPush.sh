git add $1
git commit -m "[release] $2 $GITVERSION_SEMVER"
git push origin main
git tag $2_$GITVERSION_SEMVER
git push origin $2_$GITVERSION_SEMVER