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
        try {
            this.baseName = ""; // This invalidates the state
            throw new InvalidStateException("Invalid file state: empty base name");
        } catch (error) {
            throw new ServiceFailureException("File service failed", error as Error);
        }
    }

}
