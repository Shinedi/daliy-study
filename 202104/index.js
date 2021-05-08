Function.prototype.bind1 =function (context) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var bound = function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        console.log(this instanceof bound)
        console.log(this instanceof me)
        return me.apply(this instanceof me ? this : context, finalArgs);
    }
    
    bound.prototype = this.prototype;
    return bound;
}

function foo1 (a) {
    this.a = a
}

const obj1 = {}

var bar = foo1.bind1(obj1)
// bar(2)
var haha = new bar(3)