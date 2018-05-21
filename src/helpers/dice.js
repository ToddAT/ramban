
export const patternDiceMatch = /(\d+)d(\d+)/g;

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const randomArbitraryDie = (min, max) => {
	return () => Math.floor(Math.random() * (max - min) + min)
}

export const randomDie = (f) => {
	let d = randomArbitraryDie(1, f);

	return (n) => {
		let s = 0;
		for(let i=0; i<n; i++) {
			s+= d();
		}

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
	let patternDice = /^(\d+)d(\d+)$/g,
  		test = patternDice.exec(dice), sum = 0;
  
	try {
	    if(test) {
			let rolls = parseInt(test[1]),
				faces = parseInt(test[2]),
				die = randomDie(faces),
				rollResults = new Array(rolls);

			for(let i=0; i < rolls; i++) {
				rollResults.push(die(1));
			}

			rollResults.map(roll => sum += roll)
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
	let symbols = /([+\-\*\\])/,
		operators = [], results = [], sum = 0;

	dice = dice.split(symbols);
  
	dice.map((d) => {
		if(symbols.test(d)) {
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