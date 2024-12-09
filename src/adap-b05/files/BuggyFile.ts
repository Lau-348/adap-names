import { File } from "./File";
import { Directory } from "./Directory";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { InvalidStateException } from "../common/InvalidStateException";

export class BuggyFile extends File {

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    /**
     * Fault injection for homework - simulates a service failure
     * @returns base name, but throws ServiceFailureException
     */
    protected doGetBaseName(): string {
        this.baseName = "";
        return super.doGetBaseName();
    }

}
