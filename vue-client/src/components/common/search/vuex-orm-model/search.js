import { Model } from "@vuex-orm/core";

export default class Search extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = "search";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      uuid: this.attr(null),
      componentUUID: this.attr(null),
      searchText: this.attr(null),
      action: this.attr(null),
    };
  }
}
