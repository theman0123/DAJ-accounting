import React from 'react'

export default function InvoiceRow({invoiceNum, date, amount, notes, edit, syncStore, rowId}) {
  return edit === true
    ? (
    <tr name={rowId}>
      <th> {/* Invoice # */}
        <span>
          <input name="INVOICE_ID" style={styles.input} onChange={(e) => syncStore(e.target.name, rowId, e.target.value)} tabIndex="2" />
        </span>
      </th>

      <th>  {/* Date */}
        <span>
          <input name="DATE" style={styles.input} onChange={(e) => syncStore(e.target.name, rowId, e.target.value)} tabIndex="3" />
        </span>
      </th>

      <th> {/* Amount */}
        <span>
          <input name="AMOUNT" style={styles.input} onChange={(e) => syncStore(e.target.name, rowId, e.target.value)} tabIndex="4" />
        </span>
      </th>

      <th>  {/* Notes */}
        <span>
          <input name="NOTES" style={styles.input} onChange={(e) => syncStore(e.target.name, rowId, e.target.value)} tabIndex="5" />
        </span>
      </th>

      <th style={styles.saveBtn} tabIndex="99">Save</th>
    </tr>
  )
  : null
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