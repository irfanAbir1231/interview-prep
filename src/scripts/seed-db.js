// Script to seed the database with test data
const { Database } = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function seedDatabase() {
  // Open the database
  const db = await open({
    filename: path.join(process.cwd(), 'interview-prep.db'),
    driver: Database
  });

  console.log('Connected to database');

  try {
    // Insert test users
    await db.run(`
      INSERT OR IGNORE INTO users (email, password, name) 
      VALUES ('test@example.com', '$2a$10$JdJO7S3OYLTUlRdFLM0RyOJwAEL5xP4XUQ5BUoLa4bUt8YuGzOXnq', 'Test User')
    `);

    console.log('Added test user');

    // Get the user ID
    const user = await db.get('SELECT id FROM users WHERE email = ?', ['test@example.com']);
    const userId = user ? user.id : 1;

    // Insert test interviews
    await db.run(`
      INSERT OR IGNORE INTO interviews (user_id, job_title, job_description, tech_expertise, years_experience, status) 
      VALUES (?, 'Frontend Developer', 'Building web applications', 'React, TypeScript', 2, 'Completed')
    `, [userId]);

    await db.run(`
      INSERT OR IGNORE INTO interviews (user_id, job_title, job_description, tech_expertise, years_experience, status) 
      VALUES (?, 'Backend Developer', 'API development', 'Node.js, Express', 3, 'Completed')
    `, [userId]);

    await db.run(`
      INSERT OR IGNORE INTO interviews (user_id, job_title, job_description, tech_expertise, years_experience, status) 
      VALUES (?, 'Full Stack Developer', 'Full stack development', 'React, Node.js', 4, 'Completed')
    `, [userId]);

    await db.run(`
      INSERT OR IGNORE INTO interviews (user_id, job_title, job_description, tech_expertise, years_experience, status) 
      VALUES (?, 'Behavioral Interview', 'Leadership assessment', 'Behavioral', 2, 'Completed')
    `, [userId]);

    await db.run(`
      INSERT OR IGNORE INTO interviews (user_id, job_title, job_description, tech_expertise, years_experience, status) 
      VALUES (?, 'Behavioral Interview', 'Team collaboration', 'Behavioral', 3, 'Completed')
    `, [userId]);

    console.log('Added test interviews');

    // Insert test feedbacks
    const interviews = await db.all('SELECT id FROM interviews');
    
    for (const interview of interviews) {
      await db.run(`
        INSERT OR IGNORE INTO feedbacks (interview_id, overall_score, summary) 
        VALUES (?, 85, 'Good performance overall with some areas for improvement')
      `, [interview.id]);
    }

    console.log('Added test feedbacks');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.close();
  }
}

seedDatabase().catch(console.error);