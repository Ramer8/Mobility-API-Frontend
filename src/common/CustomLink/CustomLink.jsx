import { useNavigate } from 'react-router-dom'
import './CustomLink.css'

export const CustomLink = ({ title, destination }) => {

     //instancio useNavigate para poder usar navigate y moverme en la página
     const navigate = useNavigate();
     
     return (
        <div className="navigateDesign" onClick={()=>navigate(destination)}>
            {title}
        </div>
     )
}