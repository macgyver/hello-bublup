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
  assert.equal(this.$('select.size').val(), 'Large', 'size select has a default value');
  assert.equal(this.$('select.type').val(), 'Passenger', 'type select has a default value');

  num = this.$('input.number').val();
  this.$('button.enqueue').click();
  assert.equal(this.$('li.enqueued-aircraft').length, 1, 'aircraft was enqueued');
  assert.equal(this.$('li.enqueued-aircraft').text().trim(), `Large Passenger [${num}]`, `
    the enqueued aircraft has default settings
  `);
  assert.equal(this.$('button.dequeue:enabled').length, 1, `
    it may dequeue when the queue is lengthy
  `);

  this.$('button.dequeue').click();
  assert.equal(this.$('.enqueued-aircraft').length, 0, 'aircraft can be dequeued');

  this.$('select.size').val(this.$('select.size > option:nth-child(2)').val()).trigger('change');
  this.$('select.type').val(this.$('select.type > option:nth-child(2)').val()).trigger('change');
  assert.equal(this.$('select.size').val(), 'Small', 'size select can change');
  assert.equal(this.$('select.type').val(), 'Cargo', 'type select can change');

  num = this.$('input.number').val();
  this.$('button.enqueue').click();
  assert.equal(this.$('.enqueued-aircraft').text().trim(), `Small Cargo [${num}]`, 'aircraft has custom settings');
  assert.equal(this.$('select.size').val(), 'Large', 'size select is reset');
  assert.equal(this.$('select.type').val(), 'Passenger', 'type select is reset');
});

test('Passenger AC’s have removal precedence over Cargo AC’s', function(assert) {
  this.render(hbs`{{aircraft-queue}}`);

  // first enqueue a large cargo
  this.$('select.type').val(this.$('select.type > option:nth-child(2)').val()).trigger('change');
  let num1 = this.$('input.number').val();
  this.$('.enqueue').click();

  // then enqueue a large passenger
  let num2 = this.$('input.number').val();
  this.$('.enqueue').click();

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), `Large Passenger [${num2}]`, `
    first the passenger aircraft is dequeued
  `);

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), `Large Cargo [${num1}]`, `
    then the cargo aircraft is dequeued
  `);
});

test('Large AC’s of a given type have removal precedence over Small AC’s of the same type.', function(assert) {
  this.render(hbs`{{aircraft-queue}}`);

  // first enqueue a small cargo
  this.$('select.size').val(this.$('select.size > option:nth-child(2)').val()).trigger('change');
  this.$('select.type').val(this.$('select.type > option:nth-child(2)').val()).trigger('change');
  let num1 = this.$('.number').val();
  this.$('.enqueue').click();

  // then enqueue a large cargo
  this.$('select.type').val(this.$('select.type > option:nth-child(2)').val()).trigger('change');
  let num2 = this.$('.number').val();
  this.$('.enqueue').click();

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), `Large Cargo [${num2}]`, `
    first the large aircraft is dequeued
  `);

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), `Small Cargo [${num1}]`, `
    then the small aircraft of the same type is dequeued
  `);
});

test('Earlier enqueued AC’s of a given type and size have precedence over later enqueued AC’s of the same type and size', function(assert) {
  this.set('aircrafts', {
    Cargo: {
      Small: [{
        number: 1,
      }, {
        number: 2
      }]
    }
  });
  this.render(hbs`{{aircraft-queue}}`);

  let num1 = this.$('.number').val();
  this.$('.enqueue').click();

  let num2 = this.$('.number').val();
  this.$('.enqueue').click();

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), `Large Passenger [${num1}]`, `
    first the earlier aircraft is dequeued
  `);

  this.$('.dequeue').click();
  assert.equal(this.$('.dequeued-aircraft').text().trim(), `Large Passenger [${num2}]`, `
    next the later aircraft is dequeued
  `);
});
