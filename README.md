## Problem:

A software subsystem of an air-traffic control system is defined to manage a queue of aircraft(AC) in an airport. The aircraft queue is managed by a process which responds to three types of requests:
- system boot used to start the system.
- enqueue aircraft used to insert a new AC into the system.
- dequeue aircraft used to remove an AC from the system.

AC’s have the following properties:
- AC type: Passenger or Cargo
- AC size: Small or Large

The process which manages the queue of AC’s satisfies the following:
- There is no limit on the number of AC’s it can manage
- Dequeue aircraft requests result in selection of one AC for removal such that:
  - Passenger AC’s have removal precedence over Cargo AC’s
  - Large AC’s of a given type have removal precedence over Small AC’s of the same type.
  - Earlier enqueued AC’s of a given type and size have precedence over later enqueued AC’s of the same type and size.

Deliverable:
- Your HTML page should have a button to boot the system,
- Selector(s) to enqueue aircraft,
- A button to dequeue aircraft (when pressed a message stating which aircraft was dequeued)
- There should be a tab or link to take the user to another view that shows the current state of the enqueued airplanes.


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd hello-bublup`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

This is just hosted on Github pages `$MESSAGE="my commit message" npm run deploy`

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
