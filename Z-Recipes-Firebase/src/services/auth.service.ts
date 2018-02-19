import {AuthData} from '../model/auth-data.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {

  private isAuthenticated = false;

  authChange = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth) {
  }

  registerUser(authData: AuthData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password);
  }

  login(authData: AuthData) {
    return this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
