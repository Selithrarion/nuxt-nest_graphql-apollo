<template>
  <v-list-item class="mt-2" @click="openDetails">
    <v-list-item-content>
      <v-list-item-title>name – {{ cat.name }}</v-list-item-title>
      <v-list-item-subtitle>id – {{ cat.id }}</v-list-item-subtitle>
      <v-list-item-subtitle>age – {{ cat.age }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
	props: {
		cat: {
			type: Object,
			required: true,
		},
	},
  methods: {
    openDetails() {
      this.$emit('open-cat-details', this.cat.id)
    }
  }
};
</script>
