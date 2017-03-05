import Ember from 'ember';

export default Ember.Component.extend({
  // store the "booted" state of the system
  // - it always starts "off"
  // - it can be switched "on" only once
  // - the application is basically inert until it is booted
  booted: false,
  actions: {
    // action to boot the system, see template file
    boot() {
      this.set('booted', true);
    }
  }
});
