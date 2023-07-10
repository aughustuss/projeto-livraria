export interface NavItem {
    title: string;
    link: string;
    icon: string;
}

export interface User{
    id:number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    blocked: boolean;
    active: boolean;
    createdOn: Date;
    userRole: string;
    fine: number;
}

export interface Book{
    id: number;
    title: string;
    category: string;
    subCategory: string;
    price: number;
    available: boolean;
    count?: number;
    author: string;
}