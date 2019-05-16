import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Variables
  milesToKingsLanding: number;
  startingWights: number;
  armyOfTheDeadMilesPerDay: number;
  startingWhiteWalkers: number;
  whiteWalkerRecruitmentInterval: number;
  whiteWalkerRecruitmentVolume: number;
  nightsWatchAttackInterval: number;
  nightsWatchAttackMinimum: number;
  nightsWatchAttackCritChance: number;

  // Calculations
  daysToKingsLanding: number;
  whiteWalkerRecruitmentOpportunities: number;
  whiteWalkerRecruitmentPerDay: number;
  newWightsPerDay: number;
  totalWightsWhenReachingKingsLanding: number;
  nightsWatchAttackOpportunities: number;
  nightsWatchTotalKills: number;



  // Constants.
  minutesPerDay = 24 * 60;

  // Lets try reactive forms.
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {

    this.milesToKingsLanding = 500;
    this.startingWights = 500;
    this.armyOfTheDeadMilesPerDay = 12;
    this.startingWhiteWalkers = 6;
    this.whiteWalkerRecruitmentInterval = 90;
    this.whiteWalkerRecruitmentVolume = 10;
    this.nightsWatchAttackInterval = 50; // Miles
    this.nightsWatchAttackMinimum = 30;
    this.nightsWatchAttackCritChance = 0.35;

    this.myForm = this.formBuilder.group({
      milesToKingsLanding: 500,
      startingWights: 500,
      armyOfTheDeadMilesPerDay: 12,
      startingWhiteWalkers: 6,
      whiteWalkerRecruitmentInterval: 90,
      whiteWalkerRecruitmentVolume: 10,
      nightsWatchAttackInterval: 50,
      nightsWatchAttackMinimum: 30,
      nightsWatchAttackCritChance: 0.35,
    });

    this.updateCalcs();
    this.onChanges();
  }

  onChanges(): void {

    this.myForm.valueChanges.subscribe(val => {

      this.milesToKingsLanding = val.milesToKingsLanding;
      this.startingWights = val.startingWights;
      this.armyOfTheDeadMilesPerDay = val.armyOfTheDeadMilesPerDay;
      this.startingWhiteWalkers = val.startingWhiteWalkers;
      this.whiteWalkerRecruitmentInterval = val.whiteWalkerRecruitmentInterval;
      this.whiteWalkerRecruitmentVolume = val.whiteWalkerRecruitmentVolume;
      this.nightsWatchAttackInterval = val.nightsWatchAttackInterval;
      this.nightsWatchAttackMinimum = val.nightsWatchAttackMinimum;
      this.nightsWatchAttackCritChance = val.nightsWatchAttackCritChance;

      this.updateCalcs();
    });
  }

  updateCalcs() {
    this.daysToKingsLanding = this.milesToKingsLanding / this.armyOfTheDeadMilesPerDay;
    this.whiteWalkerRecruitmentOpportunities = this.minutesPerDay / this.whiteWalkerRecruitmentInterval;
    this.whiteWalkerRecruitmentPerDay = this.whiteWalkerRecruitmentOpportunities * this.whiteWalkerRecruitmentVolume;
    this.newWightsPerDay = this.whiteWalkerRecruitmentPerDay * this.startingWhiteWalkers;
    this.totalWightsWhenReachingKingsLanding = ( this.newWightsPerDay * this.daysToKingsLanding ) + this.startingWights;
    this.nightsWatchAttackOpportunities = this.milesToKingsLanding / this.nightsWatchAttackInterval;
    this.nightsWatchTotalKills = this.nightsWatchAttackOpportunities * this.nightsWatchAttackMinimum;
  }

}
