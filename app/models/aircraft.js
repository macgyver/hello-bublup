import DS from 'ember-data';
const {attr} = DS;

// these are sorted in priority order
export const TYPES = ['Passenger', 'Cargo'];
export const SIZES = ['Large', 'Small'];

export default DS.Model.extend({
  number: attr('number'),
  type: attr('string'),
  size: attr('string')
});
