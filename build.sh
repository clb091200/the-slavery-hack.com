#!/bin/sh

npm install stripe
npm install --save-dev @types/stripe

git add package.json package-lock.json
git commit -m "Install Stripe SDK"
git push
