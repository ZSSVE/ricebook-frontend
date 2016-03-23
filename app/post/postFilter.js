;(function () {
    angular.module('riceBookApp')
        .filter("selectiveFilter", selectiveFilter);

    // Filter posts matching the given keys in the body and author part.
    function selectiveFilter() {
        return function (posts, keys) {
            if (!keys) {
                return posts;
            }

            var output = [];
            var searchKeyword = keys.toLowerCase();

            angular.forEach(posts, function (post) {
                if (
                    post.author.toLowerCase().match(searchKeyword) !== null ||
                    post.body.toLowerCase().match(searchKeyword) !== null
                ) {
                    output.push(post);
                }
            });
            return output;
        };
    }
})();