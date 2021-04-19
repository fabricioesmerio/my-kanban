import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../shared/models/task.module';

@Component({
    selector: 'app-view-task',
    templateUrl: './view-task.component.html',
    styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

    @ViewChild('inputTitle') inputTitle: ElementRef;

    model: any = {};
    editingTitle: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<ViewTaskComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private render: Renderer2
    ) { }

    ngOnInit(): void {
        console.log(this.data);
        Object.assign(this.model, this.data.model);
    }

    activeModeEditingTitle(): void {
        this.editingTitle = !this.editingTitle;
        requestAnimationFrame(_ => {
            this.render.selectRootElement(this.inputTitle.nativeElement).focus();
        })
    }

    focusOutTitle(): void {
        if (!this.model.title) {
            requestAnimationFrame(_ => {
                this.render.selectRootElement(this.inputTitle.nativeElement).focus();
            });
        } else {
            this.editingTitle = !this.editingTitle;
        }
    }

}
