import { Action } from '~~/classes/Action';

export class FIFOActionQueue {
    queue: Action[];
    constructor() {
        this.queue = [];
    }

    /**
     * Adds an action to the queue
     * @param action The action to add
     */
    add(action: Action) {
        this.queue.push(action);
    }

    /**
     * @returns {Action} The next action in the queue
     */
    next() : Action | undefined {
        return this.queue.shift();
    }

    /**
     * @returns {string[]} The names of the actions in the queue
     */
    getQueue() : string[]{
        return this.queue.map(action => action.name);
    }
}
