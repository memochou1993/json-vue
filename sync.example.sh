#!/bin/bash

npm run build
rsync -av --delete-after dist/ root@0.0.0.0:/var/www/json/public
