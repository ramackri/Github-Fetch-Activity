var app = angular.module("githubApp", []);

app.factory('GithubActivity', function ($http) {
    return {getUserActivity: function (username) {
        return $http.get("https://api.github.com/users/" + username + "/events").then(function (response) {
            console.log("Success");
            return response.data;
        }, function () {
            console.log("Error");
        })
    }}
});

app.filter('moment', function () {
    return function (text) {
        return moment(text, "YYYYMMDD").fromNow();
    }
});

app.filter('githubUrl', function () {
    return function (text) {
        return "http://github.com/" + text;
    }
});

app.directive('urlclick', function () {
    function captureUrlClick(scope, element) {
        element.bind('click', function () {
            console.log("repository clicked: " + scope.repositoryurl);
        })
    }

    return {
        link: captureUrlClick,
        restrict: "A",
        scope: {repositoryurl: "="}
    }
});


function ActivityController($scope, GithubActivity) {

    $scope.username = "ramackri";

    $scope.activityFeed = function () {
        GithubActivity.getUserActivity($scope.username).then(function (activity) {
            $scope.results = activity;
        });
    }

}