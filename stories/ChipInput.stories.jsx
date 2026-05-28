import React from 'react'
import Chip from '@mui/material/Chip'
import ChipInput from '../lib/ChipInput'

const noop = () => {}

export default {
  title: 'ChipInput',
  component: ChipInput,
}

export const WithSomeChips = {
  render: () => <ChipInput defaultValue={['foo', 'bar']} fullWidth onChange={noop} />,
}

export const WithPlaceholder = {
  render: () => <ChipInput placeholder="Placeholder" fullWidth />,
}

export const WithFloatingLabel = {
  render: () => <ChipInput label="Floating label" fullWidth />,
}

export const Disabled = {
  render: () => (
    <ChipInput defaultValue={['foo', 'bar']} label="Disabled input" disabled fullWidth />
  ),
}

export const WithCustomChips = {
  render: () => (
    <ChipInput
      defaultValue={['foo', 'bar']}
      chipRenderer={({ text, handleDelete, className }, key) => (
        <Chip key={key} className={className} onDelete={handleDelete} label={text.toUpperCase()} />
      )}
    />
  ),
}
