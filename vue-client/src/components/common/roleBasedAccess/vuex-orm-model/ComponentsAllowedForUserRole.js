import { Model } from "@vuex-orm/core";

export default class ComponentsAllowedForUserRole extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = "ComponentsAllowedForUserRole";

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
        return {
            uuid: this.attr(null),
            roleUUID: this.attr(null),
            componentUUID: this.attr(null),
            multiStateDisplayAreaImportance: this.attr(null),
            currentStateDisplayAreaImportance: this.attr(null)
        };
    }
}