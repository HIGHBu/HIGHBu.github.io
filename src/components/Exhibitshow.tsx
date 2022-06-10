import { useParams } from "react-router-dom"

export function Exhibitshow(){
    const {eid}=useParams()
    return (<div>
        {eid}
    </div>)
}