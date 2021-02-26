import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgbComponent } from './pages/agb/agb.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { AccountComponent } from './pages/account/account.component';
import { InfoComponent } from './pages/info/info.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
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
  { path: 'account', component: AccountComponent },
  { path: 'info', component: InfoComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  {
    path: 'configurator',
    loadChildren: () =>
      import('./configurator/configurator.module').then(
        (m) => m.ConfiguratorModule
      ),
  },
  { path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
