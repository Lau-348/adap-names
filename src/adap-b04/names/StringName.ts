import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailureException } from "../common/MethodFailureException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string, delimiter?: string) {
        super();
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

        const components = this.name.split(this.delimiter);
        components[i] = c;
        this.name = components.join(this.delimiter);

        this.assertSetComponent(i, c);
        this.assertClassInvariants();
    }

    protected doSetAllComponents(components: string[]): void {
        this.assertIsNotNullOrUndefined(components, "Components");
        components.forEach((c, index) => this.assertValidComponent(c, index));
        this.name = components.join(this.delimiter);

        this.assertSetAllComponents(components);
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
        this.assertValidComponent(component, i);

        return component;
    }

    setComponent(i: number, c: string): void {
        this.doSetComponent(i, c);
    }

    insert(i: number, c: string): void {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIsNotNullOrUndefined(c, "Component");
        this.assertIndexInBound(i);

        const components = this.doGetComponents();
        components.splice(i, 0, c);
        this.doSetAllComponents(components);

        this.assertInsert(i, c);
        this.assertClassInvariants();
    }

    append(c: string): void {
        this.assertIsNotNullOrUndefined(c, "Component");

        const components = this.doGetComponents();
        components.push(c);
        this.doSetAllComponents(components);

        this.assertAppend(c);
        this.assertClassInvariants();
    }

    remove(i: number): void {
        this.assertIsNotNullOrUndefined(i, "Index");
        this.assertIndexInBound(i);

        const components = this.doGetComponents();
        const removed = components.splice(i, 1)[0];
        this.doSetAllComponents(components);

        this.assertRemove(i, removed);
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

    protected assertSetComponent(i: number, c: string): void {
        const condition = this.getComponent(i) === c;
        MethodFailureException.assertCondition(condition, "Component could not properly be set");
    }

    protected assertSetAllComponents(components: string[]): void {
        const current_components = this.doGetComponents();
        const condition = current_components === components;
        MethodFailureException.assertCondition(condition, "All components could not properly be set");
    }

    protected assertInsert(i: number, c: string): void {
        const condition = this.getComponent(i) === c;
        MethodFailureException.assertCondition(condition, "Component could not properly be inserted");
    }

    protected assertAppend(c: string): void {
        const lastIndex = this.getNoComponents() - 1;
        const condition = this.getComponent(lastIndex) === c;
        MethodFailureException.assertCondition(condition, "Component could not properly be appended");
    }

    protected assertRemove(i: number, removed: string): void {
        const condition = this.doGetComponents().indexOf(removed) === -1;
        MethodFailureException.assertCondition(condition, "Component could not properly be removed");
    }
}
