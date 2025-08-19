<template>
    <h2>註冊</h2>
    <label for="sign-up-account">帳號</label>
    <input type="email" name="email" id="sign-up-account" placeholder="email" v-model="signUpField.email">
    <br>
    <label for="sign-up-password">密碼</label>
    <input type="text" name="password" id="sign-up-password" placeholder="password" v-model="signUpField.password">
    <br>
    <label for="sign-up-nickname">暱稱</label>
    <input type="text" name="nickname" id="sign-up-nickname" placeholder="nickname" v-model="signUpField.nickname">
    <br>
    <button type="button" @click="signUp">註冊</button>
    <br>
    {{ signUpField }}
    <br>
    UID: {{ signUpRes }}

    <h2>登入</h2>
    <label for="sign-in-account">帳號</label>
    <input type="email" name="email" id="sign-in-account" placeholder="email" v-model="signInField.email">
    <br>
    <label for="sign-in-password">密碼</label>
    <input type="text" name="password" id="sign-in-password" placeholder="password" v-model="signInField.password">
    <br>
    <button type="button" @click="signIn">登入</button>
    <br>
    {{ signInField }}
    <br>
    Token: {{ signInRes }}

    <h2>驗證</h2>
    <div v-if="user.uid">
        <p>UID: {{ user.uid }}</p>
        <p>nickname: {{ user.nickname }}</p>
    </div>
    <div v-else>
        <p>你還沒有登入</p>
    </div>

    <hr>

    <h2>待辦事項</h2>
    <div v-if="token">
        <label for="add-todo">新增待辦事項</label>
        <br>
        <input type="text" id="add-todo" v-model="newTodo.content">
        <button type="button" @click="addTodo">新增</button>
        <br>
        <h3>待辦清單</h3>
        <div v-for="todo in todos" :key="todo.id">
            <input type="checkbox" name="" id="">
            <label for="">{{  }}</label>
        </div>

        {{ todos }}
    </div>

</template>


<script setup>
import { onMounted, ref } from 'vue';
// import axios from 'axios'; // 已在index.html載入CDN;使用import需搭配執行 npm install axios

const api = "https://todolist-api.hexschool.io";

// 註冊
const signUpField = ref({
    email: '',
    password: '',
    nickname: ''
});
const signUpRes = ref('');

const signUp = async () => {
    try {
        const res = await axios.post(`${api}/users/sign_up`, signUpField.value);
        console.log(res);
        signUpRes.value = res.data.uid;
    } catch (error) {
        console.log("錯誤");
        console.log(error);
    }
}

// 登入
const signInField = ref({
    email: '',
    password: ''
});
const signInRes = ref('');

const signIn = async () => {
    try {
        const res = await axios.post(`${api}/users/sign_in`, signInField.value);
        console.log(res);
        signInRes.value = res.data.token;
        // 寫入token至cookie
        document.cookie = `customTodoToken=${res.data.token};path=/`;
    } catch (error) {
        console.log("錯誤");
        console.log(error);
    }
}

// 驗證
const user = ref({
    nickname: '',
    uid: ''
})

// 讀取cookie裡的token
const token = ref('document.cookie.replace(/(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$/i,"$1")');

onMounted(async() => {
    const res = await axios.get(`${api}/users/checkout`, {
        headers: {
            Authorization: token.value
        }
    })
    user.value = res.data;
})

// todo
const todos = ref([]);


// 取得todo資料
const getTodos = async () => {
    try {
        const res = await axios.get(`${api}/todos`, {
            headers: {
                Authorization: token.value
            }
        });
        console.log(res);
        todos.value = res.data.data;
    } catch (error) {
        console.log("錯誤");
        console.log(error);
    }
}

// 新增待辦事項功能
const newTodo = ref({
    content: ''
});

const addTodo = async () => {
    try {
        const res = await axios.post(`${api}/todos`, newTodo.value, {
            headers: {
                Authorization: token.value
            }
        });
        console.log(res);
        getTodos();
    } catch (error) {
        console.log("錯誤");
        console.log(error);
    }
}



</script>


<style>

</style>