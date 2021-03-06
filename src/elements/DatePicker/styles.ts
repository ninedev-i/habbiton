import {createGlobalStyle} from 'styled-components';
import {constants} from '../../helpers';

export const CalendarStyles = createGlobalStyle`
    .date-picker {
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        max-width: 262px;
        
        &-notice {
            font-size: 11px;
            font-weight: 700;
            margin-bottom: 15px;
            border-radius: 5px;
            padding: 15px;
            color: #fff;
            background: #ff6c7e;
            max-width: 238px;
        }
        
        &-month {
            &_header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 11px;
                
                &_wrapper {
                    text-align: center;
                    margin: 0 auto 25px;
                }
              
                &_title {
                    transition: ${constants.transition};
                    color: ${(props) => props.theme.color};
                }
            }
        }
        
        &-header_button {
            cursor: pointer;
            background: transparent;
            border-radius: 50%;
            border: 1px solid #e4e7ea;
            transition: border 0.1s ease-in, color 0.1s ease-in;
            position: relative;
            height: 35px;
            width: 35px;
            color: ${(props) => props.theme.color};

            &:focus {
                outline: 0;
            }
            
            &.is-disabled {
                cursor: default;
                
                .date-picker-header_button.is-next,
                .date-picker-header_button.is-prev {
                    color: #acb3bb;
                }
            }
            
            &.is-next:before,
            .is-prev:before {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition: fill 0.1s ease-in;
                color: #303030;
            }
            
            &.is-prev:before {
                content: '<';
            }
            
            &.is-next:after {
                content: '>';
            }
        }
        
        &-calendar_wrapper.is-shortcut_hover_outrange .date-picker-header_button {
            &.is-next,
            &.is-next {
            border-color: #4a90e2;
                background: #e7f5ff;
            }
        }
        
        &-days_of_week {
            font-size: 13px;
            display: flex;
            color: #c3c3c3;
            text-align: center;
            margin-bottom: 25px;
            
            &_day {
                flex-basis: 15%;
            }
        }
        
        &-week {
            display: flex;
            margin-bottom: 8px;
            
            &:last-of-type {
                margin-bottom: 0;
            }
        
            &-day {
                height: 34px;
                width: 34px;
                max-width: 34px;
                vertical-align: middle;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-basis: 15%;
                background: ${(props) => props.theme.inputBg};
                color: ${(props) => props.theme.color};
                transition: ${constants.transition};
                position: relative;
                border-radius: 50%;
                box-shadow: 0 0 15px -4px rgba(34,60,80,0.1);
                margin: 0 2px;
                padding: 0;
                border: none;
                outline: 0;
                
                &:first-of-type:hover,
                &:last-of-type:hover {
                    border-radius: 50%;
                }
                
                &:first-of-type {
                    border-radius: 50%;
                    margin-left: 0;
                }
                
                &:last-of-type {
                    border-radius: 50%;
                    margin-right: 0;
                }
                
                &.is-prev_month,
                &.is-next_month {
                    color: rgba(172, 179, 187, 0.85);
                }
                
                &.is-today {
                    font-weight: 700;
                }
                
                &.is-selected {
                    background: #d7f9ff;
                    color: #404040;
                    position: relative;
                    z-index: 1;
                    border-radius: 0;
                    
                    &:first-of-type {
                        border-radius: 50% 0 0 50%;
                    }
                    
                    &:last-of-type {
                        border-radius: 0 50% 50% 0;
                    }
                    
                    &::before {
                        background: ${(props) => props.theme.progressBg};
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        z-index: -1;
                        border-radius: 50%;
                        color: #404040;
                    }
                    
                    &:hover::before {
                        content: '';
                        box-shadow: inset 0 0 1px 0 #7fd7e7;
                        background: #d7f9ff;
                        color: #404040;
                    }
                    
                    //&.is-start_selection.date-picker-week-day.is-selected:hover::before,
                    //&.is-end_selection.date-picker-week-day.is-selected:hover::before {
                    //    background: #7fd7e7;
                    //}
                    
                    &.is-start_selection,
                    &.is-end_selection {
                        background: ${(props) => props.theme.progressBg};
                        color: ${(props) => props.theme.color};
                        
                        &::before {
                            content: '';
                        }
                    }
                    
                    &.is-start_selection {
                        border-radius: 50% 0 0 50%;
                        
                        &:last-of-type {
                            border-radius: 50%;
                        }
                    }
                    
                    &.is-end_selection {
                        border-radius: 0 50% 50% 0;
                        
                        &.is-start_selection,
                        &:first-of-type {
                            border-radius: 50%;
                        }
                    }
                }
                
                &.is-selectable {
                    cursor: pointer;
                    position: relative;
                    
                    &:before {
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        display: block;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                    }
                    
                    &:hover:not(.is-selected) {
                        z-index: 1;
                        box-shadow: inset 0 0 1px 0 #7fd7e7;
                    }
                }
                
                &.is-not_selectable {
                    color: #e4e7ea;
                }
            }
        }
        
        &-calendar_wrapper.is-shortcut_hovered .date-picker-week-day.is-selected::before {
            background: #4a90e2;
        }
    }
`;
