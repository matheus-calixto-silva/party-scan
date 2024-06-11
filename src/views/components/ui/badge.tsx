/* eslint-disable @typescript-eslint/naming-convention */
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@app/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-green-800 text-primary-foreground hover:bg-green-800/85',
        secondary:
          'border-transparent bg-zinc-800 text-primary-foreground hover:bg-zinc-800/85',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { Badge, badgeVariants };
