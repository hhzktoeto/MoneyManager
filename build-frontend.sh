#!/usr/bin/bash
cd ./frontend || exit
rm -rf ./dist
npm install
ng build --configuration production
cd ..
mkdir -p gateway/src/main/resources/static
mkdir -p gateway/src/main/resources/static/assets
cp frontend/dist/frontend-angular/browser/* gateway/src/main/resources/static
cp frontend/dist/frontend-angular/* gateway/src/main/resources/static
cp -r frontend/src/assets/* gateway/src/main/resources/static/assets