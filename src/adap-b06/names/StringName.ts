import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

/**
 * StringName implementation that stores components in a single string
 * separated by the delimiter character.
 * This is a value object - all operations return new instances.
 */
export class StringName extends AbstractName {
    private readonly name: string;
    protected noComponents: number = 1;

    constructor(name: string, delimiter?: string) {
        super(delimiter);
        this.name = name;
        this.assertStringNameInvariants();
    }

    getNoComponents(): number {
        return this.doGetComponents().length;
    }

    getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);
        return this.doGetComponents()[i];
    }

    setComponent(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidIndex(i);

        const components = this.doGetComponents();
        components[i] = c;
        const result = new StringName(components.join(this.delimiter), this.delimiter);

        MethodFailedException.assert(
            result.getComponent(i) === c,
            `component at index ${i} was not set correctly`
        );
        result.assertStringNameInvariants();

        return result;
    }

    insert(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidInsertIndex(i);

        const components = this.doGetComponents();
        components.splice(i, 0, c);
        const result = new StringName(components.join(this.delimiter), this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === components.length,
            'component could not be inserted'
        );
        result.assertStringNameInvariants();

        return result;
    }

    append(c: string): Name {
        return this.insert(this.getNoComponents(), c);
    }

    remove(i: number): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);

        const components = this.doGetComponents();
        
        MethodFailedException.assert(
            components.length > 1,
            'cannot remove the only component'
        );

        components.splice(i, 1);
        const result = new StringName(components.join(this.delimiter), this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === components.length,
            'component could not be removed'
        );
        result.assertStringNameInvariants();

        return result;
    }

    getComponents(): string[] {
        return this.doGetComponents();
    }

    isEqual(other: Object): boolean {
        if (!(other instanceof AbstractName)) {
            return false;
        }
        const otherName = other as Name;
        
        // Compare delimiter
        if (this.getDelimiterCharacter() !== otherName.getDelimiterCharacter()) {
            return false;
        }
        
        // Compare components
        const thisComponents = this.doGetComponents();
        const otherComponents = otherName.getComponents();
        
        if (thisComponents.length !== otherComponents.length) {
            return false;
        }
        
        return thisComponents.every((component, index) => 
            component === otherComponents[index]
        );
    }

    getHashCode(): number {
        const components = this.doGetComponents();
        let hash = 17;
        hash = 31 * hash + this.delimiter.charCodeAt(0);
        
        return components.reduce((acc, component) => 
            31 * acc + component.split('').reduce((compAcc, char) => 
                31 * compAcc + char.charCodeAt(0), 0
            ), hash
        );
    }

    protected assertStringNameInvariants(): void {
        InvalidStateException.assert(
            this.name !== null && this.name !== undefined,
            "name cannot be null or undefined"
        );
        
        InvalidStateException.assert(
            typeof this.name === 'string',
            "name must be a string"
        );
    }

    protected assertValidIndex(i: number): void {
        const components = this.doGetComponents();
        if (i < 0 || i >= components.length) {
            throw new Error(`Index ${i} out of bounds for length ${components.length}`);
        }
    }

    protected assertValidInsertIndex(i: number): void {
        const components = this.doGetComponents();
        if (i < 0 || i > components.length) {
            throw new Error(`Insert index ${i} out of bounds for length ${components.length}`);
        }
    }

    private doGetComponents(): string[] {
        return this.name.split(this.delimiter);
    }
}
