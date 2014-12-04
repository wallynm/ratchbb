requirejs.config({
  // Set burst to prevent any kind of cache
  urlArgs     : "bust=" + (new Date()).getTime(),
  waitSeconds : 0,

  paths : {
    //CORE INCLUDES
    jquery          : 'public/plugins/jquery/jquery-2.1.1',
    backbone        : 'public/plugins/backbone/backbone',
    marionette      : 'public/plugins/backbone/backbone.marionette',
    underscore      : 'public/plugins/backbone/underscore',
    tpl             : 'public/plugins/backbone/tpl',
    ratchet         : 'public/plugins/ratchet/ratchet',
    snap            : 'public/plugins/snap/snap',
    fastclick       : 'public/plugins/fastclick/fastclick',
    iscroll         : 'public/plugins/iscroll/iscroll',

    BackboneStick   : 'public/plugins/backbone/backbone.stickit',
    BackboneTrackit : 'public/plugins/backbone/backbone.trackit',
  },

  shim : {

    // Frameworks resources
    Backbone : {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    Marionette : {
      deps: ["backbone"],
      exports: "Marionette"
    },


    // Base Plugins
    ratchet : {
      deps: ["jquery"],
      exports: "ratchet"
    },
    snap : {
      deps: ["ratchet"],
      exports: "Snap"
    },
    fastclick : {
      exports: "FastClick"
    },
    iscroll: {
      exports: "IScroll"
    },

    // Aditional plugins
    tpl : {
      deps: ["backbone"],
      exports: "tpl"
    },
    BackboneStick : {
      deps: ["backbone"]
    },
    BackboneTrackit : {
      deps: ["backbone"]
    }
  }
});

define([
  'fastclick',
  'marionette',
  'underscore',
  'tpl',
  'snap',
  'iscroll',
  'ratchet'],

  function (FastClick) {

    // Variaveis base instanciadas no sistema
    window.App = new Backbone.Marionette.Application();
    window.App.Name     = 'ratchbb';
    window.App.Language = 'pt-BR';
    window.App.BaseUrl  = (location.hostname == 'localhost') ? 'http://localhost/ratchbb/' : '';

    mainRouter = Backbone.Router.extend({
      routes : {
        "login" : "loginPage",
      },

      loginPage: function ()
      {
        require(['frontend/modules/dashboard/views/dashboardView'], function (view) {
          App.mainRegion.show(new view);
        });
      }
    });

    // Configura o router
    App.mainRouter = new mainRouter();

    // Configura as regioes do sistema
    App.addRegions({
      leftSidebar  : "#left-drawer",
      header       : "#main-header",
      main         : "#main-content"
    });

    App.addInitializer(function () {


      // Basico para carregamento do sistema
      require(['frontend/core/sidebar/views/leftsidebar', 'frontend/core/header/views/base'], function ( leftsidebar, header ) {
        App.leftSidebar.show(new leftsidebar);
        App.header.show(new header);


        new IScroll('#left-drawer');
        new IScroll('#main-content');

        FastClick.attach(document.body);
        Backbone.history.start();
      });
    });

    App.start();
});
