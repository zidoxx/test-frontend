import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { SearchComponent } from "./components/search/search.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./components/footer/footer.component";
import { PromotionsComponent } from "./components/promotions/promotions.component";
import { PromotionsCardComponent } from "./components/promotions-card/promotions-card.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [AppComponent, PromotionsComponent, PromotionsCardComponent, SearchComponent, FooterComponent, NavbarComponent],
  imports: [CommonModule, ReactiveFormsModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
