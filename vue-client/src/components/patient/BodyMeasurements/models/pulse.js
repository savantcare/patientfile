import { Model } from "@vuex-orm/core";

export default class Pulse extends Model {
  static entity = "pulse";

  static fields() {
    return {
      patientUUID: this.attr(null),
      beatsPerMinuteValue: this.attr(0),
      timeOfEvaluation: this.attr(''),
      Notes: this.attr(''),
      recordChangedByUUID: this.attr(null),
      recordChangedFromIPAddress: this.attr(null),
      ROW_START: this.number(0),
      ROW_END: this.number(0),
    };
  }
}
