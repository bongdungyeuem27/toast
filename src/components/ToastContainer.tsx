import React, { useState, useEffect, useReducer, useCallback, useRef, memo } from 'react';
import events from 'events';
import styles from './styles.module.scss';
import ToastItem from './ToastItem';
import _ from 'lodash';
import { STATUS } from '../constants';

/**
 * @const eventEmitter
 * @return controller to manager Event
 */
export const eventEmitter = new events.EventEmitter();

/**
 * @component ToastContainer
 * @param listOnShow list item is showing
 * @param listOnNone list item is hiddening
 * @function createNewNotification to create new notification
 * @function create is an event to create new notification
 * @function removeItem event to create new notification
 * @returns
 */

type Item = {
    id: string;
    type: STATUS;
    message?: string;
    time?: number;
    closeOnClick?: boolean;
    pauseOnHover?: boolean;
};
function ToastContainer() {
    const [listOnShow, setlistOnShow] = useState<Item[]>([]);
    const free = useRef(true);
    const autoCreatement = useRef(1);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        eventEmitter.on('create', (type, message, options) => {
            setTimeout(() => {
                free.current = true;
            }, 10);
            if (free.current) {
                free.current = false;
                listOnShow.push({ id: autoCreatement.current++, type, message, ...options });
                setlistOnShow([...listOnShow]);
            }
        });

        eventEmitter.on('removeItem', (id) => {
            let empty = true;
            _.forEach(ref?.current?.children, (value, index: number) => {
                if (value.clientHeight != 0) empty = false;
            });
            if (empty) {
                listOnShow.splice(0, listOnShow.length);
                setlistOnShow(listOnShow);
            }
        });

        eventEmitter.on('clear', () => {
            listOnShow.map((value, index) => {
                eventEmitter.emit('removeItemFromContainer' + value.id);
            });
        });
    }, []);

    return (
        <div ref={ref} className={styles.notifications}>
            {listOnShow.map((value, index) => {
                return <ToastItem {...value} key={index}></ToastItem>;
            })}
        </div>
    );
}

export default memo(ToastContainer);
