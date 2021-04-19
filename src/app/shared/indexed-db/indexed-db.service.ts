import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

declare var window: any;

@Injectable({
    providedIn: 'root'
})
export class IndexedDBService {


    constructor(
        private dbService: NgxIndexedDBService
    ) {
    }

    public async add(storeName: string, value: any, key?: number): Promise<number> {
        return await this.dbService.add(storeName, value, key)
        .toPromise();
    }

    public async update(storeName: string, value: any, key?: number): Promise<any> {
        return await this.dbService.update(storeName, value)
        .toPromise();
    }

    public async getById(storeName: string, key: number): Promise<any> {
        return await this.dbService.getByKey(storeName, key)
        .toPromise();
    }

    public async getAll(storeName: string): Promise<any> {
        return await this.dbService.getAll(storeName)
        .toPromise();
    }


}
