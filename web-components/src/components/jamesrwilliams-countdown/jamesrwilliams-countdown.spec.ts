import { JamesRWilliamsCountdownComponent } from './jamesrwilliams-countdown';

it('should init to zeroed values.', () => {
  const countdown = new JamesRWilliamsCountdownComponent();

  expect(countdown.countdown_seconds).toEqual('0');
  expect(countdown.countdown_minutes).toEqual('0');
  expect(countdown.countdown_hours).toEqual('0');
  expect(countdown.countdown_days).toEqual('0');
});

it('validDate() rejects incorrect date strings', () => {
  const countdown = new JamesRWilliamsCountdownComponent();

  expect(countdown.isValidDate('')).toEqual(false);
  expect(countdown.isValidDate('sdjfdjskf')).toEqual(false);
  expect(countdown.isValidDate('2019-01-03:T000:00')).toEqual(false);
  expect(countdown.isValidDate('0000-00-00')).toEqual(false);
  expect(countdown.isValidDate('0000-00-00T00:00')).toEqual(false);
});

it('validDate() accepts correct date strings', () => {
  const countdown = new JamesRWilliamsCountdownComponent();

  expect(countdown.isValidDate('20019-02-05')).toEqual(true);
  expect(countdown.isValidDate('20019-02-05')).toEqual(true);
  expect(countdown.isValidDate( '2019-03-04T10:00')).toEqual(true);
  expect(countdown.isValidDate('2005/12/12 10:20')).toEqual(true);
  expect(countdown.isValidDate('01 Jan 2070 00:00:00 GMT')).toEqual(true);

  // While this is technically true the format will be parsed incorrectly.
  expect(countdown.isValidDate('10 06 2014')).toEqual(true);
});

it('isDateInFuture() correctly identifies dates in the future.', () => {
  const countdown = new JamesRWilliamsCountdownComponent();
  let tc; // Test case var.

  expect(countdown.isDateInFuture(``)).toEqual(true);

  expect(countdown.isDateInFuture(``)).toEqual(true);

  expect(countdown.isDateInFuture(``)).toEqual(true);

  expect(countdown.isDateInFuture(``)).toEqual(true);

  expect(countdown.isDateInFuture(`${tc.y}-${tc.m}-${tc.d}T${tc.hrs}:${tc.min}:${tc.sec}`)).toEqual(true);

});



