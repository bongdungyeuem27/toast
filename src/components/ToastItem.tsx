import React, { useEffect, useRef, useState, useMemo, memo, useCallback, useReducer } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import Progressbar from './ProgressBar';
import { eventEmitter } from './ToastContainer';
import { DEFAULT_TIME, STATUS } from '../constants';
import { CheckmarkOutline, CloseOutline, NotificationsOutline, AlertOutline, BugOutline } from 'react-ionicons';

type ToastItemProps = {
    type: STATUS;
    message?: string;
    id: string;
    time?: number;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
};

function ToastItem(props: ToastItemProps) {
    const [display, setDisplay] = useState(true);

    const ref = useRef<HTMLDivElement>(null);
    const { type, message = type, id, time = DEFAULT_TIME, closeOnClick = true, pauseOnHover = true } = props;
    useEffect(() => {
        eventEmitter.on('removeItemFromContainer' + id, () => {
            setDisplay(false);
        });
    }, []);
    const handleEnd = useCallback(() => {
        eventEmitter.removeListener('removeItemFromContainer' + id, () => {});
        eventEmitter.emit('removeItem', id);
    }, []);
    useEffect(() => {
        if (!display) {
            ref?.current?.addEventListener('animationend', handleEnd);
        }
        return () => {
            ref?.current?.removeEventListener('animationend', () => {});
        };
    }, [display]);

    return (
        <div
            ref={ref}
            className={clsx(styles.container, {
                [styles.pauseOnHover]: pauseOnHover,
                [styles.displayNone]: !display
            })}
        >
            <div
                onClick={() => {
                    closeOnClick && setDisplay(false);
                }}
                className={clsx(styles.notificationsItem, styles[type])}
            >
                <div className={styles.notificationContent}>
                    {type === STATUS.SUCCESS && (
                        <div className={styles.icon}>
                            <div className={styles.iconRound}>
                                <CheckmarkOutline color="white" height="35px" width="35px"></CheckmarkOutline>
                            </div>
                        </div>
                    )}

                    {type === STATUS.INFO && (
                        <div className={styles.icon}>
                            <div className={styles.iconRound}>
                                <NotificationsOutline color="white" height="35px" width="35px"></NotificationsOutline>
                            </div>
                        </div>
                    )}
                    {type === STATUS.WARNING && (
                        <div className={styles.icon}>
                            <div className={styles.iconRound}>
                                <AlertOutline color="white" height="35px" width="35px"></AlertOutline>
                            </div>
                        </div>
                    )}
                    {type === STATUS.ERROR && (
                        <div className={styles.icon}>
                            <div className={styles.iconRound}>
                                <BugOutline color="white" height="35px" width="35px"></BugOutline>
                            </div>
                        </div>
                    )}
                    <a className={styles.text}>{message}</a>
                    <CloseOutline
                        onClick={() => {
                            setDisplay(false);
                        }}
                        cssClasses={styles.buttonClose}
                    ></CloseOutline>
                </div>

                <Progressbar key={id} totalTime={time} nonDisplay={() => setDisplay(false)}></Progressbar>
            </div>
        </div>
    );
}

export default memo(ToastItem);
