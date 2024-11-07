export class MenuItem {
    id : number;
    menuItem: string;
    menuItemIcon:string;
    menuItemOrder:number;
    role:string;
    routerLink:string;
    functionItem:string;

    constructor(id : number,
        menuItem: string,
        menuItemIcon:string,
        menuItemOrder:number,
        role:string,
        routerLink:string, functionItem:string){
        this.id = id;
        this.menuItem = menuItem;
        this.menuItemIcon = menuItemIcon;
        this.menuItemOrder = menuItemOrder;
        this.role = role;
        this.routerLink = routerLink;
        this.functionItem = functionItem;
    }
}