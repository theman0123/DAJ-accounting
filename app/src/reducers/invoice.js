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
  SET_ROW,
  SET_CURRENT_ROW_ID
} from '../actions/invoice'

const initialState = fromJS({
  companyName: '',
  recipients: [],
  subject: '',
  invoices: {
    1:{
    },
  },
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
    case SET_ROW:
      return state.setIn(['invoices', state.get('maxRowId')], fromJS({}))
    case SET_CURRENT_ROW_ID:
      return state.set('currentRowId', action.payload)
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
