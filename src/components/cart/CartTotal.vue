<template>
  <div v-show="cartStore.totalAmount > 0" class="go-to-order-wrap">
    ฿ {{ cartStore.totalAmount }}
  </div>
  <main-button v-show="cartStore.totalAmount > 0" :color="'#5E30EB'"
    >{{ t("go_to_cart") }}}</main-button
  >
</template>

<script setup lang="ts">
import { useCartStore } from "@/store/cart";
import { MainButton } from "vue-tg";
import { t } from "../../composables/useI18n";

const cartStore = useCartStore();
</script>

<style scoped></style>
