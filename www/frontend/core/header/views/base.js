define(['tpl!frontend/core/header/templates/base.html'],

  function( tpl ) {
  return Backbone.Marionette.ItemView.extend({
    template : tpl,
    snapper  : undefined,

    onShow : function(){
      // Instance
      var self = this;
      self.snapper = new Snap({
        element: $('#main-content').get(0),
        disable: 'right'
      }),

      UpdateDrawers = function(){
        var state = self.snapper.state(),
          towards = state.info.towards,
          opening = state.info.opening;
        if(opening=='right' && towards=='left'){
          $('#left-drawer').addClass('active-drawer');
        } else if(opening=='left' && towards=='right') {
          $('#left-drawer').removeClass('active-drawer');
        }
      };

      self.snapper.on('drag', UpdateDrawers);
      self.snapper.on('animating', UpdateDrawers);
      self.snapper.on('animated', UpdateDrawers);

      $('#toggle-left').on('click', function(e){ self.toggleLeftSidebar(e) })
    },

    toggleLeftSidebar : function(e){
      var state = this.snapper.state();
      if (state.state == 'closed') {
        this.snapper.open('left');
        $(e.currentTarget).addClass('close')
      }  else {
        this.snapper.close('left');
        $(e.currentTarget).removeClass('close')
      }
    },
  });
});