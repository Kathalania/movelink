import {Move} from "./Move";

export type Choreo = {
    id: string,
    name: string,
    choreo: Map<Move, string>
}