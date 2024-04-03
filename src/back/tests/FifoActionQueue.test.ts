// File: fifoActionQueue.test.ts
import 'jest';
import { FifoActionQueue } from '../classes/FifoActionQueue';
import { Action } from '../classes/Action';

describe('FifoActionQueue', () => {
  let actionQueue: FifoActionQueue;

  beforeEach(() => {
    actionQueue = new FifoActionQueue();
  });

  it('should add an action to the queue', () => {
    const action = new Action('Test Action', 100);
    actionQueue.add(action);
    expect(actionQueue.queue.length).toBe(1);
  });

  it('should return the next action in the queue', () => {
    const action1 = new Action('Action 1', 50);
    const action2 = new Action('Action 2', 75);
    actionQueue.add(action1);
    actionQueue.add(action2);
    const nextAction = actionQueue.next();
    expect(nextAction).toEqual(action1);
    expect(actionQueue.queue.length).toBe(1);
  });

  it('should return the names of actions in the queue', () => {
    const action1 = new Action('Action 1', 50);
    const action2 = new Action('Action 2', 75);
    actionQueue.add(action1);
    actionQueue.add(action2);
    const queueNames = actionQueue.getQueue();
    expect(queueNames).toEqual(['Action 1', 'Action 2']);
  });
});
