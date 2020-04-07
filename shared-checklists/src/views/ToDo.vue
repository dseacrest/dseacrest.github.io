<template>
	<div>
		<div class="o-todo -loggedId" v-if="user.loggedIn">
			<div class="o-todo__subject">{{document.subject}}</div>
			<div class="o-todo__table q-pa-md q-gutter-md">
				<q-markup-table class="o-todo__table__markup">
					<thead>
						<tr>
						<th class="m-checkboxTitle text-left">Status</th>
						<th class="m-titleTitle text-left">Title</th>
						<th class="m-bodyTitle text-left">Task</th>
						<th class="m-deleteTitle text-left"  v-if="user.data.uid === adminId"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="task in tasks" :key="task.id">
							<td class="m-checkboxColumn text-center">
								<q-checkbox dense v-model="taskComplete" :val="task.id"/>
							</td>
							<td class="m-titleColumn text-left">
									<q-input 
									dense 
									borderless 
									class="m-titleColumn__input" 
									debounce="500" type="text" 
									autogrow id="txtTitle" 
									:value="task.title" 
									@input="saveTaskTitle(document, task, arguments[0])"/>
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
									@input="saveTaskBody(document, task, arguments[0])"/>
							</td>
							<td class="m-deleteColumn text-center"  v-if="user.data.uid === adminId">
								<q-btn dense class="m-deleteColumn__button" flat @click="deleteTodo(document, task)">X</q-btn>
							</td>
						</tr>
					</tbody>
				</q-markup-table>
				<div class="o-todo__addRecord">
					<q-btn color="white" class="text-black" @click="addRecord(document)" v-if="allowAddRecord(document)">Add Record</q-btn>
				</div>
			</div>
			<div>
				Total number of tasks: <strong>{{ document.todos.length }}</strong>
				Total number of tasks complete: <strong>{{ taskComplete.length }}</strong>
				% of tasks complete: <strong>{{new Intl.NumberFormat().format((taskComplete.length / document.todos.length) * 100) }}%</strong>
			</div>
		</div>
		<div class="o-todo -loggedOut" v-if="!user.loggedIn">
			<h4>Please register or login above to access checklists.</h4>
		</div>
	</div>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import QInput, {Loading} from 'quasar';
import ITodoCollection, {ITodo} from '@/models/todoCollection';
import { mapGetters } from "vuex";
import firebase from 'firebase';
import "../registerServiceWorker";
import DocumentModule from '@/store/application/DocumentModule';
import HomeViewModule from '@/store/view/HomeViewModule';

@Component
export default class ToDo extends Vue {
	public adminId = process.env.VUE_APP_FIREBASE_ADMIN;
	public taskComplete: string[] = [];
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
        rowsPerPage: 10,
	}

	public get tasks(): ITodo[] {
		return DocumentModule.tasks;
	}
	
	public get document(): ITodoCollection {
		return DocumentModule.document;
	}

	public get user() {
		return this.$store.getters.user;
	}

	public allowAddRecord(document: ITodoCollection): boolean {
		if ((this.user.data ? this.user.data.uid : '' ) === (document.userId || process.env.VUE_APP_FIREBASE_ADMIN)) {
			return true;
		} else {
			return false;
		}
	}

	public getSelectedString() {
		return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.tasks.length}`
	}
	
	public saveTaskTitle(document: ITodoCollection, task: ITodo, title: string ) {
		let todoDataService = new TodoDataServicesCollection();
		let newDocument: ITodoCollection = {
			id: this.document.id,
			subject: this.document.subject,
			credit: this.document.credit,
			description: this.document.description,
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
			}),
			userId: this.document.userId,
		}
		let context = this;
		if ((this.user.data ? this.user.data.uid : '' ) === (document.userId || process.env.VUE_APP_FIREBASE_ADMIN)) {
			console.log(this.user.data)
			console.log(document.userId)
			console.log(process.env.VUE_APP_FIREBASE_ADMIN)
			todoDataService.Update(newDocument, this.$route.params.id).then(function () {
			context.loadData();
			})
		}

	}

	public saveTaskBody(document: ITodoCollection, task: ITodo, body: string ) {
		let todoDataService = new TodoDataServicesCollection();
		let newDocument: ITodoCollection = {
			id: this.document.id,
			subject: this.document.subject,
			credit: this.document.credit,
			description: this.document.description,
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
			}),
			userId: this.document.userId,
		}
		let context = this;
		if ((this.user.data ? this.user.data.uid : '' ) === (document.userId || process.env.VUE_APP_FIREBASE_ADMIN)) {
			todoDataService.Update(newDocument, this.$route.params.id).then(function () {
			context.loadData();
			})
		}

	}

	public addRecord(document: ITodoCollection) {
		let todoDataService = new TodoDataServicesCollection();
		let newDocument: ITodoCollection = {
			id: this.document.id,
			subject: this.document.subject,
			credit: this.document.credit,
			description: this.document.description,
			topic: this.document.topic,
			todos: [...this.document.todos, {id: this.todoIdGenerator(), title:'', body:''}],
			userId: this.document.userId,
		}
		let context = this;
		if ((this.user.data ? this.user.data.uid : '' ) === (document.userId || process.env.VUE_APP_FIREBASE_ADMIN)) {
			todoDataService.Update(newDocument, this.$route.params.id).then(function () {
			context.loadData();
			})
		}
	}

	public deleteTodo(document: ITodoCollection, task: ITodo) {
		let todoDataService = new TodoDataServicesCollection();
		let context = this;
		if ((this.user.data ? this.user.data.uid : '' ) === (document.userId || process.env.VUE_APP_FIREBASE_ADMIN)) {
			todoDataService.DeleteTodoField(document.id, task).then(function () {
			context.loadData();
			})
		}
	}

	public todoIdGenerator(): string {
		let exists: boolean = false;
		let newId: string = '';
		do {
			newId = (Math.floor(Math.random() * 1000000) + 1000000).toString();
			this.document.todos.map((todo: ITodo) => {
				if (todo.id === newId) {
					exists = true;
				}
			});
		} while (exists);
		return newId;
	}

	public async loadData() {
		await DocumentModule.loadDocument(this.$route.params.id);
	}

	beforeCreate() {
        firebase.auth().onAuthStateChanged(async () => {
			Loading.show();
            await HomeViewModule.loadDocuments(this.$store.getters.user);
			await DocumentModule.loadDocument(this.$route.params.id);
			Loading.hide();
        })
    }

}

</script>

<style lang="scss">

.q-pa-md {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.o-todo {
	&__subject {
		font-size: 4em;
		padding: 10px;
	}
	&__table {
		&__markup {
			width: 70%;
			&__foot {
				width: 100%;
				display: flex;
			}
		}
	}
}

.m-checkboxTitle,
.m-checkboxColumn {
	width: 5%;
	height: auto;

	&__input {
		font-size: 1.75vmax;
	}
}

.m-titleTitle,
.m-titleColumn {
	width: 25%;
	height: auto;

	&__input {
		font-size: 1.75vmax;
	}
}

.m-bodyTitle,
.m-bodyColumn {
	width: 65%;
	height: 100%;

	&__input {
		font-size: 1.25vmax;
	}
}

.m-deleteTitle,
.m-deleteColumn {
	width: 5%;
	height: 100%;

	&__input {
		font-size: 1.25vmax;
	}
}

@media (max-width: 600px) {
	.o-todo {
		&__subject {
			font-size: 3em;
		}
		&__table {
			&__markup {
				width: 95%;
			}
		}
	}

	.m-checkboxTitle,
	.m-checkboxColumn {
		width: 5%;
		height: auto;

		&__input {
			font-size: 1.5vmax;
		}
	}
	.m-titleTitle,
	.m-titleColumn {
		width: 25%;
		height: auto;


		&__input {
			font-size: 1.5vmax;
		}
	}

	.m-bodyTitle,
	.m-bodyColumn {
		width: 65%;
		height: 100%;

		&__input {
			font-size: 1.5vmax;
		}
	}	

	.m-deleteTitle,
	.m-deleteColumn {
	width: 5%;
	height: 100%;

	&__input {
		font-size: 1.25vmax;
	}
}
}

</style>