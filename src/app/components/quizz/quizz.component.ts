import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', './quizz.responsive.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  quizz: any;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      const quizzLength = quizz_questions.length;

      this.quizz = quizz_questions[this.generateRandomNumber(quizzLength)];

      this.shuffleArray();

      this.finished = false;
      this.title = this.quizz.title;

      this.questions = this.quizz.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);

      this.finished = true;
      this.answerSelected =
        this.quizz.results[finalAnswer as keyof typeof this.quizz.results];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current) => {
      const previousCount = answers.filter((item) => item === previous).length;
      const currentCount = answers.filter((item) => item === current).length;

      return previousCount > currentCount ? previous : current;
    });

    return result;
  }

  generateRandomNumber(max: number): number {
    const randomNumber = Math.floor(Math.random() * max);

    return randomNumber;
  }

  shuffleArray(): void {
    for (let i = this.quizz.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [this.quizz.questions[i], this.quizz.questions[j]] = [
        this.quizz.questions[j],
        this.quizz.questions[i],
      ];
    }
  }
}
