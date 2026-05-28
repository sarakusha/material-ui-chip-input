import React from 'react'
import { styled } from '@mui/material/styles'
import ChipInput from '../../src/ChipInput'

const StyledChipInput = styled(ChipInput)({
  '&.customChipInputRoot': {
    border: '1px solid red',
    borderRadius: 2,
  },
  '& .customChipInputInput': {
    textAlign: 'right',
  },
  '& .customChipInputChip': {
    background:
      'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)',
    backgroundSize: '1800% 1800%',
    animation: 'rainbow 18s ease infinite',
  },
  '@keyframes rainbow': {
    '0%': { backgroundPosition: '0% 82%' },
    '50%': { backgroundPosition: '100% 19%' },
    '100%': { backgroundPosition: '0% 82%' },
  },
})

class CustomChipInput extends React.Component {
  render() {
    return (
      <StyledChipInput
        {...this.props}
        className="customChipInputRoot"
        classes={{
          input: 'customChipInputInput',
          chip: 'customChipInputChip',
        }}
        defaultValue={['Butterfly', 'Unicorn', 'Rainbow', 'Fairy']}
      />
    )
  }
}

export default CustomChipInput
