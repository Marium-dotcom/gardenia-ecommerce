import React from 'react'
import SideNav, { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <SideNav >
    <SideNav.Nav className="" >

        
        <NavItem  eventKey="AddProduct" onSelect>
            <NavIcon>
            <Link to="/Admin/AddProduct/NewProduct " > <i className="fa fa-plus text-danger" style={{ fontSize: '1.75em' }} /></Link>   
            </NavIcon>

        </NavItem>
   
    </SideNav.Nav>

    <SideNav.Nav  >
        <NavItem eventKey="ViewOrderStatus">
            <NavIcon>
            <Link to="/Admin/ViewOrderStatus" ><i className="fa fa-truck text-danger" style={{ fontSize: '1.75em' }} /></Link>    
            </NavIcon>
          
        </NavItem>
   
    </SideNav.Nav>
    
<SideNav.Nav >
        <NavItem eventKey="ViewProducts">
            <NavIcon>
            <Link to="/Admin/ViewProducts" ><i className="fa fa-eye text-danger" style={{ fontSize: '1.75em' }} /></Link>    
            </NavIcon>

        </NavItem>
    </SideNav.Nav>

    <SideNav.Nav >
        <NavItem  eventKey="Admin">
            <NavIcon >
            <Link to="/Admin" ><i className="fa fa-fw fa-line-chart text-danger" style={{ fontSize: '1.75em' }} /></Link>    
            </NavIcon>

        </NavItem>
    </SideNav.Nav>
    

    <SideNav.Nav >
        <NavItem  eventKey="Home">
            <NavIcon >
            <Link to="/" ><i className="fa fa-home text-danger" style={{ fontSize: '1.75em' }} /></Link>    
            </NavIcon>
          
        </NavItem>
    </SideNav.Nav>
</SideNav>
  )
}
