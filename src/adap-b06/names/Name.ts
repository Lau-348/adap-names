import { Equality } from "../common/Equality";
import { Cloneable } from "../common/Cloneable";
import { Printable } from "../common/Printable";

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * This is a value object, meaning:
 * 1. It is immutable - all operations return new instances
 * 2. It has value equality - two names are equal if they have the same components and delimiter
 * 3. It maintains the hashCode contract - equal objects have equal hash codes
 */
export interface Name extends Equality, Cloneable, Printable {
    /**
     * Returns number of components in Name instance
     */
    getNoComponents(): number;

    /**
     * Returns component at index i
     */
    getComponent(i: number): string;

    /**
     * Returns a new Name with component c inserted at index i
     */
    insert(i: number, c: string): Name;

    /**
     * Returns a new Name with component c appended at the end
     */
    append(c: string): Name;

    /**
     * Returns a new Name with component at index i removed
     */
    remove(i: number): Name;

    /**
     * Returns a new Name with all components from other concatenated to this
     */
    concat(other: Name): Name;

    /**
     * Returns true if number of components == 0; else false
     */
    isEmpty(): boolean;

    getComponents(): string[];

}
