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
        // 如果為當前頁碼 不執行後面程式
        return;
      } else if (page === 1) {
        // 如果為 前一頁
        this.current_page = this.paginationjs.current_page - 1;
      } else if (page === this.paginationjs.total_pages + 2) {
        // 如果為 下一頁
        this.current_page = this.paginationjs.current_page + 1;
      } else {
        // 跳到指定頁數
        this.current_page = page - 1;
      };
      this.$emit('curr-page', this.current_page);
    }

  },
  /*
    1. v-for 多出 前、後頁 li 要渲染，所以 paginationjs.total_pages+2    
    2. :class 'disabled' 第 1 層判斷 是不是 頁數：
      - 是：回傳 false (disabled 不啟用)
      - 否：進下 1 層判斷
      - 第 2 層判斷： 是上一頁 li 或是下一頁 li 並且還有上下一頁嗎：
        - 是：false (disabled 不啟用)
        - 否：true （disabled 啟用）
    3. :class 'active' 判斷是不是當前頁（因為都多了前頁 li 所以 page - 1）：
    4. span {{}} 渲染：
      - page === 1 時渲染出前一頁符號（前一頁的 li 是第 1 個）
      - 如果為 false 的話 進入下 1 層判斷
        - page === paginationjs.total_pages+2 時渲染出下一頁符號（下一頁的 li 是最後 1 個）
        - 如果為 false 的話 渲染 page - 1 （扣掉上一頁的 li）
  */
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
