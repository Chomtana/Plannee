export default class ExtensibleFunction extends Function {
  constructor(f) {
    super();
    return Object.setPrototypeOf(f, new.target.prototype);
  }
}
