import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCart } from '@/service/cart'
export const useCartStore = defineStore('cart', () => {
    //记录购物车物品数量
    const count = ref(0)
    //更新购物车数量的action函数
    async function updateCart(){
        const { data = [] } = await getCart()
        count.value = data.length
    }
    //返回一个包含物品数量count，更新物品数量updateCart方法的对象
    return { count, updateCart }
})