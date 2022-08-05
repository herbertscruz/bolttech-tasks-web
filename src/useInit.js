import { useEffect, useRef } from "react";

function useInit(callback, ...args) {
    const didMountRef = useRef(false);

    const resetInit = () => didMountRef.current = false;

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            callback(...args);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [resetInit];
}

export default useInit;