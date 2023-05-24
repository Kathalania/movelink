import React from "react";
import {Move} from "../models/Move";
import ChoreoMoveCard from "./ChoreoMoveCard";

type ChoreoMoveGalleryProps = {
    moves: Move[]
    onSelectMove: (move: Move) => void
}
export default function ChoreoMoveGallery(props: ChoreoMoveGalleryProps) {
    const { onSelectMove } = props

    return (
        <div className={"add-move-gallery"}>
            {props.moves.map((char) =>
                <ChoreoMoveCard key={char.id} move={char} onMoveClick={onSelectMove}/>)}
        </div>
    )
}