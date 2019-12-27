/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }) {
    if (!isBrowser) return { x: 0, y: 0 };

    const target = element ? element.current : document.body;

    return useWindow
        ? { x: window.scrollX, y: window.scrollY }
        : { x: target.scrollLeft, y: target.scrollTop };
}

export function useScrollPosition(effect, deps, element, useWindow, wait) {
    const position = useRef(getScrollPosition({ useWindow }));

    let throttleTimeout = null;

    const callBack = () => {
        const currPos = getScrollPosition({ element, useWindow });
        effect({ prevPos: position.current, currPos });
        position.current = currPos;
        throttleTimeout = null;
    };

    useIsomorphicLayoutEffect(() => {
        if (!isBrowser) {
            return;
        }

        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait);
                }
            } else {
                callBack();
            }
        };

        element.current.addEventListener("scroll", handleScroll);

        return () =>
            element.current.removeEventListener("scroll", handleScroll);
    }, deps);
}

useScrollPosition.defaultProps = {
    deps: [],
    element: false,
    useWindow: false,
    wait: null,
};
