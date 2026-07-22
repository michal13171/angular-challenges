import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  max,
  min,
  required,
} from '@angular/forms/signals';

interface MyFormModel {
  name: string;
  lastname: string;
  note: string;
  age: number;
}

@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormRoot, FormField],
  template: `
    <div class="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 class="mb-6 text-3xl font-bold text-gray-900">Simple Form</h1>

        <form [formRoot]="formData" class="space-y-6">
          <div>
            <label
              for="name"
              class="mb-2 block text-sm font-medium text-gray-700">
              Name
              <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              [formField]="formData.name"
              placeholder="Enter your name"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                formData.name().invalid() && formData.name().touched()
              " />
            @if (formData.name().invalid() && formData.name().touched()) {
              <p class="mt-1 text-sm text-red-600">Name is required</p>
            }
          </div>

          <div>
            <label
              for="lastname"
              class="mb-2 block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastname"
              type="text"
              [formField]="formData.lastname"
              placeholder="Enter your last name"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label
              for="age"
              class="mb-2 block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              [formField]="formData.age"
              placeholder="Enter your age (1-99)"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                formData.age().invalid() && formData.age().touched()
              " />
            @if (formData.age().invalid() && formData.age().touched()) {
              <p class="mt-1 text-sm text-red-600">
                @for (error of formData.age().errors(); track error) {
                  @if (error.kind === 'min') {
                    <span>Age is too low.</span>
                  }
                  @if (error.kind === 'max') {
                    <span>Age is too high.</span>
                  }
                }
              </p>
            }
          </div>

          <div>
            <label
              for="note"
              class="mb-2 block text-sm font-medium text-gray-700">
              Note
            </label>
            <input
              id="note"
              type="text"
              [formField]="formData.note"
              placeholder="Enter a note"
              class="w-full rounded-md border border-gray-300 px-4 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="formData().invalid()"
              class="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
              Submit
            </button>
            <button
              type="button"
              (click)="onReset()"
              class="flex-1 rounded-md bg-gray-600 px-4 py-2 font-medium text-white transition hover:bg-gray-700">
              Reset
            </button>
          </div>
        </form>

        @if (submittedData()) {
          <div class="mt-8 rounded-lg border border-green-200 bg-green-50 p-4">
            <h2 class="mb-2 text-lg font-semibold text-green-900">
              Submitted Data:
            </h2>
            <pre
              class="overflow-x-auto rounded border border-green-200 bg-white p-4 text-sm">
              {{ submittedData() | json }}
            </pre
            >
          </div>
        }
      </div>
    </div>
  `,
  standalone: true,
})
export class AppComponent {
  user = {
    name: '',
    lastname: '',
    note: '',
    age: 1,
  };

  formState = signal<MyFormModel>(this.user);

  formData = form(
    this.formState,
    (schemaPath) => {
      required(schemaPath.name);
      min(schemaPath.age, 1);
      max(schemaPath.age, 99);
    },
    {
      submission: {
        action: async (field) => {
          this.submittedData.set(field().value());
        },
      },
    },
  );

  submittedData = signal<MyFormModel | null>(null);

  onReset(): void {
    this.formData().reset(this.user);
    this.submittedData.set(null);
  }
}
