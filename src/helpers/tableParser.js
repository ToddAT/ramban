import * as dice from './dice'
import tables from '../data/index'

const getRandomTableEntry = (table) => {
	let len = table.length,
    	rnd;

	if(len < 1) {
		return '';
	}

	if(len < 2) {
		return table[0];
	}

    rnd = dice.getRandomInt(len);
    return table[rnd];
}

const getTable = (id) => {
	let ids = id.toLowerCase().split('.'),
		outerTable = null, innerTable = null;

	outerTable = tables[ids[0]];

	if(outerTable) {
		innerTable = outerTable[ids[1]];
	} else {
		console.log('could not find table...', id);
	}

	return innerTable;
}

const parseTableEntry = (entry, tableID) => {
	let rgxTableCall = /(?:\[)([^\[\]]+)(?:\])/g,
		newEntry = entry, rgx, table;

	while ((rgx = rgxTableCall.exec(entry)) !== null) {
		let match = rgx[1],
			tableName = match.toLowerCase(),
			parsedSubEntry = '', subEntry;

		if(dice.isDiceOrRange(tableName)) {
			parsedSubEntry = dice.roll(tableName);
			console.log('parsing table, found dice entry...', tableName, parsedSubEntry);
		} else {
			if(tableName.indexOf('.') < 0) {
				tableName = tableID + '.' + tableName;
			} else {
				tableID = tableName.split('.')[0];
			}

			table = getTable(tableName);

			if(table) {
				subEntry = getRandomTableEntry(getTable(tableName));
				parsedSubEntry = parseTableEntry(subEntry, tableID);
			}
		}

		newEntry = newEntry.replace('[' + match + ']', parsedSubEntry);
	}

	return newEntry;
}

export const generateRandomTableEntry = (t = 'Swords.Main') => {
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