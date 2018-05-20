/*
var result = [ { name: 'test2', connected: false, type: 'offline', id: '971c5da62479cd17' }, { name: 'test', connected: true, type: 'offline', id: '371c5da62479cd17' } ]
let checkID = '371c5da62479cd17';

let found = result.find(dev => ((dev.id === checkID) && dev.connected));

if (typeof found === "undefined") {
    console.log('not found');
}
else {
    console.log(found);
}
*/

class test {
    constructor() {
        this.id = '971c5da62479cd17';
    }

    checkIfInArray() {
        let result = [ { name: 'test2', connected: false, type: 'offline', id: '971c5da62479cd17' }, { name: 'test', connected: true, type: 'offline', id: '371c5da62479cd17' } ]
        let found = result.find(dev => (dev.id === this.id));
        if (typeof found === "undefined") {
            console.log('not found');
        }
        else {
            console.log(found);
        }
    }
}

var obj = new test()
obj.checkIfInArray();