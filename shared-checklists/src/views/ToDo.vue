<template>
  <div class="q-pa-md q-gutter-md">
	<!-- <q-card class="my-card" v-for="(task, index) in tasks" :key="index">
	<q-card-section class="bg-white">
		<div>
			<q-input class="text-h6" debounce="1000" type="text" id="txtComplexity" :value="task.title" @input="saveTaskTitle(task, arguments[0])"/>
		</div>
	</q-card-section>
	<q-card-section>
		<div>
			<q-input class="text-subtitle2" debounce="1000" type="textarea" autogrow id="txtComplexity" :value="task.body" @input="saveTaskBody(task, arguments[0])"/>
		</div>
	</q-card-section>
	</q-card> -->


    <q-markup-table class="o-markupTable" >
      <thead>
        <tr v-if="user.loggedIn">
          <th class="m-checkboxTitle text-left">Status</th>
          <th class="m-titleTitle text-left">Title</th>
          <th class="m-bodyTitle text-left">Task</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
			<td class="m-checkboxColumn text-left">
					<q-checkbox  :disable="user.data.uid !== adminUID" />
			</td>
			<td class="m-titleColumn text-left">
					<q-input class="text-h6" :disable="user.data.uid !== adminUID" debounce="1000" type="text" id="txtTitle" :value="task.title" @input="saveTaskTitle(task, arguments[0])"/>
			</td>
			<td class="m-bodyColumn text-left">
					<q-input class="text-subtitle2" :disable="user.data.uid !== adminUID" debounce="1000" type="textarea" autogrow id="txtBody" :value="task.body" @input="saveTaskBody(task, arguments[0])"/>
			</td>
        </tr>
      </tbody>
    </q-markup-table>

	<h4 v-if="!user.loggedIn">Please register or login above to access checklists.</h4>

    <!-- <q-table
		class="o-todoTable"
		:pagination.sync="pagination"
		title="Checklist"
		:data="tasks"
		:columns="columns"
		row-key="title"
		:selected-rows-label="getSelectedString"
		selection="multiple"
		:selected.sync="selected"
    /> -->

  </div>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import QInput from 'quasar';
import ITodoCollection, {ITodo} from '@/models/todoCollection';
import { mapGetters } from "vuex";

@Component
export default class ToDo extends Vue {
	public document: ITodoCollection = {
		subject: '',
		credit: '',
		todos: [],
	};
	public adminUID = `yPeXhzXz9GSUoEJktjsZnDsIokG3`;
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

	created() {
		if (this.user) {
			console.log(this.user);
		}
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

// .o-todoTable {
// 	width: 70%;
// }

.o-markupTable {
	width: 80%;
}

.m-checkboxTitle { 
	width: 5%;
}

.m-checkboxColumn {
	width: 5%;
}

.m-titleTitle {
	width: 25%;
}

.m-titleColumn {
	width: 25%;
}

.m-bodyTitle {
	width: 70%;
}

.m-bodyColumn {
	width: 70%;
}

// .my-card {
// 	align-items: center;
// 	width: 70%;
// }
</style>