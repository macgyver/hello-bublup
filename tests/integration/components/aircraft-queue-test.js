import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aircraft-queue', 'Integration | Component | aircraft queue', {
  integration: true
});

test('behaviors starting with an empty queue', function(assert) {
  let num;
  this.render(hbs`{{aircraft-queue}}`);

  assert.equal(this.$('li.enqueued-aircraft').length, 0, 'it displays no aircraft');
  assert.equal(this.$('button.enqueue:enabled').length, 1, 'it may enqueue');
  assert.equal(this.$('button.dequeue:disabled').length, 1, 'it may *NOT* dequeue when the queue is empty');
  assert.equal(this.$('select.size').val(), 'Small', 'size select has a default value');
  assert.equal(this.$('select.type').val(), 'Passenger', 'type select has a default value');

  num = this.$('input.number').val();
  this.$('button.enqueue').click();
  assert.equal(this.$('li.enqueued-aircraft').length, 1, 'aircraft was enqueued');
  assert.equal(this.$('li.enqueued-aircraft').text().trim(), `Small Passenger [${num}]`, `
    the enqueued aircraft has default settings
  `);
  assert.equal(this.$('button.dequeue:enabled').length, 1, `
    it may dequeue when the queue is lengthy
  `);

  this.$('button.dequeue').click();
  assert.equal(this.$('.enqueued-aircraft').length, 0, 'aircraft can be dequeued');

  this.$('select.size').val(this.$('select.size > option:last-child').val()).trigger('change');
  this.$('select.type').val(this.$('select.type > option:last-child').val()).trigger('change');
  assert.equal(this.$('select.size').val(), 'Large', 'size select can change');
  assert.equal(this.$('select.type').val(), 'Cargo', 'type select can change');

  num = this.$('input.number').val();
  this.$('button.enqueue').click();
  assert.equal(this.$('.enqueued-aircraft').text().trim(), `Large Cargo [${num}]`, 'aircraft has custom settings');
  assert.equal(this.$('select.size').val(), 'Small', 'size select is reset');
  assert.equal(this.$('select.type').val(), 'Passenger', 'type select is reset');
});

test('Passenger AC’s have removal precedence over Cargo AC’s', function(assert) {
  this.set('aircrafts', [{
    number: 1,
    size: 'Large',
    type: 'Cargo'
  },{
    number: 2,
    size: 'Large',
    type: 'Passenger'
  }]);
  this.render(hbs`{{aircraft-queue aircrafts=aircrafts}}`);

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), 'Large Passenger [2]', `
    first the passenger aircraft is dequeued
  `);

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), 'Large Cargo [1]', `
    then the cargo aircraft of the same size is dequeued
  `);
});

test('Large AC’s of a given type have removal precedence over Small AC’s of the same type.', function(assert) {
  this.set('aircrafts', [{
    number: 1,
    size: 'Small',
    type: 'Cargo'
  },{
    number: 2,
    size: 'Large',
    type: 'Cargo'
  }]);
  this.render(hbs`{{aircraft-queue aircrafts=aircrafts}}`);

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), 'Large Cargo [2]', `
    first the large aircraft is dequeued
  `);

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), 'Small Cargo [1]', `
    then the small aircraft of the same type is dequeued
  `);
});
