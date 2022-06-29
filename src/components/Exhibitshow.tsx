import { HomeOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate, useParams } from "react-router-dom"

export function Exhibitshow(){
    const {path}=useParams()
    const navigate = useNavigate();
    const jump=()=>{
        navigate('/')
    }
    return (<div className="container mx-auto h-full w-full pt-50px">
        <img src={'/exhibits/'+path+'_1.png'}/>
        <Button icon={<HomeOutlined />} 
            className='absolute bottom-50px left-50px'
            style={{fontSize: 30,color: '#3F65EE',}}
            onClick={jump}
        >    
        </Button>
    </div>)
}