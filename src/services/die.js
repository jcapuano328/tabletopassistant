import {randomRange,randomOneOf} from './random';

function Die(low, high, diecolor, dotcolor) {
	var self = this;
    var value = low;
    diecolor = diecolor || 'white';
	dotcolor = dotcolor || 'black'

    self.color = function() {
    	return {
			die: diecolor,
			dot: dotcolor
		};
    }
	self.sides = function() {
		return high;
	}

    self.value = function(d) {
    	if (typeof d != 'undefined') {
        	value = d;
            if (value < low) {
            	value = low;
            } else if (value > high) {
            	value = high;
            }
        }
        return value;
    }

    self.increment = function(rollover) {
    	if (++value > high) {
        	value = rollover ? low : high;
        }
    }
    self.decrement = function(rollover) {
    	if (--value < low) {
        	value = rollover ? high : low;
        }
    }
    self.roll = function() {
		let values = randomRange(low,high,10);
		value = randomOneOf(values);		
        return value;
    }
}

module.exports = Die;
