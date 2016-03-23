describe('End to End test for log in functionality of the front-end of the webapp', function () {
    'use strict';

    beforeEach(function () {
        browser.get('index.html#/');
    });

    function login() {
        element(by.id('loginPaneBtn')).click();
        element(by.model('vm.username')).sendKeys('sz32test');
        element(by.model('vm.password')).sendKeys('fog-sit-yellow');
        element(by.id('logIn')).click();
    }

    it('logs in as my test user and validates current location', function () {
        browser.wait(function () {
            return element(by.id('loginPaneBtn')).isDisplayed();
        }, 5000);
        login();
        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/index.html#/main');

    });
});

describe('End to End test for register of the front-end of the webapp', function () {
    'use strict';

    beforeEach(function () {
        browser.get('index.html#/');
    });

    function register() {
        element(by.id('registerPaneBtn')).click();
        element(by.id('accountName')).sendKeys('test');
        element(by.id('email')).sendKeys('test@rice.edu');
        element(by.id('zipcode')).sendKeys('12345');
        element(by.id('password')).sendKeys('111');
        element(by.id('passwordConfirm')).sendKeys('111');
        element(by.id('submitBtn')).click();
    }

    it('registers a new user and validates registration message', function () {
        browser.wait(function () {
            return element(by.id('loginPaneBtn')).isDisplayed();
        }, 5000);
        register();
        expect(element(by.binding('vm.registerMsg')).getText()).toEqual('success! Go log in!');

    });
});

describe('End to End test for other functionalitis of the front-end of the webapp', function () {
    'use strict';

    beforeEach(function () {
        browser.get('index.html#/');

        // Log in.
        browser.wait(function () {
            return element(by.id('loginPaneBtn')).isDisplayed();
        }, 5000);
        login();
    });

    function login() {
        element(by.id('loginPaneBtn')).click();
        element(by.model('vm.username')).sendKeys('sz32test');
        element(by.model('vm.password')).sendKeys('fog-sit-yellow');
        element(by.id('logIn')).click();
    }

    function register() {
        element(by.id('registerPaneBtn')).click();
        element(by.id('accountName')).sendKeys('test');
        element(by.id('email')).sendKeys('test@rice.edu');
        element(by.id('zipcode')).sendKeys('12345');
        element(by.id('password')).sendKeys('111');
        element(by.id('passwordConfirm')).sendKeys('111');
        element(by.id('submitBtn')).click();
    }

    it('creates a new post and validates the post appears in the feed', function () {

        expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/index.html#/main');
        // Post a new post.
        var testPost = 'A test post posted by protractor';
        element(by.model('vm.newPost')).sendKeys(testPost);
        element(by.id('addPostBtn')).click();

        // Validate if the new post exists.
        var ifFound = false;
        element.all(by.repeater('post in vm.posts | selectiveFilter: vm.searchKeyword')).then(function (posts) {

            posts.forEach(function (post) {
                var ifEqual = post.element(by.binding('post.body')).getText().then(function (text) {
                    return text === testPost;
                });
                if (ifEqual) {
                    ifFound = true;
                }
            });
            expect(ifFound).toBeTruthy();
        });

    });

    it('updates the status headline and verifies the change', function () {
        // Update a new status.
        var testStatus = 'A test status posted by protractor';
        element(by.model('vm.newStatus')).sendKeys(testStatus);
        element(by.id('newStatusBtn')).click();
        expect(element(by.binding('vm.status')).getText()).toEqual(testStatus)
    });

    it('adds one followed user and then removes this following', function () {
        // Add a new following.
        var newFollowing = 'Follower';
        var beforeAdding = element.all(by.repeater('following in vm.followings')).count();
        element(by.model('vm.newFollowing')).sendKeys(newFollowing);

        // Wait till add following button is clickable.
        var ec = protractor.ExpectedConditions;
        var addFollowingBtn = element(by.id('addFollowingBtn'));
        var isAddFollowingClickable = ec.elementToBeClickable(addFollowingBtn);
        browser.wait(isAddFollowingClickable, 5000);
        addFollowingBtn.click();

        // Use the number of following after adding new one minus one to avoid the arithmetic
        var afterAdding_minus_1 = element.all(by.repeater('following in vm.followings')).count().then(function (c) {
            return c - 1
        });
        expect(beforeAdding).toEqual(afterAdding_minus_1);

        // Remove the newly added user.
        var toBeRemoved = element.all(by.repeater('following in vm.followings')).filter(function (following) {
            return following.element(by.binding('following.username')).getText().then(function (username) {
                return username === newFollowing;
            })
        });

        // Wait till unfollow button is clickable.
        var unfollowBtn = toBeRemoved.get(0).element(by.className('unfollowBtn'));
        var isUnFollowClickable = ec.elementToBeClickable(unfollowBtn);
        browser.wait(isUnFollowClickable, 5000);
        unfollowBtn.click();
        var afterRemoving = element.all(by.repeater('following in vm.followings')).count();
        expect(beforeAdding).toEqual(afterRemoving);
    });

    it('searched for "Only One Post Like This" and verify only one post shows and verify the author', function () {
        // Add a new following.
        var keyWord = "Only One Post Like This";
        element(by.model('vm.searchKeyword')).sendKeys(keyWord);
        element(by.id('filterBtn')).click();
        var posts = element.all(by.repeater('post in vm.posts | selectiveFilter: vm.searchKeyword'));

        //var afterFilter = element.all(by.repeater('post in vm.posts | selectiveFilter: vm.searchKeyword')).count();
        expect(posts.count()).toEqual(1);
        expect(posts.get(0).element(by.binding('post.author')).getText()).toEqual("sz32test")

    });

    it('navigates to the profile view and verifies the page is loaded', function () {
        element(by.id('profileLink')).click();
        browser.wait(function () {
            return element(by.id('profileAvatar')).isDisplayed();
        }, 5000);
        expect(element(by.id('profileAvatar')).isDisplayed()).toBeTruthy();

    });

    it('Update the user\'s email', function () {
        // Navigates to profile view.
        element(by.id('profileLink')).click();
        browser.wait(function () {
            return element(by.id('profileAvatar')).isDisplayed();
        }, 5000);

        // Update the email.
        var newEmail = "zhao@rice.edu";
        element(by.model('vm.newEmail')).sendKeys(newEmail);
        element(by.id('updateBtn')).click();

        // Verify the change.
        expect(element(by.id('currentEmail')).getText()).toEqual(newEmail);
    });

    it('Update the user\'s zipcode', function () {
        // Navigates to profile view.
        element(by.id('profileLink')).click();
        browser.wait(function () {
            return element(by.id('profileAvatar')).isDisplayed();
        }, 5000);

        // Update the zipcode.
        var newZipcode = "00000";
        element(by.model('vm.newZipcode')).sendKeys(newZipcode);
        element(by.id('updateBtn')).click();

        // Verify the change.
        expect(element(by.id('currentZipcode')).getText()).toEqual(newZipcode);
    });

    it('Update the user\'s password', function () {
        // Navigates to profile view.
        element(by.id('profileLink')).click();

        browser.wait(function () {
            return element(by.id('profileAvatar')).isDisplayed();
        }, 5000);

        // Update the password.
        var newPassword = "testPassword";
        element(by.model('vm.newPassword')).sendKeys(newPassword);
        element(by.model('vm.newPasswordConfirmation')).sendKeys(newPassword);
        element(by.id('updateBtn')).click();

        // Verify the change.
        expect(element(by.binding('passwordMsg')).getText()).toEqual("will not change");
    });
});