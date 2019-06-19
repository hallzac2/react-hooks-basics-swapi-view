import React from 'react'

export default function({ options, selectedValue, onChange }) {
  return (
    <select value={selectedValue} onChange={onChange}>
      {options.map((value, index) => <option key={index} value={value}>{value}</option>)}
    </select>
  )
}
