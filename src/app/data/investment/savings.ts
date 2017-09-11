import { InvestmentType } from '../../enums/investment-type.enum';
import { IInvestment } from '../../interfaces/iinvestment';

export class Savings implements IInvestment {
  $key: string;
  type: InvestmentType; 
  bank: string;
  investmentDate: string;
  value: number;

  constructor(bank: string, value: number, investmentDate: string = null) {
    if (investmentDate)
      this.investmentDate = investmentDate;
    else
      this.investmentDate = new Date().toLocaleString();

    this.type = InvestmentType.Savings;
    this.bank = bank;
    this.value = value;
  }
}
