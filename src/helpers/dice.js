
//export const patternDiceMatch = /(\d+)d(\d+)/g;
export const patternDiceMatch = /\d+d\d+([\+\-\*\-]?\d+)?|\d+\-\d+/g;

export const isDiceRoll = (str) => {
	let pattDiceRoll = /(\d+)d(\d+)/g;

	return pattDiceRoll.test(str);
}

export const isRange = (str) => {
	let pattRange = /[0-9]+\-{1}[0-9]+/g;

	return pattRange.test(str);
}

export const isDiceOrRange = (str) => isDiceRoll(str) || isRange(str);

export const getRange = (strRange) => {
	let pattern = /^(\d+)\-{1}(\d+$)/g,
		matches = pattern.exec(strRange);

	if(!matches) return null;

	return {
		'min': parseInt(matches[1]),
		'max': parseInt(matches[2])
	}
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const randomArbitraryDie = (min, max) => {
	return () => {
		let ceiling = max - min,
			rand = Math.random() * (max - min);

		return Math.floor(rand) + min;
	}
}

export const randomDie = (f) => {
	let d = randomArbitraryDie(1, f);

	return (n) => {
		let s = 0;
		for(let i=0; i<n; i++) {
			s+= d();
		}

		//console.log('dice', {'faces': f, 'rolls': n, 'result': s});

		return s;
	}
}

export const d2 = randomDie(2);
export const d4 = randomDie(4);
export const d6 = randomDie(6);
export const d8 = randomDie(8);
export const d10 = randomDie(10);
export const d12 = randomDie(12);
export const d20 = randomDie(20);
export const d100 = randomDie(100);

export const coinToss = () => d2(1) > 1;

const parseDice = (dice) => {
	let sum = 0, rollResults;
  
	try {
	    if(isDiceRoll(dice)) {
			let patternDice = /^(\d+)d(\d+)$/g,
				test = patternDice.exec(dice),
				rolls = parseInt(test[1]),
				faces = parseInt(test[2]),
				die = randomDie(faces),
				rollResults = new Array(rolls);

			for(let i=0; i < rolls; i++) {
				rollResults.push(die(1));
			}

			rollResults.map(roll => sum += roll)
		} else if(isRange(dice)) {
			let rangeSpread = getRange(dice),
				rangeDie;

			if(rangeSpread) {
				console.log('found range...', rangeSpread.min, rangeSpread.max);
				rangeDie = randomArbitraryDie(rangeSpread.min, rangeSpread.max);
				sum = rangeDie(1);
			}
		} else {
			dice = parseInt(dice);

			if(!isNaN(dice)) {
				sum = dice;
			}
		}
	} catch(e) {
		console.log(e.message);
	}

	return sum;
}

export const roll = (dice) => {
	let symbols = /^([+\-\*\\])$/,
		//patternDice = /\d+d{1}\d+/g,
		//patternRange = /^(\d+)\-{1}(\d+$)/g,
		operators = [], results = [], sum = 0;

	/*
	if(patternRange.test(dice)) {
		range = patternRange.exec(dice);
		console.log('calculating range...', range);
		if(range) {
			min = range[1];
			max = range[2];
			sum = randomArbitraryDie(min, max)(1);
			return sum;
		} else {
			return dice;
		}
	}
	*/

	dice = isDiceRoll(dice) ? dice.split(symbols) : [ dice ];
  
	dice.map((d) => {
		console.log('found...', d);

		if(!isRange(d) && symbols.test(d)) {
			operators.push(d);
		} else {
			results.push(parseDice(d));
		}
	});
  
	sum = results.shift();
  
	try {
		if(results.length > 0) {
			while(results.length > 0) {
				let tmp = results.shift();

				if(operators.length > 0) {
					let op = operators.shift();

					switch(op) {
						case '+':
							sum = sum + tmp;
							break;
						case '-':
							sum = sum - tmp;
							break;
						case '*':
							sum = sum * tmp;
							break;
						case '/':
							sum = sum / tmp;
							break;
						default:
							break;
						}
				}
			}
		}
	} catch(e) {
		console.log(e.message);
	}

	return sum;
}
