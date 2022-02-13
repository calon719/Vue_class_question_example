import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';

const App={
    data(){
        return{
            userData:{username:" ",password:" "}
            
        }
    },

    methods:{
        login(){
            axios.post(`${apiUrl}/admin/signin`,this.userData)
            .then((res)=>{
                const {token,expired}=res.data;
                document.cookie = `hextoken=${token}; expires=${new Date(expired)};`;
                console.log(expired);
                // this.checkLogin();
                window.location = 'background.html';
            }).catch((error)=>{console.dir(error);})},

        // checkLogin(params){
        //     const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //     console.log(token);
        //     axios.defaults.headers.common['Authorization']=token;

        //     axios.post(`${apiUrl}/api/user/check`)
        //         .then((res)=>{
        //             if(res.data.success){window.location = 'product.html';}
        //         }).catch((error)=>{console.dir(error);})
        // }
    }

}



Vue.createApp(App).mount('#app');
