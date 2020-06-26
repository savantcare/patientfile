import { Model } from "@vuex-orm/core";

export default class Affect extends Model {
  static entity = "affect";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      patientUUID: this.attr(null),
      'euthymic': this.attr(''),
      'dysphoric': this.attr(''),
      'irritable': this.attr(''),
      'angry': this.attr(''),
      'bright': this.attr(''),
      'euphoric': this.attr(''),
      'labile': this.attr(''),
      'stable': this.attr(''),
      'mood-congruent': this.attr(''),
      'mood-incongruent': this.attr(''),
      'expansive': this.attr(''),
      'full-range': this.attr(''),
      'constricted': this.attr(''),
      'blunted': this.attr(''),
      'flat': this.attr(''),
      'anxious': this.attr(''),
      'tearful': this.attr(''),
      'dysthymic': this.attr(''),

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
