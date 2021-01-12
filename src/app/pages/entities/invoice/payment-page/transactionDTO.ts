import { PaymentInfo } from "../../payment-info";
import { Invoice } from "../invoice.model";

export class TransactionDOT {
    constructor(
        public paymentInfo: PaymentInfo,
        public invoice: Invoice
    ) { }
}