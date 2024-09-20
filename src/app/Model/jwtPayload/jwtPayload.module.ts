export class JwtPayload{
  permission:string="";
  sub:string="";
  Username:string="";
  email:string="";
  exp:number = 0;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":string="";
  UserId:string="";
}