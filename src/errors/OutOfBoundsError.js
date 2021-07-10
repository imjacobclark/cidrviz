export default class OutOfBoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "OutOfBoundError";
    }
}