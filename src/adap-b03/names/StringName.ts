import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super();
        this.name = other;
        this.length = other.length;
    }

    getNoComponents(): number {
        return this.name.split(this.delimiter).length;
    }

    getComponent(i: number): string {
        return this.name.split(this.delimiter)[i];
    }
    setComponent(i: number, c: string) {
        const components = this.name.split(this.delimiter);
        if(components.length >= i){
            components[i] = c;
            this.name = components.join(this.delimiter);
            this.length = this.name.length;
        }
        else{
            throw new Error("Index out of bound!");
        }
    }

    insert(i: number, c: string) {
        const components = this.name.split(this.delimiter);
        if(components.length >= i){
            components.splice(i, 0, c);
            this.name = components.join(this.delimiter);
            this.length = this.name.length;
        }
        else{
            throw new Error("Index out of bound!");
        }
    }
    append(c: string) {
        this.name += this.delimiter + c;
        this.length = this.name.length;
    }
    remove(i: number) {
        const components = this.name.split(this.delimiter);
        if(components.length >= i){
            components.splice(i, 1);
            this.name = components.join(this.delimiter);
            this.length = this.name.length;
        }
        else{
            throw new Error("Index out of bound!");
        }
    }
}