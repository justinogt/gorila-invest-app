import { InvestmentType } from '../../enums/investment-type.enum';
import { Savings } from './savings';


export class PrivateTitle extends Savings {
  titleName: string;
  investmentReturn: number;

  constructor(bank: string, titleName: string, value: number,
    investmentReturn: number, investmentDate: string = "") {
    super(bank, value, investmentDate);

    this.type = InvestmentType.PrivateTitle;
    this.titleName = titleName;
    this.investmentReturn = investmentReturn;
  }
}
