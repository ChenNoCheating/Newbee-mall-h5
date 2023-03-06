<template>
    <div class="category-box">
        <header class="category-header wrap">
            <i class="nbicon nbfanhui" @click="goBack()"></i>
            <div class="header-search">
                <i class="nbicon nbSearch"></i>
                <router-link tag="span" class="search-title" to="./product-list?from=category">全场50元起步</router-link>
            </div>
            <i class="nbicon nbmore"></i>
        </header>
        <div class="search-wrap" ref="searchWrap">
            <list-scroll :scroll-data="state.categoryData" class="nav-side-wrap">
                <ul class="nav-side">
                    <li
                        v-for="item in state.categoryData"
                        :key="item.categoryId"
                        v-text="item.categoryName"
                        :class="{'active': state.currentIndex == item.categoryId}"
                        @click="selectMenu(item.categoryId)"
                    ></li>
                </ul>
            </list-scroll>
            <div class="search-content">
                <list-scroll :scroll-data="state.categoryData" v-if="state.categoryData.length">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <template v-for="(category, index) in state.categoryData">
                                <div class="swiper-slide" v-if="state.currentIndex == category.categoryId" :key="index">
                                    <div class="category-list" v-for="(products, index) in category.secondLevelCategoryVOS" :key="index">
                                        <p class="category-title">{{ products.categoryName }}</p>
                                        <div class="product-item" v-for="(product, index) in products.thirdLevelCategoryVOS" :key="index" @click="selectProduct(product)">
                                            <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" class="product-img"/>
                                            <p v-text="product.categoryName" class="product-title"></p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </list-scroll>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { getCategory } from '@/service/good'
import { useRouter, useRoute } from 'vue-router'
import listScroll from '@/components/ListScroll.vue'
//composition API获取refs的形式
const searchWrap = ref(null)
const route = useRoute()
const router = useRouter()
const goBack = () => {
    router.go(-1)
}
const state = reactive({
    categoryData: [],
    currentIndex: 15
})
onMounted(async () => {
    let $screenHeigh = document.documentElement.clientHeight
    searchWrap.value.style.height = $screenHeigh - 100 + 'px'
    const { data } = await getCategory()
    state.categoryData = data
})
const selectMenu = (index) => {
    state.currentIndex = index
}
const selectProduct = (item) => {
    router.push({ path: 'product-list', query: { categoryId: item.categoryId } })
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin.less';
.category-box {
    .category-header {
        background: #fff;
        position: fixed;
        left: 0;
        top: 0;
        .fj();
        .wh(100%,50px);
        line-height: 50px;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 15px;
        color: #656771;
        z-index: 10000;
        &.active{
            background: @primary;
        }
        .icon-left {
            font-size: 25px;
            font-weight: bold;
        }
        .header-search {
            display: flex;
            width: 80%;
            height: 20px;
            line-height: 20px;
            margin: 10px 0;
            padding: 5px 0;
            color: #232326;
            background: #F7F7F7;
            border-radius: 20px;
            .nbSearch {
                padding: 0 10px 0 20px;
                font-size: 17px;
            }
            .search-title {
                font-size: 12px;
                color: #666;
            }
        }
    }
    .search-wrap {
        .fj();
        width: 100%;
        margin-top: 50px;
        background: #F8F8F8;
        .nav-side-wrap {
            width: 28%;
            height: 100%;
            overflow: hidden;
            .nav-side {
                width: 100%;
                .boxSizing();
                background: #F8F8F8;
                li {
                    width: 100%;
                    height: 56px;
                    text-align: center;
                    line-height: 56px;
                    font-size: 14px;
                    font-weight: 600;
                    &.active {
                        color: @primary;
                        background: #fff;
                    }
                }
            }
        }
        .search-content {
            width: 72%;
            height: 100%;
            padding: 0 10px;
            background: #fff;
            overflow-y: scroll;
            touch-action: pan-y;
            * {
                touch-action: pan-y;
            }
            .boxSizing();
            .swiper-container {
                width: 100%;
                .swiper-slide {
                    width: 100%;
                    .category-main-img {
                        width: 100%;
                    }
                    .category-list {
                        display: flex;
                        flex-wrap: wrap;
                        flex-shrink: 0;
                        width: 100%;
                        .category-title {
                            width: 100%;
                            font-size: 17px;
                            font-weight: 500;
                            padding: 20px 0;
                        }
                        .product-item {
                            width: 33.3333%;
                            margin-bottom: 10px;
                            text-align: center;
                            font-size: 15px;
                            .product-img {
                                .wh(30px,30px);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>