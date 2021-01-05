import Vue from 'vue'
import Grid from './Grid'
import GridItem from './GridItem'

Grid.install = () => {
    Vue.component('Grid', Grid)
}

GridItem.install = () => {
    Vue.component('GridItem', GridItem)
}

export {
    Grid,
    GridItem
}