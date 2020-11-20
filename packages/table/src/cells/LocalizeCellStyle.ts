import { PropertiesFallback } from 'csstype';

import { LocalizeThemeProps } from '@seolhun/localize-components-styled-types';

const LocalizeCellStyle = (theme: LocalizeThemeProps): any => {
  return {
    color: theme.colors["black-85"],
    padding: '0 10px',

    borderRight: `1px solid ${theme.colors.neutral4}`,
    borderBottom: `1px solid ${theme.colors.neutral4}`,

    '&:first-child': {
      borderLeft: `1px solid ${theme.colors.neutral4}`,
    }
  } as PropertiesFallback<HTMLTableCellElement>
}

export { LocalizeCellStyle };
export default LocalizeCellStyle;