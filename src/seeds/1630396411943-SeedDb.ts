import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1630396411943 implements MigrationInterface {
  name = 'SeedDb1630396411943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')
    `);

    // password is 123
    await queryRunner.query(`
        INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$1tdtUZorATSmhaMlvwrJouKqhjVRFLRblgC2Yu6lg.mpNyd50TkXC')
    `);

    await queryRunner.query(`
        INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'first article body', 'coffee,dragons', 1)
    `);

    await queryRunner.query(`
        INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article desc', 'second article body', 'coffee,dragons', 1)
    `);
  }

  public async down(): Promise<void> {}
}
