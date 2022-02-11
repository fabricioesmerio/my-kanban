import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ListService } from './list.service';
import { List } from '../shared/models/list.model';
import { Task } from '../shared/models/task.module';
import { TasktService } from './task.service';
import { ViewTaskComponent } from '../view-task/view-task.component';

import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    @ViewChild('inputTitleList') inputTitleList: ElementRef;
    @ViewChild('textareaAddCard') textareaAddCard: ElementRef;
    @ViewChild('inputEditTitleList') inputEditTitleList: ElementRef;


    connectedTo = [];
    showAddList: boolean = false;
    showAddCard: boolean = false;
    indexListAddCard: number = null;
    lists: any[] = [];
    tasks: any[] = [];
    modelList: any = {};
    modelTask: Task;
    editingTitleList: number = null;


    constructor(
        private render: Renderer2,
        private listService: ListService,
        private taskService: TasktService,
        private toastr: ToastrService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.initialize();
    }

    private async initialize() {
        this.initializeModelList();
        this.initializeModelTask();
        this.lists = await this.getAllList();
        this.lists.sort((a, b) => {
            return a.position > b.position ? 1 : -1;
        });
        this.tasks = await this.getAllTask();
        this.factory();
    }

    private factory() {
        this.lists.forEach(item => {
            item.children = [];
            this.tasks.forEach(el => {
                if (item.id == el.listId) {
                    item.children.push(el);
                }
            })
        })
    }

    private initializeModelList() {
        this.modelList = new List(null, null, null);
    }

    private initializeModelTask() {
        this.modelTask = new Task(null, null, null, null, null);
    }

    getAllList(): Promise<List[]> {
        return this.listService.findAll().toPromise();
    }

    getAllTask(): Promise<Task[]> {
        return this.taskService.findAll().toPromise();
    }

    private async saveList(): Promise<any> {

        try {
            if (this.modelList.id) {
                const { id, children, createdAt, updatedAt, ..._model } = this.modelList;
                let response: any = await this.listService.update(this.modelList['id'], _model).toPromise();
                if (response.dados) {
                    this.lists.forEach(lista => {
                        if (lista.id == this.modelList.id) {
                            Object.assign(lista, this.modelList);
                        }
                    });
                    this.editingTitleList = null;
                    this.initializeModelList();
                }
            } else {
                this.modelList.position = this.lists.length;
                let response: any = await this.listService.save(this.modelList).toPromise();
                if (response.dados && response.dados.id) {
                    Object.assign(this.modelList, response.dados);
                    this.showAddList = false;
                    this.lists.push(this.modelList);
                    this.initializeModelList();
                }
            }
        } catch (error) {
            console.error('Ocorreu um erro! E qual foi o erro::: ', error.error.message);
            this.toastr.error(error.error.message,'Erro!');
        }
    }

    private async saveTask(): Promise<any> {

        try {
            if (this.modelTask['id']) {

            } else {
                this.modelTask['position'] = this.tasks.length;
                let response: any = await this.taskService.save(this.modelTask).toPromise();
                if (response.dados && response.dados.id) {
                    Object.assign(this.modelTask, response.dados);
                    this.showAddCard = false;
                    this.tasks.push(this.modelTask);
                    this.factory();
                }
            }
        } catch (error) {
            console.error(error);
        }

        
    }



    /**
     * DRAG DROP
     */

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }



    /**
     * Adicionar Lista
     */
    listenInputChangeList(event: KeyboardEvent): void {
        if (event.key == 'Enter') {
            this.saveList();
        }
    }

    /**
     * Adicionar Task
     */
    listenInputChangeTask(event: KeyboardEvent) {
        if (event.key == 'Enter') {
            console.log('NEW CARD ::', this.modelTask);
            this.saveTask();
        }
    }

    onChangeShowNewList(): void {
        this.showAddList = !this.showAddList;
        if (this.showAddList) {
            requestAnimationFrame(_ => {
                this.render.selectRootElement(this.inputTitleList.nativeElement).focus();
            });
        }
    }

    onChangeNewCard(index: number): void {
        this.showAddCard = !this.showAddCard;
        if (this.showAddCard) {
            this.indexListAddCard = index;
            requestAnimationFrame(_ => {
                this.render.selectRootElement(this.textareaAddCard.nativeElement).focus();
            });
        } else {
            this.indexListAddCard = null;
        }
    }

    onEditListTitle(index: number, item: List) {
        this.editingTitleList = index;        
        Object.assign(this.modelList, item)
        requestAnimationFrame(_ => {
            this.render.selectRootElement(this.inputEditTitleList.nativeElement).focus();
            this.inputEditTitleList.nativeElement.select();
        })
    }


    openViewTask(item: Task) {
        this.dialog.open(ViewTaskComponent, {
            width: '700px',
            height: '100%',
            data: {
                model: item
            }
        })
    }

}
