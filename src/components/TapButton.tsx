import React, {FC} from 'react';
import {
    State,
    TapGestureHandler
} from "react-native-gesture-handler";
import Animated, {
    add,
    and,
    call,
    clockRunning,
    cond,
    eq,
    greaterThan, neq,
    not,
    set,
    startClock,
    stopClock,
    useCode,
    useValue,
} from "react-native-reanimated";
import {useClock, useTapGestureHandler} from "react-native-redash/lib/module/v1";



type Props = {
    onPress: () => void
};
export const TapButton: FC<Props> = ({onPress, children}) => {
    const clock = useClock()
    const {gestureHandler, state} = useTapGestureHandler()
    const start = useValue(0)
    const opacity = useValue(0)
    useCode(() => ([
        cond(and(not(clockRunning(clock)), eq(state, State.BEGAN)),
        [
            startClock(clock),
            set(start, clock),
        ]),
        cond(eq(state, State.END), [call([], onPress)]),
        cond(neq(state, State.BEGAN),[stopClock(clock)]),
        set(opacity, cond(and(clockRunning(clock), greaterThan(clock, add(start,125))),0.5, 1))
    ]), [])
    return (
        <TapGestureHandler {...gestureHandler}>
            <Animated.View style={{opacity}}>
                {children}
            </Animated.View>
        </TapGestureHandler>
    );
};
