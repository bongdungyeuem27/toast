import React from 'react';
declare type Props = {
    action?: () => {} | undefined;
    nonaction?: () => {} | undefined;
    content?: JSX.Element | undefined;
    actionText?: string | undefined;
    nonactionText?: string | undefined;
    title?: string | undefined;
    actionOutside?: () => {} | undefined;
    top?: string | number | undefined;
    fontFamily?: string | undefined;
    style?: React.CSSProperties | undefined;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    children: React.ReactNode | undefined;
    fullViewScroll?: boolean | undefined;
};
declare const Modal: (props: Props) => JSX.Element;
export default Modal;
