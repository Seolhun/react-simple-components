import React from 'react';
import { FlexDirectionProperty, AlignItemsProperty, JustifyContentProperty } from 'csstype';
import styled from '@emotion/styled';
import classnames from 'classnames';

import { LocalizeThemeProps, LocalizeProps } from '@seolhun/localize-components-styled-types';

const DEFAULT_CLASSNAME = '__Localize__Row';
type DivProps = React.HTMLAttributes<HTMLDivElement>;

interface LocalizeRowProps extends LocalizeProps, DivProps {
  isWrap?: boolean;

  /**
   * Set this change to flex direction
   */
  flexDirection?: FlexDirectionProperty;

  /**
   * Set this change to flex align items
   */
  alignItems?: AlignItemsProperty;

  /**
   * Set this change to flex justify content
   */
  justifyContent?: JustifyContentProperty;
}

const StyledRow = styled.div<LocalizeRowProps, LocalizeThemeProps>(
  ({
    theme,
    flexDirection = 'row',
    isWrap = true,
    alignItems = 'center',
    justifyContent = 'flex-start',
  }) => {
    return {
      display: 'flex',
      flexWrap: isWrap ? 'wrap' : 'nowrap',
      flexDirection,
      alignItems,
      justifyContent,
      boxSizing: 'border-box',
      marginRight: theme.grid.rowGutter.right,
      marginLeft: theme.grid.rowGutter.left,

      [`.${DEFAULT_CLASSNAME} + .${DEFAULT_CLASSNAME}`]: {
        marginTop: theme.grid.rowGutter.top,
      },
    };
  },
);

const LocalizeRow: React.FC<LocalizeRowProps> = ({ children, className, ...props }) => {
  return (
    <StyledRow {...props} className={classnames(DEFAULT_CLASSNAME, className)}>
      {children}
    </StyledRow>
  );
};

export { LocalizeRowProps, LocalizeRow };

export default LocalizeRow;