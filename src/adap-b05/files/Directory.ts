import { Node } from "./Node";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public findNodes(bn: string): Set<Node> {
        let set: Set<Node> = new Set(super.findNodes(bn));

        for (const child of this.childNodes) 
        {
            const childNodes = child.findNodes(bn);
            childNodes.forEach(node => set.add(node));
        }

        return set;

    }

}