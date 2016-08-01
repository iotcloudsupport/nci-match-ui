angular.module("matchbox.login",[
        'auth0'
    ])
    .controller('AuthController', function( $scope, auth, $location, store ) {

        $scope.login = function() {
            auth.signin({}, function(profile, token) {
                store.set('profile', profile);
                store.set('token', token);
                // $location.path("/index/dashboard");
                // $scope.headersVisible = true;
                $location.path("/dashboard");

            }, function(error) {
                console.log("There was an error logging into MATCHBox.", error);
            });
        };
    });

