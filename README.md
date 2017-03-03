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

