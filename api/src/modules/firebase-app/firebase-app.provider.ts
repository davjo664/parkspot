import * as admin from 'firebase-admin';


/**
 * While this works for providing i don't like the Partial hack but
 * I needed a (abstract) class and no interface to have a runtime reference*/
export abstract class FirebaseApp implements Partial<admin.app.App> {

}


/**
 * Why do we use a provider instead of just accessing the app?
 *
 * So that we can swap out the implementation e.g. in tests or use configuration provided via DI.
 * */
export const firebaseAppProvider = {
  provide: FirebaseApp,
  // use a factory since we might be dependent on config that
  // could be injected as seen in the comments below:
  useFactory: (/*config: PrkConfig*/) => admin.initializeApp()
  // inject: [PrkConfig],
};




