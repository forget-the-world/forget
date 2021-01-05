<template>
<div>
    <el-form ref='form' v-bind='$attrs' v-if="type== 'element'" v-on='$listeners' :label-width="labelWidth" :label-position='labelPosition' class='grid' :style='style'>
        <slot>
        </slot>
    </el-form>
    <!-- iview布局-->
    <Form ref='form' v-bind='$attrs' v-else-if="type== 'iview'" v-on='$listeners' :label-width="labelWidth" :label-position='labelPosition' class='grid' :style='style'>
        <slot>
        </slot>
    </Form>
</div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'iview',
            validator: function (value) {
                // 类型必须是iview或者element
                return ['element', 'iview'].includes(value)
            }
        },
        colon: {
            type: Boolean,
            default: false
        },
        // 列间距
        columnGap: {
            type: [Number, String],
            default: 30
        },
        // 行间距
        rowGap: {
            type: [Number, String],
            default: 10
        },
        column: {
            type: [Number, String],
            default: 2
        },
        // 表单域标签的宽度
        labelWidth: {
            type: [String]
        },
        // 表单域标签的位置，支持left，top，right
        labelPosition: {
            type: [String, Number],
            default: null
        }
    },
    provide() {
        return {
            grid: this
        }
    },
    computed: {
        style() {
            return {
                // 设置的列的状态，可以根据this.column设置当前行有几列,fr是等份，代表可用剩余宽度的分配
                'grid-template-columns': `repeat(${this.column},1fr)`,
                // 列间距
                'column-gap': this.columnGap + 'px',
                'row-gap': this.rowGap + 'px'
            }
        }
    },
    methods: {
        // 如果没有通过校验的表单元素，自动视图显示这个部分
        validate(callback) {
            // 校验表单
            this.$refs.form.validate(callback)
            let ElementError = document.getElementsByClassName('is-error')
            let iViewError = document.getElementsByClassName("ivu-form-item-error")
            //  this.$nextTick指的是下一个周期执行
            this.$nextTick(() => {
                if (ElementError.length > 0) {
                    ElementError[0].scrollIntoView({
                        block: 'center'
                    })
                }
                if (iViewError.length > 0) {
                    iViewError[0].scrollIntoView({
                        block: 'center'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.grid {
    display: grid;
    /*设置的是当当前row的状态*/
    grid-template-rows: 1fr;
}
</style>
