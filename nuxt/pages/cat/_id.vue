<template>
	<div class="cat-details text-center pt-4">
		<div v-if="loading">
			<v-progress-circular indeterminate color="primary"></v-progress-circular>
		</div>
		<div v-if="!loading">
			<div class="cat-details__data">
				id - {{ cat.id }}, name - {{ cat.name }}, age - {{ cat.age }}
			</div>
			<v-form class="cat-details__form">
				<CatUpdateForm :cat="cat" />
			</v-form>
		</div>
	</div>
</template>

<script>
import getOneCat from '../../apollo/queries/cat/getOneCat.gql';

export default {
	apollo: {
		cat: {
			prefetch: true,
			$query: {
				loadingKey: 'loading',
			},
			query: getOneCat,
			variables() {
				return { id: this.catID };
			},
			update: (data) => data.getOneCat,
		},
	},
	data() {
		return {
			cat: {},
			loading: null,
		};
	},
	computed: {
		catID() {
			return this.$route.params.id;
		},
	},
};
</script>

<style scoped></style>
