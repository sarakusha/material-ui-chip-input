import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Chip from '@mui/material/Chip'
import ChipInput from './ChipInput'

function getInput() {
  return document.querySelector('input')
}

function getChipLabels() {
  return screen
    .getAllByText(/.+/)
    .filter(element => element.closest('.MuiChip-root'))
    .map(element => element.textContent)
}

describe('ChipInput', () => {
  it('displays the default value in chips', () => {
    render(<ChipInput defaultValue={['foo', 'bar', 'foobar']} />)

    expect(getChipLabels()).toEqual(['foo', 'bar', 'foobar'])
  })

  it('adds chips with Enter and calls onChange', () => {
    const handleChange = jest.fn()
    render(<ChipInput defaultValue={['foo']} onChange={handleChange} />)

    fireEvent.change(getInput(), { target: { value: 'bar' } })
    fireEvent.keyDown(getInput(), { key: 'Enter', keyCode: 13 })

    expect(handleChange).toHaveBeenCalledWith(['foo', 'bar'])
    expect(getChipLabels()).toEqual(['foo', 'bar'])
  })

  it('does not add empty or duplicate chips by default', () => {
    const handleChange = jest.fn()
    render(<ChipInput defaultValue={['a']} onChange={handleChange} />)

    fireEvent.change(getInput(), { target: { value: ' ' } })
    fireEvent.keyDown(getInput(), { key: 'Enter', keyCode: 13 })
    fireEvent.change(getInput(), { target: { value: 'a' } })
    fireEvent.keyDown(getInput(), { key: 'Enter', keyCode: 13 })

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('supports controlled chips', () => {
    const handleAdd = jest.fn()
    const handleDelete = jest.fn()
    render(
      <ChipInput
        value={[
          { text: 'a', value: 1 },
          { text: 'b', value: 2 },
        ]}
        dataSourceConfig={{ text: 'text', value: 'value' }}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />,
    )

    fireEvent.change(getInput(), { target: { value: 'foo' } })
    fireEvent.keyDown(getInput(), { key: 'Enter', keyCode: 13 })
    expect(handleAdd).toHaveBeenCalledWith({ text: 'foo', value: 'foo' })

    fireEvent.keyDown(getInput(), { keyCode: 8 })
    fireEvent.keyDown(getInput(), { keyCode: 8 })
    expect(handleDelete).toHaveBeenCalledWith({ text: 'b', value: 2 }, 1)
  })

  it('calls input and keyboard callbacks', () => {
    const handleUpdateInput = jest.fn()
    const handleKeyDown = jest.fn()
    let inputRef

    render(
      <ChipInput
        inputRef={ref => {
          inputRef = ref
        }}
        onUpdateInput={handleUpdateInput}
        onKeyDown={handleKeyDown}
      />,
    )

    fireEvent.change(getInput(), { target: { value: 'foo' } })
    fireEvent.keyDown(getInput(), { keyCode: 40 })

    expect(inputRef.tagName.toLowerCase()).toBe('input')
    expect(handleUpdateInput).toHaveBeenCalled()
    expect(handleKeyDown).toHaveBeenCalled()
  })

  it('handles placeholders and floating labels', () => {
    const { rerender } = render(<ChipInput placeholder="Placeholder" />)
    expect(getInput()).toHaveAttribute('placeholder', 'Placeholder')

    rerender(<ChipInput placeholder="Placeholder" value={['foo']} />)
    expect(getInput()).not.toHaveAttribute('placeholder')

    rerender(<ChipInput placeholder="Placeholder" label="Floating label" />)
    expect(getInput()).not.toHaveAttribute('placeholder')

    fireEvent.focus(getInput())
    expect(getInput()).toHaveAttribute('placeholder', 'Placeholder')
  })

  it('renders helper text and custom chips', () => {
    const chipRenderer = jest.fn(({ text }, key) => <Chip key={key} label={text.toUpperCase()} />)

    render(<ChipInput value={['a', 'b']} helperText="Helper text" chipRenderer={chipRenderer} />)

    expect(screen.getByText('Helper text')).toBeInTheDocument()
    expect(getChipLabels()).toEqual(['A', 'B'])
    expect(chipRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 'a',
        text: 'a',
        chip: 'a',
        isDisabled: false,
        isFocused: false,
        isReadOnly: undefined,
        handleClick: expect.any(Function),
        handleDelete: expect.any(Function),
        className: expect.any(String),
      }),
      0,
    )
  })

  it('supports blurBehavior modes', () => {
    const handleChange = jest.fn()
    render(<ChipInput defaultValue={['a', 'b']} blurBehavior="add" onChange={handleChange} />)

    fireEvent.change(getInput(), { target: { value: 'blur' } })
    fireEvent.blur(getInput())

    expect(handleChange).toHaveBeenCalledWith(['a', 'b', 'blur'])
    expect(getInput()).toHaveValue('')
  })
})
