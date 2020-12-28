<template>
	<v-card :loading="isCreating">
		<v-card-title> новый кот </v-card-title>
		<v-card-text>
			<v-form v-model="isValid" @submit.prevent="tryAddCat">
				<v-text-field
					v-model="name"
					label="имя"
					persistent-hint
					hint="до 16 символов"
					counter="16"
					:rules="nameRules"
				></v-text-field>
				<v-text-field
					v-model="age"
					class="pt-6"
					label="возраст"
					:rules="ageRules"
				></v-text-field>
				<v-btn
					type="submit"
					block
					color="primary"
					:disabled="isCreating || !isValid"
					>добавить кота</v-btn
				>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
import getAllCats from '../apollo/queries/cat/getAllCats.gql';
import createCat from '../apollo/mutations/cat/createCat.gql';

export default {
	data() {
		return {
			name: '',
			age: '',
			isValid: false,
			isCreating: false,
			nameRules: [
				(v) => !!v || 'имя обязательно',
				(v) => v.length <= 16 || 'имя меньше 16 символов',
			],
			ageRules: [
				(v) => !!v || 'укажите возраст',
				(v) => v <= 100 || 'некорректный возраст',
			],
		};
	},
	methods: {
		async tryAddCat() {
			try {
				this.isCreating = true;
				const name = this.name;
				const age = Number(this.age);
				const id = String(Date.now());

				await this.$apollo.mutate({
					mutation: createCat,
					variables: { name, age, id },
					update: (cache, { data: { createCat } }) => {
						const data = cache.readQuery({
							query: getAllCats,
						});
						data.getAllCats.push(createCat);
						cache.writeQuery({
							query: getAllCats,
							data,
						});
					},
				});
				this.isCreating = false;
			} catch (e) {
				this.isCreating = false;
				console.error(e);
			}
		},
	},
};
</script>

<style scoped></style>
