import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

const cats = [
	{
		id: '1',
		name: 'vasya',
		age: 1,
	},
	{
		id: '2',
		name: 'kuzya',
		age: 3,
	},
	{
		id: '3',
		name: 'mishka',
		age: 5,
	},
];

@Injectable()
export class CatsService {
	getAll() {
		return cats;
	}
	getById(id) {
		const cat = cats.find((item) => item.id === id);
		return cat;
	}

	createCat(catDto: CreateCatDto) {
		cats.push(catDto);
		return catDto;
	}
	updateCat(catDto: CreateCatDto) {
		const catIndex = cats.findIndex((cat) => cat.id === catDto.id);
		cats[catIndex] = catDto;
		return catDto;
	}
}
