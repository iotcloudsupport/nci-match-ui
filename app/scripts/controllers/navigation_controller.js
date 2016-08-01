angular
    .module("matchbox.nav", [
        'auth0'
    ])
    .controller('NavigationController', function( $scope, auth, $location, store ) {

        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path("/auth/login");
        };

    });