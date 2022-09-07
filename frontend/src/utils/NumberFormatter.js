import numeral from 'numeral';

export function convertToAccountingFormat(number) {
  return numeral(number).format(`0,0`);
}
