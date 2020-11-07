import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';

import { LocalizeRow, LocalizeCol } from '../../../packages/grid';
import { LocalizeButton } from '../../../packages/atomic';
import { storiesSizeOption, storiesColorOption } from '../_stories';
import { LocalizeSize, LocalizeThemeColors } from '../system';

export default {
  title: 'UI | LocalizeButton',
  decorators: [withKnobs],
  component: LocalizeButton,
};

const events = actions('onClick', 'onMouseOver', 'onMouseOut');
const knobs = {
  children: () => text('children', 'LocalizeButton'),
  fontColor: () => select<LocalizeThemeColors>('fontColor', storiesColorOption, 'neutral1'),
  bgColor: () => select<LocalizeThemeColors>('bgColor', storiesColorOption, 'primary'),
  bdColor: () => select<LocalizeThemeColors>('bdColor', storiesColorOption, 'primary'),
  size: () => select<LocalizeSize>('size', storiesSizeOption, 'md') as LocalizeSize,
  borderRadius: () => text('borderRadius', ''),
  disabled: () => boolean('disabled', false),
};

export const Default = () => {
  const children = knobs.children();
  return (
    <LocalizeRow>
      <LocalizeCol>
        <LocalizeButton {...events}>{children}</LocalizeButton>
      </LocalizeCol>
    </LocalizeRow>
  );
};

export const Size = () => {
  const children = knobs.children();
  return (
    <LocalizeRow>
      <LocalizeCol md={8}>
        <h4>xl</h4>
        <LocalizeButton size="xl" {...events}>
          {children}
        </LocalizeButton>
      </LocalizeCol>
      <LocalizeCol md={8}>
        <h4>lg</h4>
        <LocalizeButton size="lg" {...events}>
          {children}
        </LocalizeButton>
      </LocalizeCol>
      <LocalizeCol md={8}>
        <h4>md</h4>
        <LocalizeButton size="md" {...events}>
          {children}
        </LocalizeButton>
      </LocalizeCol>
      <LocalizeCol md={8}>
        <h4>sm</h4>
        <LocalizeButton size="sm" {...events}>
          {children}
        </LocalizeButton>
      </LocalizeCol>
      <LocalizeCol md={8}>
        <h4>xs</h4>
        <LocalizeButton size="xs" {...events}>
          {children}
        </LocalizeButton>
      </LocalizeCol>
    </LocalizeRow>
  );
};

export const DynamicProps = () => {
  const children = knobs.children();
  const bgColor = knobs.bgColor();
  const borderRadius = knobs.borderRadius();
  const disabled = knobs.disabled();
  const size = knobs.size();
  const props = {
    children,
    bgColor,
    borderRadius,
    size,
    disabled,
  };

  return (
    <LocalizeRow>
      <LocalizeCol>
        <LocalizeButton {...events} {...props}>
          {children}
        </LocalizeButton>
      </LocalizeCol>
    </LocalizeRow>
  );
};
