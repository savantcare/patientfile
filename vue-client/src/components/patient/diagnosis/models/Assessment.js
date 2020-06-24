import { Model } from "@vuex-orm/core";

export default class Assessment extends Model {
  static entity = 'assessments'
  static fields() {
    return {
      slNo: this.attr(null),
      uuid: this.attr(null),
      text: this.attr(''),
      dx_id: this.attr(null),
      //rowStart: this.attr(""),
      //rowEnd: this.attr("")
    }
  }
}