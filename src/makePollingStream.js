import { Observable } from "rxjs"
import config from "recompose/rxjsObservableConfig"
import {
    setObservableConfig,
    componentFromStream,
} from "recompose"

setObservableConfig(config)

const makePollingStream = ({ interval = 1000, start$, stop$ }) => componentFromStream(props$ => {
    const polling$ = start$.switchMap(() =>
        Observable.interval(interval)
            .takeUntil(stop$)
    )

    const result$ = Observable
        .combineLatest(props$, polling$)
        .switchMap(([props, _]) =>
            Observable.ajax(props.route).pluck('response'))
        .catch((err, caught) => caught)

    return Observable.combineLatest(props$, result$)
        .map(([props, response]) => props.children(response ))
});

export default makePollingStream;