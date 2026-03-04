import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(), // Relies on GOOGLE_APPLICATION_CREDENTIALS for prod, or local auth
        projectId: "oruzen-auth",
    });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
