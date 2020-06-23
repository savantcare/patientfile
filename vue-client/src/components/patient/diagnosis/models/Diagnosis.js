import { Model } from "@vuex-orm/core";

export default class Diagnosis extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = "diagnosis";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      uuid: this.attr(null),
      rowStart: this.attr(""),
      rowEnd: this.attr(""),
      diagnosis: this.attr({}),
      assessment: this.attr([])
    };
  }
}
