import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MainModule } from "../main/main.module";
import { ToolbarModule } from "../toolbar/toolbar.module";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MainModule,
        ToolbarModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }