import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { LocalizeTag, LocalizeTagProps } from '../../../packages/atomic/dist';
import { LocalizeRow, LocalizeCol } from '../../../packages/grid/dist';

import { storiesScaleOptions, storiesColorOptions, storiesIntentOptions } from '../controls';

export default {
  title: 'Atomic/LocalizeTag',
  component: LocalizeTag,
  argTypes: {
    scale: {
      defaultValue: 'md',
      control: {
        type: 'select',
        options: storiesScaleOptions,
      },
    },
    intent: {
      defaultValue: 'primary',
      control: {
        type: 'select',
        options: storiesIntentOptions,
      },
    },
    primaryColor: {
      defaultValue: 'kakao',
      control: {
        type: 'select',
        options: storiesColorOptions,
      },
    },
    neutralColor: {
      defaultValue: 'transparent',
      control: {
        type: 'select',
        options: storiesColorOptions,
      },
    },
    fontColor: {
      defaultValue: 'inversed1',
      control: {
        type: 'select',
        options: storiesColorOptions,
      },
    },
    inversedFontColor: {
      defaultValue: 'inversed10',
      control: {
        type: 'select',
        options: storiesColorOptions,
      },
    },
  },
};

const Tag: Story<LocalizeTagProps> = (args) => <LocalizeTag {...args} />;

export const Default = Tag.bind({});
Default.args = {
  children: 'LocalizeTag',
  rounded: true,
};

const TagSizes: Story<LocalizeTagProps> = (args) => {
  const children = args.children;
  return (
    <>
      <LocalizeRow>
        <LocalizeCol md={8}>
          <h2>xl</h2>
          <LocalizeTag {...args} scale="xl">
            {children}
          </LocalizeTag>
        </LocalizeCol>
        <LocalizeCol md={8}>
          <h2>lg</h2>
          <LocalizeTag {...args} scale="lg">
            {children}
          </LocalizeTag>
        </LocalizeCol>
        <LocalizeCol md={8}>
          <h2>md</h2>
          <LocalizeTag {...args} scale="md">
            {children}
          </LocalizeTag>
        </LocalizeCol>
        <LocalizeCol md={8}>
          <h2>sm</h2>
          <LocalizeTag {...args} scale="sm">
            {children}
          </LocalizeTag>
        </LocalizeCol>
        <LocalizeCol md={8}>
          <h2>xs</h2>
          <LocalizeTag {...args} scale="xs">
            {children}
          </LocalizeTag>
        </LocalizeCol>
      </LocalizeRow>
    </>
  );
};
export const TagsStorieSizes = TagSizes.bind({});
TagsStorieSizes.args = {
  children: 'LocalizeTag',
  rounded: true,
};

const IntentTags: Story<LocalizeTagProps> = (args) => {
  const children = args.children;
  const localize = {
    primaryColor: args.primaryColor,
    neutralColor: args.neutralColor,
    fontColor: args.fontColor,
    inversedFontColor: args.inversedFontColor,
  };
  return (
    <LocalizeRow>
      {storiesIntentOptions.map((intent) => (
        <LocalizeCol md={8} key={intent}>
          <h2>{intent}</h2>
          <LocalizeTag {...args} intent={intent} localize={localize}>
            {children}
          </LocalizeTag>
        </LocalizeCol>
      ))}
    </LocalizeRow>
  );
};

export const IntentTagsStories = IntentTags.bind({});
IntentTagsStories.args = {
  children: 'LocalizeTag',
};
