import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFlash } from '../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent {
  @Input() flash: IFlash = {
    id: 1,
    question: 'React to Angular',
    answer: 'No Reaction :)',
    show: false,
  } as IFlash;

  @Output() onToggleCard = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onRememberedChange = new EventEmitter();

  toggleCard() {
    this.onToggleCard.emit(this.flash.id as number);
    // console.log("toggled flash", this.flash.id);
  }

  deleteFlash() {
    this.onDelete.emit(this.flash.id as number);
    // console.log("deleted flash", this.flash.id);
  }

  editFlash() {
    this.onEdit.emit(this.flash.id as number);
    // console.log("edit flash", this.flash.id);
  }

  markCorrect() {
    this.onRememberedChange.emit(
      {
        flashId: this.flash.id,
        flag: 'correct',
      } as { flashId: number, flag: 'correct' }
    );
    // console.log("marked Correct", this.flash.id);
  }

  markIncorrect() {
    this.onRememberedChange.emit(
      {
        flashId: this.flash.id,
        flag: 'incorrect',
      } as { flashId: number, flag: 'incorrect' }
    );
    // console.log("marked Incorrect", this.flash.id);
  }
}
