import React from 'react'
import ChipInput from '../../src/ChipInput'

export default function ClipboardExample () {
  return (
    <ChipInput
      defaultValue={['copy', 'paste']}
      fullWidth
    />
  )
}
