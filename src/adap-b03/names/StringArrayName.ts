import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        this.components = other;
    }

    protected doSetComponent(i: number, other: string): void {
        this.components[i] = other;
    }

    protected doSetAllComponents(other: string[]): void {
        this.components = other;
    }

    protected doGetComponents(): string[] {
        return this.components;
    }

    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        return this.components[i];
    }
    setComponent(i: number, c: string) {
        if (i <= this.getNoComponents()){
            this.doSetComponent(i, c);
        }
        else {
            throw new Error("Index out of range");
        }
    }

    insert(i: number, c: string) {
        if (i <= this.getNoComponents()){
            this.doSetAllComponents(this.doGetComponents().slice(0, i).concat([c], this.components.slice(i)));
        }
        else {
            throw new Error("Index out of range");
        }
    }
    append(c: string) {
        let components: string[] = this.doGetComponents();
        components.push(c);
        this.doSetAllComponents(components);
    }
    remove(i: number) {
        if (i <= this.getNoComponents()){
            let components: string[] = this.doGetComponents();
            components.splice(i, 1);
            this.doSetAllComponents(components);
        }
        else {
            throw new Error("Index out of range");
        }
    }
}