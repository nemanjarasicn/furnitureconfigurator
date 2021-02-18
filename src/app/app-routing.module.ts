import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgbComponent } from './pages/agb/agb.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { AccountComponent } from './pages/account/account.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { CompleteConfigurationComponent } from './pages/complete-configuration/complete-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  { path: 'agb', component: AgbComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'complete-configuration', component: CompleteConfigurationComponent },
  { path: 'thanks', component: ThanksComponent },
  { path: 'account', component: AccountComponent },
  {
    path: 'configurator',
    loadChildren: () =>
      import('./configurator/configurator.module').then(
        (m) => m.ConfiguratorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
