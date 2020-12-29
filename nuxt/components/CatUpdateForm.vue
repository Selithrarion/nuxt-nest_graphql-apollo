<template>
	<v-card :loading="isUpdating" class="mt-4">
		<v-card-title> изменить кота </v-card-title>
		<v-card-text>
			<v-form v-model="isValid" @submit.prevent="tryUpdateCat">
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
					:disabled="isUpdating || !isValid || !areAnyChanges"
					>изменить кота</v-btn
				>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
import getAllCats from '../apollo/queries/cat/getAllCats.gql';
import updateCat from '../apollo/mutations/cat/updateCat.gql';

export default {
	props: {
		cat: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			name: '',
			age: '',
			id: '',
			isValid: false,
			isUpdating: false,
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
  watch: {
	  cat() {
        this.name = this.cat.name;
      	this.age = this.cat.age;
      	this.id = this.cat.id;
    }
  },
  computed: {
	  areAnyChanges() {
	    if (this.cat.name === this.name && this.cat.age === this.age) return false
      return true
    }
  },
	methods: {
		async tryUpdateCat() {
			try {
				this.isUpdating = true;
				const name = this.name;
				const age = Number(this.age);
				const id = String(this.id);

				await this.$apollo.mutate({
					mutation: updateCat,
					variables: { name, age, id },
					update: (cache, { data: { updateCat } }) => {
						const data = cache.readQuery({
							query: getAllCats,
						});
						const catIndexToUpdate = data.getAllCats.findIndex(
							(cat) => cat.id === updateCat.id
						);
						data.getAllCats[catIndexToUpdate] = updateCat;
						cache.writeQuery({
							query: getAllCats,
							data,
						});
					},
				});

				this.isUpdating = false;
			} catch (e) {
				this.isUpdating = false;
				console.error(e);
			}
		},
	},
  mounted() {
	  if (this.cat) {
      this.name = this.cat.name;
      this.age = this.cat.age;
      this.id = this.cat.id;
    }
  }
};
</script>

<style scoped></style>
