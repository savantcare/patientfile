import { Model } from "@vuex-orm/core";

export default class WaistCircumference extends Model {
  static entity = "waist-circumference";

  static fields() {
    return {
      patientUUID: this.attr(null),
      waistCircumferenceInInches: this.attr(0),
      timeOfEvaluation: this.attr(''),
      Notes: this.attr(''),
      recordChangedByUUID: this.attr(null),
      recordChangedFromIPAddress: this.attr(null),
      ROW_START: this.number(0),
      ROW_END: this.number(0),
    };
  }
}
