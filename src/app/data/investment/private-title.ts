import { InvestmentType } from '../../enums/investment-type.enum';
import { Savings } from './savings';


export class PrivateTitle extends Savings {
  
  constructor(bank: string, name: string, value: number,
    investmentReturn: number, investmentDate: string = "") {
    super(bank, value, investmentDate);

    this.type = InvestmentType.PrivateTitle;
    this.name = name;
    this.investmentReturn = investmentReturn;
  }
}
