// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Hook Import
import { useSettings } from '../../../hooks/useSettings'

const ReactHotToast = styled(Box)(({ theme }) => {
  // ** Hook & Var
  const { settings } = useSettings()
  const { layout, navHidden } = settings

  return {
    '& > div': {
      left: `${theme.spacing(6)} !important`,
      right: `${theme.spacing(6)} !important`,
      bottom: `${theme.spacing(6)} !important`,
      top: layout === 'horizontal' && !navHidden ? '139px !important' : '75px !important'
    },
    '& .react-hot-toast': {
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '0.14px',
      zIndex: theme.zIndex.snackbar,
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      background: theme.palette.background.paper,
      boxShadow:
        theme.palette.mode === 'light'
          ? '0px 4px 10px -4px rgba(50, 71, 92, 0.6)'
          : '0px 8px 16px -4px rgba(31, 31, 45, 0.75)',
      '&>:first-of-type:not([role])>:first-of-type': {
        width: 14,
        height: 14
      }
    }
  }
})

export default ReactHotToast
