var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/PageTab");

    $stateProvider

        .state("dataInfo", {
            url:"/dataInfo",
            templateUrl: "dataInfo.html"
        })
        .state("userInfo", {
            url:"/userInfo",
            templateUrl: "userInfo.html"
        })
        .state("gameInfo", {
            url:"/gameInfo",
            templateUrl: "gameInfo.html"
        })
        .state("logInfo", {
        url:"/logInfo",
        templateUrl: "logInfo.html"
    });

});/**
 * Created by kevin on 2016/7/4.
 */
