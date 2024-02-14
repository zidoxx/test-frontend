import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { PromotionsCardComponent } from './components/promotions-card/promotions-card.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { flightProvider } from './core/injection-token/injection-token';

@NgModule({
  declarations: [
    AppComponent,
    PromotionsComponent,
    PromotionsCardComponent,
    SearchComponent,
    SearchResultsComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    flightProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
