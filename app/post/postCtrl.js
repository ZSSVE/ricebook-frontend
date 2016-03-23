;(function () {
    angular.module('riceBookApp')
        .controller('PostCtrl', PostCtrl);

    PostCtrl.$inject = ['api', 'UserService', '$location', '$scope'];
    function PostCtrl(api, UserService, $location, $scope) {
        var vm = this;

        vm.loadPosts = loadPosts;
        vm.posts = [];
        loadPosts();
        vm.username = getUsername();
        vm.newPost = "";
        vm.newPostImg = null;
        vm.addPost = addPost;
        vm.clearNewPost = clearNewPost;
        vm.newComment = "";
        vm.addComment = addComment;
        vm.editComment = editComment;
        vm.editPost = editPost;
        vm.getUsername = getUsername;
        vm.setFile = setFile;
        $scope.imageFile = null;


        // Functions to be exposed.

        function getUsername() {
            // Return the username from the UserService.
            return UserService.username;
        }

        function loadPosts() {

            if (!vm.username) {
                // Check if username is stored in userservice.
                //
                // Username is needed to authorize the editing right.
                api.getStatus().$promise.then(function (result) {
                    UserService.username = result.statuses[0].username;
                    vm.username = getUsername();
                    loadProcessPosts()
                }, function (error) {
                    window.alert('Not Logged In');
                    $location.path('/');
                });
            } else {
                loadProcessPosts()
            }
        }

        function loadProcessPosts() {
            api.getPosts().$promise.then(function (result) {
                var newPosts = [];
                result.posts.forEach(function (post) {
                    post.date = post.date.substr(0, 10) + ' ' + post.date.substr(11, 8);
                    post.newBody = post.body;
                    post.newComment = "";
                    post.comments.forEach(function (comment) {
                        comment.commentEditEnabled = false;
                        comment.date = comment.date.substr(0, 10) + ' ' + comment.date.substr(11, 8);
                        comment.newBody = comment.body;
                        comment.ifCommentOwned = (vm.username == comment.author)
                    });
                    post.ifPostOwned = (vm.username == post.author);
                    post.postEditEnabled = false;
                    newPosts.push(post);
                });
                vm.posts = newPosts;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function clearNewPost() {
            vm.newPost = "";
            vm.newPostImg = null;
            $scope.imageFile = null;

        }

        function setFile(element) {
            $scope.$apply(function ($scope) {
                $scope.imageFile = element.files[0];
            });
            vm.newPostImg = $scope.imageFile;
        }

        // Change the body of the given post.
        //
        // Edition of posts of others will be rejected.
        function editPost(postAuthor, postID, postBody) {
            if (postAuthor !== vm.username) {
                window.alert("Unauthorized: You can't edit other's post");
            } else {
                api.editPost({'id': postID, 'body': postBody})
                    .$promise.then(function () {
                    vm.loadPosts();
                }, function (error) {
                    window.alert('Unauthorized');
                });
            }
        }

        function addPost() {
            api.addPost({'body': vm.newPost, 'img': vm.newPostImg})
                .$promise.then(function () {
                vm.loadPosts();
                vm.newPost = "";
                vm.newPostImg = null;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        // Push the comment to the post with the given ID.
        function addComment(postID, newComment) {
            api.addComment({'id': postID, 'body': newComment, 'commentId': -1})
                .$promise.then(function () {
                vm.loadPosts();
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        // Edit the comment.
        //
        // The edition will be rejected for unowned comments.
        function editComment(postID, commentID, commentBody, commentAuthor) {
            if (commentAuthor !== vm.username) {
                window.alert("Unauthorized: You can't edit other's comment");
            } else {
                api.editComment({'id': postID, 'body': commentBody, 'commentId': commentID})
                    .$promise.then(function () {
                    vm.loadPosts();
                }, function (error) {
                    window.alert('Unauthorized');
                });
            }
        }
    }
})();
