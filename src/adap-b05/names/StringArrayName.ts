import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
        this.components = other;
    }

    protected doSetComponent(i: number, other: string): void {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIsNotNullOrUndefined(other, "Other");
        this.assertIndexInBound(i);
        let backup = new StringArrayName(this.components, this.delimiter);

        this.assertValidComponent(other, 0);

        this.components[i] = other;
        this.assertSetComponent(i, other, backup);
        this.assertClassInvariants();
    }

    protected doSetAllComponents(other: string[]): void {
        this.assertIsNotNullOrUndefined(other, "Other names");
        let backup = new StringArrayName(this.components, this.delimiter);
        for(let i = 0; i < other.length; i++){
            this.assertValidComponent(other[i], i);
        }

        this.components = other;
        this.assertSetAllComponents(other, backup);
        this.assertClassInvariants();
    }

    protected doGetComponents(): string[] {
        return this.components;
    }

    getNoComponents(): number {
        let length = this.components.length;
        this.assertIsNotNullOrUndefined(length, "Length");
        return length;
    }

    getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIndexInBound(i);
        let comp = this.components[i];
        this.assertValidComponent(comp, 0);
        return comp;
    }
    setComponent(i: number, c: string) {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIsNotNullOrUndefined(c, "Other");
        this.assertIndexInBound(i);

        this.doSetComponent(i, c);

        this.assertClassInvariants();

    }

    insert(i: number, c: string) {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIsNotNullOrUndefined(c, "Other");
        this.assertIndexInBound(i);
        let backup = new StringArrayName(this.components, this.delimiter);

        this.doSetAllComponents(this.doGetComponents().slice(0, i).concat([c], this.components.slice(i)));
        this.assertSetComponent(i, c, backup);
        this.assertClassInvariants();

    }
    append(c: string) {
        this.assertIsNotNullOrUndefined(c, "Other");
        let backup = new StringArrayName(this.components, this.delimiter);
        let components: string[] = this.doGetComponents();
        components.push(c);
        this.doSetAllComponents(components);
        this.assertSetComponent(this.getNoComponents(), c, backup)
        this.assertClassInvariants();
    }
    remove(i: number) {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIndexInBound(i);
        let backup = new StringArrayName(this.components, this.delimiter);
        let original_comp = this.getComponent(i);

        let components: string[] = this.doGetComponents();
        components.splice(i, 1);
        
        this.doSetAllComponents(components);

        this.assertRemove(i, original_comp, backup)
        this.assertClassInvariants();

    }

    protected assertSetComponent(i: number, c: string, backup: StringArrayName){
        let condition: boolean = this.getComponent(i) === c;
        MethodFailedException.assertCondition(condition, "Component could not properly be set");
    }

    protected assertSetAllComponents(c: string[], backup: StringArrayName){
        let condition: boolean = this.components === c;
        MethodFailedException.assertCondition(condition, "All components could not be properly set");
    }

    protected assertRemove(i : number, original: string, backup: StringArrayName){
        let condition: boolean = this.components[i] !== original;
        MethodFailedException.assertCondition(condition, "Remove method did not properly function");
    }

    protected recover(other: StringArrayName): void {
        this.components = other.components;
        this.delimiter = other.delimiter;
    }
}