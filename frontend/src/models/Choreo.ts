import {Move} from "./Move";

export type Choreo = {
    id: string,
    name: string,
    choreoMoves: Move[]
}

export type NewChoreo = {
    name: string,
    choreoMoves: Move[]
}