import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/API/crud.service';
import { environment } from 'src/environments/environment';
import { Task } from '../shared/models/task.module';



@Injectable({
    providedIn: 'root',
})
export class TasktService extends CrudService<Task, number> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.baseUrl}/Task`);
    }

}