import { Injectable } from '@angular/core';
import { IFlash } from '../flash.model';

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000);
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
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

  addFlash(flash: { question: string, answer: string }) {
    this.flashs.push(
      {
        ...flash,
        show: false,
        id: getRandomNumber() as number,
      } as IFlash,
    );
  }

  toggleFlash(flashId: number): void {
    const flash = this.flashs.find(flash => flash.id === flashId) as IFlash;
    flash.show = !flash.show as boolean;
  }

  deleteFlash(flashId: number): void {
    const indexOfElem = this.flashs.findIndex(flash => flash.id === flashId);
    this.flashs.splice(indexOfElem, 1);
  }

  rememberedChange({ flashId, flag }: { flashId: number, flag: 'correct' | 'incorrect' }): void {
    const flash = this.flashs.find(flash => flash.id === flashId) as IFlash;
    flash.remembered = flag! as 'correct' | 'incorrect';
  }

  updateFlash(editingId: number, updatedFlash: { question: string, answer: string } ): void {
    const flash = this.flashs.find(flash => flash.id === editingId) as IFlash;
    flash.question = updatedFlash.question as string;
    flash.answer = updatedFlash.answer as string;
  }

  getFlash(flashId: number): IFlash {
    return this.flashs.find(flash => flash.id === flashId) as IFlash;
  }
}
