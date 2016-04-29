;(function () {

    angular.module('riceBookApp')
        .factory('api', apiService)
    ;

    function apiService($http, $resource, apiURL) {
        $http.defaults.withCredentials = true;

        function resourceUploadFile(data) {
            var fd = new FormData();
            fd.append('image', data.img);
            fd.append('body', data.body);
            return fd;
        }

        return $resource(apiURL + '/:endpoint/:user/:users/:id', {
                user: '@user',
                users: '@users',
                id: '@id'
            },
            {
                login: {method: 'POST', params: {endpoint: 'login'}},
                loginFacebook:{method: 'GET', params: {endpoint: 'authFacebook'}},
                logout: {method: 'PUT', params: {endpoint: 'logout'}},
                register: {method: 'POST', params: {endpoint: 'register'}},
                getStatus: {method: 'GET', params: {endpoint: 'status'}},
                setStatus: {method: 'PUT', params: {endpoint: 'status'}},
                getStatuses: {method: 'GET', params: {endpoint: 'statuses'}},
                getAvatar: {method: 'GET', params: {endpoint: 'pictures'}},

                // Functions for posts and comments.
                getPosts: {method: 'GET', params: {endpoint: 'posts'}},
                editPost: {method: 'PUT', params: {endpoint: 'posts'}},
                addComment: {method: 'PUT', params: {endpoint: 'posts'}},
                editComment: {method: 'PUT', params: {endpoint: 'posts'}},

                // Functions for user profile.
                getEmail: {method: 'GET', params: {endpoint: 'email'}},
                setEmail: {method: 'PUT', params: {endpoint: 'email'}},
                getZipcode: {method: 'GET', params: {endpoint: 'zipcode'}},
                setZipcode: {method: 'PUT', params: {endpoint: 'zipcode'}},
                setPassword: {method: 'PUT', params: {endpoint: 'password'}},

                // Functions for followings.
                getFollowings: {method: 'GET', params: {endpoint: 'following'}},
                addFollowing: {method: 'PUT', params: {endpoint: 'following'}},
                removeFollowing: {
                    method: 'DELETE',
                    params: {endpoint: 'following'}
                },

                // Functions that requires uploading pictures
                addPost: {
                    method: 'POST',
                    headers: {'Content-Type': undefined},
                    transformRequest: resourceUploadFile,
                    params: {endpoint: 'post'}
                },
                addPostPartial:{method: 'POST', params: {endpoint: 'post'}},
                setAvatar: {
                    method: 'PUT',
                    headers: {'Content-Type': undefined},
                    transformRequest: resourceUploadFile,
                    params: {endpoint: 'picture'}
                },
                linkAccounts:{method: 'POST', params: {endpoint: 'linkAccounts'}},
                isLinked:{method: 'GET', params: {endpoint: 'isLinked'}},
                unlinkAccounts:{method: 'POST', params: {endpoint: 'unlinkAccounts'}}
            });
    }
})();
