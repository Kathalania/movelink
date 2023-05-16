import {Move} from "../models/Move";
import MoveCard from "./MoveCard";

type MoveGalleryProps = {
    moves: Move[]
}
export default function MoveGallery(props: MoveGalleryProps) {


    return (
        <div className={"move-gallery"}>
            {props.moves.map((char) => <MoveCard key={char.id} move={char}/>)}
        </div>
    )
}