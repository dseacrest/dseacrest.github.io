<template>
	<div>
		<div class="title" v-if="user.loggedIn">{{document.subject}}</div>
		<div class="q-pa-md row items-start q-gutter-md" v-if="user.loggedIn">
			<q-card class="o-quiz my-card">
				<div class="o-quiz__card">
					<div class="o-quiz__card__title text-h6">
						{{title ? title : ''}}
					</div>
					<div class="o-quiz__card__body text-subtitle1" >
						<q-btn :color="aColor" @click="select('A')" class="o-quiz__card__body__button text-black">A. {{answerA}}</q-btn>
						<q-btn :color="bColor" @click="select('B')" class="o-quiz__card__body__button text-black">B. {{answerB}}</q-btn>
						<q-btn :color="cColor" @click="select('C')" class="o-quiz__card__body__button text-black">C. {{answerC}}</q-btn>
					</div>
				</div>
				<q-card-actions class="o-quiz__actions" align="right">
					<q-btn 
						class="o-quiz__actions__action" 
						flat  
						color="secondary" 
						label="reset score"
						@click="resetScore()"
					>
						<q-tooltip>Reset Score - To zero.</q-tooltip>
					</q-btn>
					<q-btn 
						class="o-quiz__actions__action" 
						flat  
						color="accent" 
						label="next"
						@click="onNext(success, tasks[currentCard])"
					>
						<q-tooltip>Next - Go to next question.</q-tooltip>
					</q-btn>
				</q-card-actions>
			</q-card>
		<div>
			Score: {{this.score}}
		</div>
		</div>

		<h4 v-if="!user.loggedIn">Please register or login above to access quiz mode.</h4>
	</div>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator'
import {TodoDataServicesCollection} from '@/accessors/TodoDataServicesCollection';
import QInput from 'quasar';
import ITodoCollection, {ITodo} from '@/models/todoCollection';
import { mapGetters } from "vuex";
import firebase from 'firebase';
import DocumentModule from '@/store/application/DocumentModule';
import QuizViewModule from '../store/view/QuizViewModule';

@Component({
    filters: {
        truncateBody(value: string) {
            if (value.length > 230) {
                return value.slice(0, 230) + '...';
            } else {
                return value;
            }
        }
    }
})
export default class Quiz extends Vue {
	public currentCard: number = 0;
	public rightAnswer: number = 0;
	public wrongAnswer1: number = 0;
	public wrongAnswer2: number = 0;
	public aColor: string = 'grey-2';
	public bColor: string = 'grey-2';
	public cColor: string = 'grey-2';
	public success: boolean = false;
	public alreadyGuessed: boolean = false;

	public get score() {
		return QuizViewModule.score;
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

	public get title() {
		if (this.tasks[this.currentCard].title) {
			return this.tasks[this.currentCard].title;
		} else {
			return ''
		}
	}

	public randomRightAnswerLocationGenerator() {
		if (this.tasks[this.currentCard].body) {
			this.rightAnswer = Math.ceil(Math.random() * 3);
		}
	}

	public randomWrongAnswerGenerator() {
		if (this.tasks[this.currentCard].body) {
			do {
				this.wrongAnswer1 = Math.ceil(Math.random() * this.tasks.length -1);
			} while (this.wrongAnswer1 === this.currentCard);
			do { 
				this.wrongAnswer2 = Math.ceil(Math.random() * this.tasks.length -1);
			} while (this.wrongAnswer2 === this.wrongAnswer1 || this.wrongAnswer2 === this.currentCard);
		}
	}

	public get answerA() {
		switch (this.rightAnswer) {
			case 1: 
				return this.tasks[this.currentCard].body;
			case 2:
				return this.tasks[this.wrongAnswer1].body;
			case 3:
				return this.tasks[this.wrongAnswer2].body;
			default:
				return this.tasks[this.currentCard].body;
		}
	}

	public get answerB() {
		switch (this.rightAnswer) {
			case 1: 
				return this.tasks[this.wrongAnswer1].body;
			case 2:
				return this.tasks[this.currentCard].body;
			case 3:
				return this.tasks[this.wrongAnswer1].body;
			default:
				return this.tasks[this.wrongAnswer1].body;
		}
	}

	public get answerC() {
		switch (this.rightAnswer) {
			case 1: 
				return this.tasks[this.wrongAnswer2].body;
			case 2:
				return this.tasks[this.wrongAnswer2].body;
			case 3:
				return this.tasks[this.currentCard].body;
			default:
				return this.tasks[this.wrongAnswer2].body;

		}
	}

	public select(choice: string) {
		switch (this.rightAnswer) {
			case 1:
				this.aColor = 'positive';
				this.bColor = 'negative';
				this.cColor = 'negative';
				break;
			case 2:
				this.aColor = 'negative';
				this.bColor = 'positive';
				this.cColor = 'negative';
				break;
			case 3:
				this.aColor = 'negative';
				this.bColor = 'negative';
				this.cColor = 'positive';
				break;
			default: 		
		}
		switch (choice) {
			case 'A': 
				if (this.rightAnswer === 1 && this.alreadyGuessed !== true) {
					QuizViewModule.addPoint();
					this.success = true;
				} 
				break;
			case 'B':
				if (this.rightAnswer === 2 && this.alreadyGuessed !== true) {
					QuizViewModule.addPoint();
					this.success = true;
				} 
				break;
			case 'C':
				if (this.rightAnswer === 3 && this.alreadyGuessed !== true) {
					QuizViewModule.addPoint();
					this.success = true;
				} 
				break;
			default:		
		}
		this.alreadyGuessed = true;
	}

	public onNext(success: boolean, element: any) {
		switch(success) {
			case true:
				this.tasks.push(this.tasks.splice(this.tasks.indexOf(element), 1)[0]);
				break;
			case false:
				this.tasks.splice(this.tasks.indexOf(element), 1);
				this.tasks.splice(this.tasks.indexOf(element) + (this.tasks.length/2), 0, element);
			break;
		}
		// Reset state
		this.aColor = 'grey-2';
		this.bColor = 'grey-2';
		this.cColor = 'grey-2';
		this.success = false;
		this.alreadyGuessed = false;
		this.randomRightAnswerLocationGenerator();
		this.randomWrongAnswerGenerator();
	}

	public resetScore() {
		QuizViewModule.resetScore();
	}

	beforeMount() {
		firebase.auth().onAuthStateChanged(() => {
			this.loadData();
		})
	}

	public async loadData() {
		await DocumentModule.loadDocument(this.$route.params.id);
		this.randomRightAnswerLocationGenerator();
		this.randomWrongAnswerGenerator();
	}
}

</script>

<style lang="scss" scoped>

.title {
	font-size: 4em;
	padding: 15px;
}

.q-pa-md {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.q-textarea .q-field__native {
	text-align: center;
}

.o-quiz {
	width: 100%;
	max-width: 700px;
	
	&__card {
		min-height: 350px;
		display: flex;
		flex-direction:  column;
		justify-content: space-between;
		padding: 10px;

		&__flipCard {
			display: inline;
		}

		&__title {
			font-size: 2em;
			line-height: 2.75em;
		}

		&__body {
			font-size: 1.75vmax;
			display: flex;
			flex-direction: column;
			align-items: center;
			&__button {
				width: 100%;
				margin-bottom: 10px;
				min-height: 80px; 
			}
		}
	}
	&__actions {
		justify-content: space-between;
		&__action {
			margin-right: 20px;
		}
	}

}

@media (max-width: 600px) {
.title {
	font-size: 2em;
}

.o-quiz {
	max-width: 95%;

	&__card {
		min-height: 320px;
		&__title {
			font-size: 1.5em;
			line-height: 3.0em;
		}
	}

}
}

</style>