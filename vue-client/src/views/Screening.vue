<template>
  <el-dialog :visible.sync="dialogVisible" width="80%">
    <el-tabs type="card">
      <!--Start Take a screen-->
      <el-tab-pane>
        <span slot="label" style="font-size:22px">Take a screen</span>
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
import AddScreenTab from "@/components/composition-layer2/screening/AddScreen";
import TakeAScreenTab from "@/components/composition-layer2/screening/TakeAScreen";
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