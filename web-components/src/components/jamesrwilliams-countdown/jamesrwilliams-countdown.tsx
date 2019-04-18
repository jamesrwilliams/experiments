import {Component, Prop, State} from '@stencil/core';

@Component({
  tag: 'jamesrwilliams-countdown',
  styleUrl: 'jamesrwilliams-countdown.css'
})
export class JamesRWilliamsCountdownComponent {

  @Prop() endDate: string = '';
  @Prop() delimiter: string = ', ';

  @State() clock_active: boolean = false;
  @State() countdown_days: string = '0';
  @State() countdown_hours: string = '0';
  @State() countdown_minutes: string = '0';
  @State() countdown_seconds: string = '0';

  /**
   * Check if the provided date string is valid and usable.
   *
   * @param dateString
   * @returns boolean Whether or not the date string is valid.
   */
  isValidDate = function(dateString) {

    return !(dateString === '' || typeof dateString !== 'string' || !Date.parse(dateString));

  };

  isDateInFuture = (dateString) => {
    return new Date(dateString).getTime() > new Date().getTime();
  };

  isValidEndDate = (dateString) => {

    return (this.isValidDate(dateString) && this.isDateInFuture(dateString));

  };

  getTimeRemaining = () => {

    const date = this.endDate;
    const start_date = new Date().getTime();
    const end_date = new Date(date).getTime();

    var t = ( end_date - start_date );
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor(((t/(1000*60*60)) % 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  updateClock = () : any  => {

    this.clock_active = true;

    const t = this.getTimeRemaining();
    this.countdown_days = ('0' + t.days).slice(-2);
    this.countdown_hours = ('0' + t.hours).slice(-2);
    this.countdown_minutes = ('0' + t.minutes).slice(-2);
    this.countdown_seconds = ('0' + t.seconds).slice(-2);
  };

  activate_clock = () => {
    if( ! this.clock_active ) {
      this.updateClock();
      setInterval(() => {
        this.updateClock();
      }, 1000);
      this.clock_active = true;
    }
  };

  render() {

    this.activate_clock();

    return (
      <div class="countdown-container">
        <div class="countdown-inner">
            <span part="countdown-digit">{ this.countdown_days }</span>
            <span part="countdown-delimiter"> days{ this.delimiter }</span>
            <span part="countdown-digit">{ this.countdown_hours }</span>
            <span part="countdown-delimiter"> hours{ this.delimiter }</span>
            <span part="countdown-digit">{ this.countdown_minutes }</span>
            <span part="countdown-delimiter"> minutes{ this.delimiter }</span>
            <span part="countdown-digit">{ this.countdown_seconds }</span>
            <span part="countdown-delimiter">seconds</span>
          </div>
        <slot/>
      </div>
    );
  }
}
