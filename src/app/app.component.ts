import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
    selector: 'app-root',
    // templateUrl: './app.component.html',
    template: `<router-outlet></router-outlet>`,
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app-trello';

    constructor(
        private dbService: NgxIndexedDBService
    ) { }

    async ngOnInit() {
        // let x = await this.dbService.add('tasks', {
        //     title: 'Olá',
        //     teste: [
        //         {
        //             id: 1,
        //             text: 'Olaaa'
        //         },
        //         {
        //             id: 2,
        //             text: 'Olaaa222'
        //         },
        //         {
        //             id: 3,
        //             text: 'Olaaa3333'
        //         }

        //     ]
        // }).toPromise();
        let x = await this.dbService.getByKey('tasks', 1).toPromise();
        console.log(x)
    }



}
