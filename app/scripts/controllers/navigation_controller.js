(function () {

    angular
        .module("matchbox.nav", ['auth0'])
        .controller('NavigationController', NavigationController);

    function NavigationController($scope, auth, $location, store) {
        $scope.name = setName();

        $scope.logout = logout;

        function logout() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path("/auth/login");
        }

        function setName() {
            var name;
            var profile = store.get('profile');
            if (profile.user_metadata && profile.user_metadata.firstName) {
                name = profile.user_metadata.firstName;
            } else if (profile.email) {
                name = profile.email;
            } else {
                name = 'MATCHBox User';
            }
            return name;
        }
    }

} ());
