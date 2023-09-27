import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ContestEntryFormComponent } from './contest-entry-form/contest-entry-form.component';
import { EditMenuOptionsComponent } from './admin/edit-menu-options/edit-menu-options.component';
import { EditableMenuOptionComponent } from './admin/edit-menu-options/editable-menu-option/editable-menu-option.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageBoardComponent } from './image-board/image-board.component';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { ImageDisplayDialogComponent } from './image-display-dialog/image-display-dialog.component';
import { LayoutComponent } from './layout/layout.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSnackBarModule, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MenuItemComponent } from './header/header-menu/menu-item/menu-item.component';
import { MultimediaTabsComponent } from './multimedia-tabs/multimedia-tabs.component';
import { NgModule } from '@angular/core';
import { OverviewDialogComponent } from './overview-dialog/overview-dialog.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { WindowRefService } from './services/window-ref.service';
import { BasicSnackBarComponent } from './shared/basic-snack-bar/basic-snack-bar.component';
import { ConfigDataDialogComponent } from './config-data-dialog/config-data-dialog.component';
import { WriteANoteComponent } from './write-a-note/write-a-note.component';
import { ArtistListingsComponent } from './artist-listings/artist-listings.component';
import { ArtistCardComponent } from './artist-listings/artist-card/artist-card.component';
import { AlbumCardComponent } from './artist-listings/album-card/album-card.component';
import { DeviceInfoDisplayComponent } from './shared/device-info-display/device-info-display.component';
import { SizeWatcherDirective } from './shared/size-watcher.directive';
import { ArtistTableComponent } from './artist-listings/artist-table/artist-table.component';
import { SuperComputerComponent } from './super-computer/super-computer.component';
import { HomeComponent } from './home/home.component';
import { PaginatorSortDirective } from './shared/paginator-sort.directive';
import { TableSortComponent } from './shared/table-sort/table-sort.component';
import { DeviceInfoDialogComponent } from './shared/device-info-display/device-info-dialog/device-info-dialog.component';
import { DeviceInfoKvpDisplayComponent } from './shared/device-info-display/device-info-kvp-display/device-info-kvp-display.component';

@NgModule({
  declarations: [
    AppComponent,
    ContestEntryFormComponent,
    EditMenuOptionsComponent,
    EditableMenuOptionComponent,
    HeaderComponent,
    HeaderMenuComponent,
    ImageBoardComponent,
    ImageDisplayComponent,
    ImageDisplayDialogComponent,
    LayoutComponent,
    MainContentComponent,
    MenuItemComponent,
    MultimediaTabsComponent,
    OverviewDialogComponent,
    ThemeSwitcherComponent,
    BasicSnackBarComponent,
    ConfigDataDialogComponent,
    WriteANoteComponent,
    ArtistListingsComponent,
    ArtistCardComponent,
    AlbumCardComponent,
    DeviceInfoDisplayComponent,
    SizeWatcherDirective,
    ArtistTableComponent,
    SuperComputerComponent,
    HomeComponent,
    PaginatorSortDirective,
    TableSortComponent,
    DeviceInfoDialogComponent,
    DeviceInfoKvpDisplayComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTabsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTreeModule, 
    ReactiveFormsModule,
  ],
  providers: [
    { provide: Window, useValue: window },
    WindowRefService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
