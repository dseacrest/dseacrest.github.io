<template>
	<div>
		<h2 v-if="user.loggedIn">{{document.subject}}</h2>
		<div class="q-pa-md row items-start q-gutter-md" v-if="user.loggedIn">
			<q-card class="o-notecard my-card">
				<div class="o-notecard__card" @click="toggleCardPosition()">
					<div class="bg-grey-2 text-grey" v-if="toggleCard">Click to Flip Card</div>
					<div class="text-grey-2" v-if="!toggleCard">Click to Flip Card</div>
					<div 
						class="o-notecard__card __title text-h6 bg-grey-2" 
						v-if="toggleCard"
					>
						When You're {{document.subject}}...({{title ? title : ''}})
					</div>
					<div 
						class="o-notecard__card -body text-subtitle1" 
						v-if="!toggleCard"
					>
						{{body}}
					</div>
				</div>
				<q-card-actions class="o-notecard__actions" align="around">
					<q-btn 
						class="o-notecard__actions__action -wrong" 
						flat
						round 
						color="red" 
						icon="close" 
						@click="wrong(tasks[currentCard])"
					>
						<q-tooltip>Missed - Sends back in queue several cards.</q-tooltip>
					</q-btn>
					<q-btn 
						class="o-notecard__actions__action -partiallyCorrect" 
						flat 
						round 
						color="accent" 
						icon="close" 
						@click="partiallyCorrect(tasks[currentCard])"
					>
						<q-tooltip>Barely Missed - Sends back halfway in queue.</q-tooltip>
					</q-btn>
					<q-btn 
						class="o-notecard__actions__action -correct" 
						flat 
						round 
						color="green" 
						icon="done" 
						@click="correct(tasks[currentCard])"
					>
						<q-tooltip>Correct - Sends to back of queue.</q-tooltip>
					</q-btn>
				</q-card-actions>
			</q-card>
		</div>

		<h4 v-if="!user.loggedIn">Please register or login above to access study cards.</h4>
	</div>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import QInput from 'quasar';
import ITodoCollection, {ITodo} from '@/models/todoCollection';
import { mapGetters } from "vuex";
import firebase from 'firebase';
import ToDoViewModule from '@/store/view/ToDoViewModule';

@Component
export default class Notecards extends Vue {
	public currentCard: number = 0;
	public toggleCard: boolean = true;
	public selected: string[] = [];

	public get tasks(): ITodo[] {
		return ToDoViewModule.tasks;
	}
	
	public get document(): ITodoCollection {
		return ToDoViewModule.document;
	}

	public get user() {
		return this.$store.getters.user;
	}

	public get title() {
		if (this.tasks[this.currentCard].title) {
			return this.tasks[this.currentCard].title;
		} else {
			return ''
		}
	}

	public get body() {
		if (this.tasks[this.currentCard].body) {
			return this.tasks[this.currentCard].body;
		} else {
			return 'Error.'
		}
	}

	public getSelectedString() {
      	return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.tasks.length}`
	}

	beforeMount() {
		firebase.auth().onAuthStateChanged(() => {
			this.loadData();
		})
	}
	
	public toggleCardPosition(event: Event) {
		if (this.toggleCard == true) {
			this.toggleCard = false;
		} else {
			this.toggleCard = true;
		}
	}

	public wrong(element: any) {
		this.tasks.splice(this.tasks.indexOf(element), 1);
		this.tasks.splice(this.tasks.indexOf(element) + (this.tasks.length/2), 0, element);
		this.toggleCard = true;
	}

	public partiallyCorrect(element: any) {
		this.tasks.splice(this.tasks.indexOf(element), 1);
		this.tasks.splice(this.tasks.indexOf(element) + (this.tasks.length/1.5), 0, element);
		this.toggleCard = true;
	}

	public correct(element: any) {
		this.tasks.push(this.tasks.splice(this.tasks.indexOf(element), 1)[0]);
		this.toggleCard = true;
	}

	public loadData() {
		ToDoViewModule.loadDocument(this.$route.params.id);
	}
}

</script>

<style lang="scss" scoped>

.q-pa-md {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.q-textarea .q-field__native {
	text-align: center;
}

.o-notecard {
	width: 100%;
	max-width: 700px;
	
	&__card {
		height: 350px;
		display: flex;
		flex-direction:  column;
		justify-content: center;
		padding: 5px;

		&__flipCard {
			display: inline;
		}

		&__titleInput {
			font-size: 1.75vmax;
		}

		&__bodyInput {
			font-size: 1.75vmax;
		}
	}

}

@media (max-width: 600px) {
.o-notecard {
	max-width: 95%;

	&__card {
		height: 250px;
	}

}
}

</style>