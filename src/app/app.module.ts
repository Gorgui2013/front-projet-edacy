import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { SingleArticleComponent } from './components/single-article/single-article.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'single-article/:id', component: SingleArticleComponent },
  {path: '', redirectTo: 'articles', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

/**
 * Custom angular notifier options
 */
 const customNotifierOptions: NotifierOptions = {
   position: {
     horizontal: {
       position: 'right',
       distance: 12
     },
     vertical: {
       position: 'top',
       distance: 60,
       gap: 10
     }
   },
   animations: {
     enabled: true,
     show: {
       preset: 'slide',
       speed: 300,
       easing: 'ease'
     },
     hide: {
       preset: 'fade',
       speed: 300,
       easing: 'ease',
       offset: 50
     },
     shift: {
       speed: 300,
       easing: 'ease'
     },
     overlap: 150
   }
 };


@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    SingleArticleComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{preloadingStrategy: PreloadAllModules}),
    NgxPaginationModule,
    NotifierModule.withConfig(customNotifierOptions),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
