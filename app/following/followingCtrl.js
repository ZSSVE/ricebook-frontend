;(function () {
    angular.module('riceBookApp').controller('FollowingCtrl', FollowingCtrl);

    FollowingCtrl.$inject = ['api', '$location'];
    function FollowingCtrl(api, $location) {

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
                var index = vm.followings.findIndex(function (following) {
                    return following.username === followingId
                });
                vm.followings.splice(index, 1);
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function addFollowing() {
            var newFollowing = vm.newFollowing;
            var newAvatar = null;
            var newStatus = null;
            if (newFollowing) {
                var index = vm.followings.findIndex(function (following) {
                    return following.username === newFollowing
                });
                if (index >= 0) {
                    vm.followMsg = "You have already followed this account."
                } else {
                    vm.followMsg = "";
                    api.addFollowing({'user': newFollowing}).$promise.then(function (result) {
                        var followings = result.following;
                        var index = followings.findIndex(function (following) {
                            return following === newFollowing
                        });
                        if (index < 0) {
                            vm.followMsg = 'This user doesn\'t exist';
                        }
                        else {
                            api.getAvatar({'user': newFollowing}).$promise.then(function (result) {
                                newAvatar = result.pictures[0].picture;
                                api.getStatuses({'users': newFollowing}).$promise.then(function (result) {
                                    newStatus = result.statuses[0].status;
                                    vm.followings.push({
                                        "username": newFollowing,
                                        "status": newStatus,
                                        "avatar": newAvatar
                                    })
                                }, function (error) {
                                    window.alert('Not Logged In');
                                    $location.path('/')
                                })
                            }, function (error) {
                                window.alert('Not Logged In');
                                $location.path('/');
                            });
                        }
                        vm.newFollowing = null;
                    });
                }
            } else {
                vm.followMsg = "Please enter a username"
            }
        }
    }
})();
