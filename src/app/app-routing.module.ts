import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ContestEntryFormComponent } from './contest-entry-form/contest-entry-form.component';
import { MenuItemIdResolver } from './shared/menu-item-id.resolver';
import { MultimediaTabsComponent } from './multimedia-tabs/multimedia-tabs.component';
import { EditMenuOptionsComponent } from './admin/edit-menu-options/edit-menu-options.component';
import { WriteANoteComponent } from './write-a-note/write-a-note.component';
import { ArtistListingsComponent } from './artist-listings/artist-listings.component';
import { SuperComputerComponent } from './super-computer/super-computer.component';
import { HomeComponent } from './home/home.component';
import { TitleResolver } from './shared/title.resolver';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { DashboardComponent } from './charts/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'super-computer', component: SuperComputerComponent, resolve: { title: TitleResolver }},
  {
    path: 'main',
    component: LayoutComponent,
    children: [
      { path: 'media', redirectTo: 'media/butters', pathMatch: 'full' },
      { path: 'media/:key', component: MultimediaTabsComponent, resolve: { menuItemId: MenuItemIdResolver, title: TitleResolver } },
      { path: 'enter-to-win', component: ContestEntryFormComponent, resolve: { menuItemId: MenuItemIdResolver, title: TitleResolver } },
      { path: 'write-a-note', component: WriteANoteComponent, resolve: { menuItemId: MenuItemIdResolver, title: TitleResolver } },
      { path: 'admin/menu-options', component: EditMenuOptionsComponent, resolve: { menuItemId: MenuItemIdResolver, title: TitleResolver } },
      { path: 'music/artist-listing', component: ArtistListingsComponent, resolve: { menuItemId: MenuItemIdResolver, title: TitleResolver } },
      { path: 'home', component: HomeComponent, resolve: { menuItemId: MenuItemIdResolver, title: TitleResolver } },
      { path: 'line-chart', component: LineChartComponent },
      { path: 'dashboard', component: DashboardComponent, resolve: { menuItemId: MenuItemIdResolver, title: TitleResolver }},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '/main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
