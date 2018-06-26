import { fromJS } from 'immutable'
import { FETCHING_CONTACTS, FETCHING_CONTACTS_FAILURE, FETCHING_CONTACTS_SUCCESS, REMOVE_FETCHING_CONTACTS } from '../actions/contacts'

export const initialState = fromJS({
  isFetching: false,
  error: '',
})

export default function contacts (state = initialState, action) {
  switch (action.type) {
    case FETCHING_CONTACTS:
      return state.merge({
        isFetching: true,
      })
    case FETCHING_CONTACTS_FAILURE:
      return state.merge({
        error: action.error,
        isFetching: false,
      })
    case FETCHING_CONTACTS_SUCCESS:
      return state
        .merge({
          isFetching: false,
          error: '',
          list: action.importedContacts,
        })
    case REMOVE_FETCHING_CONTACTS:
      return state.merge({
        isFetching: false,
        error: '',
      })
    default:
      return state
  }
}
