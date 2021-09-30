import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
    const [isEnable, setIsEnable] = useState(initialState);

    const toggle = useCallback(() => setIsEnable(prevState => !prevState), []);

    return [isEnable, toggle]
}

export default useToggle;