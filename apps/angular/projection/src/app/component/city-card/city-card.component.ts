import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit, AfterViewInit {
  @ViewChild(CardComponent)
  item!: CardComponent;

  private currentCities: City[] = [];
  cardType = CardType.CITY;
  image = 'city.png';

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit() {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));

    this.store.cities$.subscribe((s) => {
      this.currentCities = s;

      if (this.item) {
        this.updateCard();
      }
    });
  }

  ngAfterViewInit() {
    this.updateCard();
  }

  private updateCard() {
    this.item.setData(
      this.currentCities,
      this.cardType,
      this.image,
      'bg-light-red',
    );
  }
}
