import {IThemeProps} from '../../themes';

declare module 'styled-components' {
    interface DefaultTheme extends IThemeProps {}
}
