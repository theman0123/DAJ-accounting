import React from 'react'

export default function InvoiceRow({details, toggleEdit, edit, syncStore, rowId, editRow, currentRowId}) {

  return rowId === currentRowId || edit === 'undefined'
    ? (
    <tr row={rowId}>
      <th> {/* Invoice # */}
        <span>
          <input name="INVOICE_ID" style={styles.input} value={details.invoiceId || ''} onChange={(e) => syncStore(e.target.name, rowId, e.target.value)} tabIndex="2" />
        </span>
      </th>

      <th>  {/* Date */}
        <span>
          <input name="DATE" style={styles.input} value={details.date || ''} onChange={(e) => syncStore(e.target.name, rowId, e.target.value)} tabIndex="3" />
        </span>
      </th>

      <th> {/* Amount */}
        <span>
          <input name="AMOUNT" style={styles.input} value={details.amount || ''} onChange={(e) => syncStore(e.target.name, rowId, e.target.value)} tabIndex="4" />
        </span>
      </th>

      <th>  {/* Notes */}
        <span>
          <input name="NOTES" style={styles.input} value={details.notes || ''} onChange={(e) => syncStore(e.target.name, rowId, e.target.value)} tabIndex="5" />
        </span>
      </th>

    </tr>
  )
  : (
    <tr 
      row={rowId}
      onClick={(e) => {
        e.preventDefault()
        editRow(e.currentTarget.getAttribute('row'))
      }}>
      {/* Invoice # */}
      <th name="INVOICE_ID" tabIndex="2">
        {details.invoiceId}
      </th>
      {/* Date */}
      <th name="DATE" tabIndex="3">
        {details.date}
      </th>
      {/* Amount */}
      <th name="AMOUNT" tabIndex="4">
        {details.amount}
      </th>
      {/* Notes */}
      <th name="NOTES" tabIndex="5">
        {details.notes}
      </th>

    </tr>
  )
}

const styles = {
  input: {
    padding: '.25em',
    fontFamily: 'Lora',
    color: 'red',
    maxWidth: '8em',
  },
  saveBtn: {
    padding: '.25em',
    background: '#8EE0C4',
    borderColor: 'black',
    boxShadow: '.25em .25em .5em .15em #A4A486',
    cursor: 'pointer',
  },
}