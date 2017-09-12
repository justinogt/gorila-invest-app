export class User {
  $key: string;
  displayName: string;
  email: string;
  photoUrl: string;

  constructor(displayName: any, email: any, photoUrl: any) {
    this.displayName = displayName;
    this.email = email;
    this.photoUrl = photoUrl;
  }
}
