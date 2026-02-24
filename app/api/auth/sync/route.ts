import { auth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { uid, email, displayName, photoURL } = body;

        if (!uid) {
            return NextResponse.json({ error: 'Missing UID' }, { status: 400 });
        }

        // Update user in Firestore
        await db.collection('users').doc(uid).set({
            email,
            displayName,
            photoURL,
            lastLoginAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }, { merge: true });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error syncing user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
