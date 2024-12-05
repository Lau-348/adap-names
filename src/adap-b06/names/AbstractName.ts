import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

/**
 * Abstract base class for Name implementations
 * Implements value object semantics and common functionality
 */
export abstract class AbstractName implements Name {
    protected readonly delimiter: string;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertIsNotNullOrUndefined(delimiter, "Delimiter");
        this.assertValidDelimiter(delimiter);
        this.delimiter = delimiter;
        this.assertClassInvariants();
    }
    getDelimiterCharacter(): string {
        let delimiter: string = this.delimiter;
        this.assertIsNotNullOrUndefined(delimiter, "Delimiter");
        this.assertValidDelimiter(delimiter);
        return delimiter;
    }

    public abstract getNoComponents(): number;
    public abstract getComponent(i: number): string;

    public insert(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIsNotNullOrUndefined(c, "Component");
        this.assertIndexInBound(i);
        this.assertValidComponent(c);
        
        return this.doInsert(i, c);
    }

    public append(c: string): Name {
        return this.insert(this.getNoComponents(), c);
    }

    public remove(i: number): Name {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIndexInBound(i);
        
        return this.doRemove(i);
    }

    public concat(other: Name): Name {
        this.assertIsNotNullOrUndefined(other, "Other name");
        let result = this.clone();
        for(let i = 0; i < other.getNoComponents(); i++) {
            result = result.append(other.getComponent(i));
        }
        return result;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public clone(): Name {
        return this.doClone();
    }

    public isEqual(other: Object): boolean {
        if (!(other instanceof AbstractName)) {
            return false;
        }
        const otherName = other as Name;
        if (this.getDelimiterCharacter() !== otherName.getDelimiterCharacter()) {
            return false;
        }
        if (this.getNoComponents() !== otherName.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== otherName.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        let hash = 17;
        hash = 31 * hash + this.delimiter.charCodeAt(0);
        for (let i = 0; i < this.getNoComponents(); i++) {
            hash = 31 * hash + this.getComponent(i).split('').reduce((acc, char) => 31 * acc + char.charCodeAt(0), 0);
        }
        return hash;
    }

    public asString(delimiter: string = this.delimiter): string {
        this.assertIsNotNullOrUndefined(delimiter, "Delimiter");
        let result = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            result += this.getComponent(i);
            if (i < this.getNoComponents() - 1) {
                result += delimiter;
            }
        }
        return result;
    }

    public asDataString(): string {
        return this.asString(ESCAPE_CHARACTER + this.delimiter);
    }

    public toString(): string {
        return this.asString();
    }

    protected abstract doInsert(i: number, c: string): Name;
    protected abstract doRemove(i: number): Name;
    protected abstract doClone(): Name;

    protected assertIsNotNullOrUndefined(value: any, name: string): void {
        IllegalArgumentException.assert(value != null && value !== undefined, `${name} must not be null or undefined`);
    }

    protected assertValidDelimiter(delimiter: string): void {
        IllegalArgumentException.assert(
            delimiter.length === 1 && delimiter !== ESCAPE_CHARACTER,
            "Delimiter must be a single character and not the escape character"
        );
    }

    protected assertValidComponent(c: string): void {
        this.assertIsNotNullOrUndefined(c, "Component");
    }

    protected assertIndexInBound(i: number): void {
        IllegalArgumentException.assert(
            i >= 0 && i <= this.getNoComponents(),
            `Index ${i} out of bounds [0, ${this.getNoComponents()}]`
        );
    }

    protected assertClassInvariants(): void {
        InvalidStateException.assert(this.delimiter != null && this.delimiter !== undefined, "Delimiter not set");
        InvalidStateException.assert(
            this.delimiter.length === 1 && this.delimiter !== ESCAPE_CHARACTER,
            "Delimiter not correctly set"
        );
    }
}
