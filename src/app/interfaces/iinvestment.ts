import { InvestmentType } from '../enums/investment-type.enum';

export interface IInvestment {
  $key: string; // Fireabse key
  type: InvestmentType; // Type: Savings, PrivateTitle, PublicTitle, ...
  bank: string;
  investmentDate: string;
  value: number;
}
