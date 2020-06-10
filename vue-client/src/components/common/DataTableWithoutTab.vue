<template>
  <div v-elresize @elresize="handleResize">
   <!-- Ref: https://github.com/WakuwakuP/element-ui-el-table-draggable#animate -->
    <el-table-draggable>
      <el-table
        ref="dataTable"
        :data="tabData.tableData"
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
              v-for="(column, index_expand_row) in tabData.columns"
              :key="`tab-expand-row-${index_expand_row}`"
            >{{column.label}}: {{scope.row[column.field]}}</p>
            <div>
              <el-button
                size="mini"
                v-if="tabData.rowActions.indexOf('C') > -1"
                @click="handleClickOnCInDataRow(scope.row)"
              >Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="tabData.rowActions.indexOf('D') > -1"
                @click="handleClickOnDInDataRow(scope.row)"
              >Discontinue</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="selection"></el-table-column>

        <el-table-column
          v-for="(column, index_column) in getSelectedColumns(getColumns(tabData.tableData))"
          :key="`tab-column-${index_column}`"
          :label="column.label "
          :property="column.field"
          :sortable="column.sortable"
        ></el-table-column>
        <el-table-column>
          <template
            slot-scope="scope"
          >
            <el-button
              type="text"
              size="mini"
              v-if="tabData.rowActions.indexOf('C') > -1"
              @click="handleClickOnCInDataRow(scope.row)"
            >C</el-button>
            <el-button
              type="text"
              size="mini"
              v-if="tabData.rowActions.indexOf('D') > -1"
              @click="handleClickOnDInDataRow(scope.row)"
            >D</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-table-draggable>
  </div>
</template>

<script>
import ElTableDraggable from "element-ui-el-table-draggable"; // This allows rows to be dragged up or down
export default {
  props: ["tabData", "title", "selectedColumns", "type"],
  components: { ElTableDraggable },
  data() {
    return {
      mouseOverRowId: "",
      isExpandable: false,
      width: 0,
      showActionColumn: false,
      columns: [],
      options: [
        {
          value: "Option1",
          label: "Option1"
        },
        {
          value: "Option2",
          label: "Option2"
        },
        {
          value: "Option3",
          label: "Option3"
        },
        {
          value: "Option4",
          label: "Option4"
        },
        {
          value: "Option5",
          label: "Option5"
        }
      ]
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleClickOnCInDataRow(row) {
      this.$emit("handleClickOnCInDataRow", row);
    },
    handleClickOnDInDataRow(row) {
      this.$emit("handleClickOnDInDataRow", row);
    },
    handleCellMouseEnter(row) {
      this.mouseOverRowId = row.id;
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
        this.focusRow == `${this.title}-${rowIndex + 1}` &&
        this.type == "CurrentStateDisplayArea"
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
      return this.$store.getters.CurrentStateDisplayAreaFocusRow;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>