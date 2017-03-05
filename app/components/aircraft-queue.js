import Ember from 'ember';
const {computed} = Ember;
import {TYPES as AIRCRAFT_TYPES, SIZES as AIRCRAFT_SIZES} from '../models/aircraft';

// poor man's method of generating unique numbers,
// purely to assist human readers in identifying airplanes
const numbers = [];
function makeNumber() {
  let num;
  do {
    num = Math.floor(Math.random() * 999);
  } while (numbers.indexOf(num) !== -1);
  numbers.push(num);
  return num;
}

export default Ember.Component.extend({
  store: Ember.inject.service(),

  // provide aircraft constants to template
  AIRCRAFT_SIZES,
  AIRCRAFT_TYPES,

  // reset the form for enqueing a new aircraft to default values
  readyNewAircraft() {
    // this object is modified via two-binding in the template
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

  // initial (empty) aircraft queue (an `Ember.NativeArray` object)
  // n.b: this is a singleton! it's ok because we only ever manage a single queue
  aircrafts: Ember.A(),

  // the dequeue action is enabled if the queue contains any elements
  empty: computed.empty('aircrafts'),

  actions: {
    // enqueue the specified aircraft and reset the form to add another
    enqueue() {
      this.get('aircrafts').pushObject(this.get('newAircraft'));
      this.readyNewAircraft();
    },

    // dequeue the next aircraft using logic specified in README
    dequeue() {
      let dequeuedAircraft;
      // micro-optimization - skip logic if there's only 1 choice
      if (this.get('aircrafts.length') === 1) {
        dequeuedAircraft = this.get('aircrafts').popObject();
      } else {
        let dequeueCandidates = this.get('aircrafts');

        // give precedence to any passenger planes
        let passengerPlanes = dequeueCandidates.filterBy('type', 'Passenger');
        if (passengerPlanes.length > 0) {
          dequeueCandidates = passengerPlanes;
        }

        // next give precedence to any large aircraft
        let largeAircraft = dequeueCandidates.filterBy('size', 'Large');
        if (largeAircraft.length > 0) {
          dequeueCandidates = largeAircraft;
        }

        // finally pick the earliest remaining object
        dequeuedAircraft = dequeueCandidates.get('firstObject');
      }

      this.get('aircrafts').removeObject(dequeuedAircraft);
      this.set('dequeuedAircraft', dequeuedAircraft);
    }
  }
});
