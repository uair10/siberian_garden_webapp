<template>
  <back-button></back-button>
  <navbar></navbar>
  <div class="product-view-wrap active" style="visibility: visible">
    <div class="product-view" style="transform: translateY(0px)">
      <div class="cross-item" @click="router.back()">
        <cross-icon></cross-icon>
      </div>
      <div class="product-view-data">
        <splide
          v-if="imagePaths.length > 1"
          :options="{ rewind: true, pagination: false }"
        >
          <splide-slide v-for="image in imagePaths" :key="image">
            <div class="product-view-data-img-box">
              <media-renderer
                :source="image"
                :alt-text="product.title"
              ></media-renderer>
            </div>
          </splide-slide>
        </splide>
        <div v-else class="ci-thumb">
          <div class="ci-image-container">
            <media-renderer
              :source="imagePaths[0]"
              :alt-text="product.title"
            ></media-renderer>
          </div>
        </div>
        <div class="title-product-card">
          <span>{{ product.title }}</span>
          <span class="weight-product-card"></span>
        </div>
        <div class="product-description">
          <div>{{ product.description }}</div>
          <div style="margin-top: 12px"></div>
          <div v-if="product.strain_type" style="margin-top: 5px">
            <b>Type:</b> {{ product.strain_type.toUpperCase() }}
          </div>
          <div
            v-if="product.feelings && product.feelings.length > 0"
            style="margin-top: 5px"
          >
            <b>Feelings:</b>
            {{ product.feelings.map((elem) => elem.title).join(", ") }}
          </div>
          <div
            v-if="product.genetics && product.genetics.length > 0"
            style="margin-top: 5px"
          >
            <b>Genetics:</b>
            {{ product.genetics.map((elem) => elem.title).join(", ") }}
          </div>
          <div v-if="product.thc" style="margin-top: 5px">
            <b>THC:</b> {{ product.thc }} %
          </div>
          <div v-if="product.cbd" style="margin-top: 5px">
            <b>CBD:</b> {{ product.cbd }}
          </div>
        </div>
        <div class="caption-item-wrap"></div>
      </div>
    </div>
    <div class="product-count-wrap">
      <div class="pcw-btn-group">
        <div class="price-product-card">
          ฿<span>{{ product.price }}</span>
        </div>

        <div class="pcw-count-wrap" style="width: auto">
          <quantity-controls-without-cart
            class="ci-price-counter"
            :product="product"
            :quantity="quantity"
            @quantity-changed="updateQuantity"
          ></quantity-controls-without-cart>
        </div>
        <div class="gto-btn" @click="addToCart">
          <a>{{ t("add_to_cart") }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Product } from "@/types/product";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { useCartStore } from "@/store/cart";
import { BackButton, useWebApp } from "vue-tg";
import Navbar from "@/components/common/Navbar.vue";
import { useI18n } from "@/composables/useI18n";
import MediaRenderer from "@/components/common/MediaRenderer.vue";
import { useRouter } from "vue-router";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import QuantityControlsWithoutCart from "@/components/products/QuantityControlsWithoutCart.vue";

const { product } = defineProps<{ product: Product }>();
const cartStore = useCartStore();
const { initDataUnsafe: initData } = useWebApp();
const { t } = useI18n();
const router = useRouter();

const quantity = ref(1);

const imagePaths = product.images.map((image) => image.image_path);

const updateQuantity = (newQuantity: number) => {
  quantity.value = newQuantity;
};

const addToCart = async () => {
  const item = {
    id: product.id,
    title: product.title,
    price: product.price,
    category_id: product.category_id,
    quantity: quantity.value,
  };
  if (cartStore.getItem(item.id)) {
    await cartStore.increaseItemQuantity(
      initData.user.id,
      item.id,
      quantity.value,
    );
  } else {
    await cartStore.addItem(initData.user.id, item);
  }
  router.back();
};
</script>

<style scoped>
.product-view-wrap {
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
}

.product-view-wrap.active .product-count-wrap {
  display: block;
}

.product-view {
  position: relative;
  background-color: #fff !important;
  box-shadow: 0 10px 20px -7px #000;
  height: 100vh;
  margin: 0 auto;
  max-width: 420px;
  min-width: 100%;
  overflow-y: auto;
}

.cross-item {
  width: 51px;
  height: 51px;
  position: fixed;
  top: 18px;
  right: 18px;
  justify-content: center;
  align-items: center;
  z-index: 30;
}

.product-view-data {
  padding: 0 0 100px;
  height: calc(100vh - 75px);
  overflow-x: hidden;
}

.product-view-data-img-box {
  display: flex;
  justify-content: center;
  height: 338px;
  overflow: hidden;
}

.product-view-data-img-box video,
.product-view-data-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-description {
  font-size: 14px;
  line-height: 1.4;
  padding: 0 15px;
}
</style>
