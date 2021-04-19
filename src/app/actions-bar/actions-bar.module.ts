import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsBarComponent } from './actions-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        ActionsBarComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        ActionsBarComponent
    ]
})
export class ActionsBarModule { }
