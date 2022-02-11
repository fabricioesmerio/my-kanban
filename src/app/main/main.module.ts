import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { BodyModule } from '../body/body.module';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    }
]

@NgModule({
    declarations: [
        MainComponent,
        ViewTaskComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        DragDropModule,
        MatDialogModule,
        ToolbarModule,
        BodyModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        MainComponent
    ]
})
export class MainModule { }
