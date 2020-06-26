import { Model } from "@vuex-orm/core";

export default class ThoughtContent extends Model {
  static entity = "thought-content";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      patientUUID: this.attr(null),
      'no-si-intent-or-plan': this.attr(''),
      'no-passive-death-wish': this.attr(''),
      'no-hi-intent-or-plan': this.attr(''),
      'no-delusional-thinking-observed': this.attr(''),
      'no-obsessive-thinking-observed': this.attr(''),
      'ruminations': this.attr(''),
      'si-without-intent-or-plan': this.attr(''),
      'si-as-detailed-below': this.attr(''),
      'hi-as-detailed-below': this.attr(''),
      'delusions': this.attr(''),
      'ior': this.attr(''),
      'obsessions': this.attr(''),
      'passive-death-wish': this.attr(''),

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
