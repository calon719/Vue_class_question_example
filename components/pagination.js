export default {
  data() {
    return {
      current_page: "",
    };
  },
  props: [`paginationjs`, `currpagejs`],
  methods: {
    pageTrans(page) {
      if (page - 1 === this.currpagejs) {
        return;
      } else if (page === 1) {
        this.current_page = this.paginationjs.current_page - 1;
      } else if (page === this.paginationjs.total_pages + 2) {
        this.current_page = this.paginationjs.current_page + 2;
      } else {
        this.current_page = page - 1;
      };
      this.$emit('curr-page', this.current_page);
    }

  },
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" 
       :class="{'disabled' : page > 1 && page < (paginationjs.total_pages+2) ? false : ((page === 1 && paginationjs.has_pre) || (page === (paginationjs.total_pages+2) && paginationjs.has_next) ? false : true)},
        {'active' : (page - 1) === currpagejs}" v-for="page in (paginationjs.total_pages+2)" :key="page" >
        <a class="page-link" href="" aria-label="Previous" @click.prevent="pageTrans(page)">
          <span aria-hidden="true">{{page === 1 ?'&laquo;' : (page === (paginationjs.total_pages+2) ? '&raquo;' : page-1)}}</span>
        </a>
      </li>
    </ul>
  </nav>`
};