import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

/**
 * StringArrayName implementation that stores components in an array.
 * This is a value object - all operations return new instances.
 */
export class StringArrayName extends AbstractName {
    private readonly components: string[];

    constructor(components: string[], delimiter?: string) {
        super(delimiter);
        this.assertIsNotNullOrUndefined(components, "Components");
        this.components = [...components]; // Create defensive copy
        this.assertClassInvariants();
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIndexInBound(i);
        return this.components[i];
    }

    protected doInsert(i: number, c: string): Name {
        const newComponents = [...this.components];
        newComponents.splice(i, 0, c);
        return new StringArrayName(newComponents, this.delimiter);
    }

    protected doRemove(i: number): Name {
        const newComponents = [...this.components];
        newComponents.splice(i, 1);
        return new StringArrayName(newComponents, this.delimiter);
    }

    protected doClone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }
}
