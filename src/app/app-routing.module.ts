import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";

const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            }
        ]
    },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }