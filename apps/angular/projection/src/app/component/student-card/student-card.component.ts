import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card></app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit, AfterViewInit {
  @ViewChild(CardComponent)
  item!: CardComponent;

  private students: Student[] = [];
  cardType = CardType.STUDENT;
  image = 'student.webp';

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => {
      this.students = s;

      if (this.item) {
        this.updateCard();
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateCard();
  }

  private updateCard(): void {
    this.item.setData(
      this.students,
      this.cardType,
      this.image,
      'bg-light-green',
    );
  }
}
