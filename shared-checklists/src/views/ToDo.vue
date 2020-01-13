<template>
  <div class="q-pa-md q-gutter-md">
	<h2 v-if="user.loggedIn">{{document.subject}}</h2>
	<q-markup-table class="o-markupTable" v-if="user.loggedIn">
		<thead>
			<tr>
			<th class="m-titleTitle text-left">Title</th>
			<th class="m-bodyTitle text-left">Task</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="task in tasks" :key="task.id">
				<td class="m-titleColumn text-left">
						<q-input 
						dense 
						borderless 
						class="m-titleColumn__input" 
						debounce="500" type="text" 
						autogrow id="txtTitle" 
						:value="task.title" 
						@input="saveTaskTitle(task, arguments[0])"/>
				</td>
				<td class="m-bodyColumn text-left">
						<q-input 
						dense 
						borderless 
						class="m-bodyColumn__input" 
						debounce="500" 
						type="text" 
						autogrow 
						id="txtBody" 
						:value="task.body" 
						@input="saveTaskBody(task, arguments[0])"/>
				</td>
			</tr>
		</tbody>
	</q-markup-table>
	<h4 v-if="!user.loggedIn">Please register or login above to access checklists.</h4>
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
export default class ToDo extends Vue {
	public document: ITodoCollection = {
		id: '',
		subject: '',
		credit: '',
		topic: '',
		todos: [],
	};
	public tasks: ITodo[] = [];
	public selected: string[] = [];
	public readonly columns = [
		{
			name: 'title',
			label: 'Title',
			align: 'left',
			field: (row: any) => row.title,
			sortable: true,
		},
		{
			name: 'body',
			label: 'Body',
			align: 'left',
			field: (row: any) => row.body,
			sortable: true,
		}
	]
	public pagination = {
		sortBy: 'title',
        descending: false,
        page: 1,
        rowsPerPage: 250,
	}

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
	
	public saveTaskTitle(task: ITodo, title: string ) {

				let todoDataService = new TodoDataServicesCollection();
				let newDocument: ITodoCollection = {
					id: this.document.id,
					subject: this.document.subject,
					credit: this.document.credit,
					topic: this.document.topic,
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
				id: this.document.id,
				subject: this.document.subject,
				credit: this.document.credit,
				topic: this.document.topic,
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
		});
	}

	// public removeTask(record: any) {
	// 	let todoDataService = new TodoDataServicesCollection();
	// 	let context = this;
	// 	todoDataService.Delete(record.id).then(function () {
	// 	context.loadData();
	// 	});
	// }

}

</script>

<style lang="scss">

.q-pa-md {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.o-markupTable {
	width: 70%;
}

.m-titleTitle,
.m-titleColumn {
	width: 30%;
	height: auto;

	&__input {
		font-size: 1.75vmax;
	}
}

.m-bodyTitle,
.m-bodyColumn {
	width: 70%;
	height: 100%;

	&__input {
		font-size: 1.25vmax;
	}
}

@media (max-width: 600px) {
	.o-markupTable {
		width: 90%;
	}

	.m-titleTitle,
	.m-titleColumn {
		width: 30%;
		height: auto;


		&__input {
			font-size: 1.75vmax;
		}
	}

	.m-bodyTitle,
	.m-bodyColumn {
		width: 70%;
		height: 100%;

		&__input {
			font-size: 1.5vmax;
		}
	}	
}

</style>