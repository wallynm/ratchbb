define(['tpl!frontend/core/sidebar/templates/leftsidebar.html'],

  function( tpl ) {
  return Backbone.Marionette.ItemView.extend({
    template : tpl,
  });
});