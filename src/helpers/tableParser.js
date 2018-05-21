import * as dice from './dice'
import tables from '../data/index'

const getRandomTableEntry = (table) => {
	let len = table.length,
    	rnd;

	if(len < 2) {
		return table[0];
	}

    rnd = dice.getRandomInt(len);
    return table[rnd];
}

const getTable = (id) => {
	let ids = id.toLowerCase().split('.'),
		outerTable = tables[ids[0]],
		innerTable = outerTable[ids[1]];

	return innerTable;
}

const parseTableEntry = (entry, tableID) => {
	let regex = /\[(\w+)\]/g,
		rgx, newEntry = entry;

	while ((rgx = regex.exec(entry)) !== null) {
		let match = rgx[1], tableName = match.toLowerCase(),
			subEntry, parsedSubEntry;

		if(dice.patternDiceMatch.test(tableName)) {
			parsedSubEntry = dice.roll(tableName);
		} else {
			if(tableName.indexOf('.') < 0) {
				tableName = tableID + '.' + tableName;
			}

			subEntry = getRandomTableEntry(getTable(tableName));
			parsedSubEntry = parseTableEntry(subEntry, tableID);
		}

		newEntry = newEntry.replace('[' + match + ']', parsedSubEntry);
	}

	return newEntry;
}

export const generateRandomTableEntry = (t = 'Swords.SwordStart') => {
	t = t.toLowerCase();

	try {
		let id = t.split('.'),
			outerTable = tables[id[0]] ? tables[id[0]] : null,
			innerTable;

		if(outerTable !== null) {
			innerTable = outerTable[id[1].toLowerCase()] ? outerTable[id[1].toLowerCase()] : null;
		}

		if(innerTable == null) {
			return '';
		}

		return parseTableEntry(getRandomTableEntry(innerTable), id[0]);
	} catch(e) {
		console.log(e.message);
		return '';
	}
}