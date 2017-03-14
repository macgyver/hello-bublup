import Ember from 'ember';
const {computed} = Ember;
import {TYPES as AIRCRAFT_TYPES, SIZES as AIRCRAFT_SIZES} from '../models/aircraft';

// generate random numbers to help identify airplanes
function makeNumber() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0];
}

export default Ember.Component.extend({
  store: Ember.inject.service(),

  // provide aircraft constants to template
  AIRCRAFT_SIZES,
  AIRCRAFT_TYPES,

  // reset the form for enqueing a new aircraft to default values
  readyNewAircraft() {
    // this object is modified via two-way binding in the template
    this.set('newAircraft', this.get('store').createRecord('aircraft', {
      number: makeNumber(),
      size: AIRCRAFT_SIZES[0],
      type: AIRCRAFT_TYPES[0]
    }));
  },

  init() {
    this._super(...arguments);
    this.readyNewAircraft();
  },

  // aircraft queues for each combination of size/type
  aircrafts: computed(function() {
    // n.b. this data structure controls the priority of dequeing:
    //      - earlier elements have higher priority
    //      - deeper dimensions have reduced priority
    let acs = {};
    AIRCRAFT_TYPES.forEach(t => {
      acs[t] = {};
      AIRCRAFT_SIZES.forEach(s => {
        acs[t][s] = [];
      });
    });
    return acs;
  }),

  // keep track of queue length to enable/disable "dequeue" button
  queueLength: 0,

  actions: {
    // enqueue the specified aircraft and reset the form to add another
    enqueue() {
      let ac = this.get('newAircraft');
      let {type, size} = ac.getProperties('type', 'size');
      this.get(`aircrafts.${type}.${size}`).pushObject(ac);
      this.readyNewAircraft();
      this.incrementProperty('queueLength');
    },

    // dequeue the next aircraft by traversing dimensions in priority order
    // until we find a non-empty fifo queue to shift the top off
    dequeue() {
      let dequeuedAircraft;

      // n^2 loop ftw - using `for` loops so we can break
      outermostLoop:
      for (let t = 0; t < AIRCRAFT_TYPES.length; t++) {
        let type = AIRCRAFT_TYPES[t];
        for (let s = 0; s < AIRCRAFT_SIZES.length; s++) {
          let size = AIRCRAFT_SIZES[s];
          if (this.get(`aircrafts.${type}.${size}.length`) > 0) {
            dequeuedAircraft = this.get(`aircrafts.${type}.${size}`).shiftObject();
            this.decrementProperty('queueLength');
            break outermostLoop;
          }
        }
      }

      // it should be impossible to get here when all queues are empty,
      // because the "dequeue" button is disabled when that is the case
      this.set('dequeuedAircraft', dequeuedAircraft);
    }
  }
});
