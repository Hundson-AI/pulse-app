/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  xsm: 10,
  sm: 12,
  smd: 14,
  md: 16,
  mmlg: 18,
  mlg: 20,
  lg: 24,
  xlg: 28,
  xl: 32,
  xxl: 48,
  xxlg: 56,
  xxxl: 64,
} as const

export type Spacing = keyof typeof spacing
