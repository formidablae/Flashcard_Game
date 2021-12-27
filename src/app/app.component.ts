import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFlash } from './flash.model';
import { FlashService } from './services/flash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('flashForm', { static: true }) flashForm!: NgForm;

  flash = {
    question: '',
    answer: '',
  } as { question: string, answer: string };

  flashs: IFlash[];

  editing = false;

  editingId!: number;

  subscription: any;

  constructor(private flashService: FlashService) {
    this.flashs = this.flashService.flashs;
  }

  ngOnInit(): void {
    this.subscription = this.flashService.flashs$.subscribe(flashs => {
      this.flashs = flashs;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  trackByFlashId(index: number, flash: IFlash): number {
    return flash.id as number;
  }

  handleToggleCard(flashId: number): void {
    this.flashService.toggleFlash(flashId);
  }

  handleDelete(flashId: number): void {
    this.flashService.deleteFlash(flashId);
  }

  handleEdit(flashId: number): void {
    this.editing = true;
    this.editingId = flashId;
    this.flash = this.flashService.getFlash(flashId);
  }

  handleUpdate(): void {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleRememberedChange({ flashId, flag }: { flashId: number, flag: 'correct' | 'incorrect' }): void {
    this.flashService.rememberedChange({ flashId, flag });
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
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
