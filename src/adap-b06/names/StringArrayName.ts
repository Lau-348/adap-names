import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

/**
 * StringArrayName implementation that stores components in an array.
 * This is a value object - all operations return new instances.
 */
export class StringArrayName extends AbstractName {
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
        this.assertStringArrayNameInvariants();
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);
        return this.components[i];
    }

    setComponent(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidIndex(i);


        const resultComponents = [...this.components];
        resultComponents[i] = c;
        const result = new StringArrayName(resultComponents, this.delimiter);

        MethodFailedException.assert(
            result.components[i] === c,
            `component at index ${i} was not set correctly`
        );
        result.assertStringArrayNameInvariants();

        return result;
    }

    insert(i: number, c: string): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');
        this.assertValidInsertIndex(i);

        const initialCount = this.getNoComponents();
        const resultComponents = [...this.components];
        resultComponents.splice(i, 0, c);
        const result = new StringArrayName(resultComponents, this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === initialCount + 1,
            'component could not be inserted'
        );
        result.assertStringArrayNameInvariants();

        return result;
    }

    append(c: string): Name {
        this.assertIsNotNullOrUndefined(c, 'new component cannot be null or undefined');

        
        const initialCount = this.getNoComponents();
        const resultComponents = [...this.components];
        resultComponents.push(c);
        const result = new StringArrayName(resultComponents, this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === initialCount + 1,
            'component could not be appended'
        );
        result.assertStringArrayNameInvariants();

        return result;
    }

    remove(i: number): Name {
        this.assertIsNotNullOrUndefined(i, 'component number cannot be null or undefined');
        this.assertValidIndex(i);

        const initialCount = this.getNoComponents();
        const resultComponents = [...this.components];
        resultComponents.splice(i, 1);
        const result = new StringArrayName(resultComponents, this.delimiter);

        MethodFailedException.assert(
            result.getNoComponents() === initialCount - 1,
            'component could not be removed'
        );
        result.assertStringArrayNameInvariants();

        return result;
    }

    getComponents(): string[] {
        return [...this.components];
    }

    protected assertStringArrayNameInvariants(): void {
        InvalidStateException.assert(
            this.components !== null && this.components !== undefined,
            "name cannot be null or undefined"
        );

        this.components.forEach((c, i) => {
            InvalidStateException.assert(
                c !== null && c !== undefined,
                `component at index ${i} cannot be null or undefined.`
            );
        });
    }

    protected assertValidIndex(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error(`Index ${i} out of bounds for length ${this.components.length}`);
        }
    }

    protected assertValidInsertIndex(i: number): void {
        if (i < 0 || i > this.components.length) {
            throw new Error(`Insert index ${i} out of bounds for length ${this.components.length}`);
        }
    }
}
