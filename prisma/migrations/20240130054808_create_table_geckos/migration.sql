-- CreateTable
CREATE TABLE `geckos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `morph` VARCHAR(100) NOT NULL,
    `induk_jantan` VARCHAR(100) NULL,
    `induk_betina` VARCHAR(200) NULL,
    `dob` VARCHAR(20) NULL,
    `kelas_albino` VARCHAR(100) NULL,
    `jenis_kelamin` VARCHAR(100) NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `geckos` ADD CONSTRAINT `geckos_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
