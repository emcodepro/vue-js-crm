import Vue from "vue";
import localeFilter from "../filters/locale.filter";
export default {
    install(Vue) {
        Vue.prototype.$title = function(key) {
            return 'CRM App | ' + localeFilter(key)
        }
    }
}