import localeFilter from "../filters/locale.filter";

export default {
    install(Vue) {
        Vue.prototype.$t = function(key) {
            return localeFilter(key)
        }
    }
}