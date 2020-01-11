<template>
	<div>
		<h2>{{document.subject}}</h2>
		<div class="q-pa-md row items-start q-gutter-md">
			<q-card class="my-card" @click="toggleCardPosition()">
				<div class="o-notecard__card -title text-h6 bg-grey-2" v-if="toggleCard">{{tasks[currentCard].title}}</div>
				<div class="o-notecard__card -body text-h6" v-if="!toggleCard">{{tasks[currentCard].body}}</div>
				<q-card-actions align="around">
					<q-btn flat round color="red" icon="warning" @click="wrong(tasks[currentCard])"/>
					<q-btn flat round color="yellow" icon="visibility" @click="partiallyCorrect(tasks[currentCard])"/>
					<q-btn flat round color="green" icon="done" @click="correct(tasks[currentCard])"/>
				</q-card-actions>
			</q-card>
		</div>
	</div>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import QInput from 'quasar';
import ITodoCollection, {ITodo} from '@/models/todoCollection';
import { mapGetters } from "vuex";
import firebase from 'firebase';

@Component
export default class Notecards extends Vue {
	public currentCard: number = 0;
	public toggleCard: boolean = true;
	public document: ITodoCollection = {
		subject: '',
		credit: '',
		todos: [],
	};
	public adminUID = `yPeXhzXz9GSUoEJktjsZnDsIokG3`;
	public tasks: ITodo[] = [];
	public selected: string[] = [];

	public get user() {
		return this.$store.getters.user;
	}

	public getSelectedString() {
      	return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.tasks.length}`
	}

	beforeMount() {
		firebase.auth().onAuthStateChanged(() => {
			this.loadData();
		})
	}
	
	public toggleCardPosition() {
		if (this.toggleCard == true) {
			this.toggleCard = false;
		} else {
			this.toggleCard = true;
		}
	}

	public wrong(element: any) {
		this.tasks.splice(this.tasks.indexOf(element), 1);
		this.tasks.splice(this.tasks.indexOf(element) + (this.tasks.length/2), 0, element);
	}

	public partiallyCorrect(element: any) {
		this.tasks.splice(this.tasks.indexOf(element), 1);
		this.tasks.splice(this.tasks.indexOf(element) + (this.tasks.length/1.5), 0, element);		console.log(this.tasks);
	}

	public correct(element: any) {
		this.tasks.push(this.tasks.splice(this.tasks.indexOf(element), 1)[0]);
	}

	public saveTaskTitle(task: ITodo, title: string ) {
		let todoDataService = new TodoDataServicesCollection();
		let newDocument: ITodoCollection = {
			subject: this.document.subject,
			credit: this.document.credit,
			todos: this.document.todos.map((todo: ITodo) => {
				if (todo.id === task.id) {
					return {
						id: task.id,
						title: title,
						body: task.body,
					}
				} else {
					return todo;
				}
			})
		}
		let context = this;
		todoDataService.Update(newDocument, this.$route.params.id).then(function () {
		context.loadData();
		})
	}

	public saveTaskBody(task: ITodo, body: string ) {
		let todoDataService = new TodoDataServicesCollection();
		let newDocument: ITodoCollection = {
			subject: this.document.subject,
			credit: this.document.credit,
			todos: this.document.todos.map((todo: ITodo) => {
				if (todo.id === task.id) {
					return {
						id: task.id,
						title: task.title,
						body: body,
					}
				} else {
					return todo;
				}
			})
		}
		let context = this;
		todoDataService.Update(newDocument, this.$route.params.id).then(function () {
		context.loadData();
		})
	}

	public loadData() {
		let todoDataService = new TodoDataServicesCollection();
		todoDataService.GetRecord(this.$route.params.id).then((listData:any) => {
			this.document = listData;
			this.tasks = listData.todos;
			console.log(this.tasks);
		});
	}
}

</script>

<style lang="scss" scoped>

.q-pa-md {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.my-card {
	width: 100%;
	max-width: 40%;
}

.o-notecard__card {
	padding: 80px;
}

@media (max-width: 600px) {
.my-card {
	width: 100%;
	max-width: 60%;

}
}

</style>