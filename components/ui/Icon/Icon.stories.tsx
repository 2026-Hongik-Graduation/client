import type {Meta, StoryObj} from '@storybook/react';

import {Icon} from './Icon';
import type {IconName} from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {layout: 'centered'},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'sparkles',
  },
};

const ALL_ICON_NAMES: IconName[] = [
  'refresh',
  'arrow_right',
  'sparkles',
  'check',
  'eye',
  'download',
  'filter',
  'sort',
  'plus',
  'copy',
  'edit',
  'trash',
  'home',
];

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        padding: '1rem',
      }}>
      {ALL_ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
          <Icon name={name} size={24} />
          <span style={{fontSize: '0.75rem', color: '#888'}}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const CustomSize: Story = {
  args: {
    name: 'check',
    size: 32,
  },
};

export const WithColor: Story = {
  args: {
    name: 'refresh',
    className: 'text-green-300',
  },
};
