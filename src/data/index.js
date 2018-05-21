import swords from './swords.txt';

let parseTableText = (t) => {
  let out = {},
      regex = new RegExp('^([0-9]+)\,{1}([^]+)'),
      lines = t.split('\n'),
      tbl;
  
  lines.forEach((line) => {
    let trimmed = line.trim(), i = 0, len = 0, rxp;
    
    if(trimmed.indexOf(';') == 0) {
      tbl = trimmed.replace(';', '').toLowerCase();
      out[tbl] = [];
    } else if(trimmed.length > 0) {
      rxp = regex.exec(trimmed);
      
      if(rxp !== null) {
        len = parseInt(rxp[1]);
      
        for(i=0; i<len; i++) {
          out[tbl].push(rxp[2]);
        }
      }
    }
  });
  
  return out;
};

const tables = {
	'swords': parseTableText(swords)
}

export default tables