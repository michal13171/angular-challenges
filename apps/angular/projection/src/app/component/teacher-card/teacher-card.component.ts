import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit, AfterViewInit {
  @ViewChild(CardComponent)
  item!: CardComponent;

  private teachers: Teacher[] = [];
  cardType = CardType.TEACHER;
  image = 'teacher.png';

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => {
      this.teachers = t;

      if (this.item) {
        this.updateCard();
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateCard();
  }

  private updateCard(): void {
    this.item.setData(this.teachers, this.cardType, this.image, 'bg-light-red');
  }
}
