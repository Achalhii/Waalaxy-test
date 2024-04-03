import { EventEmitter } from 'node:events';
import { Action } from '~~/classes/Action';
import { FIFOActionQueue } from '~~/classes/FIFOActionQueue';

export class FifoActionScheduler {
  private actionsAvailable: Array<Action> = [];
  queue: FIFOActionQueue;
  timeToExecute: number = 0;
  events: EventEmitter;

  constructor(actionsAvailable: Array<Action>, timeToExecute: number) {
    this.actionsAvailable = actionsAvailable;
    this.timeToExecute = timeToExecute;
    this.queue = new FIFOActionQueue();
    this.events = new EventEmitter();
    console.log('FifoActionScheduler created');
    setInterval(() => {
      this.consumeAction();
    }, this.timeToExecute);
  }

  consumeAction(): void {
    const action = this.queue.next();
    this.events.emit('actionConsumed', action?.name);
    if (action) {
      console.info(`Consuming action ${action.name}`);
    }
  }

  /**
   * Get the actions available
   * @param name The name of the action
   * @returns {Action} The action with the given name
   */
  getActionsByName(name : string) : Action {
    const action = this.actionsAvailable.find(action => action.name === name);
    if (!action) {
      throw new Error('Action not found');
    }
    return action;
  }

  getActionsAvailableJSON() : Array<{name: string, maxCredits: number}> {
    return this.actionsAvailable.map(action => {return { name: action.name,maxCredits: action.maxCredits}});
  }

  addAction(action: Action) : void {
    this.queue.add(action);
    this.events.emit('addAction');
  }

  getActionsAvailableName() : string[]{
    return this.actionsAvailable.map(action => action.name);
  }
}
