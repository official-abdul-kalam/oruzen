export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const data = await request.json();

        const { uid, email, displayName, photoURL } = data;

        if (!uid || !email) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        // Initialize table if it doesn't exist
        await env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS users (
                uid TEXT PRIMARY KEY,
                email TEXT NOT NULL,
                displayName TEXT,
                photoURL TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                lastLoginAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        // Insert or update (upsert) the user record
        await env.DB.prepare(`
            INSERT INTO users (uid, email, displayName, photoURL, lastLoginAt)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(uid) DO UPDATE SET
                displayName = excluded.displayName,
                photoURL = excluded.photoURL,
                lastLoginAt = CURRENT_TIMESTAMP
        `).bind(uid, email, displayName, photoURL).run();

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
