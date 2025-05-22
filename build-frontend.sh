#!/usr/bin/bash
cd ./frontend || exit
rm -rf ./dist
npm install
ng build --configuration prod
cd ..
mkdir -p gateway/src/main/resources/static
cp frontend/dist/frontend-angular/browser/* gateway/src/main/resources/static
cp frontend/dist/frontend-angular/* gateway/src/main/resources/static