import _ from 'lodash'
export default {
    data() {
        return {
            currentPage: +this.$route.query.page || 1,
            pageCount: 0,
            pageSize: 5,
            currentItems: [],
            allItems: []
        }
    },
    methods: {
        setupPagination(items) {
            this.allItems = _.chunk(items, this.pageSize)
            this.currentItems = this.allItems[this.currentPage - 1] || this.allItems[0]
            this.pageCount = _.size(this.allItems)
        },
        paginationHandler(page) {
            this.$router.push(`${this.$route.path}?page=${this.currentPage}`)
            this.currentItems = this.allItems[page - 1] || this.allItems[0]
        }
    }
}