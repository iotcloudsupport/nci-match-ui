#!/bin/bash

if [ "$ENV" == "test" ]; then
	#copy file
	cp /usr/local/apache2/match/login_config.js.test /usr/local/apache2/match/app/scripts/env/login_config.js
elif [ "$ENV" == "uat" ]; then
	#copy file
	cp /usr/local/apache2/match/login_config.js.uat /usr/local/apache2/match/app/scripts/env/login_config.js
elif [ "$ENV" == "prod" ]; then
	#copy file
	cp /usr/local/apache2/match/login_config.js.prod /usr/local/apache2/match/app/scripts/env/login_config.js
else
	#default to Dev
	#copy file
	cp /usr/local/apache2/match/login_config.js.dev /usr/local/apache2/match/app/scripts/env/login_config.js
fi
