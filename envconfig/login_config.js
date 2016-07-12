"use strict";

 angular.module('login_config', [])

.constant('ENV', {name:'development',AUTH0_DOMAIN:'ncimatch.auth0.com',AUTH0_CLIENT_ID:'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH',loginUrl:'auth.login'})

.constant('PRO', {name:'production',AUTH0_DOMAIN:'ncimatch.auth0.com_prod',AUTH0_CLIENT_ID:'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH_prod',loginUrl:'auth.login_prod'})

.constant('UT', {name:'test',AUTH0_DOMAIN:'ncimatch.auth0.com_test',AUTH0_CLIENT_ID:'uCkLRzSlYP3CFOm1pHVn5lYzBMceCgEH_test',loginUrl:'auth.login_test'})

;
