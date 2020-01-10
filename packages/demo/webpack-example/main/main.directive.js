import template from './main.html';
import './main.controller';

angular.module('hot-reload-demo')
  .directive('main', function() {
    return {
      template,
      scope: true,
      controller: 'MainController as vm',
    };
});
