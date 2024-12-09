
import { Exception } from "../common/Exception";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        const result = new Set<Node>();
        try {
          if (this.getBaseName() === bn) {
            result.add(this); // Add this node if it matches
          }
    
          this.assertClassInvariants();
        } catch (er: any) {
          let ex: Exception = er as Exception;
          let tx: Exception = ex.hasTrigger() ?ex.getTrigger() :ex;
          throw new ServiceFailureException("Service failed", tx as Exception);
        }
        return result;
      }

      protected assertIsValidBaseName(bn: string, et: Exception): void {
        const condition: boolean = (bn != "");
        InvalidStateException.assert(condition, "invalid base name");
      }
      
      protected assertClassInvariants(): void {
        const bn: string = this.doGetBaseName();
        this.assertIsValidBaseName(bn, new InvalidStateException("Invalid base name"));
      }
}
