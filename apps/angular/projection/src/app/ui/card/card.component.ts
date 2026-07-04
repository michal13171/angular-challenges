import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CardType } from '../../model/card.model';
import { CardService } from '../../services/card.service';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  standalone: true,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }

      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [ListItemComponent, CommonModule],
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-template #cardContent>
        <img [src]="'assets/img/' + image" alt="" width="200px" />

        <section>
          <app-list-item *ngFor="let item of list"></app-list-item>
          <!--          <ng-content></ng-content>-->
        </section>

        <button
          class="rounded-sm border border-blue-500 bg-blue-300 p-2"
          (click)="addNewItem()">
          Add
        </button>
      </ng-template>

      <ng-container *ngTemplateOutlet="cardContent"></ng-container>
    </div>
  `,
})
export class CardComponent implements AfterViewInit {
  @ViewChildren(ListItemComponent)
  items!: QueryList<ListItemComponent>;

  list: any[] = [];
  type!: CardType;
  customClass: string = 'bg-light-red';
  image: string = 'teacher.png';

  setData(list: any[], type: CardType, image: string, customClass: string) {
    this.list = list;
    this.type = type;
    this.image = image;
    this.customClass = customClass;
    this.cd.detectChanges();
  }

  constructor(
    private cardService: CardService,
    private cd: ChangeDetectorRef,
  ) {}

  addNewItem() {
    this.cardService.addOne(this.type);
  }

  ngAfterViewInit() {
    this.items.changes.subscribe(() => this.sync());
  }

  private sync(): void {
    if (!this.list?.length) return;
    const children = this.items.toArray();

    this.list.map((item, i) => {
      if (!item) return;

      children[i].name = item.firstName ?? item.name;
      children[i].id = item.id;
      children[i].type = this.type;
    });

    this.cd.detectChanges();
  }
}
