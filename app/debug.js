'use strict';

//add code here to facilitate debugging (to be removed on build)

(function () {

  /** initialise injector **/

  setTimeout(delayed, 500);
  function delayed () {
    window.injector = angular.element(document.body).injector();
    if (!window.injector) {
      console.warn('injector not defined yet. retrying in 500ms');
      setTimeout(delayed, 500);
      return;
    }
    //NOTE !! careful what you attach: it will pollute the global namespace
    window.injector.attach = function (providerName) {
      var provider = window.injector.get(providerName);
      if (provider) { window[providerName] = provider; }
      return provider;
    };
    attachProviders();
  }
  function attachProviders () {
    let toAttach = [];
    _.forEach(toAttach, provider => window.injector.attach(provider));
  }

})();
