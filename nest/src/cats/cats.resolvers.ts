import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';

@Resolver('Cats')
export class CatsResolver {
	constructor(private catsService: CatsService) {}

	@Query()
	async getAllCats() {
		return this.catsService.getAll();
	}
	@Query()
	async getOneCat(@Args('id') id: string) {
		return this.catsService.getById(id);
	}

	@Mutation()
	async createCat(
		@Args('id') id: string,
		@Args('name') name: string,
		@Args('age') age: number
	) {
		const data = { id, name, age };
		return this.catsService.createCat(data);
	}
	@Mutation()
	async updateCat(
		@Args('id') id: string,
		@Args('name') name: string,
		@Args('age') age: number
	) {
		const data = { id, name, age };
		return this.catsService.updateCat(data);
	}
}
