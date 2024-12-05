import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(source: string, delimiter?: string) {
        super();
        throw new Error("needs implementation or deletion");
    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.assertIsNotNullOrUndefined(other, "Other string");
        this.name = other;
        if (delimiter) {
            this.delimiter = delimiter;
        }
        this.assertClassInvariants();
    }

    protected doSetComponent(i: number, c: string): void {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIsNotNullOrUndefined(c, "Component");
        this.assertIndexInBound(i);

        let backup = new StringName(this.name, this.delimiter);

        const components = this.name.split(this.delimiter);
        components[i] = c;
        this.name = components.join(this.delimiter);

        this.assertSetComponent(i, c, backup);
        this.assertClassInvariants();
    }

    protected doSetAllComponents(components: string[]): void {
        this.assertIsNotNullOrUndefined(components, "Components");

        this.name = components.join(this.delimiter);

        this.assertClassInvariants();
    }

    protected doGetComponents(): string[] {
        return this.name.split(this.delimiter);
    }

    getNoComponents(): number {
        const length = this.doGetComponents().length;
        this.assertIsNotNullOrUndefined(length, "Length");
        return length;
    }

    getComponent(i: number): string {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIndexInBound(i);

        const component = this.doGetComponents()[i];

        return component;
    }

    setComponent(i: number, c: string): void {
        this.doSetComponent(i, c);
    }

    insert(i: number, c: string): void {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIsNotNullOrUndefined(c, "Component");
        this.assertIndexInBound(i);
        let backup = new StringName(this.name, this.delimiter);

        const components = this.doGetComponents();
        components.splice(i, 0, c);
        this.doSetAllComponents(components);

        this.assertInsert(i, c, backup);
        this.assertClassInvariants();
    }

    append(c: string): void {
        this.assertIsNotNullOrUndefined(c, "Component");
        let backup = new StringName(this.name, this.delimiter);

        const components = this.doGetComponents();
        components.push(c);
        this.doSetAllComponents(components);

        this.assertAppend(c, backup);
        this.assertClassInvariants();
    }

    remove(i: number): void {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIndexInBound(i);
        let backup = new StringName(this.name, this.delimiter);

        const components = this.doGetComponents();
        const removed = components.splice(i, 1)[0];
        this.doSetAllComponents(components);

        this.assertRemove(i, removed, backup);
        this.assertClassInvariants();
    }

    public getHashCode(): number {
        let randomizer = 22;
        let hash = 0;
    
        for (let i = 0; i < this.name.length; i++) {

            let charCode = this.name.charCodeAt(i);
            hash = randomizer * hash + charCode; 
        }
    
        return hash;
    }

    protected assertSetComponent(i: number, c: string, backup: StringName): void {
        const condition = this.getComponent(i) === c;
        if(!condition){
            this.recover(backup)
        }
        MethodFailedException.assertCondition(condition, "Component could not properly be set");
    }



    protected assertInsert(i: number, c: string, backup: StringName): void {
        const condition = this.getComponent(i) === c;
        if(!condition){
            this.recover(backup)
        }
        MethodFailedException.assertCondition(condition, "Component could not properly be inserted");
    }

    protected assertAppend(c: string, backup: StringName): void {
        const lastIndex = this.getNoComponents() - 1;
        const condition = this.getComponent(lastIndex) === c;
        if(!condition){
            this.recover(backup)
        }
        MethodFailedException.assertCondition(condition, "Component could not properly be appended");
    }

    protected assertRemove(i: number, removed: string, backup: StringName): void {
        const condition = this.doGetComponents().indexOf(removed) === -1;
        if(!condition){
            this.recover(backup)
        }
        MethodFailedException.assertCondition(condition, "Component could not properly be removed");
    }

    protected recover(other: StringName): void {
        this.name = other.name;
        this.delimiter = other.delimiter;
    }
}
