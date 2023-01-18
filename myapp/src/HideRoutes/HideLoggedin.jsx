import { useSelector } from 'react-redux'
import { getisLoggedin } from '../Redux/features/authslice'


export default function HideLoggedin({children}) {

    const logged = useSelector(getisLoggedin)

    if (!logged){
//true
return children

}

return null


}


