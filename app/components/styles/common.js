/**
 * Create Default Style 
 * by id.ly Team
 */

import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

// These are global attributes that are used as a basis for
// every component's companion stylesheet. Individual styles
// can be overridden in each stylesheet but otherwise global
// stles will all be changed by modfying these settings.

export const COLOR_PRIMARY = 'white';
export const COLOR_SECONDARY = 'black';
export const BACKGROUND_COLOR = COLOR_PRIMARY;
export const FOREGROUND_COLOR = COLOR_SECONDARY;
export const FONT_BOLD = 'OpenSans-Bold';
export const FONT_COLOR = COLOR_SECONDARY;
export const FONT_NORMAL = 'OpenSans-Regular';
export const FONT_SIZE = 14;
export const FONT_WEIGHT = 'normal';
export const BORDER_COLOR = COLOR_SECONDARY;
export const BORDER_RADIUS = 5;
export const BORDER_WIDTH = 1;
export const IDLY_BLUE = '#128DC9';
