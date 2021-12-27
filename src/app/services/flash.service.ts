import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

  addFlash(flash: { question: string, answer: string }) {
    this.flashs = [
      ...this.flashs as IFlash[],
      {
        ...flash,
        show: false,
        id: getRandomNumber() as number,
      } as IFlash,
    ] as IFlash[];
  }

  toggleFlash(flashId: number): void {
    const indexOfElem = this.flashs.findIndex(flash => flash.id === flashId) as number;
    this.flashs = [
      ...this.flashs.slice(0, indexOfElem) as IFlash[],
      {
        ...this.flashs[indexOfElem] as IFlash,
        show: !this.flashs[indexOfElem].show as boolean,
      } as IFlash,
      ...this.flashs.slice(indexOfElem + 1) as IFlash[],
    ] as IFlash[];
    this.flashs$.next(this.flashs);
  }

  deleteFlash(flashId: number): void {
    const indexOfElem = this.flashs.findIndex(flash => flash.id === flashId) as number;
    this.flashs = [
      ...this.flashs.slice(0, indexOfElem) as IFlash[],
      ...this.flashs.slice(indexOfElem + 1) as IFlash[],
    ] as IFlash[];
    this.flashs$.next(this.flashs);
  }

  rememberedChange({ flashId, flag }: { flashId: number, flag: 'correct' | 'incorrect' }): void {
    const indexOfElem = this.flashs.findIndex(flash => flash.id === flashId) as number;
    this.flashs = [
      ...this.flashs.slice(0, indexOfElem) as IFlash[],
      {
        ...this.flashs[indexOfElem] as IFlash,
        remembered: flag as 'correct' | 'incorrect',
      } as IFlash,
      ...this.flashs.slice(indexOfElem + 1) as IFlash[],
    ] as IFlash[];
    this.flashs$.next(this.flashs);
  }

  updateFlash(editingId: number, updatedFlash: { question: string, answer: string }): void {
    const indexOfElem = this.flashs.findIndex(flash => flash.id === editingId) as number;
    this.flashs = [
      ...this.flashs.slice(0, indexOfElem) as IFlash[],
      {
        ...this.flashs[indexOfElem] as IFlash,
        ...updatedFlash,
      } as IFlash,
      ...this.flashs.slice(indexOfElem + 1) as IFlash[],
    ] as IFlash[];
    this.flashs$.next(this.flashs);
  }

  getFlash(flashId: number): IFlash {
    const indexOfElem = this.flashs.findIndex(flash => flash.id === flashId) as number;
    return this.flashs[indexOfElem] as IFlash;
  }
}
