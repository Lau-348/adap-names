import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

/**
 * StringName implementation that stores components in a single string
 * separated by the delimiter character.
 * This is a value object - all operations return new instances.
 */
export class StringName extends AbstractName {
    private readonly name: string;

    constructor(name: string, delimiter?: string) {
        super(delimiter);
        this.assertIsNotNullOrUndefined(name, "Name");
        this.name = name;
        this.assertClassInvariants();
    }

    public getNoComponents(): number {
        return this.doGetComponents().length;
    }

    public getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIndexInBound(i);
        return this.doGetComponents()[i];
    }

    protected doInsert(i: number, c: string): Name {
        const components = this.doGetComponents();
        components.splice(i, 0, c);
        return new StringName(components.join(this.delimiter), this.delimiter);
    }

    protected doRemove(i: number): Name {
        const components = this.doGetComponents();
        components.splice(i, 1);
        return new StringName(components.join(this.delimiter), this.delimiter);
    }

    protected doClone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    private doGetComponents(): string[] {
        return this.name.split(this.delimiter);
    }
}
