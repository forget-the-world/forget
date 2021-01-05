// 处理数据的方法
import LinkEnum from './methodsData'
// 引入国际化
import i18n from '@/lang/index.js'
console.log(i18n);
/*
key   对应table表格的prop，也就是后端的返回字段
titleName 列表显示的名称（可拓展国际化）
title 是我们自己维护的为了方便我们查找字段
width 列表的宽度
*/

const id = {
    key: 'id',
    title: 'id',
    titleName: 'id',
    width: '160'
}
const qcxl = {
    key: 'car_series',
    title: '汽车系列',
    titleName: '汽车系列',
    width: '160'
}
const bsx = {
    key: 'car_gear_box',
    title: '变速箱',
    titleName: '变速箱',
    width: '160'
}

const cs = {
    key: 'city',
    title: '城市',
    titleName: '城市',
    width: '160'
}
const sf = {
    key: 'province',
    title: '省份',
    titleName: '省份',
    width: '160'
}
const lc = {
    key: 'mileage',
    title: '里程（万公里）',
    titleName: '里程（万公里）',
    width: '160'
}

const gxsj = {
    key: 'updated_at',
    title: '更新时间',
    titleName: '更新时间',
    width: '160'
}
const qcpp = {
    key: 'car_brand',
    title: '汽车品牌',
    titleName: '汽车品牌',
    width: '160'
}
const rylx = {
    key: 'car_fuel_type',
    title: '燃油类型',
    titleName: '燃油类型',
    width: '160'
}
const qclx = {
    key: 'car_model',
    title: '汽车类型',
    titleName: '汽车类型',
    width: '160'
}
const czmc = {
    key: 'link_man',
    title: '车主名称',
    titleName: '车主名称',
    width: '160'
}
const sj = {
    key: 'sell_price',
    title: '售价',
    titleName: '售价（万元）',
    width: '160',
}
const jydd = {
    key: 'market_title',
    title: '交易地点',
    titleName: '交易地点',
    width: '160'
}
const cz = {
    key: 'id',
    title: '操作',
    titleName: '操作',
    slot: 'slot',
    fixed: 'right',
    width: '160'
}
const DataObj = [
    id,
    cs,
    qcxl,
    sf,
    gxsj,
    qcpp,
    rylx,
    qclx,
    czmc,
    jydd,
    lc,
    bsx,
    sj,
    cz
]

export default new LinkEnum(DataObj)