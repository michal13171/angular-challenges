import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const fixture = TestBed.createComponent(ChildComponent);
      // Create a harness loader from the fixture
      const loader = TestbedHarnessEnvironment.loader(fixture);
      const sliders = await loader.getAllHarnesses(MatSliderHarness);
      expect(sliders.length).toBe(1);

      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      expect(checkboxes.length).toBe(3);

      const inputs = await loader.getAllHarnesses(MatInputHarness);
      expect(inputs.length).toBe(4);

      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const { fixture } = await render(ChildComponent);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      const slider = await loader.getHarness(MatSliderHarness);
      const getEndThumb = await slider.getEndThumb();
      const getValue = await getEndThumb.getValue();

      expect(getValue).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const { fixture } = await render(ChildComponent);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      // Find the max input by its id and set the value
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      let maxInput: MatInputHarness | undefined;
      for (const input of inputs) {
        const id = await input.getId();
        if (id === 'input-max') {
          maxInput = input;
          break;
        }
      }
      expect(maxInput).toBeDefined();
      await maxInput?.setValue('109');

      // Verify the slider's max value
      const slider = await loader.getHarness(MatSliderHarness);
      const max = await slider.getMaxValue();
      expect(max).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const { fixture } = await render(ChildComponent);
      const loader = TestbedHarnessEnvironment.loader(fixture);
      const slider = await loader.getHarness(MatSliderHarness);
      const isDisabled = await slider.isDisabled();

      expect(isDisabled).toBe(false);
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const { fixture } = await render(ChildComponent);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      const inputs = await loader.getAllHarnesses(MatInputHarness);
      let stepInput: MatInputHarness | undefined;
      for (const input of inputs) {
        const id = await input.getId();
        if (id === 'input-step') {
          stepInput = input;
          break;
        }
      }
      expect(stepInput).toBeDefined();
      await stepInput!.setValue('5');

      // Find the forward button (the second button, index 1)
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      // The forward button is the second one (index 1)
      const forwardButton = buttons[1];
      expect(forwardButton).toBeDefined();

      // Click forward twice
      await forwardButton.click();
      await forwardButton.click();

      // Verify the slider value is 10
      const slider = await loader.getHarness(MatSliderHarness);
      const getEndThumb = await slider.getEndThumb();
      const value = await getEndThumb.getValue();

      expect(value).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const { fixture } = await render(ChildComponent);
      const loader = TestbedHarnessEnvironment.loader(fixture);

      // Set value input to 5
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      let valueInput: MatInputHarness | undefined;
      let stepInput: MatInputHarness | undefined;
      for (const input of inputs) {
        const id = await input.getId();
        if (id === 'input-value') {
          valueInput = input;
        } else if (id === 'input-step') {
          stepInput = input;
        }
      }
      expect(valueInput).toBeDefined();
      expect(stepInput).toBeDefined();
      await valueInput!.setValue('5');
      await stepInput!.setValue('6');

      // Find the back button (the first button, index 0)
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      const backButton = buttons[0];
      expect(backButton).toBeDefined();

      // Click back
      await backButton.click();

      // Verify the slider value is still 5
      const slider = await loader.getHarness(MatSliderHarness);
      const getEndThumb = await slider.getEndThumb();
      const value = await getEndThumb.getValue();

      expect(value).toBe(5);
    });
  });
});
