import { Model } from "@vuex-orm/core";

export default class Recommendations extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = "recommendation";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      uuid: this.attr(null),
      recommendation: this.attr({}),
      // Why store time as a numbner? vuex-orm does not understand dates. Hence need to store as number. The data types that vuex-orm understands are given at: https://vuex-orm.org/guide/model/defining-models.html#generic-type
      rowStart: this.number(0),
      rowEnd: this.number(0),
    };
  }
}
