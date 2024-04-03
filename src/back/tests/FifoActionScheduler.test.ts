import { FifoActionScheduler } from '../classes/FifoActionScheduler';
import { Action } from '../classes/Action';

describe('FifoActionScheduler', () => {
  let actionScheduler: FifoActionScheduler;
  const actionsAvailable = [
    new Action('Action 1', 50),
    new Action('Action 2', 75),
  ];
  beforeEach(() => {
    jest.useFakeTimers();
    actionScheduler = new FifoActionScheduler(actionsAvailable, 1000);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should get actions by name', () => {
    const action = actionScheduler.getActionsByName('Action 1');
    expect(action.name).toBe('Action 1');
    expect(action.maxCredits).toBe(50);
  });

  it('should return actions available in JSON format', () => {
    const actionsJSON = actionScheduler.getActionsAvailableJSON();
    expect(actionsJSON).toEqual([
      { name: 'Action 1', maxCredits: 50 },
      { name: 'Action 2', maxCredits: 75 },
    ]);
  });

  it('should add an action to the queue', () => {
    const newAction = new Action('New Action', 100);
    actionScheduler.addAction(newAction);
    const queueNames = actionScheduler.queue.getQueue();
    expect(queueNames).toContain('New Action');
  });

  it('should return names of actions available', () => {
    const actionNames = actionScheduler.getActionsAvailableName();
    expect(actionNames).toEqual(['Action 1', 'Action 2']);
  });

  it('should consume action after specified time', () => {
    const consumeActionSpy = jest.spyOn(actionScheduler, 'consumeAction');
    jest.advanceTimersByTime(1000);
    expect(consumeActionSpy).toHaveBeenCalledTimes(1);
  });
});
