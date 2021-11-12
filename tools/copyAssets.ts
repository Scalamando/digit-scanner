import shell from "shelljs";

shell.cp("-r", "src/views", "build/");

shell.mkdir("-p", "build/public/css");
shell.mkdir("-p", "build/public/js");
shell.cp("-r", "src/public/css", "build/public/");
shell.cp("-r", "src/public/js/*.js", "build/public/js");
shell.cp("-r", "src/public/swagger.json", "build/public/");
