import { Model } from "@vuex-orm/core";

export default class Appearences extends Model {
  static entity = "appearence";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      patientUUID: this.attr(null),
      'good-grooming-and-hygiene': this.attr(''),
      'no-apparent-distress': this.attr(''),
      'well-developed-well-nourished': this.attr(''),
      'appears-stated-age': this.attr(''),
      'appears-younger-then-stated-age': this.attr(''),
      'appears-older-then-stated-age': this.attr(''),
      'obese': this.attr(''),
      'thin-or-cachetic': this.attr(''),
      'disheveled-unkempt': this.attr(''),
      malodorus: this.attr(''),
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
