export interface NavItem {
    title: string;
    link: string;
    icon: string;
}

export interface User {
    id: number;
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

export interface Book {
    id: number;
    title: string;
    category: string;
    subCategory: string;
    price: number;
    available: boolean;
    count?: number;
    author: string;
}

export interface BookCategory {
    category: string;
    subCategory: string;
    books: Book[];
}

export interface Order {
    id: number;
    userID: number;
    name: number;
    bookID: number;
    bookTitle: string;
    orderedOn: string;
    ordered: boolean;
}

export interface DialogData {
    bookID: number;
    deleteBookErrMsg: string;
}

export interface Characteristics {
    title: string,
    content: string,
    icon: string,
}


export interface Details {
    number: string;
    subtitle: string;
}
export class EmailToConfirm {
    public email!: string;
    public emailToken!:string;
};

export class ResetPassword {
    public email!: string;
    public resetPasswordToken!: string;
    public newPassword!: string;
    public confirmPassword!: string;
}