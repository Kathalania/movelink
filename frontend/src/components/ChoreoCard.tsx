import {Choreo} from "../models/Choreo";

type ChoreoProps = {
    choreo: Choreo
}
export default function ChoreoCard(props: ChoreoProps){
    return (
        <div className="recipe-card">
            <h3>{props.choreo.name}</h3>
            <h3>Moves:</h3>
            {props.choreo.choreo}
        </div>

    )
}