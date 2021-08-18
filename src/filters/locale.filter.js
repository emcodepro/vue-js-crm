import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

export default function localeFilter(key) {
    const locales = {
        'ru-RU': ru,
        'en-US': en
    }
    const locale = store.getters.userData.locale || 'ru-RU'
    return locales[locale][key] || `Word for key ${key} not found`
}