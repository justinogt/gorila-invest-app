import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { UserService } from './user.service';

import { InvestmentType } from '../enums/investment-type.enum';
import { IInvestment } from '../interfaces/iinvestment';
import { PrivateTitle } from '../data/investment/private-title';

@Injectable()
export class InvestmentsService {

  private savings : FirebaseListObservable<any>;
  private privateTitles: FirebaseListObservable<any>;

  constructor(private userService: UserService, private dbFire: AngularFireDatabase) {
  }

  initialize() {
    return new Promise(
      (resolve, reject) => {
        this.userService.getUser().then(user => {
          this.savings = this.dbFire.list(`investments/${user.uid}/${this.getInvestmentTypeName(InvestmentType.Savings)}`);
          this.privateTitles = this.dbFire.list(`investments/${user.uid}/${this.getInvestmentTypeName(InvestmentType.PrivateTitle)}`);

          resolve();
        });
      }
    );
  }

  getInvestmentObservable(type: InvestmentType): FirebaseListObservable<any> {
    switch (type) {
      case InvestmentType.Savings:
        return this.savings;
      case InvestmentType.PrivateTitle:
        return this.privateTitles;
    }
  }

  add(type: InvestmentType, investment: any) {
    return this.getInvestmentObservable(type).push(investment);
  }
  update(type: InvestmentType, investment: any) {
    return this.getInvestmentObservable(type).update(investment.$key, investment);
  }
  remove(type: InvestmentType, investment: any) {
    return this.getInvestmentObservable(type).remove(investment.$key);
  }

  private getInvestmentTypeName(type: InvestmentType): string {
    return InvestmentType[type];
  }
}
