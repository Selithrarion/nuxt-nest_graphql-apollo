<template>
	<v-list flat>
		<v-list-item-group>
			<CatItem
				v-for="cat in cats"
				:key="cat.id"
				:cat="cat"
				@open-cat-details="openCatDetails"
			></CatItem>
		</v-list-item-group>
	</v-list>
</template>

<script>
import allCatsQuery from '../apollo/queries/cat/getAllCats.gql';

export default {
	apollo: {
		cats: {
			prefetch: true,
			query: allCatsQuery,
			update: (data) => data.getAllCats,
		},
	},
	data() {
		return {
			cats: [],
		};
	},
	methods: {
		openCatDetails(id) {
			this.$router.push('/cat/' + id);
		},
	},
};
</script>

<style scoped></style>
