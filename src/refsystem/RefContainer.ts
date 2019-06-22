import Ref from "./Ref";

export default class RefContainer {
  [prop: string]: any;

  private _has: Boolean = true;

  /**
   * Create new RefContainer, either empty container or extract PassedRef from some object in form {refname: PassedRef,...} (can contains anything more other than Ref, it will only extract parameter that are refs)
   *
   * Often use without *input* argument
   *
   * OR *input* argument = **params**
   *
   * @param input often; **params**; anything that contains {refname: PassedRef,...} (can contains anything more other than Ref, it will only extract parameter that are refs)
   */
  constructor(input?: any) {
    if (input) {
      try {
        for (var key in input) {
          if (input[key] instanceof Ref) {
            this[key] = input[key];
          }
        }
      } catch (err) {
        console.error("Cannot build RefContainer: ", err);
      }

      if (input.__chomtana_ref_not_has) {
        this._has = false;
      }
    }
  }

  public has(...musthave): Boolean {
    for (var key of musthave) {
      if (typeof this[key] === "undefined") {
        return false;
      }
    }

    return this._has;
  }
}
