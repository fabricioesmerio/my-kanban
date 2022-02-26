import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../shared/API/crud.service';
import { List } from '../shared/models/list.model';
import { environment } from 'src/environments/environment';



@Injectable({
    providedIn: 'root',
})
export class ListService extends CrudService<List, number> {

    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.baseUrl}/List`);
    }

}