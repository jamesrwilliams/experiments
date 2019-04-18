import { newE2EPage } from '@stencil/core/testing';

describe('points-countdown', () => {

  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<jamesrwilliams-countdown></jamesrwilliams-countdown>');
    const element = await page.find('points-countdown');
    expect(element).toHaveClass('hydrated');
  });

  // it('has the correct number of spans for the countdown', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent('<jamesrwilliams-countdown></jamesrwilliams-countdown>');
  //   const component = await page.find('jamesrwilliams-countdown');
  //
  //   expect(component).toEqual(false);
  // });

  // it('renders correctly when the end date is incorrect', async () => {
  //   const page = await newE2EPage();
  //   await page.setContent('<jamesrwilliams-countdown></jamesrwilliams-countdown>');
  //   const component = await page.find('jamesrwilliams-countdown');
  //
  //   expect(component).toEqual(true);
  // });

  it('displays correctly when a end date is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<jamesrwilliams-countdown></jamesrwilliams-countdown>');
    const component = await page.find('points-countdown');
    const element = await page.find('points-countdown .jamesrwilliams-countdown-digit');

    component.setProperty('endDate', '2050-05-05T12:00');
    await page.waitForChanges();

    console.log(`Element count: ${element}`);

    // expect(element).toEqual(true);
  });

  // it('renders changes to the name data', async () => {
  //   const page = await newE2EPage();
  //
  //   await page.setContent('<jamesrwilliams-countdown></jamesrwilliams-countdown>');
  //   const component = await page.find('jamesrwilliams-countdown');
  //   const element = await page.find('jamesrwilliams-countdown >>> div');
  //   expect(element.textContent).toEqual(`Hello, World! I'm `);
  //
  //   component.setProperty('first', 'James');
  //   await page.waitForChanges();
  //   expect(element.textContent).toEqual(`Hello, World! I'm James`);
  //
  //   component.setProperty('last', 'Quincy');
  //   await page.waitForChanges();
  //   expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);
  //
  //   component.setProperty('middle', 'Earl');
  //   await page.waitForChanges();
  //   expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  // });
});
