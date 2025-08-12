<template>
<table>
    <thead>
        <tr>
            <th v-for="title in titles" :key="title.id" scope="col">{{ title.name }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="data in datas" :key="data.id">
            <td>
                <label for="dataName" v-if="!data.isEdit">{{ data.name }}</label>
                <input type="text" id="dataName" v-if="data.isEdit" :readonly="!data.isEdit" v-model="data.name">
                
            </td>
            <td><small>{{ data.discription }}</small></td>
            <td>{{ data.price }}</td>
            <td>
                <button type="button" @click="decrease(data)">-</button>
                {{ data.stock }}
                <button type="button" @click="increase(data)">+</button>
            </td>
            <td>
                <button type="button" v-if="!data.isEdit" @click="edit(data)">編輯</button>
                <button type="button" v-if="data.isEdit" @click="archive(data)">儲存</button>
                <button type="button" v-if="data.isEdit" @click="cancelEdit(data)">取消</button>
            </td>
        </tr>
    </tbody>
</table>
<hr>
<h2>新增品項</h2>
<div>
    <label for="newData">品項: </label>
    <input type="text" id="newData" v-model="newName">
    <br>
    <label for="newData">描述: </label>
    <input type="text" id="newData" v-model="newDiscription">
    <br>
    <label for="newData">價格: </label>
    <input type="number" id="newData" v-model="newPrice">
    <br>
    <label for="newData">庫存: </label>
    <input type="number" id="newData" v-model="newStock">
</div>
<button type="button" @click="addData">新增</button>
</template>


<script setup>
import { ref } from 'vue';

const titles = ref([
    {
        id: 1,
        name: '品項',
    },
    {
        id: 2,
        name: '描述',
    },
    {
        id: 3,
        name: '價格',
    },
    {
        id: 4,
        name: '庫存',
    },
    {
        id: 5,
        name: '編輯',
    },
]);

const datas = ref([
    {
        id: 1,
        name: '珍珠奶茶',
        discription: '香濃奶茶搭配QQ珍珠',
        price: 50,
        stock: 20,
        isEdit: false,
        newName: ''
    },
    {
        id: 2,
        name: '冬瓜檸檬',
        discription: '清新冬瓜配上新鮮檸檬',
        price: 45,
        stock: 15,
        isEdit: false,
        newName: ''
    },
    {
        id: 3,
        name: '翡翠檸檬',
        discription: '綠茶與檸檬的完美結合',
        price: 55,
        stock: 30,
        isEdit: false,
        newName: ''
    },
    {
        id: 4,
        name: '四季春茶',
        discription: '香醇四季春茶，回甘無比',
        price: 45,
        stock: 10,
        isEdit: false,
        newName: ''
    },
    {
        id: 5,
        name: '阿薩姆奶茶',
        discription: '阿薩姆紅茶搭配香醇鮮奶',
        price: 50,
        stock: 25,
        isEdit: false,
        newName: ''
    },
    {
        id: 6,
        name: '檸檬冰茶',
        discription: '檸檬與冰茶的清新組合',
        price: 45,
        stock: 20,
        isEdit: false,
        newName: ''
    },
    {
        id: 7,
        name: '芒果綠茶',
        discription: '芒果與綠茶的獨特風味',
        price: 55,
        stock: 18,
        isEdit: false,
        newName: ''
    },
    {
        id: 8,
        name: '抹茶拿鐵',
        discription: '抹茶與鮮奶的絕配',
        price: 60,
        stock: 20,
        isEdit: false,
        newName: ''
    }
]);

const decrease = (item) => {
    if(item.stock > 0) {
        item.stock --;
    }
}

const increase = (item) => {
    item.stock ++;
}

const edit = (item) => {
    item.isEdit = true;

}

const archive = (item) => {
    item.newName = item.name;
    item.isEdit = false;
}

const cancelEdit = (item) => {
    item.isEdit = false;
}

const newName = ref('');
let addName = '';
const newDiscription = ref('');
let addDiscription = '';
const newPrice = ref(0);
let addPrice = 0;
const newStock = ref(1);
let addStock = 1;

const addData = () => {
    addName = newName.value;
    addDiscription = newDiscription.value;
    addPrice = newPrice.value;
    addStock = newStock.value;

    datas.value.push({
        id: new Date().getTime(),
        name: addName,
        discription: addDiscription,
        price: addPrice,
        stock: addStock,
        isEdit: false,
        newName: ''
    });
    console.log(datas);
    
    // addName = '';
    // addDiscription = '';
    // addPrice = 0;
    // addStock = 1;
    newName.value = '';
    newDiscription.value = '';
    newPrice.value = 0;
    newStock.value = 1;
}

</script>


<style>

</style>