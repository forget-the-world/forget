<template>
<FormItem v-bind='$attrs' v-on='$listeners' v-if="grid.type == 'iview'" :label="label+colon" :style='style'>
    <slot></slot>
</FormItem>
<el-form-item v-bind='$attrs' v-on='$listeners' :label="label+colon" v-else-if="grid.type == 'element'" :style='style'>
    <slot></slot>
</el-form-item>
</template>

<script>
export default {
    inject: ['grid'],
    props: {
        column: {
            type: [String, Number],
            default: 1
        },
        label: [String]
    },
    created() {
        // console.log(this.grid, '9987')
    },
    computed: {
        style() {
            return {
                // 设置单元格的状态，span代表合状态，第二个参数代表合并几等份
                'grid-column-end': `span ${this.column}`
            }
        },
        //配置冒号
        colon() {
            if (this.grid.colon) {
                // 判断国际化
                return this.$i18n.locale == 'en' ? ':' : '：'
            } else {
                return ""
            }
        }
    }
}
</script>

<style scoped>

</style>
