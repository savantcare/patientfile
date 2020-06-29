import { Model } from "@vuex-orm/core";

export default class Weight extends Model {
  static entity = "weight";

  static fields() {
    return {
      patientUUID: this.attr(null),
      systolicValue: this.attr(0),
      diastolicValue: this.attr(0),
      timeOfEvaluation: this.attr(''),
      Notes: this.attr(''),
      recordChangedByUUID: this.attr(null),
      recordChangedFromIPAddress: this.attr(null),
      ROW_START: this.number(0),
      ROW_END: this.number(0),
    };
  }
}
