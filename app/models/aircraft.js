import DS from 'ember-data';
const {attr} = DS;

export const TYPES = ['Passenger', 'Cargo'];

export const SIZES = ['Small', 'Large'];

export default DS.Model.extend({
  number: attr('number'),
  type: attr('string'),
  size: attr('string')
});
