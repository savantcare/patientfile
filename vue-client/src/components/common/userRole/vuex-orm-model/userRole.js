import { Model } from "@vuex-orm/core";

export default class UserRole extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = "userRole";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      uuid: this.attr(null),
      name: this.attr(null),
    };
  }
}
