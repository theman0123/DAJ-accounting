import { fromJS } from 'immutable'
import {
  UPDATE_COMPANY_NAME,
  AMOUNT,
  ADD_RECIPIENT,
  REMOVE_RECIPIENT,
  CONFIRM_AND_LOCK,
  INVOICE_ID,
  DATE,
  SUBJECT,
  NOTES,
  ADD_ROW,
  SET_ROW_ID
} from '../actions/invoice'

// const initialInvoice = {
//  amount: 0,
//  rowId: null,
//  confirmed: false,
// }

// 12345(objectId/rowId):{
//     amount(inputType): 150.00,
//     id(objectId/rowId): 12345,
//     confirmed(confirmAndLock()): true,
//  }
// const manageInvoice = (state = initialInvoice, action) => {
//  switch(inputType) {
//    case INVOICE_ID:
//      return state.merge({
//        rowId: action.rowId
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
  maxRowId: 1,
  currentRowId: 1,
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
    case ADD_ROW:
      return state.update('maxRowId', val => val += 1)
    case SET_ROW_ID:
      return state.merge({currentRowId: action.payload > 0 ? action.payload : state.get('maxRowId')})
    case INVOICE_ID:
      return state.setIn(['invoices', action.rowId, 'invoiceId'], action.payload)
    case DATE:
      return state.setIn(['invoices', action.rowId, 'date'], action.payload)
    case AMOUNT:
      return state.setIn(['invoices', action.rowId, 'amount'], action.payload)
    case NOTES:
      return state.setIn(['invoices', action.rowId, 'notes'], action.payload)
    case CONFIRM_AND_LOCK:
      return state.setIn(['invoices', action.rowId, 'confirmAndLock'], true)
    default:
      return state
  }
}
