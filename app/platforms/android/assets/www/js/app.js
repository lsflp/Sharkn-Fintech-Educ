var app = angular.module('sharkapp', ['ionic', 'sharkapp.controllers', 'chart.js', 'ngCordova', 'ngCordovaOauth', 'ui.utils.masks']);

app.run(function($ionicPlatform, $state, $rootScope) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }


        //mecanismo de trocar cor a cada troca de seção
        $rootScope.oldcolor = "purple";
        $rootScope.changeTheme = function(newcolor) {

            //primeiro, trocamos a cor do header
            var header = document.getElementById('mainHeader').getElementsByTagName("ion-header-bar");
            var headerOldClass = "bar-" + $rootScope.oldcolor;
            var headerNewClass = "bar-" + newcolor;
            $rootScope.oldcolor = newcolor;
            var el;

            for (var i = 0; i < header.length; i++) {
                el = angular.element(header[i]);
                if (el.hasClass(headerOldClass)) {
                    el.removeClass(headerOldClass);
                }
                el.addClass(headerNewClass);
            }

            //agora, adicionamos a flag da cor no conteudo
            var content = document.getElementById('mainContent').getElementsByTagName("ion-content");
            var contentOldClass = "cnt-" + $rootScope.oldcolor;
            var contentNewClass = "cnt-" + newcolor;

            for (var i = 0; i < content.length; i++) {
                el = angular.element(content[i]);
                if (el.hasClass(contentOldClass)) {
                    el.removeClass(contentOldClass);
                }
                el.addClass(contentNewClass);
            }

        }

        //gerenciar cores do app
        $rootScope.$on('$stateChangeSuccess', function(evt, toState) {
            $rootScope.changeTheme(toState.color);
        });

    });


})

app.config(function($stateProvider, $urlRouterProvider) {

    //login e introdução
    $stateProvider.state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
    });

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    });

    $stateProvider.state('app.dash', {
        url: '/dash',
        views: {
            'menuContent': {
                templateUrl: 'templates/dash.html',
                controller: "DashCtrl"
            }
        },
        color: "purple"
    });

    $stateProvider.state('app.topics', {
        url: '/topics',
        views: {
            'menuContent': {
                templateUrl: 'templates/topics.html',
                controller: "AulaCtrl"
            }
        },
        color: "blue"
    });

    $stateProvider.state('app.forum', {
        url: '/forum',
        views: {
            'menuContent': {
                templateUrl: 'templates/forum.html',
                controller: 'ForumCtrl'
            }
        },
        color: "orange"
    });

    $stateProvider.state('app.history', {
        url: '/history',
        views: {
            'menuContent': {
                templateUrl: 'templates/history.html',
                controller: 'HistoryCtrl'
            }
        },
        color: "red"
    });

    $stateProvider.state('app.addinvest', {
        url: '/history/addinvest',
        views: {
            'menuContent': {
                templateUrl: 'templates/addinvest.html',
                controller: 'AddInvestCtrl'
            }
        },
        color: "red"
    });

    $stateProvider.state('app.forumexem', {
        url: '/forumexem',
        views: {
            'menuContent': {
                templateUrl: 'templates/forumexem.html',
                controller: 'ForumexemCtrl'
            }
        },
        color: "orange"
    });

    $stateProvider.state('app.createpost', {
        url: '/createpost',
        views: {
            'menuContent': {
                templateUrl: 'templates/createpost.html',
                controller: 'CreatepostCtrl'
            }
        },
        color: "orange"
    });


    $stateProvider.state('app.stats', {
        url: '/stats',
        views: {
            'menuContent': {
                templateUrl: 'templates/stats.html',
                controller: 'PlaylistsCtrl'
            }
        },
        color: "green"
    });

    $stateProvider.state('app.courses', {
        url: '/courses',
        views: {
            'menuContent': {
                templateUrl: 'templates/courses.html',
                controller: 'CoursesCtrl'
            }
        },
        color: "blue"
    });

    $stateProvider.state('app.community', {
        url: '/community',
        views: {
            'menuContent': {
                templateUrl: 'templates/community.html',
                controller: 'ChatCtrl'
            }
        },
        color: "cyan"
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/intro');
});
