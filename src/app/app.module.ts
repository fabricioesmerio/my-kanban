import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from './toolbar/toolbar.module';
import { IndexedDBService } from './shared/indexed-db/indexed-db.service';
import { MainModule } from './main/main.module';
import { ActionsBarModule } from './actions-bar/actions-bar.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';




export function migrationFactory() {
    // The animal table was added with version 2 but none of the existing tables or data needed
    // to be modified so a migrator for that version is not included.
    return {
        //   1: (db, transaction) => {
        //     const store = transaction.objectStore('people');
        //     store.createIndex('country', 'country', { unique: false });
        //   },
        //   3: (db, transaction) => {
        //     const store = transaction.objectStore('people');
        //     store.createIndex('age', 'age', { unique: false });
        //   }
    };
}

const dbConfig: DBConfig = {
    name: 'myScrum',
    version: 1,
    objectStoresMeta: [{
        store: 'tasks',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'title', keypath: 'title', options: { unique: false } },
        ]
    }, {
        store: 'cards',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'title', keypath: 'title', options: { unique: false } },
            { name: 'description', keypath: 'description', options: { unique: false } },
            { name: 'finalDate', keypath: 'finalDate', options: { unique: false } },
        ]
    }],
    migrationFactory
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        NgxIndexedDBModule.forRoot(dbConfig),
        BrowserAnimationsModule,
        HttpClientModule,
        ToolbarModule,
        MainModule,
        ActionsBarModule,

        ToastrModule.forRoot()
    ],
    providers: [
        IndexedDBService
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
