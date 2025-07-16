import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1752694830861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user_types (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description VARCHAR(20) NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE user_status (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description VARCHAR(20) NOT NULL
      );
    `);

    await queryRunner.query(`
      CREATE TABLE users (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        cpf VARCHAR(20) UNIQUE NOT NULL,
        cnpj VARCHAR(20) UNIQUE,
        phone VARCHAR(15) UNIQUE,
        password VARCHAR(20) NOT NULL,
        type_id INT NOT NULL DEFAULT 1,
        status_id INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (type_id) REFERENCES user_types(id),
        FOREIGN KEY (status_id) REFERENCES user_status(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE users;
    `);

    await queryRunner.query(`
      DROP TABLE user_status;
    `);

    await queryRunner.query(`
      DROP TABLE user_types;
    `);
  }
}
