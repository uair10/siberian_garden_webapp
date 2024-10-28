<template>
  <div class="ci-counter-wrap">
    <div
      class="cic-minus touch-item"
      :class="{ disabled: currentCount === 1 }"
      @click="decreaseQuantity"
    >
      <icon-minus></icon-minus>
    </div>
    <div class="cic-count">{{ currentCount }}</div>
    <div
      class="cic-plus touch-item"
      :class="{ disabled: currentCount >= product.available_quantity }"
      @click="increaseQuantity"
    >
      <icon-plus></icon-plus>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { Product } from "@/types/product";
import IconPlus from "@/components/icons/IconPlus.vue";
import IconMinus from "@/components/icons/IconMinus.vue";
import type { CartItem } from "@/types/cart";

const { product, quantity } = defineProps<{
  product: CartItem | Product;
  quantity?: number;
}>();

const emit = defineEmits<{
  (eventName: "quantityChanged", quantity: number): void;
}>();

const currentCount = ref(quantity);

const decreaseQuantity = () => {
  if (currentCount.value > 1) {
    currentCount.value -= 1;
  }
};

const increaseQuantity = async () => {
  if (currentCount.value < product.available_quantity) {
    currentCount.value += 1;
  }
};

watch(currentCount, () => {
  emit("quantityChanged", currentCount.value);
});
</script>

<style scoped>
.ci-counter-wrap {
  align-items: center;
  background-color: #f6f5fa;
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  line-height: 1.2;
  height: 34px;
  justify-content: space-between;
}

.ci-counter-wrap svg {
  width: 12px;
}

.cic-minus,
.cic-plus {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 40px;
}

.cic-minus {
  box-shadow: inset 55px 0 20px -22px rgba(0, 0, 0, 0);
  padding-left: 13px;
}

.cic-minus.touched {
  box-shadow: inset 40px 0 15px -20px #e3e3e39c;
  outline: none;
}

.cic-plus {
  box-shadow: inset -55px 0 20px -22px rgba(0, 0, 0, 0);
  justify-content: flex-end;
  padding-right: 13px;
}

.cic-plus.touched {
  box-shadow: inset -40px 0 15px -20px #e3e3e39c;
  outline: none;
}

.cic-count {
  font-weight: 500;
}
</style>
