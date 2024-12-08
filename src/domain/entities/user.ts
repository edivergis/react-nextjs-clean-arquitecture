export type UserProps = {
    id: string;
    username: string;
    password: string;
    email: string;
  };
  
  export class User {
    constructor(public props: UserProps) {}
  
    public static with(props: UserProps) {
      return new User(props);
    }

    get id() {
      return this.props.id;
    }

    get username() {
      return this.props.username;
    }
  
    get password() {
      return this.props.password;
    }

    get email() {
      return this.props.email;
    }
    
  }