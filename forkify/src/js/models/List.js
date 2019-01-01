import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(), // automatically creates unique ids.
            count,
            unit,
            ingredient
        };

        this.items.push(item);

        return item;
    }

    
   /**
    * finds the index of the item based on its id and then removes it. 
    * @param {string} id id of the list item.
    */
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);

        // Quick example of the difference of 'splice()' and 'slice()';
        // [2,4,8] --> splice(1,2) --> returns [4,8] original array becomes [2];
        // [2,4,8] --> slice(1,2) --> returns 4, original array still [2,4,8];
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}