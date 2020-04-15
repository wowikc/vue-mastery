Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
          <img :src="image">
      </div>

      <div class="product-info">
          <h1>{{ title }}</h1>
          <a :href="link" target="_blank">More products like this</a>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <ul>
              <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div v-for="(variant, index) in variants"
              :key="variant.variantId"
              class="color-box"
              :style="{ backgroundColor: variant.variantColour }"
              @click="updateProduct(index)">
          </div>

          <button @click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }">
                  Add to Cart</button>
      </div>
    </div>
  `,

  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
          {
              variantId: 2234,
              variantColour: "green",
              variantImage: './assets/vmSocks-green.jpg',
              variantQuantity: 10
          },
          {
              variantId: 2235,
              variantColour: "blue",
              variantImage: './assets/vmSocks-blue.jpg',
              variantQuantity: 0
          }
      ]
    }
  },

  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
    }
  },

  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return 2.99
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    }
  }
})


