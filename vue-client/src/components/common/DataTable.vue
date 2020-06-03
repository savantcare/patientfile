<template>
  <div v-elresize @elresize="handleResize">
    <el-tabs type="card">
      <el-tab-pane v-for="(tab, index) in tabData" :key="`tab-${index}`" :label="tab.label">
        <!-- Ref: https://github.com/WakuwakuP/element-ui-el-table-draggable#animate -->
        <el-table-draggable>
          <el-table
            ref="dataTable"
            :data="tab.tableData"
            @selection-change="handleSelectionChange"
            @cell-mouse-enter="handleCellMouseEnter"
            @cell-mouse-leave="handleCellMouseLeave"
            :row-class-name="tableRowClassName"
            size="mini"
          >
            <el-table-column type="expand" v-if="isExpandable">
              <!-- <template slot-scope="props"> -->
              <template slot-scope="scope">
                <p
                  v-for="(column, index_expand_row) in tab.columns"
                  :key="`tab-expand-row-${index_expand_row}`"
                >{{column.label}}: {{scope.row[column.field]}}</p>
                <div>
                  <el-button
                    size="mini"
                    v-if="tab.rowActions.indexOf('C') > -1"
                    @click="handleChange(scope.$index, scope.row)"
                  >Change</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    v-if="tab.rowActions.indexOf('D') > -1"
                    @click="handleDiscontinue(scope.$index, scope.row)"
                  >Discontinue</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column type="selection"></el-table-column>

            <el-table-column
              v-for="(column, index_column) in getSelectedColumns(getColumns(tab.tableData))"
              :key="`tab-${index}-column-${index_column}`"
              :label="column.label "
              :property="column.field"
              :sortable="column.sortable"
            ></el-table-column>
            <el-table-column>
              <template
                slot-scope="scope"
                v-if="scope.row.uuid == mouseOverRowId || (`${keyId}-${scope.$index+1}` == focusRow && type == 'StateAtCurrentTime')"
              >
                <el-button
                  type="text"
                  size="mini"
                  v-if="tab.rowActions.indexOf('C') > -1"
                  @click="handleChange(scope.$index, scope.row)"
                >C</el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-if="tab.rowActions.indexOf('D') > -1"
                  @click="handleDiscontinue(scope.$index, scope.row)"
                >D</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-table-draggable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ElTableDraggable from "element-ui-el-table-draggable"; // This allows rows to be dragged up or down
export default {
  props: ["tabData", "title", "type", "keyId"],
  components: { ElTableDraggable },
  data() {
    return {
      mouseOverRowId: "",
      isExpandable: false,
      width: 0,
      showActionColumn: false,
      columns: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleChange(index, row) {
      this.$emit("handleChange", row);
    },
    handleDiscontinue(index, row) {
      this.$emit("handleDiscontinue", row);
    },
    handleCellMouseEnter(row) {
      this.mouseOverRowId = row.uuid;
    },
    handleCellMouseLeave() {
      this.mouseOverRowId = "";
    },
    handleResize(data) {
      this.width = data.target.clientWidth;
      if (this.width < 380) {
        this.isExpandable = true;
      } else {
        this.isExpandable = false;
      }
    },
    getSelectedColumns(columns) {
      if (this.selectedColumns) {
        return columns.filter(column => {
          let result = false;
          this.selectedColumns.forEach(selColumn => {
            if (column.field == selColumn) {
              result = true;
            }
          });
          if (result) {
            return column;
          }
        });
      }
    },
    tableRowClassName({ rowIndex }) {
      if (
        this.focusRow == `${this.keyId}-${rowIndex + 1}` &&
        this.type == "StateAtCurrentTime"
      ) {
        return "focus-row";
      }
    },
    getColumns(tableData) {
      let columns = [];
      if (tableData.length > 0) {
        const item = tableData[0];
        Object.keys(item).forEach(key => {
          columns.push({
            field: key,
            label: key
          });
        });
      }

      this.$emit("handleUpdateColumns", columns);
      return columns;
    }
  },
  mounted() {},
  computed: {
    focusRow() {
      return this.$store.getters.StateAtCurrentTimeFocusRow;
    },
    selectedColumns() {
      return this.$store.state.selectedColumns[this.keyId];
    }
  },
  watch: {
    tabData() {
      console.log(this.tabData);
    }
  }
};
</script>

<style lang="scss" >
.el-table .focus-row {
  background: oldlace;
}
</style>