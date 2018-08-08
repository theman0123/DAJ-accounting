// @flow

const FROM = 'FROM' // Do you need this?
export const SUBJECT = 'SUBJECT'
export const ADD_RECIPIENT = 'ADD_RECIPIENT'
export const REMOVE_RECIPIENT = 'REMOVE_RECIPIENT'
export const CONFIRM_AND_LOCK = 'CONFIRM_AND_LOCK'
export const INVOICE_ID = 'INVOICE_ID'
export const AMOUNT = 'AMOUNT'
export const DATE = 'DATE'
export const NOTES = 'NOTES'
export const UPDATE_COMPANY_NAME = 'UPDATE_COMPANY_NAME'
export const ADD_ROW = 'ADD_ROW'
export const SET_ROW = 'SET_ROW'
export const SET_CURRENT_ROW_ID = 'SET_CURRENT_ROW_ID'

// BBC or CC? difference?

export const updateTemplate = (
  type,
  rowId,
  payload
) =>
  ({
    type,
    rowId,
    payload,
  })

export const addAndSetNewRow = (id) => {
  return function(dispatch) {
    dispatch(addRow())
    dispatch(setRow())
    dispatch(setCurrentRowId(id))
  }
}

const addRow = () => ({
  type: ADD_ROW,
})

const setRow = () => ({
  type: SET_ROW,
})

export const setCurrentRowId = (id) => ({
  type: SET_CURRENT_ROW_ID,
  payload: id,  
})

export const updateCompanyName = (payload) => ({
  type: UPDATE_COMPANY_NAME,
  payload,
})

export const confirmAndLock = (invoiceId: invoiceIdType) => ({
  type: CONFIRM_AND_LOCK,
  invoiceId,
})

export const addRecipient = payload => ({
  type: ADD_RECIPIENT,
  payload,
})

// payload is an id
export const removeRecipient = payload => ({
  type: REMOVE_RECIPIENT,
  payload,
})
