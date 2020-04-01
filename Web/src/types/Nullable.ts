import { IObservableArray } from "mobx";

type Nullable<T> = {
	[K in keyof T]?: T[K] extends IObservableArray<infer A> ? A[] : T[K]
}


export default Nullable



