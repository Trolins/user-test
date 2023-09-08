angular.module('components', [])
      .component('error', {
        bindings: {
            text: '@'
        },
        template: '<div class="callback error">' + '<p>{{$ctrl.text}}</p>' + '</div>',
    })
    .component('success', {
        bindings: {
            text: '@'
        },
        template: '<div class="callback success">' + '<p>{{$ctrl.text}}</p>' + '</div>',
    })
