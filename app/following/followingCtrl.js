;(function () {
    angular.module('riceBookApp').controller('FollowingCtrl', FollowingCtrl);

    FollowingCtrl.$inject = ['api','$location'];
    function FollowingCtrl(api,$location) {

        var vm = this;
        vm.followings = [];
        vm.newFollowing = null;
        vm.unfollow = unfollow;
        vm.addFollowing = addFollowing;
        vm.followMsg = null;

        getFollowings();

        function getFollowings() {

            api.getFollowings().$promise.then(function (result) {

                // Get userIds of all followings and stores as a list
                // of user names separated by comma.
                vm.followings = [];
                var followingsIds = "";
                result.following.forEach(function (followingId) {
                    followingsIds += followingId + ',';
                    vm.followings.push({
                        "username": followingId,
                        "status": null,
                        "avatar": null
                    })
                });
                followingsIds = followingsIds.slice(0, -1);

                // Get all statuses of followings first and store them in
                // its corresponding following dictionary specified by username.
                api.getStatuses({'users': followingsIds}).$promise.then(function (result) {
                    result.statuses.forEach(function (user) {
                        var index = vm.followings.findIndex(function (following) {
                            return following.username === user.username;
                        });
                        if (index >= 0) {
                            vm.followings[index].status = user.status;
                        }
                    });

                    //Get all avatars and store them in its corresponding
                    // following dictionary specified by username.
                    api.getAvatar({'user': followingsIds}).$promise.then(function (result) {
                        result.pictures.forEach(function (user) {
                            var index = vm.followings.findIndex(function (following) {
                                return following.username === user.username;
                            });
                            if (index >= 0) {
                                vm.followings[index].avatar = user.picture;
                            }
                        })
                    }, function (error) {
                        window.alert('Not Logged In');
                        $location.path('/');
                    });
                }, function (error) {
                    window.alert('Not Logged In');
                    $location.path('/');
                });
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            })
        }

        function unfollow(followingId) {
            api.removeFollowing({'user': followingId}).$promise.then(function (result) {
                getFollowings();
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function addFollowing() {
            if (vm.newFollowing) {
                vm.followMsg = "";
                api.addFollowing({'user': vm.newFollowing}).$promise.then(function (result) {
                    getFollowings();
                    vm.newFollowing = null;
                }, function (error) {
                    vm.followMsg = 'This user doesn\'t exist';
                    //$location.path('/');
                });
            } else {
                vm.followMsg = "Please enter a username"
            }
        }

    }
})();
