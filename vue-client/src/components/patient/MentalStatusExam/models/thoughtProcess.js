import { Model } from "@vuex-orm/core";

export default class ThoughtProcess extends Model {
  static entity = "thoughtProcess";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      patientUUID: this.attr(null),
      'linear-logical-and-goal-directed': this.attr(''),
      'disorganized': this.attr(''),
      'circumstantial': this.attr(''),
      'tangential': this.attr(''),
      'looseness-of-associations': this.attr(''),
      'flight-of-ideas': this.attr(''),
      'poverty-of-thought': this.attr(''),

      others: this.attr(''),
      timeOfEvaluation: this.attr(''),
      recordChangedByUUID: this.attr(null),
      recordChangedFromIPAddress: this.attr(null),
      // Why store time as a number? Since vuex-orm does not understand dates.
      // The data types that vuex-orm understands are given at: https://vuex-orm.org/guide/model/defining-models.html#generic-type
      ROW_START: this.number(0),
      ROW_END: this.number(0),
    };
  }
}
