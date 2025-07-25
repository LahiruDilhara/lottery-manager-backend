import jsonLogic from "json-logic-js";

export default function configureJsonLogic() {

    //? Extractor
    type ExtractorInput = [string, number];
    function extractor(...inputs: [string, number][]) {
        let concatenated = "";
        for (const input of inputs) {
            concatenated += String(input[0])[Number(input[1])];
        }
        return concatenated;
    }
    jsonLogic.add_operation("extractor", extractor);
    // "extractor": [
    //     ["A", 0],
    //     ["4158", 1],
    //     ["859", 1],
    //     ["39", 1],
    // ],


    //? String Cast
    function stringCast(input: any) {
        return String(input);
    }
    jsonLogic.add_operation("toString", stringCast);
    // "toString": [40]



    //? Number Cast
    // String to Number Cast
    function numberCast(input: any) {
        return Number(input);
    }
    jsonLogic.add_operation("toNumber", numberCast);
    // "toNumber": ["45"]

    //? To Lower Case
    function toLowerCase(input: string) {
        if (typeof input !== "string") {
            return input; // Return as is if not a string
        }
        return input.toLowerCase();
    }
    jsonLogic.add_operation("toLowerCase", toLowerCase);
    // "toLowerCase": ["HELLO WORLD"]

    //? Null Except Array Matcher
    function nullExceptArrayMatcher(arr1: any[], arr2: any[]) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] === null || arr2[i] === null) {
                continue; // Skip if either element is null
            }
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }


    //? Multi Condition Match
    function multiConditionMatch(findKey: any[], cases: [any[], any], defaultValue: any) {
        console.log("findKey", findKey);
        console.log("cases", cases);
        for (const [key, value] of cases) {
            if (key === null || key === undefined) {
                continue; // Skip if key is null or undefined
            }
            if (nullExceptArrayMatcher(findKey, key)) {
                return value;
            }
        }
        return defaultValue;
        // "multiConditionMatch": [
        //     [3, 4],
        //     [
        //         [[1, 2], "A"],
        //         [[3, 4], "B"],
        //     ],
        //     "C"
        // ]
    }
    jsonLogic.add_operation("multiConditionMatch", multiConditionMatch);

    //? MultiAllConditionMatch
    function multiAllConditionMatch(findKey: any[], cases: [any[], any], defaultValue: any) {
        console.log("findKey", findKey);
        console.log("cases", cases);
        let matchValues = [];
        for (const [key, value] of cases) {
            if (key === null || key === undefined) {
                continue; // Skip if key is null or undefined
            }
            if (nullExceptArrayMatcher(findKey, key)) {
                matchValues.push(value);
            }
        }
        if (matchValues.length > 0) {
            return matchValues;
        }
        return [defaultValue];
        // "multiAllConditionMatch": [
        //     [8, 4],
        //     [
        //         [[1, 2], "A"],
        //         [[8, 4], "B"],
        //         [[null, null], "D"],
        //     ],
        //     "C"
        // ]
    }
    jsonLogic.add_operation("multiAllConditionMatch", multiAllConditionMatch);

    //? Match Count From Beginning
    function matchCountFromBegining(resultList: any[], matchList: any[]) {

        let count = 0;
        for (let i = 0; i < resultList.length; i++) {
            if (matchList[i] === resultList[i]) {
                count++;
            }
            else {
                break;
            }
        }
        return count;
        // "matchCountFromBegining": [
        //     [1, 2, 4, 5, 6],
        //     [1, 4, 4]
        // ]
    }
    jsonLogic.add_operation("matchCountFromBegining", matchCountFromBegining)


    //? Match Count From End
    function matchCountFromEnd(resultList: any[], matchList: any[]) {
        let count = 0;
        for (let i = 0; i < resultList.length; i++) {
            if (matchList[matchList.length - 1 - i] === resultList[resultList.length - 1 - i]) {
                count++;
            }
            else {
                break;
            }
        }
        return count;
        // "matchCountFromEnd": [
        //     [1, 2, 4, 5, 6],
        //     [1, 4, 4]
        // ]
    }
    jsonLogic.add_operation("matchCountFromEnd", matchCountFromEnd);

    //? Arrays Equal
    function arraysEqual(arr1: any[], arr2: any[]) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
    jsonLogic.add_operation("arraysEqual", arraysEqual);

    //? Match Count
    function matchCount(resultList: any[], matchList: any[]) {
        let count = 0;
        for (let i = 0; i < resultList.length; i++) {
            if (matchList.includes(resultList[i])) {
                count++;
            }
        }
        return count;
        // "matchCount": [
        //     [1, 2, 4, 5, 6, 8, 9],
        //     [1, 4, 6,5]
        // ]
    }
    jsonLogic.add_operation("matchCount", matchCount);

    //? exactMatchCount
    function exactMatchCount(resultList: any[], matchList: any[]) {
        let count = 0;
        for (let i = 0; i < resultList.length; i++) {
            if (matchList[i] === resultList[i]) {
                count++;
            }
        }
        return count;
        // "exactMatchCount": [
        //     [1, 2, 4, 5],
        //     [1, 4, 6, 5]
        // ]
    }
    jsonLogic.add_operation("exactMatchCount", exactMatchCount);

    //? String match Count
    function stringMatchCount(resultList: any[], matchList: any[], caseInSensitive: boolean = false) {
        let rl = caseInSensitive ? resultList.map(value => String(value).toLowerCase()) : resultList;
        let ml = caseInSensitive ? matchList.map(value => String(value).toLowerCase()) : matchList;

        let count = 0;
        for (let i = 0; i < rl.length; i++) {
            if (ml.includes(rl[i])) {
                count++;
            }
        }
        return count;
        // "stringMatchCount": [
        //     ["hellO", "hello", "HELLO"],
        //     ["hello", "HELLO", "hello"],
        //     true
        // ]
    }
    jsonLogic.add_operation("stringMatchCount", stringMatchCount);

    //? exact String Match Count
    function exactStringMatchCount(resultList: any[], matchList: any[], caseInSensitive: boolean = false) {
        let rl = caseInSensitive ? resultList.map(value => String(value).toLowerCase()) : resultList;
        let ml = caseInSensitive ? matchList.map(value => String(value).toLowerCase()) : matchList;

        let count = 0;
        for (let i = 0; i < rl.length; i++) {
            if (ml[i] === rl[i]) {
                count++;
            }
        }
        return count;
        // "exactStringMatchCount": [
        //     ["hello", "hello", "HELLO"],
        //     ["hello", "HELLO", "hello"],
        //     true
        // ]
    }
    jsonLogic.add_operation("exactStringMatchCount", exactStringMatchCount);




    //? Add All
    function addAll(numbers: number[]) {
        let total = 0;
        for (const number of numbers) {
            total += Number(number);
        }
        return total;
        // "addAll": [
        //     [1, 2, 4, 5]
        // ]
    }
    jsonLogic.add_operation("addAll", addAll);


    //? Switch Case
    function switchCase(value: any, cases: Record<string, any>, defaultValue: any) {
        if (Object.prototype.hasOwnProperty.call(cases, value)) {
            return cases[value];
        }
        return defaultValue;
        // "switch": [
        //     90,
        //     {
        //         "2": 10,
        //         "4": 20,
        //         "5": 6,
        //         "9": 20
        //     },
        //     4
        // ]
    }
    jsonLogic.add_operation("switch", switchCase)

    //? Create Object With Given Keys and Values
    function createObject(...data: [any, any][]) {
        const obj: Record<string, any> = {};
        for (const [key, value] of data) {
            obj[key] = value;
        }
        return obj;
        // "createObject": [
        //     ["hello", 4],
        //     ["world", 5],
        //     ["numbers", [0, 8, 1, 8, 3, 4]],
        //     ["letters", ["V"]],
        //     [5,5]
        // ]
    }
    jsonLogic.add_operation("createObject", createObject);

    //? Reverse String
    function reverseString(input: string) {
        if (typeof input !== "string") {
            return input; // Return as is if not a string
        }
        return input.split("").reverse().join("");
    }
    jsonLogic.add_operation("reverseString", reverseString);

    //? If Equal Then
    function ifEqualThenObj(value1: any, value2: any, strict: boolean = true, data: any) {
        let isEqual = false;
        if (strict) {
            isEqual = value1 === value2;
        }
        else {
            isEqual = value1 == value2;
        }
        if (isEqual) {
            return data;
        }
        //     "ifEqualThenObj": [
        //     2,
        //     4,
        //     true,
        //     ["hello", "world"]
        // ]
    }
    jsonLogic.add_operation("ifEqualThenObj", ifEqualThenObj);

    //? Clean List
    function cleanList(list: any[], removeUndefined: boolean = false, removeNull: boolean = false) {
        return list.filter(item => {
            if (removeUndefined && item === undefined) return false;
            if (removeNull && item === null) return false;
            return true;
        });
        // "cleanList": [
        //     [1, 2, 3, null, undefined, 4],
        //     true,
        //     true
        // ]
    }
    jsonLogic.add_operation("cleanList", cleanList);

    //? In Between
    function inBetweenIncluding(value: number, min: number, max: number) {
        return value >= min && value <= max;
        // "inBetween": [
        //     5,
        //     1,
        //     10
        // ]
    }
    jsonLogic.add_operation("inBetweenIncluding", inBetweenIncluding);
}