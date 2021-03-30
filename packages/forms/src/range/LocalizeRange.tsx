import React from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
// import { transparentize } from 'polished';

import {
  LocalizeProps,
  LocalizeThemeProps,
  LocalizeIntentThemeType,
  LocalizeScale,
  getLocalizeScaleBy,
} from '@seolhun/localize-components-styled-types';

import { getLocalizeIntentColor } from './getLocalizeIntentColor';

const CLASSNAME = '__Localize__Range';
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type ExtentionProps = InputProps & LocalizeRootProps;

export interface LocalizeRangeProps extends ExtentionProps {}

interface LocalizeRootProps extends LocalizeProps {
  /**
   * Set this to change scale
   * @default md
   */
  scale?: LocalizeScale;

  /**
   * Set this to change intent color
   * @default primary
   */
  intent?: LocalizeIntentThemeType;

  /**
   * Set this to change rounded border-radius
   */
  rounded?: boolean;

  /**
   * Set this to change label node
   */
  renderLabel?: (value: any) => React.ReactNode;

  /**
   * Set this to change handler node
   */
  handler?: React.ReactNode;

  /**
   * Set this to change vertical | horizontal
   */
  vertical?: boolean;
}

interface LocalizeRangeWrapperProps extends LocalizeRootProps {
  /**
   * Active Tracker width(%)
   */
   activeTrackerWidth: number;
}

const LocalizeRangeWrapper = styled.div<LocalizeRangeWrapperProps, LocalizeThemeProps>(
  ({
    theme,
    scale = 'md',
    intent = 'primary',
    localize = {
      primaryColor: 'primary',
      neutralColor: 'transparent',
      fontColor: 'inversed1',
      inversedFontColor: 'inversed10',
    },
    rounded,
    activeTrackerWidth,
  }) => {
    const localizedColor = getLocalizeIntentColor(theme, intent, localize);
    const { primaryColor, neutralColor, fontColor } = localizedColor;
    const localizeScale = getLocalizeScaleBy(scale);

    const track: any = {
      content: '""',
      width: 0,
      height: 0,
    };
    const thumb: any = {
      appearance: 'none',
      height: `${localizeScale}rem`,
      width: `${localizeScale}rem`,
      background: fontColor,
      border: `1px solid ${neutralColor}`, //$thumb-border,
      borderRadius: rounded ? '50%' : '6px',
      cursor: 'grab',

      '&:active': {
        cursor: 'grabbing',
      },
    };

    return {
      position: 'relative',
      outline: 'none',
      userSelect: 'none',

      [`.${CLASSNAME}__Tracker`]: {
        width: '100%',
        height: '8px',
        background: neutralColor,
        borderRadius: '6px',

        '&::after': {
          content: '""',
          position: 'absolute',
          width: `${activeTrackerWidth}%`,
          height: '8px',
          background: primaryColor,
          borderRadius: '6px 0 0 6px',
        },
      },

      input: {
        /**
         * @name Track
         */
        '&::-webkit-slider-runnable-track': track,
        '&::-ms-track': track,
        '&::-moz-range-track': track,
        /**
         * @name Thumb
         */
        '&::-webkit-slider-thumb': thumb,
        '&::-ms-thumb': thumb,
        '&::-moz-range-thumb': thumb,
      },
    };
  },
);

const LocalizeRangeContainer = styled.div<{}, LocalizeThemeProps>(() => {
  return {};
});

const LocalizeRangeInput = styled.input<{}, LocalizeThemeProps>(() => {
  return {
    appearance: 'none',
    position: 'relative',
    width: '100%',
    outline: 'none',
    cursor: 'pointer',
    zIndex: 1,
  };
});

const LocalizeRangeTracker = styled.div<{}, LocalizeThemeProps>(() => {
  return {};
});

const LocalizeRangeLabelWrapper = styled.div<{}, LocalizeThemeProps>(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '1rem',
  };
});

const LocalizeRangeLabel = styled.div<{}, LocalizeThemeProps>(() => {
  return {
    display: 'inline-block',
  };
});

const LocalizeRange = React.forwardRef<HTMLInputElement, LocalizeRangeProps>(
  (
    {
      children,
      className,
      scale = 'md',
      intent = 'primary',
      rounded,
      renderLabel,
      handler,
      vertical,
      ...props
    },
    ref,
  ) => {
    const { min, max, value, defaultValue, onChange } = props;

    const memoizedTrackerSize = React.useMemo(() => {
      const parsedMin = Number(min);
      const parsedMax = Number(max);
      if (!Number.isInteger(parsedMin)) {
        return parsedMax;
      }
      if (!Number.isInteger(parsedMax)) {
        return 100 - parsedMin;
      }
      return parsedMax - parsedMin;
    }, [min, max]);

    const [currentValue, setCurrentValue] = React.useState<number>(Number(value || defaultValue));
    const [activeTrackerWidth, setActiveTrackerWidth] = React.useState(memoizedTrackerSize);

    React.useEffect(() => {
      setActiveTrackerWidth((currentValue / memoizedTrackerSize) * 100);
    }, [currentValue, memoizedTrackerSize]);

    const onChangeInput = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(Number(e.target.value));
        if (onChange) {
          onChange(e);
        }
      },
      [onChange],
    );

    return (
      <LocalizeRangeWrapper
        ref={ref}
        className={classnames(CLASSNAME, className)}
        intent={intent}
        scale={scale}
        rounded={rounded}
        activeTrackerWidth={activeTrackerWidth}
      >
        <LocalizeRangeContainer>
          <LocalizeRangeInput {...props} ref={ref} type="range" onChange={onChangeInput} />
          <LocalizeRangeTracker className={`${CLASSNAME}__Tracker`} />
        </LocalizeRangeContainer>
        <LocalizeRangeLabelWrapper className={`${CLASSNAME}__Label`}>
          <LocalizeRangeLabel className={`${CLASSNAME}__Label__Min`}>{min}</LocalizeRangeLabel>
          <LocalizeRangeLabel className={`${CLASSNAME}__Label__Max`}>{max}</LocalizeRangeLabel>
        </LocalizeRangeLabelWrapper>
      </LocalizeRangeWrapper>
    );
  },
);

export { LocalizeRange };
export default LocalizeRange;
