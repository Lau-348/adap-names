export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    //@initialization-method
    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if (delimiter != null && delimiter != undefined){
            this.delimiter = delimiter;
        }
    }

    //@conversion-method
    public asNameString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    //@get-method
    public getComponent(i: number): string {
        return this.components[i];
    }

    //@set-method
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    //@get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    //@command-method
    public insert(i: number, c: string): void {
        this.components = this.components.slice(0, i).concat([c], this.components.slice(i));
    }

    //@command-method
    public append(c: string): void {
        this.components.push(c);
    }

    //@command-method
    public remove(i: number): void {
        this.components.splice(i, 1);
    }

}