import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFlash } from './flash.model';

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('flashForm', { static: true }) flashForm!: NgForm;

  flash = {
    question: '',
    answer: '',
  } as { question: string, answer: string };

  flashs: IFlash[] = [
    {
      question: 'Question 1',
      answer: 'Answer 1',
      show: false,
      id: getRandomNumber(),
    },
    {
      question: 'Question 2',
      answer: 'Answer 2',
      show: false,
      id: getRandomNumber(),
    },
    {
      question: 'Question 3',
      answer: 'Answer 3',
      show: false,
      id: getRandomNumber(),
    },
  ] as IFlash[];

  editing = false;

  editingId!: number;

  trackByFlashId(index: number, flash: IFlash): number {
    return flash.id as number;
  }

  handleToggleCard(flashId: number): void {
    const flash = this.flashs.find(flash => flash.id === flashId) as IFlash;
    flash.show = !flash.show as boolean;
  }

  handleDelete(flashId: number): void {
    this.flashs = this.flashs.filter(flash => flash.id !== flashId) as IFlash[];
  }

  handleEdit(flashId: number): void {
    this.editing = true;
    this.editingId = flashId as number;
    const flash = this.flashs.find(flash => flash.id === flashId) as IFlash;
    this.flash = {
      question: flash.question,
      answer: flash.answer,
    } as { question: string, answer: string };
  }

  handleUpdate(): void {
    const flash = this.flashs.find(flash => flash.id === this.editingId) as IFlash;
    flash.question = this.flash.question as string;
    flash.answer = this.flash.answer as string;
    this.handleCancel();
  }

  handleRememberedChange({ flashId, flag }: { flashId: number, flag: 'correct' | 'incorrect'}): void {
    const flash = this.flashs.find(flash => flash.id === flashId) as IFlash;
    flash.remembered = flag! as 'correct' | 'incorrect';
  }

  handleSubmit(): void {
    this.flashs.push(
      {
        ...this.flash,
        id: getRandomNumber(),
      } as IFlash
    );
    this.handleClear();
  }

  handleCancel(): void {
    this.editing = false;
    this.editingId = undefined!;
    this.handleClear();
  }

  handleClear(): void {
    this.flash = {
      question: '',
      answer: '',
    } as { question: string, answer: string };
    this.flashForm.reset();
  }
}
