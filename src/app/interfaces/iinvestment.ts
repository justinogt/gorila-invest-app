import { InvestmentType } from '../enums/investment-type.enum';

export interface IInvestment {
  $key: string; // Fireabse key
  name: string;
  type: InvestmentType; // Type: Savings, PrivateTitle, PublicTitle, ...
  bank: string;
  investmentDate: string;
  investmentReturn: number;
  value: number;
}
