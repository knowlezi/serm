import { fade } from 'material-ui/utils/colorManipulator'
import { spacing } from 'material-ui/styles'

export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#b2516d',
        primary2Color: '#7f2241',
        primary3Color: '#e7809b',
        accent1Color: '#4e4e4e',
        accent2Color: '#000000',
        accent3Color: '#262626',
        textColor: '#dedede',
        alternateTextColor: fade('#dedede', 0.85),
        canvasColor: '#262626',
        borderColor: '#dedede',
        disabledColor: fade('#dedede', 0.3),
        pickerHeaderColor: '#b2516d',
        clockCircleColor: fade('#dedede', 0.07),
        shadowColor: fade('#000000', 0.9),
    },
}