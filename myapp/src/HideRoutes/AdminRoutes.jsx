import React from "react";

import { useSelector } from 'react-redux'
import Navbar from "../components/Navbar/Navbar";
import { getemail } from '../Redux/features/authslice'



 const AdminRoutes = ({children}) => {

    const adminMail = useSelector(getemail)

    if (adminMail === 'admin@admin.com'){
//true
return children
}

return (
    <h2 className="text-danger">
        <Navbar></Navbar>
<i class="fa fa-smile-o" aria-hidden="true"></i> ACCESS DENIED <i class="fa fa-smile-o" aria-hidden="true"></i>
    </h2>
)



}






export const AdminOnlyReach = ({children}) => {

    const adminMail = useSelector(getemail)

    if (adminMail === 'admin@admin.com'){
//true
return children

}

return null


}

export default AdminRoutes
