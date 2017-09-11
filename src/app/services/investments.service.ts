import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';

import { UserService } from './user.service';
import { InvestmentType } from '../enums/investment-type.enum';
import { IInvestment } from '../interfaces/iinvestment';
import { PrivateTitle } from '../data/investment/private-title';
import { Account } from '../data/account';

@Injectable()
export class InvestmentsService {
  afAccount: FirebaseObjectObservable<any> = null;
  afSavings: FirebaseListObservable<any> = null;
  afPrivateTitles: FirebaseListObservable<any> = null;

  private _account: Account;
  private _subAccount: any;
  private _subUser: any;
  private _isInitialized: boolean = false;

  constructor(public userService: UserService,
    private dbFire: AngularFireDatabase) {
  }

  initialize() {
    return new Promise<void>(
      (resolve, reject) => {
        if (this._isInitialized) {
          resolve();
          return;
        }

        let userId = this.userService.afAuth.auth.currentUser.uid;
        this.afAccount = this.dbFire.object(`investments/${userId}/account`);
        this.afSavings = this.dbFire.list(`investments/${userId}/${this.getInvestmentTypeName(InvestmentType.Savings)}`);
        this.afPrivateTitles = this.dbFire.list(`investments/${userId}/${this.getInvestmentTypeName(InvestmentType.PrivateTitle)}`);

        this._subAccount = this.afAccount.subscribe((acc) => {
          if (acc.$exists())
            this._account = acc;
          else
            this._account = new Account(0);
        });

        this.userService.onUserLogoutEvent.push(() => {
          this._isInitialized = false;
          this._subAccount.unsubscribe();
        });

        this._isInitialized = true;
        resolve();
      }
    );
  }

  getInvestmentObservable(type: InvestmentType): FirebaseListObservable<any> {
    switch (type) {
      case InvestmentType.Savings:
        return this.afSavings;
      case InvestmentType.PrivateTitle:
        return this.afPrivateTitles;
    }
  }

  add(type: InvestmentType, investment: IInvestment) {
    this.addToAccount(investment.value);
    return this.getInvestmentObservable(type).push(investment);
  }
  update(type: InvestmentType, investment: any) {
    return this.getInvestmentObservable(type).update(investment.$key, investment);
  }
  remove(type: InvestmentType, investment: any) {
    this.addToAccount(-investment.value);
    return this.getInvestmentObservable(type).remove(investment.$key);
  }

  private getInvestmentTypeName(type: InvestmentType): string {
    return InvestmentType[type];
  }

  private addToAccount(value: number) {
    this._account.patrimony += value;
    return this.afAccount.set(this._account);
  }
}
