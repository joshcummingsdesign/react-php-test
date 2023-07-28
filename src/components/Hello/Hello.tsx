import {useCallback, useState} from 'react';
import styles from './styles.module.scss';
import {combineClassNames as css} from '@/helpers/combineClassNames';

export const Hello = () => {
    const [isOn, setIsOn] = useState(false);

    const handleClick = useCallback(() => {
        setIsOn((on) => !on);
    }, []);

    return (
        <h1 className={css(styles.root, isOn ? styles.on : styles.off)} onClick={handleClick}>
            The power is {isOn ? 'on' : 'off'}
        </h1>
    );
};
