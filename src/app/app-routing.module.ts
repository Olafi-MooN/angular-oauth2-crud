import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/layout/components/not-found/not-found.component';
import { AuthLayoutComponent } from './core/layout/templates/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { MainLayoutComponent } from './core/layout/templates/main-layout/main-layout.component';

const routes: Routes = [
  // APPLICATION - MODULES
  {
    path: 'application',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@modules/application/application.module').then(
        (m) => m.ApplicationModule
      ),
  },
  {
    component: AuthLayoutComponent,
    path: 'auth',
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },

  // REDIRECT - COMPONENTS
  {
    redirectTo: 'auth/login',
    path: '',
    pathMatch: 'full',
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
