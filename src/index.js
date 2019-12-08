import { useState, useMemo, useEffect } from 'react';
import uuid from 'uniqid';

function transform(options) {
    const pairs = {};
    for (var i = 0; i < options.length - 1; i++) {
        for (var j = i; j < options.length - 1; j++) {
            const id = uuid();
            pairs[id] = {
                id,
                firstValue: options[i],
                secondValue: options[j + 1],
                selected: options[i]
            }
        }
    }
    return pairs;
}

const useToggleDemocracy = (options) => {
    const [leader, setLeader] = useState(null);
    const [pairs, setPairs] = useState({});

    const stringified = JSON.stringify(options);

    const initialState = useMemo(
        () => transform(JSON.parse(stringified)),
        [stringified]
    );

    useEffect(() => {
        setPairs(initialState)
    }, [initialState]);

    useEffect(() => {
        const election = {};
        Object.keys(pairs).forEach((id) => {
            const pair = pairs[id];
            if (!election[pair.selected]) {
                election[pair.selected] = 0;
            }
            election[pair.selected] += 1;
        });

        const selected = Object.keys(election).reduce((a, b) => election[a] > election[b] ? a : b, null);
        setLeader(selected)
    }, [pairs]);

    const setToggle = (id, selected) => {
        const copiedPairs = JSON.parse(JSON.stringify(pairs))
        const pair = copiedPairs[id];

        if (!pair || ![pair.firstValue, pair.secondValue].includes(selected)) {
            return;
        }

        copiedPairs[id] = {
            ...pair,
            selected
        }

        setPairs(copiedPairs);
    };

    const state = {
        pairs,
        leader
    };

    const api = useMemo(
        () => ({
            setToggle,
        }),
        [setToggle]
    );

    return [state, api];
};

export default useToggleDemocracy;
