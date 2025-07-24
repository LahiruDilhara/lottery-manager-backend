export default class Parser {
    static parseNumber(numberString: string): number | null {
        const parsedNumber = Number(numberString);
        return isNaN(parsedNumber) ? null : parsedNumber;
    }
}