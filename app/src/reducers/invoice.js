import { fromJS } from 'immutable'
import {
  UPDATE_COMPANY_NAME,
  AMOUNT,
  ADD_RECIPIENT,
  REMOVE_RECIPIENT,
  CONFIRM_AND_LOCK,
  INVOICE_ID,
  SUBJECT,
} from '../actions/invoice'

// const initialInvoice = {
//  amount: 0,
//  invoiceId: null,
//  confirmed: false,
// }

// 12345(objectId/invoiceId):{
//     amount(inputType): 150.00,
//     id(objectId/invoiceId): 12345,
//     confirmed(confirmAndLock()): true,
//  }
// const manageInvoice = (state = initialInvoice, action) => {
//  switch(inputType) {
//    case INVOICE_ID:
//      return state.merge({
//        invoiceId: action.invoiceId
//      })
//    default:
//      return state;
//  };
// };

const initialState = fromJS({
  companyName: '',
  recipients: [],
  subject: '',
  invoices: {},
})

export default function invoice (state = initialState, action) {
  switch (action.type) {
    case UPDATE_COMPANY_NAME:
      return state.merge({companyName: action.payload})
    case SUBJECT:
      return state.merge({ subject: action.payload })
    case ADD_RECIPIENT:
      return state.updateIn(['recipients'], arr => arr.concat([action.payload]))
    case REMOVE_RECIPIENT:
      return state.updateIn(['recipients'], arr => arr.remove(action.payload))
    case INVOICE_ID:
      return state.setIn(['invoices', action.invoiceId, 'invoiceId'], action.payload)
    case AMOUNT:
      return state.setIn(['invoices', action.invoiceId, 'amount'], action.payload)
    case CONFIRM_AND_LOCK:
      return state.setIn(['invoices', action.invoiceId, 'confirmAndLock'], true)
    default:
      return state
  }
}
