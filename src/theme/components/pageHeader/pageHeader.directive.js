(function() {
    'use strict';
    
    angular.module('app.theme.components')
        .directive('pageHeader', pageHeader)
    function pageHeader() {
        return {
            restrict: 'E',
            templateUrl: 'theme/components/pageHeader/pageHeaderView.html',
            controller: 'pageHeaderCtrl as $pageHeaderCtrl'
        }
    }
})();