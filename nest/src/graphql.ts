
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Cat {
    id: string;
    name: string;
    age: number;
}

export abstract class IQuery {
    abstract getAllCats(): Cat[] | Promise<Cat[]>;

    abstract getOneCat(id: string): Cat | Promise<Cat>;
}

export abstract class IMutation {
    abstract createCat(id: string, name: string, age: number): Cat | Promise<Cat>;

    abstract updateCat(id: string, name: string, age: number): Cat | Promise<Cat>;
}
