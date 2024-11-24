import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter != null && delimiter != undefined){
            this.delimiter = delimiter;
        }
    }

    protected doGetComponents(): string[] {
        return this.components;
    }

    protected doSetComponent(i: number, other: string): void {
        this.components[i] = other;
    }

    protected doSetAllComponents(other: string[]): void {
        this.components = other;
    }

    protected doGetDelimiter(): string {
        return this.delimiter;
    }

    public getComponents(): string[] {
        return this.doGetComponents();
    }

    public setAllComponents(other: string[]): void {
        this.doSetAllComponents(other);
    }

    public getDelimiter(): string {
        return this.doGetDelimiter();
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.getComponents().join(delimiter);
    }

    public asDataString(): string {
        return this.asString().replace(this.getDelimiter(), ESCAPE_CHARACTER + this.delimiter);
    }

    public isEmpty(): boolean {
        return this.getComponents().length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.getDelimiter();
    }

    public getNoComponents(): number {
        return this.getComponents().length;
    }

    public getComponent(i: number): string {
        if (i <= this.getNoComponents()){
            return this.getComponents()[i];
        }
        else {
            throw new Error("Index out of range");
        }
    }

    public setComponent(i: number, c: string): void {
        if (i <= this.getNoComponents()){
            this.doSetComponent(i, c);
        }
        else {
            throw new Error("Index out of range");
        }
    }

    public insert(i: number, c: string): void {
        if (i <= this.getNoComponents()){
            this.setAllComponents(this.getComponents().slice(0, i).concat([c], this.components.slice(i)));
        }
        else {
            throw new Error("Index out of range");
        }
    }

    public append(c: string): void {
        let components: string[] = this.getComponents();
        components.push(c);
        this.setAllComponents(components);
    }

    public remove(i: number): void {
        if (i <= this.getNoComponents()){
            let components: string[] = this.getComponents();
            components.splice(i, 1);
            this.setAllComponents(components);
        }
        else {
            throw new Error("Index out of range");
        }
    }

    public concat(other: Name): void {
        let otherArray: string[] = other.asString(".").split(".");
        let components: string [] = this.getComponents();
        this.setAllComponents(components.concat(otherArray));
    }

}