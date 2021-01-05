<template>
<div>
    <el-table v-bind='$attrs' v-on='$listeners' :data="data" style="width: 100%">
        <template v-for='(item,index) in column'>
            <!--拓展slot-->
            <template v-if="item.slot && item.slot == 'slot'">
                <el-table-column :key='index' :fixed="item.fixed ? item.fixed : null" :prop="item.key" :label="item.titleName" :width="item.width">
                    <template slot-scope="scope">
                        <!--通过具名插槽传递出去-->
                        <slot :name='item.key' :data='scope.row[item.key]'>
                            <span>
                                {{scope.row[item.key]}}
                            </span>
                        </slot>
                    </template>
                </el-table-column>
            </template>
            <el-table-column v-else :key='index' :prop="item.key" :label="item.titleName" :width="item.width">
            </el-table-column>
        </template>
    </el-table>
</div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            require: true,
            default: () => {
                return []
            }
        },
        column: {
            type: Array,
            require: true,
            default: () => {
                return []
            }
        }
    }
}
</script>

<style scoped>

</style>
