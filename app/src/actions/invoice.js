// @flow

const FROM = 'FROM' // Do you need this?
export const SUBJECT = 'SUBJECT'
export const ADD_RECIPIENT = 'ADD_RECIPIENT'
export const REMOVE_RECIPIENT = 'REMOVE_RECIPIENT'
export const CONFIRM_AND_LOCK = 'CONFIRM_AND_LOCK'
export const INVOICE_ID = 'INVOICE_ID'
export const AMOUNT = 'AMOUNT'
export const UPDATE_COMPANY_NAME = 'UPDATE_COMPANY_NAME'
// BBC or CC? difference?

export const updateTemplate = (
  inputType,
  invoiceId,
  payload
) =>
  ({
    type,
    invoiceId,
    payload,
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

// subject(inputType): 'Bill: Urgent',
// to: ['email@email.com'],
// from: ['from@email.com'],
// invoices: {
//   12345(invoiceId/invoiceId):{
//     amount(inputType): 150.00,
//     id(invoiceId/invoiceId): 12345,
//     confirmed(confirmAndLock()): true,
//  }
// }
// total = invoices.reduce((prev, next) => return prev += [next]amount)
