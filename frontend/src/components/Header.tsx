import React from 'react';

interface HeaderProps {
    title: string;
}

export const Header: React.FC<HeaderProps> = (props: HeaderProps) => <h1>{props.title}</h1>;
