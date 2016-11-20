/**
 * @constant NONE
 * @type {Number}
 */
export const NONE = 0;

/**
 * @constant CREATE
 * @type {Number}
 */
export const CREATE = 1;

/**
 * @constant EDIT
 * @type {Number}
 */
export const EDIT = 2;

/**
 * @constant DELETE
 * @type {Number}
 */
export const DELETE = 4;

/**
 * @constant APPEND
 * @type {Number}
 */
export const APPEND = 8;

/**
 * @constant EDIT_APPEND
 * @type {Number}
 */
export const EDIT_APPEND = EDIT | APPEND;

/**
 * @constant ALL
 * @type {number}
 */
export const ALL = CREATE | EDIT | DELETE | APPEND;
