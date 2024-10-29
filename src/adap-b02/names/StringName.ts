import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        if(delimiter != undefined && delimiter != null)
        {
            this.delimiter = delimiter;
        }
        this.name = other;
    }

    protected doGetName(): string {
        return this.name;
    }

    protected doSetName(other: string): void {
        this.name = other;
    }

    protected doGetDelimiter(): string {
        return this.delimiter;
    }

    public getName(): string {
        return this.doGetName();
    }

    public setName(other: string): void {
        this.doSetName(other);
    }

    public getDelimiter(): string {
        return this.doGetDelimiter();
    }

    public asString(delimiter: string = this.delimiter): string {
        let components = this.getAllComponents();
        return components.join(delimiter); 
    }

    public asDataString(): string {
        return this.getName().replace(this.getDelimiter(), ESCAPE_CHARACTER + this.delimiter);
    }

    public isEmpty(): boolean {
        return this.getName().length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.getDelimiter();
    }

    public getNoComponents(): number {
        if (!this.isEmpty()){
            return this.getName().split(this.getDelimiter()).length;
        }
        else{
            return 0;
        }      
    }

    public getAllComponents(): string[] {
        return this.getName().split(this.getDelimiter());
    }

    public getComponent(x: number): string {
        if (!this.isEmpty()){
            return this.getAllComponents()[x];
        }
        else{
            throw new Error("Name String is empty!");
        }    
    }

    public setComponent(n: number, c: string): void {
        let components = this.getAllComponents()
        if (components.length >= n){
            components[n] = c;
            this.setName(components.join(this.getDelimiter()));
        }
        else{
            throw new Error("Index out of bound!");
        }
    }

    public insert(n: number, c: string): void {
        let components = this.getAllComponents()
        if (components.length >= n){
            components = components.slice(0, n).concat([c], components.slice(n));
            this.setName(components.join(this.getDelimiter()));
        }
        else{
            throw new Error("Index out of bound!");
        }
    }

    public append(c: string): void {
        this.setName(this.getName() + this.getDelimiter() + c);
    }

    public remove(n: number): void {
        let components = this.getAllComponents();
        components.splice(n, 1);
        this.setName(components.join(this.getDelimiter()));
    }

    public concat(other: Name): void {
        let concat_name = this.getName() + this.getDelimiter() + other.asString();
        this.setName(concat_name);
    }

}