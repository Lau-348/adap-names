import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertIsNotNullOrUndefined(delimiter, "Delimiter");
        this.assertValidDelimiter(delimiter);

        if (delimiter != null && delimiter != undefined) {
            this.delimiter = delimiter;
        }
        this.assertSetDelimiter(delimiter);
        this.assertClassInvariants();
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertIsNotNullOrUndefined(delimiter, "Delimiter");

        let amount = this.getNoComponents();
        let string: string = "";
        for(let i = 0; i < amount; i++){
            string += this.getComponent(i).concat(delimiter);
        }
        this.assertIsNotNullOrUndefined(string, "String");
        return string;
    }

    public toString(): string {
        let string: string = this.asString()
        this.assertIsNotNullOrUndefined(string, "String")
        return string;
    }

    public asDataString(): string {
        let string: string = this.asString(ESCAPE_CHARACTER + this.delimiter);
        this.assertIsNotNullOrUndefined(string, "String");
        return string;
    }

    public isEqual(other: Name): boolean {
        this.assertIsNotNullOrUndefined(other, "Other name")
        this.assertValidDelimiter(other.getDelimiterCharacter());

        if (this.getNoComponents() !== other.getNoComponents()){
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) return false;
        }
        
        return true; 
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        this.assertIsNotNullOrUndefined(hashCode, "Hashcode")
        return hashCode;
    }

    public clone(): Name {
        this.assertClassInvariants();
        return {...this};
    }

    public isEmpty(): boolean {
        let bool: boolean = this.getNoComponents() === 0;
        this.assertIsNotNullOrUndefined(bool, "Boolean for empty")
        return bool;
    }

    public getDelimiterCharacter(): string {
        let delimiter: string = this.delimiter;
        this.assertIsNotNullOrUndefined(delimiter, "Delimiter");
        this.assertValidDelimiter(delimiter);
        return delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        this.assertIsNotNullOrUndefined(other, "Other name");
        this.assertValidOther(other);
        for(let i = 0; i < other.getNoComponents(); i++) {
            let other_component: string = other.getComponent(i);
            this.append(other_component);
        }
        this.assertClassInvariants();
    }

    protected assertClassInvariants(): void {
        InvalidStateException.assert(this.delimiter != null && this.delimiter !== undefined, "Delimiter");

        let condition: boolean = this.delimiter.length === 1 && this.delimiter !== ESCAPE_CHARACTER;
        InvalidStateException.assert(condition, "Delimiter not correctly set");

        this.assertNonNegativeComponentCount(this.getNoComponents());
    }

    protected assertValidDelimiter(delimiter: string): void {
        let condition: boolean = delimiter.length === 1 && delimiter !== ESCAPE_CHARACTER;
        MethodFailedException.assert(condition, "Delimiter is not correctly formatted");
    }

    protected assertNonNegativeComponentCount(count: number): void {
        let condition: boolean = count >= 0;
        InvalidStateException.assert(condition, "Number of components cannot be negative");
    }

    protected assertValidOther(other: Name): void {
        this.assertIsNotNullOrUndefined(other, `Other Name`);
        let condition: boolean = other.asString() !== "" && other.getDelimiterCharacter() !== null;
        InvalidStateException.assert(condition, `Other name must not be empty`);
    }

    protected assertValidComponent(component: string, index: number): void {
        this.assertIsNotNullOrUndefined(component, `Component at index ${index}`);
        let condition: boolean = component !== "";
        InvalidStateException.assert(condition, `Component at index ${index} must not be empty`);
    }

    protected assertPostconditionAsString(result: string, componentCount: number): void {
        let condition: boolean = !(result.length === 0 && componentCount > 0);
        MethodFailedException.assert(condition, "Generated string cannot be empty if components exist");
    }

    protected assertIsNotNullOrUndefined(value: any, name: string): void {
        let condition: boolean = value === null || null === undefined;
        IllegalArgumentException.assert(condition, `${name} must not be null or undefined`);
    }

    protected assertSetDelimiter(delimiter: string): void {
        //this.assertIsNotNullOrUndefined(delimiter, `Delimiter`);
        let condition: boolean = this.delimiter === delimiter
        IllegalArgumentException.assert(condition, `${name} must not be null or undefined`);
    }

    protected assertIndexInBound(i: number): void {
        IllegalArgumentException.assert(i !== null && i !== undefined, "Index");
        let condition: boolean = i >= 0 && i <= this.getNoComponents();
        IllegalArgumentException.assert(condition, `Index ${i} out of bounds [0, ${this.getNoComponents()}]`);
    }

}