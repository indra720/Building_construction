const fs = require('fs');
const path = require('path');

function decodeAscii85(str) {
  // strip whitespace
  str = str.replace(/\s+/g, '');
  if (str.startsWith('<~')) str = str.slice(2);
  if (str.endsWith('~>')) str = str.slice(0, -2);
  
  const bytes = [];
  for (let i = 0; i < str.length; ) {
    if (str[i] === 'z') {
      bytes.push(0, 0, 0, 0);
      i++;
      continue;
    }
    let chunk = 0;
    let count = 0;
    for (let j = 0; j < 5; j++) {
      if (i + j < str.length) {
        chunk = chunk * 85 + (str.charCodeAt(i + j) - 33);
        count++;
      } else {
        chunk = chunk * 85 + 84;
      }
    }
    for (let k = 0; k < count - 1; k++) {
      bytes.push((chunk >>> (24 - 8 * k)) & 0xFF);
    }
    i += 5;
  }
  return Buffer.from(bytes);
}

const pdfPath = path.join(__dirname, '..', 'BuildPro_All_Available_UI_Screens-3.pdf');
const outDir = path.join(__dirname, '..', 'pdf_screens');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Reading PDF file...');
const content = fs.readFileSync(pdfPath, 'latin1');
console.log('PDF size:', content.length);

let pos = 0;
let count = 0;

while (true) {
  const dictStart = content.indexOf('/Filter [ /ASCII85Decode /DCTDecode ]', pos);
  if (dictStart === -1) break;
  
  const lenMatch = content.slice(dictStart, dictStart + 350).match(/\/Length\s+(\d+)/);
  if (!lenMatch) {
    pos = dictStart + 50;
    continue;
  }
  const streamLen = parseInt(lenMatch[1], 10);
  
  let sStart = content.indexOf('stream\r\n', dictStart);
  let offset = 8;
  if (sStart === -1 || sStart > dictStart + 400) {
    sStart = content.indexOf('stream\n', dictStart);
    offset = 7;
  }
  const dataStart = sStart + offset;
  const rawStream = content.slice(dataStart, dataStart + streamLen);
  count++;
  const jpegBuf = decodeAscii85(rawStream);
  const fileName = path.join(outDir, `screen_${String(count).padStart(3, '0')}.jpg`);
  fs.writeFileSync(fileName, jpegBuf);
  console.log(`[${count}] Saved ${path.basename(fileName)} (${(jpegBuf.length / 1024).toFixed(1)} KB) - Valid JPEG: ${jpegBuf[0] === 0xFF && jpegBuf[1] === 0xD8}`);
  
  pos = dataStart + streamLen;
}

console.log(`Total screens extracted: ${count}`);
