<template>
  <el-dialog :visible.sync="dialogVisible" width="80%">
    <el-tabs type="card">
      <!--Start Take a screen-->
      <el-tab-pane>
        <span slot="label" style="font-size:22px">Take PHQ9 screen</span>
        <TakeAScreenTab />
      </el-tab-pane>
      <!--End Take a screen-->

      <!--Start Take a screen-->
      <el-tab-pane>
        <span slot="label" style="font-size:22px">Add a screen</span>
        <AddScreenTab />
      </el-tab-pane>
      <!--End Multi Add screening-->
    </el-tabs>
  </el-dialog>
</template>
<script>
import AddScreenTab from "@/components/patient/Screening/Layer2/AddScreen";
import TakeAScreenTab from "@/components/patient/Screening/Layer2/TakeAScreen";
export default {
  components: {
    AddScreenTab,
    TakeAScreenTab
  },
  data() {
    return {
      dialogVisible: true
    };
  },
  methods: {}
};
</script>