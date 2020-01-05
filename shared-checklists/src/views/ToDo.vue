<template>
  <div class="q-pa-md q-gutter-md">
	  <q-card class="my-card" v-for="(task, index) in tasks" :key="index">
		<q-card-section class="bg-primary text-white">
			<div>
				<q-input class="text-h6" debounce="1000" type="text" id="txtComplexity" :value="task.title" @input="saveTaskTitle(task, arguments[0])"/>
			</div>
		</q-card-section>
		<q-card-section>
			<div>
				<q-input class="text-subtitle2" debounce="1000" type="textarea" autogrow id="txtComplexity" :value="task.body" @input="saveTaskBody(task, arguments[0])"/>
			</div>
		</q-card-section>
	  </q-card>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import QInput from 'quasar';
import ITodoCollection, {ITodo} from '@/models/todoCollection';

@Component
export default class ToDo extends Vue {
	public document: ITodoCollection = {
		subject: '',
		credit: '',
		todos: [],
	};
	public tasks: ITodo[] = [];

	created() {
		this.loadData();
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

<style lang="scss" scoped>

.q-pa-md {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.my-card {
	align-items: center;
	width: 70%;
}
</style>