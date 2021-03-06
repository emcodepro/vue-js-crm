import M from 'materialize-css'

export default {
    install(Vue) {
        Vue.prototype.$message = html => M.toast({html: html})

        Vue.prototype.$error = html => M.toast({html: `[Ошибка]: ${html}`})
    }
}