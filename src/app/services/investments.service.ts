import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserService } from './user.service';
import { InvestmentType } from '../enums/investment-type.enum';
import { IInvestment } from '../interfaces/iinvestment';
import { PrivateTitle } from '../data/investment/private-title';
import { Savings } from '../data/investment/savings';

@Injectable()
export class InvestmentsService {
  patrimony: BehaviorSubject<number> = new BehaviorSubject(0);
  savings: BehaviorSubject<Savings[]> = new BehaviorSubject([]);
  privateTitles: BehaviorSubject<PrivateTitle[]> = new BehaviorSubject([]);

  private _afSavings: FirebaseListObservable<any> = null;
  private _afPrivateTitles: FirebaseListObservable<any> = null;
  private _subSavings: any;
  private _subPrivateTitles: any;
  private _isInitialized: boolean = false;

  constructor(public userService: UserService,
    private dbFire: AngularFireDatabase) { }

  initialize() {
    return new Promise<void>(
      (resolve, reject) => {
        if (this._isInitialized) {
          resolve();
          return;
        }

        let userId = this.userService.afAuth.auth.currentUser.uid;
        this._afSavings = this.dbFire.list(`investments/${userId}/${this.getInvestmentTypeName(InvestmentType.Savings)}`);
        this._afPrivateTitles = this.dbFire.list(`investments/${userId}/${this.getInvestmentTypeName(InvestmentType.PrivateTitle)}`);

        this._subSavings = this._afSavings.subscribe(savings => {
          this.savings.next(savings);
          this.patrimony.next(this.getPatrimony());
        });
        this._subPrivateTitles = this._afPrivateTitles.subscribe(privateTitles => {
          this.privateTitles.next(privateTitles);
          this.patrimony.next(this.getPatrimony());
        });

        this.userService.onUserLogoutEvent.push(() => {
          this._isInitialized = false;
          this._subSavings.unsubscribe();
          this._subPrivateTitles.unsubscribe();
        });

        this._isInitialized = true;
        resolve();
      }
    );
  }

  getInvestment(type: InvestmentType, id): FirebaseObjectObservable<any> {
    return this.dbFire.object(`investments/${this.userService.getUserId()}/${this.getInvestmentTypeName(type)}/${id}`);
  }

  add(investment: IInvestment) {
    return this.getInvestmentsObservable(investment.type).push(investment);
  }
  update(investment: IInvestment) {
    return this.getInvestmentsObservable(investment.type).update(investment.$key, investment);
  }
  remove(investment: IInvestment) {
    return this.getInvestmentsObservable(investment.type).remove(investment.$key);
  }

  private getPatrimony(): number {
    var patrimony: number = this.sumInvestments(this.savings.getValue());
    patrimony += this.sumInvestments(this.privateTitles.getValue());
    return patrimony; 
  }
  private sumInvestments(investments: IInvestment[]): number {
    if (!investments) return 0;
    var sum = 0;
    for (let i = 0; i < investments.length; i++)
      sum += investments[i].value;
    return sum;
  }

  private getInvestmentsObservable(type: InvestmentType): FirebaseListObservable<any> {
    switch (type) {
      case InvestmentType.Savings:
        return this._afSavings;
      case InvestmentType.PrivateTitle:
        return this._afPrivateTitles;
    }
  }

  private getInvestmentTypeName(type: InvestmentType): string {
    return InvestmentType[type];
  }
}
