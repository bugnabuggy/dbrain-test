import React from 'react';

export interface ActionNavProps {
    username?: string;
}

export const ActionNav:React.FC<ActionNavProps> = props => {
 const {username} = props; 
 return <>
    {/* content for navigation and user actions component */}
    {username}
 </>;
}