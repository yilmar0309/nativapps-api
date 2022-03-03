'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Migration = require('@mikro-orm/migrations').Migration;

class Migration20220303012336 extends Migration {

  async up() {
    this.addSql('create table `movie` (`id` varchar(255) not null, `createdAt` datetime(3) not null, `updatedAt` datetime(3) not null, `deletedAt` date null, `imdbID` varchar(255) null, `Title` varchar(255) null, `Year` varchar(255) null, `Type` varchar(255) null, `Poster` varchar(255) null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `movie` add primary key `movie_pkey`(`id`);');
  }

}
exports.Migration20220303012336 = Migration20220303012336;
