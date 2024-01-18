import { useTransition } from "@react-spring/web";

export const transitions = <T extends unknown>(data: T[]) => useTransition(data, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: { duration: 500 }
})