import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('aircraft-control-system', 'Integration | Component | aircraft control system', {
  integration: true
});

test('it has a "boot" button', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{aircraft-control-system}}`);
  assert.equal(this.$('button.boot').text().trim(), 'Boot');
});

test('it can boot', function(assert) {
  this.render(hbs`{{aircraft-control-system}}`);
  this.$('button.boot').click();
  assert.equal(this.$('h1').text().trim(), 'Aircraft control system');
});
