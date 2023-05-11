import {useNavigate} from "react-router-dom";
import useDetail from "./useDetail";

type MoveDetailProps = {
    deleteMove: (id: string) => void
}
export default function MoveDetails(props: MoveDetailProps) {

    const {move} = useDetail()
    const navigate = useNavigate()

    function deleteMoveOnClick() {
        if (move) {
            props.deleteMove(move.id)
        }
        navigate("/moves")
    }

    return (
        <div className={"move-details"}>
            {move.name}
            {move.description}
            {move.style}
            {move.count}
            {move.start}
            {move.end}
            <button onClick={() => {
                navigate("/moves")
            }}>back to all moves
            </button>
            <button onClick={deleteMoveOnClick}>delete move</button>
        </div>
    )

}